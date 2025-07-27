import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todas as orientações
export async function GET() {
  try {
    const orientacoes = await prisma.orientacao.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orientacoes);
  } catch (error) {
    console.error("Erro ao buscar orientações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar nova orientação
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

    const novaOrientacao = await prisma.orientacao.create({
      data: {
        title,
        content,
        links,
      },
    });

    return NextResponse.json(novaOrientacao, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar orientação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
