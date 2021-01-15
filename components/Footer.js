import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col>
            <p>2021 &copy; Copyrights reserved.</p>
            </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;