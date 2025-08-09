import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todos os projetos
export async function GET() {
  try {
    const projetos = await prisma.projetos.findMany({
      orderBy: {
        ano: "desc",
      },
    });

    return NextResponse.json(projetos);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar novo projeto
export async function POST(request: NextRequest) {
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

    const novoProjeto = await prisma.projetos.create({
      data: {
        id: `projeto_${Date.now()}`,
        nome,
        nome_completo,
        ano: parseInt(ano),
        descricao,
        participantes,
        status: status || "ativo",
        ...(imagem && { imagem }),
        link_externo,
      },
    });

    return NextResponse.json(novoProjeto, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
