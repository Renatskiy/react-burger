import Cookies from "js-cookie";
import { post, get, patch } from "../../../api/index";

import { ActionUserTypes, UserAction } from "./types";
import { Dispatch } from "redux";

export const UserActionsCreator = {
  updateToken: async () => {
    const payload = {
      token: Cookies.get("refreshToken"),
    };

    return await post("/auth/token", payload).then((res: any) => {
      if (res.success) {
        const time = new Date(new Date().getTime() + 20 * 60 * 1000);
        Cookies.set("accessToken", res.accessToken, {
          expires: time,
        });
        Cookies.set("refreshToken", res.refreshToken);
        return true;
      }
      return false;
    });
  },
  logoutUser: () => {
    const payload = {
      token: Cookies.get("refreshToken"),
    };
    return function () {
      return post("/auth/logout", payload).then((res) => {
        if (res.success) {
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          return true;
        }
        return false;
      });
    };
  },
  forgotPassword:
    (form: { email: string }) => (dispatch: Dispatch<UserAction>) => {
      try {
        return post("/password-reset", form).then((res) => {
          if (res.success) {
            dispatch({
              type: ActionUserTypes.SET_FORGOT_PASSWORD,
              payload: true,
            });
            return true;
          }
          return false;
        });
      } catch (e) {
        return false;
      }
    },
  resetPassword: (form: {
    password: string;
    token: string;
    code?: string;
  }): Promise<{ success: boolean }> => {
    return post("/password-reset/reset", form).then((res) => {
      if (res.success) {
        return { success: true };
      } else {
        return { success: false };
      }
    });
  },
  register:
    (form: { name: string; email: string; password: string }) =>
    (dispatch: Dispatch<UserAction>): Promise<boolean> => {
      return post("/auth/register", form).then((res: any) => {
        if (res.success) {
          Cookies.set("accessToken", res.accessToken);
          Cookies.set("refreshToken", res.refreshToken);
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
          return true;
        }
        return false;
      });
    },
  login:
    (form: { email: string; password: string }) =>
    (dispatch: Dispatch<UserAction>) => {
      return post("/auth/login", form).then((res: any) => {
        if (res.success) {
          const time = new Date(new Date().getTime() + 20 * 60 * 1000);

          Cookies.set("accessToken", res.accessToken, {
            expires: time,
          });
          Cookies.set("refreshToken", res.refreshToken);
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
          dispatch({ type: ActionUserTypes.SET_USERAUTH, payload: true });
          return true;
        }
        return false;
      });
    },
  changeUserData:
    (form: { name: string; email: string; password: string }) =>
    async (dispatch: Dispatch<UserAction>) => {
      if (!Cookies.get("accessToken")) {
        const resToken = await UserActionsCreator.updateToken();
        console.log(resToken, "getUserInformation res token");
      }
      return await patch("/auth/user", form).then((res: any) => {
        if (res?.success) {
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });

          return true;
        }
      });
    },
  getUser: (): Promise<{
    success: boolean;
    user?: { email: string; name: string };
  }> => {
    return get("/auth/user")
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        return error;
      });
  },
  getUserInformation: () => async (dispatch: Dispatch<UserAction>) => {
    if (!Cookies.get("accessToken")) {
      const resToken = await UserActionsCreator.updateToken();
      console.log(resToken, "getUserInformation res toekn");
    }
    return await UserActionsCreator.getUser()
      .then(async (res: any) => {
        if (res?.success) {
          dispatch({ type: ActionUserTypes.SET_USER, payload: res.user });
          return res;
        }
      })
      .catch(async (error) => {
        alert(error);
      });
  },
};
