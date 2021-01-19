import React, { useEffect } from "react";
import { useAppContext } from "../context/state";
import { logout } from "../lib/user";
import { useRouter } from "next/router";
import Loader from "../components/Loader";

const SignOut = () => {
  const { isGuest, setUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isGuest) {
      logout(setUser);
      router.push("/");
    }
  });

  return <Loader />;
};

export default SignOut;
