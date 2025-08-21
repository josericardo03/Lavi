import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Verificar se é uma rota de admin-usuarios
  if (request.nextUrl.pathname.startsWith("/admin-usuarios")) {
    // Se for a página de login, permitir acesso
    if (request.nextUrl.pathname === "/admin-usuarios") {
      return NextResponse.next();
    }

    // Para outras rotas de admin-usuarios, verificar autenticação
    const adminCookie = request.cookies.get("admin-authenticated");

    // Log para debug
    console.log("Middleware - Cookie admin-usuarios:", adminCookie?.value);
    console.log("Middleware - Rota:", request.nextUrl.pathname);

    // Verificação mais rigorosa do cookie
    if (
      !adminCookie ||
      adminCookie.value !== "true" ||
      adminCookie.value === "" ||
      adminCookie.value === "false"
    ) {
      // Se não estiver autenticado, redirecionar para gerenciar usuários
      console.log("Middleware - Redirecionando para gerenciar usuários");
      return NextResponse.redirect(
        new URL("/admin-usuarios/gerenciar", request.url)
      );
    }

    // Se chegou aqui, está autenticado, permitir acesso
    return NextResponse.next();
  }

  // Verificar se é uma rota de admin (dashboard principal) - EXCLUINDO admin-usuarios
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin-usuarios")
  ) {
    // Verificar se existe o cookie de autenticação do login
    const adminToken = request.cookies.get("adminToken");

    // Log para debug
    console.log("Middleware - Cookie admin:", adminToken?.value);
    console.log("Middleware - Rota admin:", request.nextUrl.pathname);

    // Se não estiver autenticado, redirecionar para login
    if (!adminToken || adminToken.value === "") {
      console.log("Middleware - Redirecionando para login");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-usuarios/:path*", "/admin/:path*"],
};
