import Head from "next/head";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useState } from "react";
import { setCookie } from "nookies";

export default function Login() {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleRegister = async (e) => {
    e.preventDefault();

    const register = await fetch(
      `${process.env.BACKEND_URL}/auth/local/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      }
    );

    const registerResponse = await register.json();

    setCookie(null, "jwt", registerResponse.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
  };

  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Register</title>
      </Head>

      <Container className={styles.login_container}>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className={styles.login_logo}>Register</h1>
            <Form onSubmit={handleRegister}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicusername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Button variant="primary">
              <Link
                href={`${process.env.BACKEND_URL}/connect/facebook/redirect`}
              >
                <a className={styles.login_facebook_link}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-facebook mr-2"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                  Log in with
                  <strong> Facebook</strong>
                </a>
              </Link>
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Link href="/login">
              <a className={styles.bottom_link}>Login</a>
            </Link>{" "}
            |{" "}
            <Link href="#">
              <a className={styles.bottom_link}>Lost your password?</a>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
