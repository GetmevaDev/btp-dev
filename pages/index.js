import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardDeck,
  Image,
  Carousel
} from "react-bootstrap";
import styles from "../styles/Home.module.css";
import React, { useState, useRef, useEffect } from "react";
import usePagination from "../lib/usePagination";
import axios from "axios";

export default function Home({ profiles }) {
  const { next, currentPage, currentData, maxPage } = usePagination(
    profiles,
    4
  );

  const currentProfiles = currentData();

  const [element, setElement] = useState(null);

  const observer = useRef();
  const prevY = useRef(0);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;

        if (prevY.current > y) {
          next();
        }
        prevY.current = y;
      },
      { threshold: 0.5 }
    );
  }, []);

  useEffect(() => {

    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <section className="py-4">
      <Head>
        <title>BTP Necrology | Некролог האבל Nachruf</title>
      </Head>
      <Container>
        <Carousel>
          {profiles &&
            profiles.slice(0, 7).map((profile) => (
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
                  <Link href={`/profiles/${profile.slug}`}>
                    <Button variant="primary">View Profile</Button>
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
        </Carousel>
      </Container>
      <Container className="mt-5">
        <Row>
          <Col>
            <CardDeck>
              {currentProfiles &&
                currentProfiles.map((profile) => (
                  <Col
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    key={profile._id}
                    className={styles.carddeck}
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
                        <Link href={`/profiles/${profile.slug}`}>
                          <Button variant="primary">View Profile</Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </CardDeck>
            {(currentPage - 1) !== maxPage ? null : (
                <div className={styles.blockText} style={{
                  position: 'absolute',
                  right: '0',
                  left: '0',
                  margin: '0 auto',
                  bottom: '50%',
                  transform: 'translate(0, 160%)',
                  textAlign: 'center'
                }}>
                  <h2>There is nothing here yet. Log in and be the first!</h2>
                  <Link href="/login">Login</Link>
                </div>

            )}
            {console.log(currentPage + ',' + maxPage)}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/profiles?_sort=createdAt:DESC&_limit=10000`
  );

  return {
    props: {
      profiles: data,
    },
    revalidate: 60, // In seconds
  };
}
