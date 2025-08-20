import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logout realizado com sucesso",
  });

  // Limpar cookie do token - método mais compatível
  response.cookies.delete("adminToken");

  // Também definir como vazio para garantir compatibilidade
  response.cookies.set("adminToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
