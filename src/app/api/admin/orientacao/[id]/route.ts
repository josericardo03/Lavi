import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Atualizar orientação
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, content, links } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Título é obrigatório" },
        { status: 400 }
      );
    }

    const orientacaoAtualizada = await prisma.orientacao.update({
      where: { id: params.id },
      data: {
        title,
        content,
        links,
      },
    });

    return NextResponse.json(orientacaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar orientação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar orientação
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.orientacao.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Orientação deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar orientação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
