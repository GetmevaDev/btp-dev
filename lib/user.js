import { destroyCookie } from "nookies";
import { sendData } from "./api";

export const login = async (identifier, password) => {
  sendData(`${process.env.BACKEND_URL}/auth/local`, {
    identifier,
    password,
  })
    .then(({ jwt }) => {
      setCookie(null, "jwt", jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return true;
    })
    .catch((e) => e.message);
};

export const logout = (setUser) => {
  destroyCookie(null, "jwt");
  setUser(null);
};
