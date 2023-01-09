import { takeEvery, takeLatest, all } from "redux-saga/effects";
import API from "../../utils/api";
import {
  createsignalRequest,
  getallsignalRequest,
  getsignalRequest,
  postloginRequest,
  postlogoutRequest,
  postuserregistrationRequest,
} from "./app";
import { AppTypes } from "../actions/app";

const api = API.create();
export default function* root() {
  yield all([
    takeLatest(AppTypes.POSTLOGIN_REQUEST, postloginRequest, api),
    takeLatest(AppTypes.POSTLOGOUT_REQUEST, postlogoutRequest, api),
    takeLatest(
      AppTypes.POSTUSERREGISTRATION_REQUEST,
      postuserregistrationRequest,
      api
    ),
    takeLatest(AppTypes.CREATESIGNAL_REQUEST, createsignalRequest, api),
    takeLatest(AppTypes.GETALLSIGNAL_REQUEST, getallsignalRequest, api),
    takeLatest(AppTypes.GETSIGNAL_REQUEST, getsignalRequest, api),
  ]);
}
