import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import ErrorPage from "next/error";

export default function Profile({ profile }) {
  if (!profile) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <section className="py-5">
      <Head>
        <title>{`BTP Necrology | ${profile.fullName}`}</title>
      </Head>
      <Container>
        <Row>
          <Col mr={{ span: 7, offset: 3 }}>
            <h5 className={styles.profile_h5}>In Loving Memory Of</h5>
            <h1 className={styles.profile_h1}>{profile.fullName}</h1>
            <div className={styles.profile_image}>
              <Image
                width="640px"
                height="640px"
                style={{ objectFit: "cover" }}
                src={
                  profile.image
                    ? profile.image.url
                    : "https://via.placeholder.com/500x400.png"
                }
                alt="img"
              />
            </div>
            <div className={styles.profile_dates}>- {profile.deceaseDate}</div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 13, offset: 0 }}>
            <div className={styles.profile_description}>
              <div dangerouslySetInnerHTML={{ __html: profile.description }} />
            </div>

            <div className={styles.funeral_date}>
              <span>Pominki Date:</span> {profile.pominkis}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get(`${process.env.BACKEND_URL}/profiles`);

  const paths = data.map((profile) => `/profiles/${profile.slug}`);

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const profiles = await axios
    .get(`${process.env.BACKEND_URL}/profiles?slug=${params.slug}`)
    .then(({ data }) => data)
    .catch((e) => null);

  return {
    props: {
      profile: profiles ? profiles[0] : profiles,
    },
    revalidate: 60, // In seconds
  };
}
