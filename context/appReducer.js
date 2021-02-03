export const SET_POMINKIS = "SET_POMINKIS";
export const SET_PROFILES = "SET_PROFILES";
export const SET_NAVIGATIONS = "SET_NAVIGATIONS";
export const SET_USER = "SET_USER";
export const UPDATE_POMINKI = "UPDATE_POMINKI";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const DELETE_POMINKI = "DELETE_POMINKI";
export const DELETE_PROFILE = "DELETE_PROFILE";
export const LOGOUT = "LOGOUT";
import { destroyCookie } from "nookies";

const updatePominki = (pominki, pominkis) => {
  const updatedPominkis = pominkis.map((el) => {
    if (el.id == pominki.id) {
      return pominki;
    } else {
      return el;
    }
  });

  return updatedPominkis;
};

const updateProfile = (profile, profiles) => {
  const updatedPominkis = profiles.map((el) => {
    if (el.id == profile.id) {
      return profile;
    } else {
      return el;
    }
  });

  return updatedPominkis;
};

const deleteProfile = (profileId, profiles) => {
  return profiles.filter((profile) => profile.id !== profileId);
};

const deletePominki = (pominkiId, pominkis) => {
  return pominkis.filter((pominki) => pominki.id !== pominkiId);
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case SET_POMINKIS:
      return { ...state, pominkis: action.payload.pominkis };
    case SET_PROFILES: {
      return { ...state, profiles: action.payload.profiles };
    }
    case SET_NAVIGATIONS:
      return { ...state, navigations: action.payload.navigations };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        isGuest: !!!action.payload.user,
      };
    case UPDATE_POMINKI:
      return {
        ...state,
        pominkis: updatePominki(action.payload.pominki, state.pominkis),
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profiles: updateProfile(action.payload.profile, state.profiles),
      };
    case DELETE_POMINKI:
      return {
        ...state,
        pominkis: deletePominki(action.payload.pominkiId, state.pominkis),
      };
    case DELETE_PROFILE:
      console.log("here");
      return {
        ...state,
        profiles: deleteProfile(action.payload.profileId, state.profiles),
      };
    case LOGOUT:
      destroyCookie(null, "jwt");
      return { ...state, user: null, isGuest: true };
    default:
      return;
  }
};
