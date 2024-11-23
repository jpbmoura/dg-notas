import { NextResponse, type NextRequest } from "next/server";

const middleware = async (request: NextRequest) => {
  const userToken = request.cookies.get("token");

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/static/") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/login" || pathname === "/login/sign-up") {
    if (userToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!userToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export default middleware;
