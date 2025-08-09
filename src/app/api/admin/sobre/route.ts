import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todos os dados sobre
export async function GET() {
  try {
    const sobre = await prisma.sobre.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(sobre);
  } catch (error) {
    console.error("Erro ao buscar dados sobre:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar nova entrada sobre
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { titulo, descricao, conteudo, imagem_principal } = body;

    if (!titulo) {
      return NextResponse.json(
        { error: "Título é obrigatório" },
        { status: 400 }
      );
    }

    const novaEntrada = await prisma.sobre.create({
      data: {
        id: `sobre_${Date.now()}`,
        titulo,
        descricao,
        conteudo,
        ...(imagem_principal && { imagem_principal }),
      },
    });

    return NextResponse.json(novaEntrada, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar entrada sobre:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
