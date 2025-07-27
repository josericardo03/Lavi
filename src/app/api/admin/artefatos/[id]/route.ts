import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Atualizar artefato
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

    const artefatoAtualizado = await prisma.artefatos.update({
      where: { id: params.id },
      data: {
        title,
        content,
        links,
      },
    });

    return NextResponse.json(artefatoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar artefato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar artefato
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.artefatos.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Artefato deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar artefato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
