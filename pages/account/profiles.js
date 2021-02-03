import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/Account.module.css";
import {
  Container,
  Table,
  Button,
  Row,
  Col,
  Pagination,
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
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

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

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(appState.profiles.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
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
              .slice(indexOfFirstItem, indexOfLastItem)

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
        <Pagination size="lg" className={styles.pagination}>
          <Pagination.Prev
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          />
          <Pagination.Item>{renderPageNumbers}</Pagination.Item>
          <Pagination.Next
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          />
        </Pagination>
      </>
    </Container>
  );
};

export default ProfileListScreen;
