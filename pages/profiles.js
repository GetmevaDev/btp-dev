import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Button,
  FormControl,
  Image,
} from "react-bootstrap";
import styles from "../styles/Profiles.module.css";

export default function Profiles() {
  return (
    <section class="py-5">
      <Head>
        <title>BTP Necrology | Profiles</title>
      </Head>

        <Container fluid>
          <Row className="justify-content-md-center">
            <Col md={{ span: 4, offset: 2 }}>
              <h1>Search profiles</h1>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image
                        src="https://btpnecrology.com/wp-content/uploads/2020/10/121808589_1063169820809263_1085654699640111207_o-150x150.jpg"
                        alt="Image"
                        fluid
                        roundedCircle
                      />
                    </Col>
                    <Col md={6} className={styles.name}>
                      <br />
                      <Link href="https://btpnecrology.com/profiles/912/">
                        Aba Ibragimov Ben Yafa (Аба Ибрагимов Бен Яфа)
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image
                        src="https://btpnecrology.com/wp-content/uploads/2020/10/121808589_1063169820809263_1085654699640111207_o-150x150.jpg"
                        alt="Image"
                        fluid
                        roundedCircle
                      />
                    </Col>
                    <Col md={6} className={styles.name}>
                      <br />
                      <Link href="https://btpnecrology.com/profiles/912/">
                        Aba Ibragimov Ben Yafa (Аба Ибрагимов Бен Яфа)
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image
                        src="https://btpnecrology.com/wp-content/uploads/2020/10/121808589_1063169820809263_1085654699640111207_o-150x150.jpg"
                        alt="Image"
                        fluid
                        roundedCircle
                      />
                    </Col>
                    <Col md={6} className={styles.name}>
                      <br />
                      <Link href="https://btpnecrology.com/profiles/912/">
                        Aba Ibragimov Ben Yafa (Аба Ибрагимов Бен Яфа)
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image
                        src="https://btpnecrology.com/wp-content/uploads/2020/10/121808589_1063169820809263_1085654699640111207_o-150x150.jpg"
                        alt="Image"
                        fluid
                        roundedCircle
                      />
                    </Col>
                    <Col md={6} className={styles.name}>
                      <br />
                      <Link href="https://btpnecrology.com/profiles/912/">
                        Aba Ibragimov Ben Yafa (Аба Ибрагимов Бен Яфа)
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
    </section>
  );
}