import { createContext, useContext, useEffect, useReducer } from "react";
import { parseCookies } from "nookies";
import axios from "axios";
import {
  appReducer,
  SET_POMINKIS,
  SET_PROFILES,
  SET_NAVIGATIONS,
  SET_USER,
  LOGOUT,
  SET_LOADING,
} from "./appReducer";

const AppContext = createContext();
const initialState = {
  user: null,
  isGuest: true,
  navigations: [],
  pominkis: [],
  profiles: [],
  isLoading: false,
};

export function AppWrapper({ children }) {
  const { jwt } = parseCookies();
  const [appState, dispatch] = useReducer(appReducer, initialState);

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
          dispatch({
            type: SET_USER,
            payload: { user: data },
          });
        })
        .catch(() => {
          // if res comes back not valid, token is not valid
          // delete the token and log the user out on client
          dispatch({ type: LOGOUT });
        });
    }
  }, [jwt]);

  useEffect(() => {
    dispatch({
      type: SET_LOADING,
      payload: { isLoading: true },
    });
    axios
      .get(`${process.env.BACKEND_URL}/navigations`)
      .then(({ data }) => {
        dispatch({
          type: SET_NAVIGATIONS,
          payload: { navigations: data },
        });
        dispatch({
          type: SET_LOADING,
          payload: { isLoading: false },
        });
      })
      .catch(() => {
        dispatch({
          type: SET_LOADING,
          payload: { isLoading: false },
        });
      });
  }, []);

  useEffect(() => {
    if (appState.user) {
      fetchProfiles(appState.user, dispatch);
      fetchPominkis(appState.user, dispatch);
    }
  }, [appState.user]);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const fetchProfiles = (user, dispatch) => {
  axios
    .get(
      `${process.env.BACKEND_URL}/profiles?createdByUser.id=${user.id}&_sort=createdAt:DESC&_limit=10000`
    )
    .then(({ data }) =>
      dispatch({ type: SET_PROFILES, payload: { profiles: data } })
    );
};

export const fetchPominkis = (user, dispatch) => {
  axios
    .get(
      `${process.env.BACKEND_URL}/pominkis?createdByUser.id=${user.id}&_sort=createdAt:DESC&_limit=10000`
    )
    .then(({ data }) =>
      dispatch({ type: SET_POMINKIS, payload: { pominkis: data } })
    );
};

export function useAppContext() {
  return useContext(AppContext);
}
