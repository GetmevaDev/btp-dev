import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/Login.module.css";

export default function Login() {
  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Login</title>
      </Head>

      <Container className={styles.login_container}>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className={styles.login_logo}>Sign In</h1>
            <Form>
              <Form.Group>
                <Form.Label>Username or Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group>
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <p>
              <Link href="/register">Register</Link> |{" "}
              <Link href="/lostpassword">Lost your password?</Link>
            </p>
            <p>
              <Link href="/">Go to BTP Necrology</Link>
            </p>
          </Col>
        </Row>
        <h6 className="text-center">
          <Link href="/privacy-policy">Privacy Policy</Link>
        </h6>
      </Container>
    </section>
  );
}