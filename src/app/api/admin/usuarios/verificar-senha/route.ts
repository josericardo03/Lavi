import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { senha } = await request.json();

    // Senhas válidas - aceitar ambas independente da variável de ambiente
    const senhasValidas = ["lavi905204", "lavi905205"];

    // Log para debug
    console.log("=== DEBUG VERIFICAR SENHA ===");
    console.log("Senha recebida:", senha);
    console.log("ADMIN_SENHA env:", process.env.ADMIN_SENHA);
    console.log("Senhas válidas:", senhasValidas);

    if (senhasValidas.includes(senha)) {
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
      console.log("❌ Senha incorreta. Senha recebida:", senha);
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
