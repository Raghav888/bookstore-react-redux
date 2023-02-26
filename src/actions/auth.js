import AuthService from "../services/auth.service";

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: "LOGOUT",
  });
};
