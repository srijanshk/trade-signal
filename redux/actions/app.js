import { createActions } from "reduxsauce";
/*
 * Way of Writing Actions
 * Must have three actions request, success, failure
 * staring with get, post, edit, delete
 * followed by functionality like login, logout, productlist
 * followed by Request, Success and Failure
 * payload must only contain that is sent to server, beside that keep other variable separated
 */
const { Types, Creators } = createActions({
  postloginRequest: ['payload', 'callBack'],
  postloginSuccess: ['response'],
  postloginFailure: ['response'],

  postlogoutRequest: null,
  postlogoutSuccess: null,
  postlogoutFailure: null,

  postuserregistrationRequest: ['payload', 'callBack'],
  postuserregistrationSuccess: ['response'],
  postuserregistrationFailure: ['response'],

  // Clear all caches
  clearRequest: null,
});

export const AppTypes = Types;
export default Creators;