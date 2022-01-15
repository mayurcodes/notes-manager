import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const userCred = { email, password };
    const config = { headers: { "Content-Type": "application/json" } };

    const userLogin = await axios.post("/api/users/login", userCred, config);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userLogin.data });
    //saving data in local storage
    console.log(userLogin);
    localStorage.setItem("userInfo", JSON.stringify(userLogin.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register =
  (name, email, password, profilePic) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const userCred = { name, email, password, profilePic };
      const config = { headers: { "Content-Type": "application/json" } };

      const userLogin = await axios.post("/api/users", userCred, config);

      dispatch({ type: USER_REGISTER_SUCCESS, payload: userLogin.data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: userLogin.data });

      localStorage.setItem("userInfo", JSON.stringify(userLogin.data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/users/profile", user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
