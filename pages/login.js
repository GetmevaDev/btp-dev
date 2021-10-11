import React, {useEffect, useState} from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { login } from "../lib/user";
import { setCookie } from "nookies";
import {useAppContext} from "../context/state";



export default function Login() {
  const [identifier, setIdentifier] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [error, setError] = useState({ show: false, errorMsg: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { appState } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true)

    login(identifier, password)
      .then((jwt) => {
        setCookie(null, "jwt", jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/");
      })
      .catch((e) => {
        setIsLoading(false)
        setError({ show: true, errorMsg: e.message })});
  };

  // useEffect(()=>{
  //   if (!appState.isGuest) {
  //   window.location.href = '/';
  // }
  // }, [])



  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Login</title>
        {/*{*/}
        {/*  !appState.isGuest ?  <meta http-equiv="Refresh" content="0; URL=/"/> :*/}
        {/*      null*/}
        {/*}*/}
      </Head>

      <Container className={styles.login_container}>
        {error.show && <Alert variant="danger">{error.errorMsg}</Alert>}
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className={styles.login_logo}>Sign In</h1>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicIdentifier">
                <Form.Label>Email or username</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button variant="primary" type="submit">
              {isLoading && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) } Log in
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          {/*<Col md={{ span: 4, offset: 4 }}>*/}
          {/*  <Button variant="primary">*/}
          {/*    <Link href={`${process.env.BACKEND_URL}/connect/facebook`}>*/}
          {/*      <a className={styles.login_facebook_link}>*/}
          {/*        <svg*/}
          {/*          xmlns="http://www.w3.org/2000/svg"*/}
          {/*          width="20"*/}
          {/*          height="20"*/}
          {/*          fill="currentColor"*/}
          {/*          className="bi bi-facebook mr-2"*/}
          {/*          viewBox="0 0 20 20"*/}
          {/*        >*/}
          {/*          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />*/}
          {/*        </svg>*/}
          {/*        Log in with*/}
          {/*        <strong> Facebook</strong>*/}
          {/*      </a>*/}
          {/*    </Link>*/}
          {/*  </Button>*/}
          {/*</Col>*/}
        </Row>
        <Row className="mt-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Link href="/register">
              <a className={styles.bottom_link}>Register</a>
            </Link>{" "}
            |{" "}
            <Link href="/forgot-password">
              <a className={styles.bottom_link}>Lost your password?</a>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
