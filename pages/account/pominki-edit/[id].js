import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer";
import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import moment from "moment";
import { parseCookies } from "nookies";
import slugify from "react-slugify";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const PominkisEditScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [relatedProfileName, setRelatedProfileName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const { pominkis, setPominkis, user, profiles, setProfiles } = useAppContext();
  const pominki = pominkis.find((pominki) => pominki.id == router.query.id);
  const { jwt } = parseCookies();
  const [alert, setAlert] = useState({
    show: false,
  });

  useEffect(() => {
    if (pominki) {
      setTitle(pominki.title || "");
      setDescription(pominki.description || "");
      setDate(pominki.date || "");
      setStartTime(pominki.startTime || "");
      setEndTime(pominki.endTime || "");
      setLocation(pominki.location|| "");
    }
  }, [pominki]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //If pominki exists update if not create
    if (pominki) {
      axios
        .put(
          `${process.env.BACKEND_URL}/pominkis/${pominki.id}`,
          {
            title,
            description,
            date: moment(date).format("MMM D, yyyy"),
            startTime: moment(startTime).format("HH:mm"),
            endTime: moment(endTime).format("HH:mm"),
            slug: slugify(title)
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then(({ data }) => {
          const updatedPominkis = pominkis.map((el) => {
            if (el.id == data.id) {
              return data;
            } else {
              return el;
            }
          });
          setPominkis(updatedPominkis);

          setAlert({
            show: true,
            msg: "Pominki updated",
            variant: "success",
          });
        })
        .catch((e) =>
          setAlert({
            show: true,
            msg: e.message,
            variant: "danger",
          })
        );
    } else {
      axios
        .post(
          `${process.env.BACKEND_URL}/pominkis`,
          {
            title,
            description,
            date: moment(date).format("MMM D, yyyy"),
            startTime: moment(startTime).format("HH:mm"),
            endTime: moment(endTime).format("HH:mm"),
            slug: slugify(title)
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then(() => {
          setPominkis([...pominkis]);
          router.push(`/account/pominkis`);
        })
        .catch((e) =>
          setAlert({
            show: true,
            msg: e.message,
            variant: "danger",
          })
        );
    }
  };

  return (
    <>
      {
        <FormContainer>
          {alert.show && <Alert variant={alert.variant}>{alert.msg}</Alert>}
          <h2>{pominki ? `Edit Pominki: ${title}` : `New Pominki`}</h2>

          <Form onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Related Profile Name</Form.Label>
              <Form.Control
                as="select"
                placeholder="Enter Related Profile Name"
                value={relatedProfileName}
                onChange={(e) => setRelatedProfileName(e.target.value)}
              ><option>Azamat</option></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Event Date"
                value={moment(date).format("YYYY-MM-DD")}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Time Start</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Event Time Start"
                value={moment(startTime).format("HH:mm")}
                onChange={(e) => setStartTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Time End</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Event Time End"
                value={moment(endTime).format("HH:mm")}
                onChange={(e) => setEndTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="location"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
            {pominki ? "Update" : "New"}
            </Button>
          </Form>
        </FormContainer>
      }
    </>
  );
};

export default PominkisEditScreen;
