import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todas as legislações
export async function GET() {
  try {
    const legislacoes = await prisma.legislacao.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(legislacoes);
  } catch (error) {
    console.error("Erro ao buscar legislações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar nova legislação
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, content, links } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Título é obrigatório" },
        { status: 400 }
      );
    }

    const novaLegislacao = await prisma.legislacao.create({
      data: {
        title,
        content,
        links,
      },
    });

    return NextResponse.json(novaLegislacao, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar legislação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
