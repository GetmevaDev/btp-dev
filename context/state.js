// src/context/state.js
import { createContext, useContext, useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { logout } from "../lib/user";
import axios from "axios";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [navigations, setNavigations] = useState([]);
  const { jwt } = parseCookies();

  useEffect(() => {
    if (jwt) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          logout(setUser);
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
    }
  }, [jwt]);

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/navigations`).then(({ data }) => {
      setNavigations(data);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isGuest: !!!user,
        navigations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
