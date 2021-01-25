import { createContext, useContext, useState, useEffect } from "react";
import { parseCookies } from "nookies";
import { logout } from "../lib/user";
import axios from "axios";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [navigations, setNavigations] = useState([]);
  const [pominkis, setPominkis] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const { jwt } = parseCookies();

  useEffect(() => {
    if (jwt) {
      // authenticate the token on the server and place set user object
      axios
        .get(`${process.env.BACKEND_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          // if res comes back not valid, token is not valid
          // delete the token and log the user out on client
          logout(setUser);
        });
    }
  }, [jwt]);

  useEffect(() => {
    axios.get(`${process.env.BACKEND_URL}/navigations`).then(({ data }) => {
      setNavigations(data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfiles(user, setProfiles);
      fetchPominkis(user, setPominkis);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isGuest: !!!user,
        navigations,
        profiles,
        setProfiles,
        pominkis,
        setPominkis,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const fetchProfiles = (user, setProfiles) => {
  axios
    .get(`${process.env.BACKEND_URL}/profiles?createdByUser.id=${user.id}`)
    .then(({ data }) => setProfiles(data));
};

export const fetchPominkis = (user, setPominkis) => {
  axios
    .get(`${process.env.BACKEND_URL}/pominkis?createdByUser.id=${user.id}`)
    .then(({ data }) => setPominkis(data));
};

export function useAppContext() {
  return useContext(AppContext);
}
