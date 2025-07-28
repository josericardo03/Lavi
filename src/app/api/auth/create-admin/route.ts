import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, nome, senha } = body;

    if (!email || !nome || !senha) {
      return NextResponse.json(
        { error: "Email, nome e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se já existe um usuário com este email
    const usuarioExistente = await prisma.usuarios.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "Já existe um usuário com este email" },
        { status: 400 }
      );
    }

    // Criptografar a senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Criar o usuário admin
    const novoUsuario = await prisma.usuarios.create({
      data: {
        email: email.toLowerCase(),
        nome,
        senhaHash,
        role: "admin",
        ativo: true,
      },
    });

    // Retornar dados do usuário (sem senha)
    const { senhaHash: _, ...usuarioSemSenha } = novoUsuario;

    return NextResponse.json(
      {
        success: true,
        message: "Usuário admin criado com sucesso",
        user: usuarioSemSenha,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar usuário admin:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
