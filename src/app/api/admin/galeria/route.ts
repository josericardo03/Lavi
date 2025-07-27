import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todas as imagens da galeria
export async function GET() {
  try {
    const galeria = await prisma.galeria.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(galeria);
  } catch (error) {
    console.error("Erro ao buscar galeria:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar nova imagem na galeria
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      descricao,
      date,
      imageUrl,
      imageAlt,
      imageWidth,
      imageHeight,
    } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Título e URL da imagem são obrigatórios" },
        { status: 400 }
      );
    }

    const novaImagem = await prisma.galeria.create({
      data: {
        title,
        descricao,
        date,
        imageUrl,
        imageAlt,
        imageWidth,
        imageHeight,
      },
    });

    return NextResponse.json(novaImagem, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar imagem:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
