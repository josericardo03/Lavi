import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todas as publicações
export async function GET() {
  try {
    const publicacoes = await prisma.publicacoes.findMany({
      orderBy: {
        ano: "desc",
      },
    });

    return NextResponse.json(publicacoes);
  } catch (error) {
    console.error("Erro ao buscar publicações:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar nova publicação
export async function POST(request: NextRequest) {
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

    const novaPublicacao = await prisma.publicacoes.create({
      data: {
        id: `publicacao_${Date.now()}`,
        titulo,
        autores,
        ano: parseInt(ano),
        revista_periodico,
        doi,
        link_externo,
        resumo,
        tipo: tipo || "artigo",
        ...(imagem && { imagem }),
      },
    });

    return NextResponse.json(novaPublicacao, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar publicação:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
