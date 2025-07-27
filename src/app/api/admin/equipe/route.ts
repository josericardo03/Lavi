import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todos os membros da equipe
export async function GET() {
  try {
    const equipe = await prisma.equipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(equipe);
  } catch (error) {
    console.error("Erro ao buscar equipe:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar novo membro da equipe
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { nome, descricao, tipo, email, foto } = body;

    if (!nome) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    const novoMembro = await prisma.equipe.create({
      data: {
        nome,
        descricao,
        tipo,
        email,
        foto,
      },
    });

    return NextResponse.json(novoMembro, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar membro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
