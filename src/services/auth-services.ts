/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCookie } from "nookies";
import { post } from "../helpers/api/api";

export interface IUserLogin {
  email: string;
  password: string;
}
export interface IUserCreate {
  username: string;
  password: string;
  email: string;
}

class AuthServices {
  public logOut = async (): Promise<any> => {
    setCookie(null, "token", "", {
      maxAge: 0, // Remove o cookie imediatamente
      path: "/", // Certifique-se de usar o mesmo caminho do cookie original
    });
    window.location.href = "/login";
  };
  public userAuthenticate = async (data: IUserLogin): Promise<any> => {
    try {
      const response = await post(
        `https://dgnotas-dev.up.railway.app/auth/login`,
        data
      ).then((response: any) => {
        return response;
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
  public createUser = async (data: IUserCreate): Promise<any> => {
    try {
      const response = await post(
        `https://dgnotas-dev.up.railway.app/users/create`,
        data
      ).then((response: any) => {
        return response;
      });

      return response;
    } catch (error) {
      throw error;
    }
  };
}

export const authServices = new AuthServices();
