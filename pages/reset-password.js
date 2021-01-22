import React, { useState, useEffect } from "react";
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

const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [alert, setAlert] = useState({
    show: false,
  });

  useEffect(() => {
    if (
      passwordConfirm.length > 0 &&
      passwordConfirm.length >= password.length &&
      passwordConfirm != password
    ) {
      setAlert({
        show: true,
        msg: "Passwords do not match.",
        variant: "danger",
      });
    } else {
      setAlert({
        show: false,
      });
    }
  }, [password, passwordConfirm]);

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
        setAlert({
          show: true,
          msg: e.message,
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
        <Row className="mt-3">
          <Col md={{ span: 4, offset: 4 }}>
            <h1 className={styles.login_logo}>Reset Password</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicNewPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicNewPasswordConfirm">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
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
