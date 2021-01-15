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

export default function Profiles({ profiles }) {
 return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Profiles</title>
      </Head>

      <Container>
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
              {profiles.map((profile) => (
                <ListGroup.Item key={profile._id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={profile.image ? profile.image.url : "https://via.placeholder.com/150.png"}
                        alt="Image"
                        style={{ objectFit: 'cover'}}
                        roundedCircle
                        width="100px"
                        height="100px"
                      />
                    </Col>
                    <Col md={6} className={styles.name}>
                    <br />
                      <Link href={`/profiles/${profile._id}`}>
                        {profile.fullName}
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://btp-necrology.herokuapp.com/profiles");
  const profiles = await res.json();

  return {
    props: {
      profiles,
    },
  };
}