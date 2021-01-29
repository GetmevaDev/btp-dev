import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const ForgotPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alert, setAlert] = useState({
    show: false,
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (
      passwordConfirmation.length > 0 &&
      passwordConfirmation.length >= password.length &&
      passwordConfirmation != password
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
  }, [password, passwordConfirmation]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    axios
      .post(`${process.env.BACKEND_URL}/auth/reset-password`, {
        code: router.query.code, // code contained in the reset link of step 3.
        password,
        passwordConfirmation,
      })
      .then((res) => {
        setAlert({
          show: true,
          msg: "Password updated.",
          variant: "success",
        });

        router.push("/");
      })
      .catch((e) => {
        setLoading(false);
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
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
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
                )}{" "}
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
