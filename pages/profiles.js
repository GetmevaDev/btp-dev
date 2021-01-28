import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  FormControl,
  Image,
} from "react-bootstrap";
import styles from "../styles/Profiles.module.css";

export default function Profiles({ profiles }) {
  const [search, setSearch] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    if (profiles)
      setFilteredProfiles(
        profiles.filter((profile) =>
          profile.fullName.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search, profiles]);

  return (
    <section className="py-5" style={{ position: "relative" }}>
      <Head>
        <title>BTP Necrology | Profiles</title>
      </Head>

      <div className={styles.bookmarks}>
        {[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].map((letter, idx) => {
          return filteredProfiles.find(
            (profile) => profile.fullName.charAt(0) == letter
          ) ? (
            <a href={`#letter-${letter}`} key={letter}>
              {letter}
            </a>
          ) : (
            <span key={letter}>{letter}</span>
          );
        })}
      </div>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={{ span: 4, offset: 1 }}>
            <h1>Search profiles</h1>
            <Form>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md={8}>
            <ListGroup variant="flush">
              {filteredProfiles.map((profile, idx) => (
                <>
                  {filteredProfiles[idx - 1] ? (
                    profile.fullName.charAt(0) !=
                    filteredProfiles[idx - 1].fullName.charAt(0) ? (
                      <Row
                        className={styles.groupLetter}
                        id={`letter-${profile.fullName.charAt(0)}`}
                      >
                        {profile.fullName.charAt(0)}
                      </Row>
                    ) : null
                  ) : (
                    <Row
                      className={styles.groupLetter}
                      id={`letter-${profile.fullName.charAt(0)}`}
                    >
                      {profile.fullName.charAt(0)}
                    </Row>
                  )}
                  <ListGroup.Item key={profile.id}>
                    <Row>
                      <Col md={2} className={styles.img}>
                        <Image
                          src={
                            profile.image
                              ? profile.image.url
                              : "https://via.placeholder.com/150.png"
                          }
                          alt="Image"
                          style={{ objectFit: "cover" }}
                          roundedCircle
                          width="100px"
                          height="100px"
                        />
                      </Col>
                      <Col md={6} className={styles.name}>
                        <br />
                        <Link href={`/profiles/${profile.slug}`}>
                          {profile.fullName}
                        </Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/profiles?_sort=fullName:ASC&_limit=10000`
  );

  console.log(data.length);

  return {
    props: {
      profiles: data,
    },
    revalidate: 60, // In seconds
  };
}
