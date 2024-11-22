/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface UserStore {
  userEmail: string;
  userName: string;
  decodedToken: any;

  setUserInfo: (items: any) => any;
  decodeToken: (token: string) => any;
}

export const useUserStore = create<UserStore>()((set) => ({
  userEmail: "",
  userName: "",
  decodedToken: "",
  isExpired: false,

  setUserInfo: (items) =>
    set(() => ({
      userEmail: items?.email,
      userName: items?.username,
    })),
  // decodeToken: (token) =>
  //   set(() => ({
  //     decodedToken: jwtDecode(token),
  //   })),
  decodeToken: (token) => {
    const decoded: any = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    set(() => ({
      decodedToken: decoded,
      userEmail: decoded.email,
      userName: decoded.username,
      isExpired,
    }));
  },
}));
