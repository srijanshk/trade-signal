import { createReducer } from "reduxsauce";
import { produce } from "immer";
import { AppTypes } from "../actions/app";
import { removeStatus } from "../../utils/utils";

const initialState = {
  status: [],
  token: '',
  user: null,
  loginError: "",
  registerError: ""
};

const postloginRequest = produce((draft, action) => {
  draft.status.push('pending-plr')
})
const postloginSuccess = produce((draft, action) => {
  const { token, user } = action.response
  draft.status = removeStatus('pending-plr', draft.status)
  console.log(action)
  draft.token = token
  draft.user = user
  draft.loginError = ""
})
const postloginFailure = produce((draft, action) => {
  const { error } = action.response
  draft.loginError = error
  draft.status = removeStatus('pending-plr', draft.status)
})

const postlogoutRequest = produce((draft, action) => {
  draft.status = []
})
const postlogoutSuccess = produce((draft, action) => {
  draft.status = []
})
const postlogoutFailure = produce((draft, action) => {
  draft.status = []
})

const postuserregistrationRequest = produce((draft, action) => {
  draft.status.push('pending-plr')
})
const postuserregistrationSuccess = produce((draft, action) => {
  draft.registerError = ""
  draft.status = removeStatus('pending-plr', draft.status)
})
const postuserregistrationFailure = produce((draft, action) => {
  draft.registerError = action.response.error
  draft.status = removeStatus('pending-plr', draft.status)
})

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

  [AppTypes.CLEAR_REQUEST]: clearRequest,
});