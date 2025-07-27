import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Atualizar legislação
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

    const legislacaoAtualizada = await prisma.legislacao.update({
      where: { id: params.id },
      data: {
        title,
        content,
        links,
      },
    });

    return NextResponse.json(legislacaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar legislação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar legislação
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.legislacao.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Legislação deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar legislação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
