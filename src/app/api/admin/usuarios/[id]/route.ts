import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o usuário está autenticado
    const adminCookie = request.cookies.get("admin-authenticated");

    if (!adminCookie || adminCookie.value !== "true") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { id } = params;
    const { nome, email, role, ativo } = await request.json();

    // Validar dados obrigatórios
    if (!nome || !email) {
      return NextResponse.json(
        { message: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se o email já existe para outro usuário
    const usuarioExistente = await prisma.usuarios.findFirst({
      where: {
        email,
        id: { not: id },
      },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { message: "Email já está em uso por outro usuário" },
        { status: 400 }
      );
    }

    // Atualizar usuário
    const usuarioAtualizado = await prisma.usuarios.update({
      where: { id },
      data: {
        nome,
        email,
        role: role || "usuario",
        ativo: ativo !== undefined ? ativo : true,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(usuarioAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se o usuário está autenticado
    const adminCookie = request.cookies.get("admin-authenticated");

    if (!adminCookie || adminCookie.value !== "true") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    const { id } = params;

    // Verificar se o usuário existe
    const usuario = await prisma.usuarios.findUnique({
      where: { id },
    });

    if (!usuario) {
      return NextResponse.json(
        { message: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Excluir usuário
    await prisma.usuarios.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Usuário excluído com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
