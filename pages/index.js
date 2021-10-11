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
import {LazyLoadImage} from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useAppContext} from "../context/state";


export default function Home({ profiles }) {

    const [profile, setProfile] = useState(profiles)
    const [categories, setCategories] = useState([])
    const { appState } = useAppContext();

    useEffect(() => {
        axios.get(`${process.env.BACKEND_URL}/resource-categories?_limit=10000`)
            .then(({data}) => {
                setCategories(data);
            }).catch((e) => {
            console.log(e.message)
        })
    },[])

    console.log(categories)


    const getMoreProfiles = async () => {
        const res = await fetch(`${process.env.BACKEND_URL}/profiles?_start=${profile.length}&_sort=createdAt:DESC&_limit=4`);
        const newProfiles = await res.json();
        setProfile(profile => [...profile, ...newProfiles])
    }


    // useEffect(()=>{
    //     if (appState.isGuest) {
    //         window.location.href = 'http://localhost:3000/login';
    //     }
    // },[])


  return (
    <section className="py-4">
      <Head>
        <title>BTP Necrology | Некролог האבל Nachruf</title>
          {/*{*/}
          {/*    appState.isGuest ?  <meta http-equiv="Refresh" content="0; URL=http://localhost:3000/login"/> :*/}
          {/*        null*/}
          {/*}*/}
      </Head>
      <Container>
        <Carousel>
          {profiles &&
            profiles.slice(0, 7).map((profile) => (
              <Carousel.Item className={styles.carousel_item} key={profile._id}>
                <LazyLoadImage
                    width="500"
                    height="400"
                    src={profile.image
                        ? profile.image.url
                        : "https://via.placeholder.com/500x500.png"}
                    alt="Image"
                    style={{ objectFit: "cover" }}
                    effect="blur"
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

          {categories ?
              <Col className={styles.containerCategory}>
                  <h1 className="text-center font-weight-bold">USEFUL LINKS</h1>
                  <Row>

                      {
                          categories.map(item => (
                              <Col key={item.id} className={styles.linkCategory} lg={6} md={6}>
                                  <Link href={`/categories/${item.slug}`}>{item.Category}</Link>
                              </Col>
                          ))
                      }

                  </Row>
              </Col> :
              null
          }

        <Row>
          <Col>
            <CardDeck>
              <InfiniteScroll
                  dataLength={profile.length}
                  next={getMoreProfiles}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflow: 'hidden' }} //To put endMessage and loader to the top.
                  hasMore={true}
                  // loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"

                  className={styles.blockCard}
                  pullDownToRefreshThreshold={50}
              >
                {profile &&
                profile.map((profile) => (
                    <Col
                      sm={12}
                      md={6}
                      lg={4}
                      xl={3}
                      key={profile._id}
                      className={styles.carddeck}
                    >

                      <Card style={{ width: "16rem", height: "100%" }}>
                        <LazyLoadImage
                            src={
                              profile.image
                                  ? profile.image.url
                                  : "https://via.placeholder.com/150.png"
                            }
                            variant="top"
                            height="275px"
                            style={{ objectFit: "cover" }}
                            effect="blur"
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
              </InfiniteScroll>
            </CardDeck>
            {profile.length !== 0 ? null : (
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

          </Col>
        </Row>
      </Container>
    </section>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/profiles?_sort=createdAt:DESC&_limit=4`
  );

  return {
    props: {
      profiles: data,
    },
    revalidate: 60, // In seconds
  };
}
