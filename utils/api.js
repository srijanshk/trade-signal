import axios from "axios";

const Config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
};

const authenticated = (api) => {
  api.setHeader("Authorization", window.token);
  return api;
};

const create = (baseURL = Config.API_URL) => {
  const api = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // 50 second timeout...
    timeout: 50000,
  });

  const formdataApi = axios.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      apikeyid: Config.api_key_id,
    },
    // 50 second timeout...
    timeout: 50000,
  });

  const postLogin = (payload) => api.post("auth/email/login", payload);
  const postRegistration = (payload) => api.post("auth/email/register", payload)

  return {
    postLogin,
    postRegistration
  };
};

export default {
  create,
};
