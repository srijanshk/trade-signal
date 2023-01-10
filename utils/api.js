import apisauce from 'apisauce'
import { store } from '../redux/reducers'
import AppActions from '../redux/actions/app'

const Config = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
};

const authenticated = (api) => {
  api.setHeader('Authorization', `Bearer ${window.token || localStorage.getItem("token")}`)
  return api;
};

const naviMonitor = (response) => {
  if (response.status === 401) {
    store.dispatch(AppActions.postlogoutRequest())
  }
}

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // 50 second timeout...
    timeout: 50000,
  });

  api.addMonitor(naviMonitor)

  const postLogin = (payload) => api.post("auth/email/login", payload);
  const postRegistration = (payload) =>
    api.post("auth/email/register", payload);

  const createSignal = (payload) => authenticated(api).post("signal", payload);
  const getAllSignals = (options) =>
    authenticated(api).get("signal", { params: options });
  const getSignal = (id) => authenticated(api).get(`signal/${id}`, payload);

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
