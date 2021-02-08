import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner, Breadcrumb } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer";
import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import moment from "moment";
import { parseCookies, setCookie } from "nookies";
import Select from "react-select";
import { SET_POMINKIS, UPDATE_POMINKI } from "../../../context/appReducer";
import Link from "next/link";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const PominkisEditScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [relatedProfile, setRelatedProfile] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [memorialType, setMemorialType] = useState("sevenday");
  const [contactInfo, setContactInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { appState, dispatch } = useAppContext();
  const pominki = appState.pominkis.find(
    (pominki) => pominki.id == router.query.id
  );
  const { jwt } = parseCookies();
  const [alert, setAlert] = useState({
    show: false,
  });
  const profileOptions = useMemo(
    () =>
      appState.profiles.map((profile) => ({
        label: profile.fullName,
        value: profile,
      })),
    [appState.profiles]
  );
  const memorialTypeOptions = [
    { label: "7 day", value: "sevenday" },
    { label: "30 day", value: "thirtyday" },
    { label: "1 year", value: "oneyear" },
  ];

  useEffect(() => {
    if (pominki) {
      setTitle(pominki.title || "");
      setDescription(pominki.description || "");
      setDate(pominki.date || "");
      setStartTime(pominki.startTime || "");
      setEndTime(pominki.endTime || "");
      setLocation(pominki.location || "");
      setRelatedProfile(pominki.profile || null);
      setMemorialType(pominki.memorialType || "sevenday");
      setContactInfo(pominki.contactInfo || "");
    }
  }, [pominki]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!relatedProfile) {
      setAlert({
        show: true,
        msg: "You must select a profile!",
        variant: "danger",
      });
      return;
    }

    setIsLoading(true);
    //If pominki exists update if not create
    if (pominki) {
      axios
        .put(
          `${process.env.BACKEND_URL}/pominkis/${pominki.id}`,
          {
            title,
            description,
            date: date.length ? moment(date).format("MMM D, yyyy") : "",
            startTime: startTime,
            endTime: endTime,
            profile: relatedProfile,
            location: location,
            memorialType: memorialType,
            contactInfo: contactInfo,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then(({ data }) => {
          dispatch({
            type: UPDATE_POMINKI,
            payload: { pominki: data },
          });
          setIsLoading(false);

          setAlert({
            show: true,
            msg: "Pominki updated",
            variant: "success",
          });
        })
        .catch((e) => {
          setIsLoading(false);
          setAlert({
            show: true,
            msg: e.message,
            variant: "danger",
          });
        });
    } else {
      axios
        .post(
          `${process.env.BACKEND_URL}/pominkis`,
          {
            title,
            description,
            date: date.length ? moment(date).format("MMM D, yyyy") : "",
            startTime: startTime,
            endTime: endTime,
            profile: relatedProfile,
            location: location,
            memorialType: memorialType,
            contactInfo: contactInfo,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then(({ data }) => {
          dispatch({
            type: SET_POMINKIS,
            payload: { pominkis: [...appState.pominkis, data] },
          });
          setIsLoading(false);
          router.push(`/account/pominki`);
        })
        .catch((e) => {
          setIsLoading(false);
          setAlert({
            show: true,
            msg: e.message,
            variant: "danger",
          });
        });
    }
  };

  return (
    <>
      {
        <FormContainer>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/account/pominki">Pominkis</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {pominki ? pominki.title : "New Pominki"}
            </Breadcrumb.Item>
          </Breadcrumb>
          {alert.show && <Alert variant={alert.variant}>{alert.msg}</Alert>}
          <h2>{pominki ? `Edit Pominki: ${pominki.title}` : `New Pominki`}</h2>

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
              <Form.Label>Memorial Type</Form.Label>
              <Select
                options={memorialTypeOptions}
                placeholder="Select memorial type"
                onChange={({ value }) => setMemorialType(value)}
                defaultValue={null}
                value={
                  memorialType
                    ? memorialTypeOptions.find(
                        (option) => option.value == memorialType
                      )
                    : null
                }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Related Profile</Form.Label>
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
              <Form.Label>Contact Info</Form.Label>
              <Form.Control
                type="title"
                placeholder="Enter Contact Info"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
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
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
              {pominki ? " Update" : " Create"}{" "}
            </Button>
          </Form>
        </FormContainer>
      }
    </>
  );
};

export default PominkisEditScreen;
