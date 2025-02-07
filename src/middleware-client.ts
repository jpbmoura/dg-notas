"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "./store/user-store";
import { parseCookies } from "nookies";

const useMiddleware = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { decodedToken, decodeToken } = useUserStore();

  useEffect(() => {
    const handleRouteChange = () => {
      if (!decodedToken) {
        const token = parseCookies().token;
        if (!token) {
          router.push("/login");
        } else {
          decodeToken(token);
        }
      }
    };
    handleRouteChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname]);
};

export default useMiddleware;
