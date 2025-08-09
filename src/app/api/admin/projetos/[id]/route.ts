import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar projeto específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projeto = await prisma.projetos.findUnique({
      where: { id: params.id },
    });

    if (!projeto) {
      return NextResponse.json(
        { error: "Projeto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(projeto);
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PUT - Atualizar projeto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      nome,
      nome_completo,
      ano,
      descricao,
      participantes,
      status,
      imagem,
      link_externo,
    } = body;

    if (!nome || !ano) {
      return NextResponse.json(
        { error: "Nome e ano são obrigatórios" },
        { status: 400 }
      );
    }

    const projetoAtualizado = await prisma.projetos.update({
      where: { id: params.id },
      data: {
        nome,
        nome_completo,
        ano: parseInt(ano),
        descricao,
        participantes,
        status,
        ...(imagem && { imagem }),
        link_externo,
      },
    });

    return NextResponse.json(projetoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE - Deletar projeto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.projetos.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
