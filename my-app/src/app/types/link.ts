// frontend-friendly type
export type LinkItem = {
  id: string;
  title: string;       // legenda ou fallback para url
  originalUrl: string; // campo `url` do backend
  shortUrl: string;    // construído a partir do codigo
  code: string;        // codigo (slug curto)
  visits: number;      // clicks
  createdAt: string;   // created_at (ISO)
};
