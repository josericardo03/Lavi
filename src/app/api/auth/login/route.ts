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

    // Buscar usuário no banco
    const usuario = await prisma.usuarios.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaValida) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      );
    }

    // Verificar se o usuário é admin
    if (usuario.role !== "admin") {
      return NextResponse.json(
        { error: "Acesso negado. Apenas administradores podem fazer login." },
        { status: 403 }
      );
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: usuario.id,
        email: usuario.email,
        role: usuario.role,
      },
      process.env.JWT_SECRET || "lavi-secret-key",
      { expiresIn: "24h" }
    );

    // Retornar dados do usuário (sem senha) e token
    const { senhaHash: _, ...usuarioSemSenha } = usuario;

    return NextResponse.json({
      success: true,
      token,
      user: usuarioSemSenha,
      message: "Login realizado com sucesso",
    });
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
