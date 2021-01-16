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

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://btp-necrology.herokuapp.com/profiles")
      .then((res) => {
        setProfiles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredProfiles(
      profiles.sort((a, b) => a.fullName.localeCompare(b.fullName)),
      profiles.filter((profile) =>
        profile.fullName.toLowerCase().includes(search.toLowerCase())
      ),
    );
  }, [search, profiles]);

  if (loading) {
    return (
      <div className="text-center loader">
        <img
          src="https://btpnecrology.com/wp-content/themes/btp/assets/images/loading.gif"
          alt="loading"
          width="100px"
        />
      </div>
    );
  }

  return (
    <section className="py-5">
      <Head>
        <title>BTP Necrology | Profiles</title>
      </Head>

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
        {filteredProfiles.map((profile) => (
          <Container>
            <Row className="justify-content-md-center">
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
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
                        <Link href={`/profiles/${profile._id}`}>
                          {profile.fullName}
                        </Link>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
         ))}
      </Container>
    </section>
  );
}