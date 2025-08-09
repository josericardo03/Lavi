import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar entrada específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sobre = await prisma.sobre.findUnique({
      where: { id: params.id },
    });

    if (!sobre) {
      return NextResponse.json(
        { error: "Entrada não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(sobre);
  } catch (error) {
    console.error("Erro ao buscar entrada sobre:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar entrada
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { titulo, descricao, conteudo, imagem_principal } = body;

    if (!titulo) {
      return NextResponse.json(
        { error: "Título é obrigatório" },
        { status: 400 }
      );
    }

    const sobreAtualizado = await prisma.sobre.update({
      where: { id: params.id },
      data: {
        titulo,
        descricao,
        conteudo,
        ...(imagem_principal && { imagem_principal }),
      },
    });

    return NextResponse.json(sobreAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar entrada sobre:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar entrada
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.sobre.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Entrada deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar entrada sobre:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
