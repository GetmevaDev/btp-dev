import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import ErrorPage from "next/error";
import parsePhoneNumber from "libphonenumber-js";
import hebrewDate from "hebrew-date";

export default function Profile({ profile }) {
  const [number, setNumber] = useState("");
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    window.FB.XFBML.parse();
  }, []);

  const handleSubscribe = () => {
    let phoneNumber = parsePhoneNumber(number, "US");

    if (phoneNumber.isValid()) {
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
            <div className={styles.profile_dates}>- {profile.deceaseDate}</div>
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
            {profile.burialPlace &&
              (profile.burialPlace.length !== 0) &
              (
                <div className={styles.funeral_date}>
                  <span>Burial Place: {profile.burialPlace}</span>
                </div>
              )}
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
        <Row className="mt-4">
          <Col md={12}>
            <Form>
              <Form.Row className="align-items-center">
                <Col xs="auto">
                  <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                    Username
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        Subscribe for Whatsapp reminders:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      id="inlineFormInputGroup"
                      placeholder="Whatsapp number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </InputGroup>
                </Col>

                <Col xs="auto">
                  <Button className="mb-2" onClick={handleSubscribe}>
                    Subscribe
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
          {alert && (
            <Col md={4} sm={12}>
              <Alert variant={alert.variant}>{alert.text}</Alert>
            </Col>
          )}
        </Row>
        <Row className="mt-4 d-flex justify-content-center">
          <div className="fb-comments" data-numposts="15"></div>
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
