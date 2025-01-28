// lib/strapi.js
const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337/api";

export const fetchAPI = async (path) => {
  const res = await fetch(`${API_URL}${path}`);
  const data = await res.json();
  return data;
};
