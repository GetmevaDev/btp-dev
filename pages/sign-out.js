import React, { useEffect } from "react";
import { useAppContext } from "../context/state";
import { logout } from "../lib/user";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import { LOGOUT } from "../context/appReducer";

const SignOut = () => {
  const { appState, dispatch } = useAppContext();

  const router = useRouter();

  useEffect(() => {
    if (!appState.isGuest) {
      dispatch({
        type: LOGOUT,
      });
      router.push("/");
    }
  });

  return <Loader />;
};

export default SignOut;
