import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer";
import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import moment from "moment";
import { parseCookies } from "nookies";
import slugify from "react-slugify";
import Select from "react-select";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const PominkisEditScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [relatedProfile, setRelatedProfile] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const { pominkis, setPominkis, user, profiles } = useAppContext();
  const pominki = pominkis.find((pominki) => pominki.id == router.query.id);
  const { jwt } = parseCookies();
  const [alert, setAlert] = useState({
    show: false,
  });
  const profileOptions = useMemo(
    () =>
      profiles.map((profile) => ({
        label: profile.fullName,
        value: profile,
      })),
    [profiles]
  );

  useEffect(() => {
    if (pominki) {
      setTitle(pominki.title || "");
      setDescription(pominki.description || "");
      setDate(pominki.date || "");
      setStartTime(pominki.startTime || "");
      setEndTime(pominki.endTime || "");
      setLocation(pominki.location || "");
      setRelatedProfile(pominki.profile || null);
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
            startTime: startTime,
            endTime: endTime,
            slug: slugify(title),
            profile: relatedProfile,
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
            startTime: startTime,
            endTime: endTime,
            profile: relatedProfile,
            slug: slugify(title),
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
              <Select
                options={profileOptions}
                placeholder="Select profile"
                onChange={({ value }) => setRelatedProfile(value)}
                defaultValue={null}
                value={
                  relatedProfile
                    ? {
                        label: relatedProfile.fullName,
                        value: relatedProfile,
                      }
                    : null
                }
              />
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
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Time End</Form.Label>
              <Form.Control
                type="time"
                placeholder="Enter Event Time End"
                value={endTime}
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
              {pominki ? "Update" : "Create"}
            </Button>
          </Form>
        </FormContainer>
      }
    </>
  );
};

export default PominkisEditScreen;
