import { auth } from "@/auth";

import {
  authRoute,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";

export default auth((req, res) => {
  // Secure the route with authentication
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
