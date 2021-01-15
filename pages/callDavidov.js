import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/CallDavidov.module.css";

export default function CallDavidov() {
  return (
    <section>
      <Head>
        <title>BTP Necrology | Call Sam Davidov</title>
      </Head>
      <Container>
        <Row>
          <Col mr={{ span: 6, offset: 3 }}>
            <h1 className={styles.profile_h1}>Call Sam Davidov for mortgages (917) 578-6009</h1>
            <div className={styles.profile_image}>
              <img
                src="https://btpnecrology.com/wp-content/uploads/2020/11/ade7e9ed91a983aa37a28eadca573b99.png"
                alt="img"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 13, offset: 0 }}>
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