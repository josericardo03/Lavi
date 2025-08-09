"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export function MenuResponsivo() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  return (
    <>
      <header className=" shadow-lg max-w-7xl mx-auto mt-10 ">
        <nav className="bg-gradient-to-r from-blue-300 to-pink-300 px-4 lg:px-6 py-2.5 rounded-lg">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/" className="font-bold text-3xl text-white">
              <Image
                src="/LOGO-LAVI-FUNDOTRANSPARENTE.png"
                alt="Logo LAVI"
                width={100}
                height={50}
                className="object-contain"
              />
            </Link>

            <div className="flex items-center lg:order-2">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-white rounded-lg lg:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className={`${
                menuAberto ? "block" : "hidden"
              } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="/sobre"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a
                    href="/projetos"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Projetos
                  </a>
                </li>
                <li>
                  <a
                    href="/publicacoes"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Publicações
                  </a>
                </li>
                <li>
                  <a
                    href="/Equipe"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Equipe
                  </a>
                </li>
                <li>
                  <a
                    href="/Legislacao"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Legislação
                  </a>
                </li>
                <li>
                  <a
                    href="/Orientacao"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Orientações
                  </a>
                </li>
                <li>
                  <a
                    href="/Artefatos"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Artefatos
                  </a>
                </li>
                <li>
                  <a
                    href="/Galeria"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Galeria
                  </a>
                </li>
                <li>
                  <a
                    href="/contato"
                    className="block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-white/10 lg:hover:bg-transparent lg:border-0 lg:hover:text-white lg:p-0"
                  >
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
