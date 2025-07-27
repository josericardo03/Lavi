import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todos os artefatos
export async function GET() {
  try {
    const artefatos = await prisma.artefatos.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(artefatos);
  } catch (error) {
    console.error("Erro ao buscar artefatos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar novo artefato
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

    const novoArtefato = await prisma.artefatos.create({
      data: {
        title,
        content,
        links,
      },
    });

    return NextResponse.json(novoArtefato, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar artefato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
