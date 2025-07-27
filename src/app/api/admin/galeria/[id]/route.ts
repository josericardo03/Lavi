import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Atualizar imagem da galeria
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const imagemAtualizada = await prisma.galeria.update({
      where: { id: params.id },
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

    return NextResponse.json(imagemAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar imagem da galeria
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.galeria.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Imagem deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar imagem:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
