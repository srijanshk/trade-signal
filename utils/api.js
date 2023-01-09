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

  const postLogin = (payload) => api.post("auth/email/login", payload);
  const postRegistration = (payload) =>
    api.post("auth/email/register", payload);

  const createSignal = (payload) => api.post("signal", payload);
  const getAllSignals = (options) => api.get("signal", { params: options });
  const getSignal = (id) => api.get(`signal/${id}`, payload);

  return {
    postLogin,
    postRegistration,
    createSignal,
    getAllSignals,
    getSignal,
  };
};

export default {
  create,
};
