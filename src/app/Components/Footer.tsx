"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full h-16 flex items-center">
      <div className="flex justify-between items-center w-full">
        <span className="text-sm text-white">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Lavi
          </a>
        </span>
        <ul className="flex items-center gap-8 text-sm font-medium text-white">
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
