import React from "react";

const Redirect = ({ stars, query }) => {
  console.log(stars);
  return <div></div>;
};

Redirect.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `${process.env.BACKEND_URL}/auth/facebook/callback?access_token=${query.access_token}`
  );
  const json = await res.json();
  return { stars: json, query: query };
};

export default Redirect;
