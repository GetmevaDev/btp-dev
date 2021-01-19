import React from "react";
import Link from "next/link";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import styles from "../styles/Header.module.css";
import { useAppContext } from "../context/state";

const Header = () => {
  const { user, isGuest } = useAppContext();

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
            <Navbar.Brand>
              <img
                src="https://btpnecrology.com/wp-content/uploads/2020/07/btp_logo-1.svg"
                width="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
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
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/howitworks">How It works</Link>
              <Link href="/profiles">Profiles</Link>
              <Link href="/resources">Resources</Link>
              {isGuest ? (
                <Link href="/login">Login</Link>
              ) : (
                <Link href="/cabinet">{user.username}</Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <marquee>
        <Link href="/callDavidov">
          Call Sam Davidov for mortgages (917) 578-6009
        </Link>
        <Link href="/inMemory">In Memory We Live Forever</Link>
      </marquee>
    </header>
  );
};

export default Header;
