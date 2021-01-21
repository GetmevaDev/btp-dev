import React, { useMemo } from "react";
import Link from "next/link";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { useAppContext } from "../context/state";

const Header = (props) => {
  const { user, isGuest, navigations } = useAppContext();

  const mainNavigation = useMemo(
    () => navigations.find((navigation) => navigation.name == "Main"),
    [navigations]
  );

  const navItems = useMemo(
    () =>
      mainNavigation &&
      mainNavigation.navigationItems.sort((a, b) => a.order > b.order),
    [mainNavigation]
  );

  console.log(navItems);

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className={styles.navbar}
      >
        <Container>
          <Link href="/">
            <Navbar.Brand className={styles.logo}>
              <img
                src="https://btpnecrology.com/wp-content/uploads/2020/07/btp_logo-1.svg"
                width="50"
                className="d-inline-block align-top"
                alt="BTP"
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
            <Nav className="ml-auto">
              {navItems &&
                navItems.map((navItem) => {
                  if (!navItem.parent && !navItem.children.length) {
                    return (
                      <Link href={navItem.path} key={navItem.id}>
                        {navItem.name}
                      </Link>
                    );
                  } else if (!navItem.parent && navItem.children.length) {
                    if (navItem.path == "/account" && isGuest) {
                      return <Link href="/login">Login</Link>;
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
                              <NavDropdown.Item className={styles.dropdownItem}>
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
      <div className={styles.marquee}>
        <p>
          <Link href="/callDavidov">
            Call Sam Davidov for mortgages (917) 578-6009
          </Link>
          <Link href="/inMemory">In Memory We Live Forever</Link>
        </p>
      </div>
    </header>
  );
};

export default Header;
