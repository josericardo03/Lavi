import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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
