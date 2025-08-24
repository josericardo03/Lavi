import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { senha } = await request.json();

    // Verificar se a senha fornecida corresponde à senha da variável de ambiente
    // Se não conseguir ler da variável de ambiente, usar senha padrão como fallback
    const senhaAdmin = process.env.ADMIN_SENHA || "lavi905205";

    if (!senhaAdmin) {
      return NextResponse.json(
        { message: "Senha de administrador não configurada" },
        { status: 500 }
      );
    }

    if (senha === senhaAdmin) {
      // Senha correta - criar uma sessão ou token
      const response = NextResponse.json(
        { message: "Senha correta" },
        { status: 200 }
      );

      // Definir um cookie de sessão (opcional, para maior segurança)
      response.cookies.set("admin-authenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 horas
      });

      return response;
    } else {
      return NextResponse.json({ message: "Senha incorreta" }, { status: 401 });
    }
  } catch (error) {
    console.error("Erro ao verificar senha:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
