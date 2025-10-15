import axios from "axios";
import type { LinkItem } from "../types/link";

type BackendLink = {
  id: string;
  url: string;
  legenda?: string | null;
  codigo: string;
  clicks: number;
  created_at: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://crud-mail.onrender.com/";
// base where short links should point to (optional override)
const shortBaseFallback = process.env.NEXT_PUBLIC_SHORT_BASE || apiBase.replace(/\/$/, "");

const api = axios.create({
  baseURL: apiBase,
  headers: { "Content-Type": "application/json" },
});

// adiciona token automaticamente se existir em localStorage
api.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) config.headers["Authorization"] = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

function toFrontend(b: BackendLink): LinkItem {
  const base = (process.env.NEXT_PUBLIC_SHORT_BASE || shortBaseFallback).replace(/\/$/, "");
  return {
    id: b.id,
    title: b.legenda ?? b.url,
    originalUrl: b.url,
    code: b.codigo,
    shortUrl: `${base}/${b.codigo}`,
    visits: b.clicks ?? 0,
    createdAt: b.created_at,
  };
}

/** API calls (adaptadas ao shape do seu backend) */

export async function getLinks(): Promise<LinkItem[]> {
  const res = await api.get<BackendLink[]>("/links");
  const data = res.data || [];
  return data.map(toFrontend);
}

export async function createLink(payload: { title?: string; originalUrl: string }): Promise<LinkItem> {
  // backend espera { url, legenda }
  const body = { url: payload.originalUrl, legenda: payload.title ?? null };
  const res = await api.post<BackendLink>("/links", body);
  return toFrontend(res.data);
}

export async function updateLink(
  id: string | number,
  payload: { title?: string; originalUrl?: string }
): Promise<LinkItem> {
  // backend espera { url, legenda } (manda apenas o que existir)
  const body: any = {};
  if (payload.originalUrl !== undefined) body.url = payload.originalUrl;
  if (payload.title !== undefined) body.legenda = payload.title;
  const res = await api.put<BackendLink>(`/links/${id}`, body);
  return toFrontend(res.data);
}

export async function deleteLink(id: string | number): Promise<void> {
  await api.delete(`/links/${id}`);
}

export default api;
