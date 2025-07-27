import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Atualizar membro da equipe
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { nome, descricao, tipo, email, foto } = body;

    if (!nome) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }

    const membroAtualizado = await prisma.equipe.update({
      where: { id: params.id },
      data: {
        nome,
        descricao,
        tipo,
        email,
        foto,
      },
    });

    return NextResponse.json(membroAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar membro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar membro da equipe
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.equipe.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Membro deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar membro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
