import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/InMemory.module.css";

export default function InMemory() {
  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | In Memory we live!</title>
      </Head>
      <Container>
        <Row>
          <Col>
            <h1 className={styles.page_h1}>In Memory We Live Forever</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.comment_reply_title}>
              <h1>Leave a Comment</h1>
              <p>
                You must be <a href="#">logged in</a> to post a comment.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
