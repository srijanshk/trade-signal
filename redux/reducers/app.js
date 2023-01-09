import { createReducer } from "reduxsauce";
import { produce } from "immer";
import { AppTypes } from "../actions/app";
import { removeStatus } from "../../utils/utils";

const initialState = {
  status: [],
  token: "",
  user: null,
  loginError: "",
  registerError: "",
  signalError: "",
  signals: null,
  signal: null,
};

const postloginRequest = produce((draft, action) => {
  draft.status.push("pending-plr");
});
const postloginSuccess = produce((draft, action) => {
  const { token, user } = action.response;
  draft.status = removeStatus("pending-plr", draft.status);
  console.log(action);
  draft.token = token;
  draft.user = user;
  draft.loginError = "";
});
const postloginFailure = produce((draft, action) => {
  const { error } = action.error;
  draft.loginError = error;
  draft.status = removeStatus("pending-plr", draft.status);
});

const postlogoutRequest = produce((draft, action) => {
  draft.status = [];
});
const postlogoutSuccess = produce((draft, action) => {
  draft.status = [];
});
const postlogoutFailure = produce((draft, action) => {
  draft.status = [];
});

const postuserregistrationRequest = produce((draft, action) => {
  draft.registerError = "";
  draft.status.push("pending-plr");
});
const postuserregistrationSuccess = produce((draft, action) => {
  draft.registerError = "";
  draft.status = removeStatus("pending-plr", draft.status);
});
const postuserregistrationFailure = produce((draft, action) => {
  draft.registerError = action.error.error;
  draft.status = removeStatus("pending-plr", draft.status);
});

const createsignalRequest = produce((draft, action) => {
  draft.signalError = "";
  draft.status.push("pending-plr");
});
const createsignalSuccess = produce((draft, action) => {
  draft.signalError = "";
  draft.status = removeStatus("pending-plr", draft.status);
});
const createsignalFailure = produce((draft, action) => {
  draft.signalError = action.error.error;
  draft.status = removeStatus("pending-plr", draft.status);
});

const getallsignalRequest = produce((draft, action) => {
  draft.status.push("pending-plr");
});
const getallsignalSuccess = produce((draft, action) => {
  draft.signals = action.response.data;
  draft.status = removeStatus("pending-plr", draft.status);
});
const getallsignalFailure = produce((draft, action) => {
  draft.status = removeStatus("pending-plr", draft.status);
});

const getsignalRequest = produce((draft, action) => {
  draft.status.push("pending-plr");
});
const getsignalSuccess = produce((draft, action) => {
  draft.signal = action.response.data;
  draft.status = removeStatus("pending-plr", draft.status);
});
const getsignalFailure = produce((draft, action) => {
  draft.status = removeStatus("pending-plr", draft.status);
});

const clearRequest = produce((draft, action) => (draft = initialState));

export const reducer = createReducer(initialState, {
  [AppTypes.POSTLOGIN_REQUEST]: postloginRequest,
  [AppTypes.POSTLOGIN_SUCCESS]: postloginSuccess,
  [AppTypes.POSTLOGIN_FAILURE]: postloginFailure,

  [AppTypes.POSTLOGOUT_REQUEST]: postlogoutRequest,
  [AppTypes.POSTLOGOUT_SUCCESS]: postlogoutSuccess,
  [AppTypes.POSTLOGOUT_FAILURE]: postlogoutFailure,

  [AppTypes.POSTUSERREGISTRATION_REQUEST]: postuserregistrationRequest,
  [AppTypes.POSTUSERREGISTRATION_SUCCESS]: postuserregistrationSuccess,
  [AppTypes.POSTUSERREGISTRATION_FAILURE]: postuserregistrationFailure,

  [AppTypes.CREATESIGNAL_REQUEST]: createsignalRequest,
  [AppTypes.CREATESIGNAL_SUCCESS]: createsignalSuccess,
  [AppTypes.CREATESIGNAL_FAILURE]: createsignalFailure,

  [AppTypes.GETALLSIGNAL_REQUEST]: getallsignalRequest,
  [AppTypes.GETALLSIGNAL_SUCCESS]: getallsignalSuccess,
  [AppTypes.GETALLSIGNAL_FAILURE]: getallsignalFailure,

  [AppTypes.GETSIGNAL_REQUEST]: getsignalRequest,
  [AppTypes.GETSIGNAL_SUCCESS]: getsignalSuccess,
  [AppTypes.GETSIGNAL_FAILURE]: getsignalFailure,

  [AppTypes.CLEAR_REQUEST]: clearRequest,
});