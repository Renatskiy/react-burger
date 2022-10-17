import { URL } from "../lib/constants";
export const fetchRequest = async (api) => {
  const url = `${URL}${api}`;
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response.status);
    })
    .catch((error) => console.error(error));
};
