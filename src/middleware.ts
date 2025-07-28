import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  // Verificar se é uma rota admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("adminToken")?.value;

    if (!token) {
      // Redirecionar para login se não há token
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Verificar token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "lavi-secret-key"
      );

      // Se o token é válido, permitir acesso
      return NextResponse.next();
    } catch (error) {
      // Token inválido, redirecionar para login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("adminToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
