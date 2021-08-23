import React, { useState, useEffect, useMemo } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import axios from "axios";
import Link from "next/link";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Container,
  NavDropdown,
  ListGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { useAppContext } from "../context/state";
import Loader from "../components/Loader";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { appState } = useAppContext();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.BACKEND_URL}/profiles`)
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (search === "") {
      setSearchResults([]);
    } else {
      setSearchResults(
        profiles.filter((profile) =>
          profile.fullName.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  useEffect(() => {
    if (searchResults.length) {
      setOpen(true);
    }
  }, [searchResults]);

  const handleClick = (e) => {
    setSearch(e.target.value);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const mainNavigation = useMemo(
    () => appState.navigations.find((navigation) => navigation.name == "Main"),
    [appState.navigations]
  );

  const navItems = useMemo(
    () =>
      mainNavigation &&
      mainNavigation.navigationItems.sort((a, b) => a.order > b.order),
    [mainNavigation]
  );

  const switchMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  const closeMenu = () => {
    setToggleMenu(false)
  }

  return (
    <>
      {appState.isLoading ? (
        <Loader />
      ) : (
        <>
        <header
        style = {
          {
            position: 'sticky',
            top: 0,
            zIndex: 20,
          }
        } >
          <Navbar
            collapseOnSelect
            expand="lg"
            variant="dark"
            className={styles.navbar}
            expanded={toggleMenu}
          >
            <Container>
              <Link href="/">
                <Navbar.Brand className={styles.logo}>
                  <img
                    src="/Vechna_logo_web.svg"
                    width="70"
                    className="d-inline-block align-top"
                    alt="BTP"
                  />
                </Navbar.Brand>
              </Link>
              <Navbar.Toggle onClick={switchMenu} aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={search}
                    onChange={handleClick}
                  />
                </Form>
                <Nav className="ml-auto">
                  {navItems &&
                    navItems.map((navItem) => {
                      if (!navItem.parent && !navItem.children.length) {
                        return (
                            <div
                                onClick={closeMenu}
                                style={{
                              display: 'inline',
                            }}>
                              <Link  href={navItem.path} key={navItem.id}>
                                {navItem.name}
                              </Link>
                            </div>

                        );
                      } else if (!navItem.parent && navItem.children.length) {
                        if (navItem.path == "/account" && appState.isGuest) {
                          return <Link  href="/login">Login</Link>;
                        } else {
                          return (
                            <NavDropdown
                              title={navItem.name}
                              className={styles.dropdownGroup}
                              key={navItem.id}
                            >
                              {navItem.children.map((childItemId) => {
                                const childItem = navItems.find(
                                  (item) => item.id == childItemId
                                );
                                return (
                                  <NavDropdown.Item
                                    className={styles.dropdownItem}
                                  >
                                    <Link href={childItem.path}>
                                      {childItem.name}
                                    </Link>
                                  </NavDropdown.Item>
                                );
                              })}
                            </NavDropdown>
                          );
                        }
                      }
                    })}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Container>
              {open ? (
                <ListGroup className={styles.dropdown_ul}>
                  {searchResults.slice(0, 5).map((profile) => (
                    <ListGroup.Item key={profile.id}>
                      <Row>
                        <Col md={2} className={styles.img}>
                          <Image
                            src={
                              profile.image
                                ? profile.image.url
                                : "https://via.placeholder.com/150.png"
                            }
                            alt="Image"
                            style={{ objectFit: "cover" }}
                            roundedCircle
                            width="40px"
                            height="40px"
                          />
                        </Col>
                        <Col md={6} className={styles.name}>
                          <br />
                          <Link href={`/profiles/${profile.slug}`}>
                            {profile.fullName}
                          </Link>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : null}
            </Container>
          </ClickAwayListener>
          <div className = {styles.marquee} >
            <p>
              <a target="_blank"  href="https://www.facebook.com/BTP-Reklamnaya-Pauza-393177177776231">
                Private message Michael Vostok for advertising opportunity.</a>
              <Link href="/callDavidov">Call Sam Davidov for mortgages (917) 578-6009</Link>
              <Link href="/inMemory"> In Memory We Live Forever </Link>
            </p>
          </div>
        </header>
        </>
      )}
    </>
  );
}
