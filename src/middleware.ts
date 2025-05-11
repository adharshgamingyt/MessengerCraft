import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import {
  authRoute,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ENTRY_POINT,
  HOME_PAGE,
} from "@/src/routes";

import { getUserById } from "./data/User";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoute.includes(nextUrl.pathname);
  const isOnBoardingRoute = DEFAULT_LOGIN_REDIRECT.includes(nextUrl.pathname);
  const isHomePage = HOME_PAGE.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (isPublicRoute) {
    if (isHomePage && isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_ENTRY_POINT, nextUrl));
    }

    return;
  }

  if (!isPublicRoute || !isAuthRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }
    const user = await getUserById(req.auth?.user?.id || "");

    if (!isOnBoardingRoute) {
      if (!user?.username || user.username !== undefined) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
    }

    if (isOnBoardingRoute) {
      if (
        (user?.name && user.username === null) ||
        "" ||
        user?.phone_number === null ||
        !user?.phone_number
      ) {
        return;
      } else if ((user && user?.name !== null) || user?.name !== "") {
        return NextResponse.redirect(new URL(DEFAULT_ENTRY_POINT, nextUrl));
      }

      return;
    }

    return;
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next/static|_next/image|favicon.ico|public|images|health|api/public).*)",

    // Explicitly protect all API routes except public ones
    "/api/((?!public/).*)",

    // Protect all TRPC routes
    "/trpc/(.*)",
  ],
};
