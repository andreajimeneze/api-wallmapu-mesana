//import { paginationResponseDTO } from "../../shared/paginationResponse.js";
export const createNewsDTO = ({ title, subtitle, body }) => {
  if (!title || !body) {
    throw new Error("Título y cuerpo de la noticia son obligatorios");
  }
  return {
    title: title.trim(),
    subtitle: subtitle?.trim() || null,
    body: body.trim()
  }
};

export const newsResponseDTO = (news) => ({
    id_news: news.id_news,
    title: news.title,
    subtitle: news.subtitle,
    body: news.body,
    created_at: news.created_at,
    updated_at: news.updated_at,
    images: news.images ? news.images.map(g => ({
      id_news_gallery: g.id_news_gallery,
      url: g.url,
      alt: g.alt,
      id_news: g.id_news
    })) : []
});

