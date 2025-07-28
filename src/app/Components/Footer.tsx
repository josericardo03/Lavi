"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full h-[56px] flex items-center">
      <div className="flex justify-between items-center w-full">
        <span className="text-sm text-white">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Lavi
          </a>
        </span>
        <ul className="flex items-center gap-6 text-sm font-medium text-white">
          <li>
            <Link href="/Equipe" className="hover:underline transition-colors">
              Equipe
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
              className="hover:underline transition-colors"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
