import { cookieName, jwtSecret } from "@/constants";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = ["/auth/signIn", "/"];

export const validateJWT = async (token: string) => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(jwtSecret)
  );
  return payload.id;
};

export async function middleware(req: NextRequest) {
  let token = null;
  const isAuthPage = Boolean(AUTH_ROUTES.includes(req.nextUrl.pathname));

  if (req.cookies.has(cookieName)) {
    token = req.cookies.get(cookieName)?.value;
  }
  if (isAuthPage && !token) return NextResponse.next();
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL(`/auth/signIn`, req.url));
  }

  try {
    if (!token) throw new Error("No token found!");
    const jwt_id = (await validateJWT(token)) as string;
    // req.userId = jwt_id;
    if (isAuthPage && jwt_id) {
      return NextResponse.redirect(new URL(`/dashboard`, req.url));
    }
    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL(`/auth/signIn`, req.url), {
      headers: {
        "Set-Cookie": `${cookieName}=deleted; path=/ ; Max-Age=0`,
      },
    });
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/dashboard", "/api"],
};

// Cornell52@gmail.com
