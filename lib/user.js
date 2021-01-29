import { destroyCookie } from "nookies";
import axios from "axios";

export const login = async (identifier, password) => {
  try {
    const { data } = await axios.post(`${process.env.BACKEND_URL}/auth/local`, {
      identifier,
      password,
    });

    return data.jwt;
  } catch (error) {
    throw new Error(error.response.data.message[0].messages[0].message);
  }
};

export const register = async (email, username, password) => {
  try {
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/auth/local/register`,
      {
        email,
        username,
        password,
      }
    );

    return data.jwt;
  } catch (error) {
    throw new Error(error.response.data.message[0].messages[0].message);
  }
};
