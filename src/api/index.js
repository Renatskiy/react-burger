import { URL } from "../lib/constants";
export const fetchRequest = async (api) => {
    const url = `${URL}${api}`;
    return await fetch(url).then(checkResponse);
  },
  fetchPost = async (api, body) => {
    const url = `${URL}${api}`;
    return await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: body,
      }),
    }).then(checkResponse);
  };

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};