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
  const [search, setSearch] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    axios
      .get("https://btp-necrology.herokuapp.com/profiles")
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {
    setFilteredProfiles(
      profiles.filter((profile) =>
        profile.fullName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, profiles]);

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
                <ProfileDetail key={profile._id} {...profile} />
        ))}
      </Container>
    </section>
  );
}

const ProfileDetail = (props) => {
  const { fullName, image, _id} = props;
  return (
    <Container>
      <Row className="justify-content-md-center">
          <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={image ? image.url : "https://via.placeholder.com/150.png"}
                        alt="Image"
                        style={{ objectFit: 'cover'}}
                        roundedCircle
                        width="100px"
                        height="100px"
                      />
                    </Col>
                    <Col md={6} className={styles.name}>
                    <br />
                      <Link href={`/profiles/${_id}`}>
                        {fullName}
                      </Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
    </Container>
  );
};