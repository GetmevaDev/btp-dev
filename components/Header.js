import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap'
import styles from '../styles/Header.module.css'

const Header = () => {
    return (
        <header>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossorigin="anonymous"
          />
        </Head>
    <Navbar collapseOnSelect expand="lg" variant="dark" className={styles.navbar}>
    <Container>
         <Navbar.Brand href="#home"> <img
        src="https://btpnecrology.com/wp-content/uploads/2020/07/btp_logo-1.svg"
        width="50"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
           <Navbar.Collapse id="responsive-navbar-nav">
           <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
           </Form>
            <Nav className="ml-auto">
            <Link href="/">
             Home
            </Link>
            <Link href="/about">
             About Us
            </Link>
            <Link href="/howitworks">
             How It works
            </Link>
            <Link href="/profiles">
             Profiles
            </Link>
            <Link href="/resources">
             Resources
             </Link>
             <Link href="/login">
             Login
             </Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>
    <marquee bgcolor="#8B9DC3" height="40px">
        <Link href="https://btpnecrology.com/call-sam-davidov-for-mortgages-9175786009/">Call Sam Davidov for mortgages (917) 578-6009</Link>
        <Link href="https://btpnecrology.com/in-memory-we-live-forever/">In Memory We Live Forever</Link>
    </marquee>
      </header>
    )
}

export default Header
