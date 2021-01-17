import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import styles from "../styles/LostPassword.module.css";

export default function LostPassword() {
  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Lost Password</title>
      </Head>

      <Container className={styles.lostpassword_container}>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Alert variant="primary">
              Please enter your username or email address. You will receive an
              email message with instructions on how to reset your password.
            </Alert>
            <Form>
              <Form.Group>
                <Form.Label>Username or Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Get New Password
              </Button>
            </Form>
            <p>
              <Link href="/login">Login</Link> |{" "}
              <Link href="/register">Register</Link>
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