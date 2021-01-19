export const getResource = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Could not fetch" + url + ", received" + res.status);
  }
  return await res.json();
};

export const sendData = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let resJson = await res.json();
    throw new Error(resJson.message[0].messages[0].message);
  }
  return await res.json();
};
