import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Verificar se existe o cookie de autenticação
    const adminCookie = request.cookies.get("admin-authenticated");

    if (!adminCookie || adminCookie.value !== "true") {
      return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
    }

    // Cookie válido, usuário está autenticado
    return NextResponse.json({ message: "Autenticado" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
