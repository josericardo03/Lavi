import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, senha } = body;

    if (!email || !senha) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("Tentando login para email:", email);

    // Buscar usuário no banco
    const usuario = await prisma.usuarios.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    console.log("Usuário encontrado:", usuario ? "Sim" : "Não");

    if (!usuario) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Verificar senha
    console.log("Verificando senha...");
    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
    console.log("Senha válida:", senhaValida);

    if (!senhaValida) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Verificar se o usuário é admin
    console.log("Role do usuário:", usuario.role);
    if (usuario.role !== "admin") {
      console.log("Usuário não é admin, negando acesso");
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem fazer login." },
        { status: 403 }
      );
    }
    console.log("Usuário é admin, permitindo acesso");

    // Gerar token JWT simples para teste
    const token = "test-token-" + Date.now();

    // Retornar dados do usuário (sem senha) e token
    const { senhaHash: _, ...usuarioSemSenha } = usuario;

    console.log("Gerando resposta de sucesso");
    const response = NextResponse.json({
      success: true,
      token,
      user: usuarioSemSenha,
      message: "Login realizado com sucesso",
    });
    console.log("Resposta enviada:", response);
    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
