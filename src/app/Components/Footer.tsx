"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full py-4 flex items-center">
      <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <span className="text-sm text-white">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Lavi
          </a>
        </span>
        <ul className="flex items-center gap-6 text-sm font-medium text-white">
          <li>
            <Link href="/sobre" className="hover:underline transition-colors">
              Sobre
            </Link>
          </li>
          <li>
            <Link
              href="/projetos"
              className="hover:underline transition-colors"
            >
              Projetos
            </Link>
          </li>
          <li>
            <Link
              href="/publicacoes"
              className="hover:underline transition-colors"
            >
              Publicações
            </Link>
          </li>
          <li>
            <Link href="/Equipe" className="hover:underline transition-colors">
              Equipe
            </Link>
          </li>
          <li>
            <Link
              href="/Legislacao"
              className="hover:underline transition-colors"
            >
              Legislação
            </Link>
          </li>
          <li>
            <Link
              href="/Orientacao"
              className="hover:underline transition-colors"
            >
              Orientações
            </Link>
          </li>
          <li>
            <Link
              href="/Artefatos"
              className="hover:underline transition-colors"
            >
              Artefatos
            </Link>
          </li>
          <li>
            <Link href="/Galeria" className="hover:underline transition-colors">
              Galeria
            </Link>
          </li>
          <li>
            <Link href="/contato" className="hover:underline transition-colors">
              Contato
            </Link>
          </li>
          <li>
            <a
              href="mailto:lavi.ic.ufmt@gmail.com"
              className="hover:underline transition-colors flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
