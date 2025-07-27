import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Buscar todos os contatos
export async function GET() {
  try {
    const contatos = await prisma.contatos.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contatos);
  } catch (error) {
    console.error("Erro ao buscar contatos:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST - Criar novo contato (para o formulário de contato)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { nome, email, assunto, descricao } = body;

    if (!nome || !email) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 }
      );
    }

    const novoContato = await prisma.contatos.create({
      data: {
        nome,
        email,
        assunto,
        descricao,
        status: "novo",
      },
    });

    return NextResponse.json(novoContato, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar contato:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
