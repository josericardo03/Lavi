import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar publicação específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const publicacao = await prisma.publicacoes.findUnique({
      where: { id: params.id },
    });

    if (!publicacao) {
      return NextResponse.json(
        { error: "Publicação não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(publicacao);
  } catch (error) {
    console.error("Erro ao buscar publicação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar publicação
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      titulo,
      autores,
      ano,
      revista_periodico,
      doi,
      link_externo,
      resumo,
      tipo,
      imagem,
    } = body;

    if (!titulo || !ano) {
      return NextResponse.json(
        { error: "Título e ano são obrigatórios" },
        { status: 400 }
      );
    }

    const publicacaoAtualizada = await prisma.publicacoes.update({
      where: { id: params.id },
      data: {
        titulo,
        autores,
        ano: parseInt(ano),
        revista_periodico,
        doi,
        link_externo,
        resumo,
        tipo,
        ...(imagem && { imagem }),
      },
    });

    return NextResponse.json(publicacaoAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar publicação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar publicação
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.publicacoes.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Publicação deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar publicação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
