import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/About.module.css";

export default function AboutUs() {
  return (
    <section>
      <Head>
        <title>BTP Necrology | About Us</title>
      </Head>

      <Container className={styles.about_container}>
        <Row>
          <Col>
            <iframe
              title="Relaxing Music Mix | BEAUTIFUL PIANO"
              width="100%"
              height="360px"
              src="https://www.youtube.com/embed/NliYy7iqh-U?feature=oembed"
            ></iframe>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <h1>About Us</h1>
            <p>
              Laboris reprehenderit quis proident do eu ea incididunt eiusmod
              nulla enim fugiat culpa dolor sint. Non est duis velit labore.
              Ipsum nostrud proident et consectetur mollit nisi cupidatat
              consequat velit non qui ipsum mollit. Cupidatat eiusmod non
              reprehenderit mollit consequat. Nostrud excepteur exercitation
              dolor aliqua irure.
            </p>
            <p>
              Et velit aute ipsum quis. Eu excepteur officia do ea do enim
              reprehenderit. Culpa ullamco adipisicing magna excepteur occaecat
              dolore anim nostrud et velit minim enim. Nisi id excepteur
              cupidatat magna. Nisi elit cillum tempor est.
            </p>
            <p>
              Fugiat mollit ullamco in pariatur officia qui aliquip non occaecat
              ex id et enim. Mollit proident nostrud aute laboris occaecat
              consequat magna ut dolor. Laborum et Lorem eu deserunt fugiat
              velit reprehenderit anim aute in eiusmod culpa proident. Officia
              pariatur sint eiusmod ea irure ullamco.
            </p>
            <p>
              Excepteur nulla sunt nulla sit nostrud. Aliquip sit adipisicing
              aute voluptate ea et excepteur ut. Quis eu irure aute id. Culpa
              consectetur labore qui est do exercitation. Ea incididunt quis qui
              eu dolor eu id qui cupidatat elit.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
