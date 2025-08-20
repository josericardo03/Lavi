import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const pageType = formData.get("pageType") as string; // Tipo da página (sobre, projetos, publicacoes, equipe, galeria)

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado" },
        { status: 400 }
      );
    }

    if (!pageType) {
      return NextResponse.json(
        { error: "Tipo de página não especificado" },
        { status: 400 }
      );
    }

    // Validar tipo de arquivo
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Tipo de arquivo não permitido. Use apenas imagens (JPEG, PNG, GIF, WebP)",
        },
        { status: 400 }
      );
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Arquivo muito grande. Tamanho máximo: 5MB" },
        { status: 400 }
      );
    }

    // Criar nome único para o arquivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split(".").pop();
    const fileName = `${timestamp}-${randomString}.${extension}`;

    // Obter data atual para organização
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Janeiro = 01, Dezembro = 12
    const monthName = now.toLocaleString("pt-BR", { month: "long" }); // Nome do mês em português

    // Criar estrutura de diretórios: uploads/pagina/ano/mes-nome
    const uploadDir = join(
      process.cwd(),
      "public",
      "uploads",
      pageType,
      String(year),
      `${month}-${monthName}`
    );

    // Criar diretórios se não existirem
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Salvar arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Retornar URL da imagem com a nova estrutura
    const imageUrl = `/uploads/${pageType}/${year}/${month}-${monthName}/${fileName}`;

    return NextResponse.json({
      success: true,
      imageUrl,
      fileName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      pageType,
      year,
      month,
      monthName,
      uploadPath: `${pageType}/${year}/${month}-${monthName}`,
    });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
