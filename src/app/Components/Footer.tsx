"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <nav className="bg-white px-4 lg:px-6 py-3 rounded-lg border border-[#262278]/20 shadow-sm">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex items-center gap-4">
          <Image
            src="/LOGO-LAVI-FUNDOTRANSPARENTE.png"
            alt="Logo LAVI"
            width={80}
            height={40}
            className="object-contain"
          />
          <Image
            src="/logoprivacidade.svg"
            alt="Logo Privacidade"
            width={50}
            height={35}
            className="object-contain"
          />
        </div>

        <div className="flex items-center lg:order-2">
          <div className="w-6 h-6"></div>
        </div>

        <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col mt-3 font-medium lg:flex-row lg:space-x-6 lg:mt-0">
            <li>
              <Link
                href="/sobre"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="/projetos"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Projetos
              </Link>
            </li>
            <li>
              <Link
                href="/publicacoes"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Publicações
              </Link>
            </li>
            <li>
              <Link
                href="/Equipe"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Equipe
              </Link>
            </li>
            <li>
              <Link
                href="/Legislacao"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Legislação
              </Link>
            </li>
            <li>
              <Link
                href="/Orientacao"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Orientações
              </Link>
            </li>
            <li>
              <Link
                href="/Artefatos"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Artefatos
              </Link>
            </li>
            <li>
              <Link
                href="/Galeria"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Galeria
              </Link>
            </li>
            <li>
              <Link
                href="/contato"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm"
              >
                Contato
              </Link>
            </li>
            <li>
              <a
                href="mailto:lavi.ic.ufmt@gmail.com"
                className="block py-2 pr-3 pl-3 text-[#262278] border-b border-gray-100 hover:bg-[#262278]/5 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#262278] lg:p-0 transition-colors text-sm flex items-center"
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
      </div>
    </nav>
  );
};
