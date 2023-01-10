import { toast } from "react-toastify";
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
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
      });
      yield put(AppActions.postloginFailure({ error: response.data.error }));
    }
  } catch (e) {
    toast.error(e.response.data.error, {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
    });
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
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
      });
      yield put(
        AppActions.postuserregistrationFailure({ error: response.data.error })
      );
    }
  } catch (e) {
    toast.error(e.response.data.error, {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
    });
    yield put(
      AppActions.postuserregistrationFailure({ error: e.response.data.error })
    );
  }
}

export function* createsignalRequest(api, action) {
  const { payload, callBack } = action;

  try {
    const response = yield api.createSignal(payload);

    if (response.status === 201) {
      yield put(AppActions.createsignalSuccess());
      if (callBack) yield callBack();
    } else {
      toast.error(response.error, {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
      });
      yield put(AppActions.createsignalFailure({ error: response.error }));
    }
  } catch (e) {
    console.log(e)
    // toast.error(e.response.error, {
    //   position: toast.POSITION.TOP_RIGHT,
    //   pauseOnFocusLoss: false,
    //   hideProgressBar: true,
    // });
    yield put(AppActions.createsignalFailure({ error: e.response.error }));
  }
}

export function* getallsignalRequest(api, action) {
  const { options } = action;

  try {
    const response = yield api.getAllSignals(options);

    if (response.status === 200) {
      yield put(AppActions.getallsignalSuccess(response.data));
    } else {
      toast.error(response.error, {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
      });
      yield put(AppActions.getallsignalFailure());
    }
  } catch (e) {
    toast.error(e.response.error, {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
    });
    yield put(AppActions.getallsignalFailure());
  }
}

export function* getsignalRequest(api, action) {
  const { id } = action;

  try {
    const response = yield api.getSignal(id);

    if (response.status === 200) {
      yield put(AppActions.getsignalSuccess(response.data));
    } else {
      toast.error(response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnFocusLoss: false,
        hideProgressBar: true,
      });
      yield put(AppActions.getsignalFailure());
    }
  } catch (e) {
    toast.error(e.response.data.error, {
      position: toast.POSITION.TOP_RIGHT,
      pauseOnFocusLoss: false,
      hideProgressBar: true,
    });
    yield put(AppActions.getsignalFailure());
  }
}
