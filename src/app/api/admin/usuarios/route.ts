import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Verificar se o usuário está autenticado (opcional, para maior segurança)
    const adminCookie = request.cookies.get("admin-authenticated");

    if (!adminCookie || adminCookie.value !== "true") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    // Buscar todos os usuários
    const usuarios = await prisma.usuarios.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        ativo: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verificar se o usuário está autenticado
    const adminCookie = request.cookies.get("admin-authenticated");

    if (!adminCookie || adminCookie.value !== "true") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { nome, email, senha, role, ativo } = await request.json();

    // Validar dados obrigatórios
    if (!nome || !email || !senha) {
      return NextResponse.json(
        { message: "Nome, email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { message: "Email já está em uso" },
        { status: 400 }
      );
    }

    // Criptografar a senha
    const saltRounds = 10;
    const senhaHash = await bcrypt.hash(senha, saltRounds);

    // Criar novo usuário
    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senhaHash,
        role: "admin", // Sempre admin
        ativo: ativo !== undefined ? ativo : true,
      },
    });

    // Retornar usuário criado (sem a senha)
    const { senhaHash: _, ...usuarioSemSenha } = novoUsuario;
    return NextResponse.json(usuarioSemSenha, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
