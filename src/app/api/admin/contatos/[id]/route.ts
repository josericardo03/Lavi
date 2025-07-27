import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT - Atualizar contato (principalmente status)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status é obrigatório" },
        { status: 400 }
      );
    }

    const contatoAtualizado = await prisma.contatos.update({
      where: { id: params.id },
      data: {
        status,
      },
    });

    return NextResponse.json(contatoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar contato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar contato
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contatos.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Contato deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar contato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
