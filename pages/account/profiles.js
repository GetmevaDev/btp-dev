import React from "react";
import Link from "next/link";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../context/state";
import axios from "axios";
import { parseCookies } from "nookies";

const ProfileListScreen = () => {
  const { profiles, setProfiles } = useAppContext();
  const { jwt } = parseCookies();

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.BACKEND_URL}/profiles/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(() => {
        setProfiles(profiles.filter((profile) => profile.id != id));
      });
  };

  return (
    <Container className="py-3">
      <Row className="align-items-center">
        <Col>
          <h2>Profiles</h2>
        </Col>
        <Col className="text-right">
          <Link href="/account/profile-edit/new">
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Profile
            </Button>
          </Link>
        </Col>
      </Row>
      <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth date</th>
              <th>Decease date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.fullName}</td>
                <td>{profile.birthDate}</td>
                <td>{profile.deceaseDate}</td>
                <td>
                  <Link href={`/account/profile-edit/${profile.id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(profile.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    </Container>
  );
};

export default ProfileListScreen;
