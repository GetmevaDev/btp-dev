import React from "react";
import Link from "next/link";
import { Container, Table, Button, Row, Col } from "react-bootstrap";
import { useAppContext } from "../../context/state";
import axios from "axios";
import { parseCookies } from "nookies";
import { DELETE_POMINKI } from "../../context/appReducer";

const PominkisListScreen = () => {
  const { appState, dispatch } = useAppContext();
  const { jwt } = parseCookies();

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.BACKEND_URL}/pominkis/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(() => {
        dispatch({
          type: DELETE_POMINKI,
          payload: { pominkiId: id },
        });
      });
  };

  return (
    <Container className="py-3">
      <Row className="align-items-center">
        <Col>
          <h2>Pominki</h2>
        </Col>
        <Col className="text-right">
          <Link href="/account/pominki-edit/new">
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Pominki
            </Button>
          </Link>
        </Col>
      </Row>
      <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Profile</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appState.pominkis.map((pominki) => (
              <tr key={pominki.id}>
                <td>{pominki.title}</td>
                <td>{pominki.profile.fullName}</td>
                <td>{pominki.date}</td>
                <td>{pominki.startTime}</td>
                <td>{pominki.endTime}</td>
                <td>{pominki.location}</td>
                <td>
                  <Link href={`/account/pominki-edit/${pominki.id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(pominki.id)}
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

export default PominkisListScreen;
