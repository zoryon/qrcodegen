import { NextResponse, type NextRequest } from "next/server";
import { verifySession } from "./lib/session";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("session_token")?.value;
    const isAuthenticated = await verifySession(token);

    // Handle register & login page access
    if (req.nextUrl.pathname === "/register" || req.nextUrl.pathname === "/login") {
        return isAuthenticated
            ? NextResponse.redirect(new URL("/", req.url))
            : NextResponse.next();
    }

    // Handle QR codes page access
    if (req.nextUrl.pathname.startsWith("/qrcodes/") && !req.nextUrl.pathname.startsWith("/qrcodes/create")) {
        return NextResponse.next();
    }

    // Handle register & login (auth) api access
    if (req.nextUrl.pathname.startsWith("/api/auth") && !req.nextUrl.pathname.endsWith("/logout")) {
        return isAuthenticated
            ? NextResponse.redirect(new URL("/", req.url))
            : NextResponse.next();
    }

    // Handle qrcodes vcards' page api access
    if (req.nextUrl.pathname.startsWith("/api/qrcodes/find")) {
        return NextResponse.next();
    }

    // Handle qrcodes' scan api access
    if (req.nextUrl.pathname.startsWith("/api/qrcodes/scan")) {
        return NextResponse.next();
    }

    // For all other API routes, return JSON error if not authenticated.
    if (req.nextUrl.pathname.startsWith("/api/") && !isAuthenticated) {
        return NextResponse.json({ error: "Not authorized" }, { status: 404 });
    }

    // Protect all other routes
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
        */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}   