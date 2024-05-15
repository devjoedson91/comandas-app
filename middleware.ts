import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("@frajola.token")?.value;

  const signURL = new URL("/", request.url);
  const menuURL = new URL("/menu", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.redirect(signURL);
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(menuURL);
  }
}

export const config = {
  matcher: ["/", "/menu/:path*"],
};
