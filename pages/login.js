import Head from "next/head";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../styles/Login.module.css";

export default function Login() {
  return (
    <div class="py-5">
      <Head>
        <title>BTP Necrology | Login</title>
      </Head>
      
        <Container fluid>
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h1 className={styles.login_logo}>Sign In</h1>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
    </div>
  );
}