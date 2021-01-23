import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import Loader from "../../../components/Loader";
import FormContainer from "../../../components/FormContainer";
import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import moment from "moment";
import { parseCookies } from "nookies";
import slugify from "react-slugify";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const ProfileEditScreen = () => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deceaseDate, setDeceaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { profiles, setProfiles, user } = useAppContext();
  const profile = profiles.find((profile) => profile.id == router.query.id);
  const { jwt } = parseCookies();
  const [alert, setAlert] = useState({
    show: false,
  });

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setBirthDate(profile.birthDate || "");
      setDeceaseDate(profile.deceaseDate || "");
      setDescription(profile.description || "");
    }
  }, [profile]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    //If profile exists update if not create
    if (profile) {
      axios
        .put(
          `${process.env.BACKEND_URL}/profiles/${profile.id}`,
          {
            fullName,
            birthDate: moment(birthDate).format("MMM D, yyyy"),
            deceaseDate: moment(deceaseDate).format("MMM D, yyyy"),
            description,
            slug: slugify(fullName),
            createdByUser: user,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then(({ data }) => {
          const updatedProfiles = profiles.map((el) => {
            if (el.id == data.id) {
              return data;
            } else {
              return el;
            }
          });
          setProfiles(updatedProfiles);

          setAlert({
            show: true,
            msg: "Profile updated",
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
          `${process.env.BACKEND_URL}/profiles`,
          {
            fullName,
            birthDate: moment(birthDate).format("MMM D, yyyy"),
            deceaseDate: moment(deceaseDate).format("MMM D, yyyy"),
            description,
            slug: slugify(fullName),
            createdByUser: user,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then(({ data }) => {
          setProfiles([...profiles, data]);
          router.push(`/profiles/${data.slug}`);
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

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.BACKEND_URL}`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      {
        <FormContainer>
          {alert.show && <Alert variant={alert.variant}>{alert.msg}</Alert>}
          <h2>{profile ? `Edit Profile: ${fullName}` : `New Profile`}</h2>
          <Form className="mt-4" onSubmit={handleFormSubmit}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Birth Date"
                value={moment(birthDate).format("YYYY-MM-DD")}
                onChange={(e) => setBirthDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Decease Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter Decease Date"
                value={moment(deceaseDate).format("YYYY-MM-DD")}
                onChange={(e) => setDeceaseDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <ReactQuill
                value={description}
                onChange={(value) => setDescription(value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>
            <Button type="submit" variant="primary">
              {profile ? "Update" : "New"}
            </Button>
          </Form>
        </FormContainer>
      }
    </>
  );
};

export default ProfileEditScreen;
