import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer";
import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import moment from "moment";
import { parseCookies } from "nookies";
import slugify from "react-slugify";
import { SET_PROFILES, UPDATE_PROFILE } from "../../../context/appReducer";
import Image from "next/image";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const ProfileEditScreen = () => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deceaseDate, setDeceaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { appState, dispatch } = useAppContext();
  const profile = appState.profiles.find(
    (profile) => profile.id == router.query.id
  );
  const { jwt } = parseCookies();
  const [alert, setAlert] = useState({
    show: false,
  });
  const formRef = React.useRef();

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setBirthDate(profile.birthDate || "");
      setDeceaseDate(profile.deceaseDate || "");
      setDescription(profile.description || "");
      setImage(profile.image || null);
    }
  }, [profile]);

  const valiadateImage = () => {
    if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setAlert({
        show: true,
        msg: "Invalid image format",
        variant: "danger",
      });

      setIsLoading(false);

      return;
    }
  };

  const updateImage = async (config) => {
    if (image && !image.url) {
      valiadateImage();

      const formData = new FormData();
      formData.append("files", image);
      formData.append("ref", "profile");
      formData.append("refId", profile.id);
      formData.append("field", "image");

      await axios
        .post(`${process.env.BACKEND_URL}/upload`, formData, config)
        .then(() => {
          if (profile.image) {
            axios.delete(
              `${process.env.BACKEND_URL}/upload/files/${profile.image.id}`,
              config
            );
          }
        })
        .catch((e) => {
          setAlert({
            show: true,
            msg: e.message,
            variant: "success",
          });
        });

      return;
    } else if (profile.image) {
      await axios.delete(
        `${process.env.BACKEND_URL}/upload/files/${profile.image.id}`,
        config
      );
    }
  };

  const createProfileWithImage = () => {
    const formData = new FormData();
    const data = {};
    data.fullName = fullName;
    data.birthDate = birthDate.length
      ? moment(birthDate).format("MMM D, yyyy")
      : "";
    data.deceaseDate = deceaseDate.length
      ? moment(deceaseDate).format("MMM D, yyyy")
      : "";
    data.description = description;
    data.slug = slugify(fullName);
    formData.append("data", JSON.stringify(data));

    if (image) {
      valiadateImage();
      formData.append("files.image", image, image.name);
    }

    return formData;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    //If profile exists update if not create
    if (profile) {
      await updateImage(config);

      axios
        .put(
          `${process.env.BACKEND_URL}/profiles/${profile.id}`,
          {
            fullName,
            birthDate: birthDate.length
              ? moment(birthDate).format("MMM D, yyyy")
              : "",
            deceaseDate: deceaseDate.length
              ? moment(deceaseDate).format("MMM D, yyyy")
              : "",
            description,
            slug: slugify(fullName),
          },
          config
        )
        .then(({ data }) => {
          dispatch({
            type: UPDATE_PROFILE,
            payload: { profile: data },
          });

          setIsLoading(false);
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
      const formData = createProfileWithImage();

      axios
        .post(`${process.env.BACKEND_URL}/profiles`, formData, config)
        .then(({ data }) => {
          dispatch({
            type: SET_PROFILES,
            payload: { profiles: [...appState.profiles, data] },
          });
          router.push(`/profiles/${data.slug}`);
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
          {alert.show && <Alert variant={alert.variant}>{alert.msg}</Alert>}
          <h2>
            {profile ? `Edit Profile: ${profile.fullName}` : `New Profile`}
          </h2>
          <Form
            className="mt-4"
            onSubmit={handleFormSubmit}
            ref={formRef}
            encType="multipart/form-data"
          >
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
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the Date of Birth"
                value={moment(birthDate).format("YYYY-MM-DD")}
                onChange={(e) => setBirthDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Date of Passing</Form.Label>
              <Form.Control
                type="date"
                placeholder="Enter the date of passing"
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
              {image && image.url ? (
                <>
                  <br />
                  <Image
                    src={image.url}
                    alt="Picture of the profile"
                    width={200}
                    height={200}
                  />
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setImage(null)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </>
              ) : (
                <Form.File
                  id="image-file"
                  label={image ? image.name : "Choose File"}
                  custom
                  onChange={(e) => setImage(e.target.files[0])}
                  //onChange={uploadFileHandler}
                ></Form.File>
              )}
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
              {profile ? " Update" : " Create"}
            </Button>
          </Form>
        </FormContainer>
      }
    </>
  );
};

export default ProfileEditScreen;
