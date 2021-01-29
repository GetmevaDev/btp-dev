import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { Alert } from "react-bootstrap";
import { useAppContext } from "../../../context/state";
import axios from "axios";
import { SET_USER } from "../../../context/appReducer";

const Redirect = () => {
  const router = useRouter();
  const { dispatch } = useAppContext();
  const { access_token } = router.query;
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (access_token) {
      axios(
        `${process.env.BACKEND_URL}/auth/facebook/callback?access_token=${access_token}`
      )
        .then(({ data }) => {
          setCookie(null, "jwt", data.jwt, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });

          dispatch({
            type: SET_USER,
            payload: { user: data.user },
          });

          router.push("/");
        })
        .catch((e) => {
          setAlert(e.message);
        });
    }
  }, [access_token]);

  if (alert) {
    return <Alert variant="danger">{alert}</Alert>;
  }

  return <Loader />;
};

export default Redirect;
