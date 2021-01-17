import { useState } from 'react'
import Head from "next/head";
import Link from 'next/link'
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";

export default function Profile({ profiles, params }) {
    const [profile, setProfile] = useState(profiles.find((p) => p._id === params._id))

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
                style={{ objectFit: 'cover'}}
                src={profile.image ? profile.image.url : "https://via.placeholder.com/500x400.png"}
                alt="img"
              />
            </div>
            <div className={styles.profile_dates}>- {profile.deceaseDate}</div>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 13, offset: 0 }}>
            <div className={styles.profile_description}>
            <div dangerouslySetInnerHTML={{ __html: profile.desciption }} />
            </div>
            
            <div className={styles.funeral_date}>
              <span>Pominki Date:</span> {profile.pominkis}
            </div>

            <div className={styles.comment_reply_title}>
              <h1>Leave a Comment</h1>
              <p>
                You must be <Link href="/login">logged in</Link> to post a comment.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export async function getStaticPaths() {
    const res = await fetch('https://btp-necrology.herokuapp.com/profiles')
    const profiles = await res.json()
  
    const paths = profiles.map((profile) => `/profiles/${profile._id}`)

    return { paths, fallback: false }
  }

export async function getStaticProps({ params }) {
    const res = await fetch("https://btp-necrology.herokuapp.com/profiles")
    const profiles = await res.json()

    return {
        props: {
            profiles,
            params
        }
    }
}