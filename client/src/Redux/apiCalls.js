import { publicRequest } from "../axiosRequest"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
 // loginStart() wrong
 dispatch(loginStart())
 try {
  const response = await publicRequest.post("/auth/login", user)
  console.log(response)
  dispatch(loginSuccess(response.data))
 } catch (error) {
  console.log(error);
  dispatch(loginFailure())
 }
}