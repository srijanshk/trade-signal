import { takeEvery, takeLatest, all } from 'redux-saga/effects'
import API from '../../utils/api'
import {
postloginRequest
} from './app'
import { AppTypes } from '../actions/app'


const api = API.create()
export default function* root() {
  yield all([
    takeLatest(AppTypes.POSTLOGIN_REQUEST, postloginRequest, api),
  ])
}