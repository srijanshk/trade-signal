import { createReducer } from "reduxsauce";
import { produce } from "immer";
import { AppTypes } from "../actions/app";

const initialState = {
  status: [],
  token: ''
};

const postloginRequest = produce((draft, action) => {
  draft.status.push("pending-plr");
});
const postloginSuccess = produce((draft, action) => {
  draft.status = removeStatus("pending-alg", draft.status);
});
const postloginFailure = produce((draft, action) => {
  draft.status = removeStatus("pending-alg", draft.status);
});

const clearRequest = produce((draft, action) => (draft = initialState));

export const reducer = createReducer(initialState, {
  [AppTypes.POSTLOGIN_REQUEST]: postloginRequest,
  [AppTypes.POSTLOGIN_SUCCESS]: postloginSuccess,
  [AppTypes.POSTLOGIN_FAILURE]: postloginFailure,

  [AppTypes.CLEAR_REQUEST]: clearRequest,
});