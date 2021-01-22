import React, { useState } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    variant: "success",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.BACKEND_URL}/auth/forgot-password`, {
        email,
      })
      .then((res) => {
        setAlert({
          show: true,
          msg: "Please check your email for futher instructions.",
          variant: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          show: true,
          msg: e,
          variant: "danger",
        });
      });
  };

  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Forgot Password</title>
      </Head>

      <Container className={styles.login_container}>
        {alert.show && <Alert variant={alert.variant}>{alert.msg}</Alert>}
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Body>
                <Card.Text>
                  NOT WORKING YET!!! Please enter your email address. You will
                  receive a message with instructions on how to reset your
                  password.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Link href="/login">
              <a className={styles.bottom_link}>Login</a>
            </Link>{" "}
            |{" "}
            <Link href="/register">
              <a className={styles.bottom_link}>Register</a>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ForgotPassword;
