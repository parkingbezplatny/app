import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === "/admin" &&
      !req.nextauth.token?.user.isAdmin
    ) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/dashboard/:path*",
    "/api/favorite/:path*",
    "/api/parkings/:path*",
    "/api/admin/:path*",
    "/api/users/:path*",
  ],
};
