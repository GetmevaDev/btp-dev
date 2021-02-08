import React, { useState, useEffect } from "react";
import Link from "next/link";
import Pagination from "react-js-pagination";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
import { useAppContext } from "../../context/state";
import axios from "axios";
import { parseCookies } from "nookies";
import { DELETE_PROFILE } from "../../context/appReducer";

const ProfileListScreen = () => {
  const [search, setSearch] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const profilesPerPage = 10;
  const [activePage, setCurrentPage] = useState(1);

  const { appState, dispatch } = useAppContext();
  const { jwt } = parseCookies();

  useEffect(() => {
    if (appState.profiles)
      setFilteredProfiles(
        appState.profiles.filter((profile) =>
          profile.fullName.toLowerCase().includes(search.toLowerCase())
        )
      );
  }, [search, appState.profiles]);

  const indexOfLastProfile = activePage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <>
      <Head>
        <title>{`BTP Necrology | My Profiles`}</title>
      </Head>
      <Container className="py-3">
        <Row className="align-items-center">
          <Col>
            <h2>Profiles</h2>
          </Col>
          <Col className="text-right">
            <Form>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
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
              {filteredProfiles
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
          <div className="pagination">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={activePage}
              itemsCountPerPage={10}
              totalItemsCount={appState.profiles.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            />
          </div>
        </>
      </Container>
    </>
  );
};

export default ProfileListScreen;
