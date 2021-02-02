import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../context/state";
import axios from "axios";
import { parseCookies } from "nookies";
import { DELETE_PROFILE } from "../../context/appReducer";
import Pagination from "../../components/Pagination";

const ProfileListScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(10);
  const { appState, dispatch } = useAppContext();
  const { jwt } = parseCookies();

  const handleDelete = (profile) => {
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    if (profile.image) {
      axios.delete(
        `${process.env.BACKEND_URL}/upload/files/${profile.image.id}`,
        config
      );
    }

    axios
      .delete(`${process.env.BACKEND_URL}/profiles/${profile.id}`, config)
      .then(() => {
        dispatch({
          type: DELETE_PROFILE,
          payload: { profileId: profile.id },
        });
      });
  };

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <th>Date of Birth</th>
              <th>Date of Passing</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appState.profiles
              .slice(indexOfFirstProfile, indexOfLastProfile)
              .map((profile) => (
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
                      onClick={() => handleDelete(profile)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Pagination
          profilesPerPage={profilesPerPage}
          totalProfiles={appState.profiles.length}
          paginate={paginate}
        />
      </>
    </Container>
  );
};

export default ProfileListScreen;
