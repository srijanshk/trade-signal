import { call, put, select } from "redux-saga/effects";
import AppActions from "../actions/app";

export function* postloginRequest(api, action) {
  try {
    const { payload, route } = action;
    const response = {
      ok: true,
      data: {
        data: {
          tokenData: {
            accessToken: "rwqreqdasdqwdqwdwqewqddwqdwqedqw",
          },
        },
      },
    };

    if (response.ok) {
      const { data } = response.data;
      const token = data.tokenData.accessToken;

      window.token = token;
      yield put(AppActions.postloginSuccess({ data, token }));
    } else {
      yield put(AppActions.postloginFailure());
    }
  } catch (e) {
    yield put(AppActions.postloginFailure());
  }
}