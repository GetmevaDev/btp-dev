import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Media } from "react-bootstrap";
import styles from "../styles/Resources.module.css";

export default function Resources() {
  return (
    <section class="py-5">
      <Head>
        <title>BTP Necrology | Resources</title>
      </Head>

        <Container className={styles.resources_container}>
          <Row>
            <Col md={{ span: 3, offset: 1 }}>
              <h1>Resources</h1>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 3, offset: 1 }} xs lg="10">
              <ul>
                <hr />
                <Media as="li" className={styles.media}>
                  <Link href="https://btpnecrology.com/resource-categories/catering/">
                    Catering
                  </Link>
                </Media>
                <hr />
                <Media as="li" className={styles.media}>
                  <Link href="https://btpnecrology.com/resource-categories/doctors/">
                    Doctors
                  </Link>
                </Media>
                <hr />
                <Media as="li" className={styles.media}>
                  <Link href="https://btpnecrology.com/resource-categories/funeral-homes/">
                    Funeral Homes
                  </Link>
                </Media>
                <hr />
                <Media as="li" className={styles.media}>
                  <Link href="https://btpnecrology.com/resource-categories/rabbi/">
                    Rabbi
                  </Link>
                </Media>
                <hr />
                <Media as="li" className={styles.media}>
                  <Link href="https://btpnecrology.com/resource-categories/stones/">
                    Stones
                  </Link>
                </Media>
                <hr />
              </ul>
            </Col>
          </Row>
        </Container>
    </section>
  );
}