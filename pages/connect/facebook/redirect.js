import React, { useEffect } from "react";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { Alert } from "react-bootstrap";
import { useAppContext } from "../../../context/state";
import axios from "axios";

const Redirect = ({ jwt, user, error }) => {
  const router = useRouter();
  const { setUser } = useAppContext();

  useEffect(() => {
    if (jwt) {
      setCookie(null, "jwt", jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      setUser(user);
      router.push("/");
    }
  }, [jwt, error]);

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }
  return <Loader />;
};

Redirect.getInitialProps = async ({ query }) => {
  try {
    const res = await axios(
      `${process.env.BACKEND_URL}/auth/facebook/callback?access_token=${query.access_token}`
    );
    const { jwt, user } = await res;

    return { jwt, user, error: null };
  } catch (e) {
    return { jwt: null, user: null, error: e.message };
  }
};

export default Redirect;
