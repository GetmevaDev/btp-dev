import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/Register.module.css";

export default function Register() {
  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Register</title>
      </Head>

      <Container className={styles.register_container}>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className={styles.register_logo}>Register</h1>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username"/>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group>
                <p>Registration confirmation will be emailed to you.</p>
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
            <p>
              <Link href="/login">Login</Link> |{" "}
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