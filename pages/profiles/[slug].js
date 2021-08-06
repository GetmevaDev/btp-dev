import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Message from "../../components/Message";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Card,
  Button,
  Alert,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import axios from "axios";
import ErrorPage from "next/error";
import parsePhoneNumber from "libphonenumber-js";
import hebrewDate from "hebrew-date";
import Reactions from "../../components/Reactions";
import { useAppContext } from "../../context/state";
import { parseCookies } from "nookies";
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
import Comment from "../../components/Comment";
import { listToTree } from "../../lib/helpers";
import download from "downloadjs";
import SMSForm from "../SMSForm";

export default function Profile({ profile }) {

  console.log(profile)
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [success, setSuccess] = useState(null);
  const { appState } = useAppContext();
  const { jwt } = parseCookies();
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [currentComment, setCurrentComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsProcessed, setCommentsProcessed] = useState([]);

  useEffect(() => {
    axios
        .get(`${process.env.BACKEND_URL}/comments`)
        .then(({ data }) => {
          console.log(data)
          const commentProfile = data.filter(comment => comment.profile.id === profile.id);
          console.log(commentProfile)
          setComments(commentProfile)
        })

        .catch((e) => {
          console.log(e)
        });
  }, []);



  useEffect(() => {
    setCommentsProcessed(listToTree(comments));
  }, [comments]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
        .post(
            `${process.env.BACKEND_URL}/comments`,
            {
              authorUser: appState.user,
              threadOf: currentComment,
              content: comment,
              profile: profile,
              related: [
                {
                  _id: profile.id,
                  ref: "profile",
                  field: "comments",
                },
              ],
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
        )
        .then(({ data }) => {
          setComments([...comments, { ...data, threadOf: data.threadOf.id }]);
          setComment("");
          setCurrentComment(null);
          setLoading(false);
          setSuccess({
            show: true,
          });
        })
        .catch((e) => {
          setAlert({
            show: true,
            msg: e.message,
            variant: "danger",
          });
        });
    window.location.reload(false);
  };


  // const handleSubscribe = (event) => {
  //   event.preventDefault();
  //   this.setState({ submitting: true });
  //   fetch('/api/messages', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state.message)
  //   })
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data.success) {
  //           setSubmitting(false);
  //           setError(false);
  //           setNumber('');
  //           // this.setState({
  //           //   error: false,
  //           //   submitting: false,
  //           //   message: {
  //           //     to: '',
  //           //     body: ''
  //           //   }
  //           // });
  //         } else {
  //           setError(true);
  //           setSubmitting(false)
  //         }
  //       });
  //   // let phoneNumber = parsePhoneNumber(number, "US");
  //   //
  //   // if (phoneNumber) {
  //   //   axios
  //   //     .post(`${process.env.BACKEND_URL}/reminder-subscribers`, {
  //   //       number: phoneNumber.number,
  //   //       profile,
  //   //     })
  //   //     .then(() => {
  //   //       setAlert({
  //   //         text: "Successfully subscribed!",
  //   //         variant: "success",
  //   //       });
  //   //     })
  //   //     .catch((e) => {
  //   //       setAlert({
  //   //         text: e.message,
  //   //         variant: "danger",
  //   //       });
  //   //     });
  //   // } else {
  //   //   setAlert({ variant: "danger", text: "Invalid number" });
  //   // }
  // };

  const downloadQr = () => {
    axios
        .get(`${process.env.PUBLIC_URL}/api/qrcode`, {
          headers: {"Access-Control-Allow-Origin": "*"},
          params: {
            url: `${process.env.PUBLIC_URL}${router.asPath}`,
          },
          responseType: "blob",
        })
        .then(({ data }) => {
          const blob = new Blob([data], { type: "image/png" });
          const imageFile = new File([blob], `${profile.fullName}-qr.png`, {
            type: "image/png",
          });
          download(imageFile);
        })
        .catch((e) => console.log(e.message));
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
            <div onClick={downloadQr} className={styles.qr_code}>
              <Image src="/icons/qr-code.png" alt="" width={28} height={28} />
            </div>
          </Row>
          <Row className="mt-4">
            <Col md={12}>
              <SMSForm
                  profileId={profile.id}
              />

              {/*<Form>*/}
              {/*  <Form.Row className="align-items-center">*/}
              {/*    <Col md={3} sm={12}>*/}
              {/*      <Card>*/}
              {/*        <Card.Body>*/}
              {/*          <Form.Group controlId="formBasicEmail">*/}
              {/*            <Form.Label>*/}
              {/*              Subscribe for WhatsApp reminders*/}
              {/*            </Form.Label>*/}
              {/*            <Form.Control*/}
              {/*              type="tel"*/}
              {/*              name="to"*/}
              {/*              id="to"*/}
              {/*              placeholder="WhatsApp number"*/}
              {/*              value={number}*/}
              {/*              onChange={(e) => setNumber(e.target.value)}*/}
              {/*            />*/}
              {/*          </Form.Group>*/}
              {/*          <Button className="mb-2" >*/}
              {/*            Subscribe*/}
              {/*          </Button>*/}
              {/*        </Card.Body>*/}

              {/*      </Card>*/}
              {/*      {alert && (*/}
              {/*        <Alert className="mt-2" variant={alert.variant}>*/}
              {/*          {alert.text}*/}
              {/*        </Alert>*/}
              {/*      )}{" "}*/}
              {/*    </Col>*/}
              {/*  </Form.Row>*/}
              {/*</Form>*/}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={6}>
              <h2>Comments</h2>
              {commentsProcessed.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant="flush">
                {commentsProcessed.map((comment) => {
                  return (
                      <ListGroup.Item key={comment._id}>
                        <Comment
                            comment={comment}
                            setCurrentComment={setCurrentComment}
                        />
                      </ListGroup.Item>
                  );
                })}
                <ListGroup.Item>
                  <h2>Write a Comment</h2>
                  {success && (
                      <Alert variant="success">Comment added successfully</Alert>
                  )}
                  {!appState.isGuest ? (
                      <Form onSubmit={submitHandler} id="comment_form">
                        <Form.Group controlId="comment">
                          {currentComment ? (
                              <>
                                <div>
                                  <Form.Label>
                                    Replying to{" "}
                                    {
                                      comments.find(
                                          (comment) => comment.id == currentComment
                                      ).authorUser.username
                                    }
                                    <span
                                        className={styles.reply_button}
                                        onClick={() => setCurrentComment(null)}
                                    >
                                x
                              </span>{" "}
                                    :
                                  </Form.Label>
                                </div>
                              </>
                          ) : (
                              <Form.Label>Comment</Form.Label>
                          )}
                          <Form.Control
                              as="textarea"
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        {/*<Form.Group controlId="formFile" >*/}
                        {/*  <Form.Control type="file" />*/}
                        {/*</Form.Group>*/}
                        <Button type="submit" variant="primary">
                          {loading ? (
                              <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                  className="mr-1"
                              />
                          ) : null}
                          Submit
                        </Button>
                      </Form>
                  ) : (
                      <Message>
                        Please <Link href="/login">sign in</Link> to write a comment{" "}
                      </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>
  );
}

function blobToFile(theBlob, fileName) {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
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
