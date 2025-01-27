"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <>
      <footer className="  bg-green-700 rounded-lg shadow m-4 dark:bg-gray-800 max-w-5xl mx-auto relative bottom-0 left-0 right-0  ">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm  text-white sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline">
              Lavi
            </a>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium  text-white dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
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
    </>
  );
}
