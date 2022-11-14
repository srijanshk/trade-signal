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
  postloginRequest: ["payload"],
  postloginSuccess: ["response"],
  postloginFailure: null,

  // Clear all caches
  clearRequest: null,
});

export const AppTypes = Types;
export default Creators;