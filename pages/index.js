import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardDeck,
  Media,
  Image,
  Carousel,
  CardGroup,
} from "react-bootstrap";
import styles from "../styles/Home.module.css";

export default function Home({ profiles }) {
  return (
    <section className="py-4">
      <Head>
        <title>BTP Necrology | Некролог האבל Nachruf</title>
      </Head>
      <Container>
        <Carousel>
          {profiles.map((profile) => (
            <Carousel.Item className={styles.carousel_item} key={profile._id}>
              <Image
                className={styles.carousel_img}
                width="500"
                height="400"
                style={{ objectFit: "cover" }}
                src={
                  profile.image
                    ? profile.image.url
                    : "https://via.placeholder.com/500x400.png"
                }
                alt="First slide"
              />
              <Carousel.Caption className={styles.carousel_info}>
                <h3>{profile.fullName}</h3>
                <p>{profile.deceaseDate}</p>
                <Link href={`/profiles/${profile._id}`}>
                  <Button variant="primary">View Profile</Button>
                </Link>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* <Container className={styles.useful}>
        <h1 className={styles.useful_links}>Useful Links</h1>
        <Row>
          <Col>
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
          </Col>
          <Col>
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
          </Col>
        </Row>
      </Container> */}

      <Container>
        <Row>
          <Col>
            <CardDeck>
              {profiles.map((profile) => (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  key={profile._id}
                  className="py-2 carddeck"
                >
                  <Card style={{ width: "16rem", height: "100%" }}>
                    <Card.Img
                      variant="top"
                      height="275px"
                      style={{ objectFit: "cover" }}
                      src={
                        profile.image
                          ? profile.image.url
                          : "https://via.placeholder.com/150.png"
                      }
                    />
                    <Card.Body>
                      <Card.Title>{profile.fullName}</Card.Title>
                      <Card.Text>{profile.deceaseDate}</Card.Text>
                      <Link href={`/profiles/${profile._id}`}>
                        <Button variant="primary">View Profile</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </CardDeck>
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
