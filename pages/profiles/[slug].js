import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import ErrorPage from "next/error";
import parsePhoneNumber from "libphonenumber-js";
import hebrewDate from "hebrew-date";
import Reactions from "../../components/Reactions";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { useRouter } from "next/router";
import { FacebookProvider, Comments } from "react-facebook";
import { Collapse } from "@material-ui/core";

export default function Profile({ profile }) {
  const [number, setNumber] = useState("");
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  // useEffect(() => {
  //   window.FB.XFBML.parse();
  // }, []);

  const handleSubscribe = () => {
    let phoneNumber = parsePhoneNumber(number, "US");

    if (phoneNumber) {
      axios
        .post(`${process.env.BACKEND_URL}/reminder-subscribers`, {
          number: phoneNumber.number,
          profile,
        })
        .then(() => {
          setAlert({
            text: "Successfully subscribed!",
            variant: "success",
          });
        })
        .catch((e) => {
          setAlert({
            text: e.message,
            variant: "danger",
          });
        });
    } else {
      setAlert({ variant: "danger", text: "Invalid number" });
    }
  };

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
          <Col>
            <h5 className={styles.profile_h5}>In Loving Memory Of</h5>
            <h1 className={styles.profile_h1}>{profile.fullName}</h1>
            <h4 className="d-flex justify-content-center">
              {profile.fullNameNative}
            </h4>
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
            <div className={styles.profile_dates}>
              {profile.birthDate} - {profile.deceaseDate}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className={styles.profile_description}>
              <div dangerouslySetInnerHTML={{ __html: profile.description }} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {profile.burialPlace && profile.burialPlace.length !== 0 ? (
              <div className={styles.funeral_date}>
                <span>Burial Place: {profile.burialPlace}</span>
              </div>
            ) : null}
            {profile.pominkis.map((pominki) => {
              const date = hebrewDate(new Date(pominki.date));
              return (
                <div className={styles.funeral_date}>
                  <span>
                    Pominki Date: {pominki.date}
                    {pominki.date
                      ? `(${date.month_name} ${date.date}, ${date.year})`
                      : null}
                  </span>
                  <br />
                  <span>
                    Time: {pominki.startTime} - {pominki.endTime}
                  </span>
                  <br />
                  <span>Location: {pominki.location}</span>
                </div>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Reactions profile={profile} />
        </Row>
        <Row className="d-flex justify-content-center">
          <FacebookShareButton
            className="mr-1"
            url={`${process.env.PUBLIC_URL}${router.asPath}`}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <FacebookMessengerShareButton
            className="mr-1"
            url={`${process.env.PUBLIC_URL}${router.asPath}`}
            appId={process.env.FACEBOOK_APP_ID}
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
          <WhatsappShareButton
            className="mr-1"
            url={`${process.env.PUBLIC_URL}${router.asPath}`}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton
            className="mr-1"
            url={`${process.env.PUBLIC_URL}${router.asPath}`}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </Row>
        <Row className="mt-4">
          <Col md={12}>
            <Form>
              <Form.Row className="align-items-center">
                <Col md={3} sm={12}>
                  <Card>
                    <Card.Body>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>
                          Subscribe for WhatsApp reminders
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="WhatsApp number"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                        />
                      </Form.Group>
                      <Button className="mb-2" onClick={handleSubscribe}>
                        Subscribe
                      </Button>
                    </Card.Body>
                  </Card>
                  {alert && (
                    <Alert className="mt-2" variant={alert.variant}>
                      {alert.text}
                    </Alert>
                  )}{" "}
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <FacebookProvider appId={process.env.FACEBOOK_APP_ID}>
              <Comments href={`${process.env.PUBLIC_URL}${router.asPath}`} />
            </FacebookProvider>{" "}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export async function getStaticPaths() {
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/profiles?_limit=10000`
  );

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
