import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Form, Button, Alert, Spinner, Breadcrumb } from "react-bootstrap";
import FormContainer from "../../../components/FormContainer";
import { useRouter } from "next/router";
import { useAppContext } from "../../../context/state";
import moment from "moment";
import { parseCookies } from "nookies";
import slugify from "react-slugify";
import { SET_PROFILES, UPDATE_PROFILE } from "../../../context/appReducer";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {loadStripe} from "@stripe/stripe-js/pure";
import useSWR from "swr";
import useLocalStorage from "use-local-storage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;

const ProfileEditScreen = () => {
  const [fullName, setFullName] = useState("");
  const [fullNameNative, setFullNameNative] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [deceaseDate, setDeceaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [burialPlace, setBurialPlace] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [slugLocalStorage, setSlugLocalStorage] = useLocalStorage("slug", "");
  const [idLocalStorage, setIdLocalStorage] = useLocalStorage("id", "");

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

  const handleClick = async (event) => {
    const { sessionId } = await fetch('http://localhost:3000/api/checkout/sessions',{
      method: 'POST',
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
      body: JSON.stringify({quantity: 1})
    }).then(res => res.json())

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    })
  };

  const { data, error } = useSWR(
      router.query.session_id
          ? `/api/checkout/${router.query.session_id}`
          : null,
      (url) => fetch(url).then(res => res.json())
  )

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName || "");
      setFullNameNative(profile.fullNameNative || "");
      setBirthDate(profile.birthDate || "");
      setDeceaseDate(profile.deceaseDate || "");
      setDescription(profile.description || "");
      setBurialPlace(profile.burialPlace || "");
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

  const checkSlugUnique = async (slug) => {
    const profileWithSlug = await axios.get(
      `${process.env.BACKEND_URL}/profiles?slug=${slug}`
    );

    return !profileWithSlug.data.length;
  };

  const createProfileWithImage = () => {
    const formData = new FormData();
    const data = {};
    data.fullName = fullName;
    data.fullNameNative = fullNameNative;
    data.birthDate = birthDate.length
      ? moment(birthDate).format("MMM D, yyyy")
      : "";
    data.deceaseDate = deceaseDate.length
      ? moment(deceaseDate).format("MMM D, yyyy")
      : "";
    data.description = description;
    data.burialPlace = burialPlace;
    data.slug = slug;
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
            fullNameNative,
            birthDate: birthDate.length
              ? moment(birthDate).format("MMM D, yyyy")
              : "",
            deceaseDate: deceaseDate.length
              ? moment(deceaseDate).format("MMM D, yyyy")
              : "",
            description,
            burialPlace,
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
      const isSlugUnique = await checkSlugUnique(slug);
      if (!isSlugUnique) {
        setAlert({
          show: true,
          msg: "Slug already exists! Please, change it in the form below",
          variant: "danger",
        });

        setIsLoading(false);

        return;
      }

      const formData = createProfileWithImage();


        axios
            .post(`${process.env.BACKEND_URL}/profiles`, formData, config)
            .then(({ data }) => {
              const newProfilesState = appState.profiles;
              newProfilesState.splice(0, 0, data);

              dispatch({
                type: SET_PROFILES,
                payload: { profiles: newProfilesState },
              });
              setSlugLocalStorage(data.slug);
              setIdLocalStorage(data.id)
              // router.push(`/profiles/${data.slug}`);
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



  const returnSlug = () => {
    return requeryData;
  }

  return (
    <>
      <Head>
        <title>{profile ? profile.fullName : "New Profile"}</title>
      </Head>
      {
        <FormContainer>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/account/profiles">Profiles</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
              {profile ? profile.fullName : "New Profile"}
            </Breadcrumb.Item>
          </Breadcrumb>
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
                onChange={(e) => {
                  setFullName(e.target.value);
                  setSlug(slugify(e.target.value));
                }}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Name in Native Language</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full Name in Native Language"
                value={fullNameNative}
                onChange={(e) => setFullNameNative(e.target.value)}
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
              <Form.Label>Burial Place</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Burial Place"
                value={burialPlace}
                onChange={(e) => setBurialPlace(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {alert.msg ==
              "Slug already exists! Please, change it in the form below" && (
              <Form.Group>
                <Form.Label>Slug</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

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
            <Button onClick={handleClick} type="submit" variant="primary">
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
            {/*<pre>{data ? JSON.stringify(data.session.payment_status, null, 2 ) : 'Loading...'}</pre>*/}
            {console.log(slugLocalStorage,
              idLocalStorage)}
          </Form>
        </FormContainer>
      }
    </>
  );
};

export default ProfileEditScreen;