import { call, put, select } from "redux-saga/effects";
import AppActions from "../actions/app";

export function* postloginRequest(api, action) {
  try {
    const { payload, callBack } = action;
    const response = yield api.postLogin(payload);
    if (response.status === 200) {
      const { token, user } = response.data;

      if (typeof window !== "undefined") {
        window.token = token;
        localStorage.setItem("token", token);
      }
      yield put(AppActions.postloginSuccess({ token, user }));
      if (callBack) yield callBack();
    } else {
      yield put(AppActions.postloginFailure({ error: response.data.error }));
    }
  } catch (e) {
    yield put(AppActions.postloginFailure({ error: e.response.data.error }));
  }
}

export function* postlogoutRequest(api, action) {
  localStorage.removeItem("token");
  yield put(AppActions.postlogoutSuccess());
  yield put(AppActions.clearRequest());
}

export function* postuserregistrationRequest(api, action) {
  const { payload, callBack } = action;

  try {
    const response = yield api.postRegistration(payload);

    if (response.status === 201) {
      yield put(AppActions.postuserregistrationSuccess());
      if (callBack) yield callBack();
    } else {
      yield put(
        AppActions.postuserregistrationFailure({ error: response.data.error })
      );
    }
  } catch (e) {
    yield put(
      AppActions.postuserregistrationFailure({ error: e.response.data.error })
    );
  }
}
