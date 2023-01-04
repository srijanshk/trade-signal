import { toast } from "react-toastify";
import { call, put, select } from "redux-saga/effects";
import AppActions from "../actions/app";

export function* postloginRequest(api, action) {
  try {
    const { payload, callBack } = action
    const response = yield api.postLogin(payload)
    if (response.status === 200) {
      const { token, user } = response.data

      if (typeof window !== 'undefined') {
        window.token = token
        localStorage.setItem('token', token)
      }
      yield put(AppActions.postloginSuccess({ token, user }))
      if (callBack) yield callBack()
    } else {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      })
      yield put(AppActions.postloginFailure())
    }
  } catch (e) {
    console.log(e)
    yield put(AppActions.postloginFailure())
  }
}

export function* postlogoutRequest(api, action) {
  localStorage.removeItem('token')
  yield put(AppActions.postlogoutSuccess())
  yield put(AppActions.clearRequest())
}

export function* postuserregistrationRequest(api, action) {
  const { payload } = action

  try {
    const response = yield api.postRegistration(payload)

    if (response.ok) {
      toast.success('User Successfully Registered', {
        position: toast.POSITION.TOP_CENTER,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
      })
      yield put(AppActions.postuserregistrationSuccess())
    } else {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      })
      yield put(AppActions.postuserregistrationFailure())
    }
  } catch (e) {
    yield put(AppActions.postuserregistrationFailure())
  }
}