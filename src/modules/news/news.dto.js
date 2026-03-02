export const createNewsDTO = ({ title, subtitle, body }) => {
  if (!title.trim() || !body.trim()) {
    throw new Error("Título y cuerpo de la noticia son obligatorios");
  }

  return {
    title: title.trim(),
    subtitle: subtitle?.trim() || null,
    body: body.trim(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const updateNewsDTO = ({ idNews, title, subtitle, body, createdAt }) => {
  return {
    id_news: Number(idNews),
    title: title.trim(),
    subtitle: subtitle?.trim() || null,
    body: body.trim(),
    createdAt,
    updatedAt: new Date()
  };
};

export const newsResponseDTO = (news) => ({
  id_news: news.idNews,
  title: news.title,
  subtitle: news.subtitle,
  body: news.body,
  created_at: news.createdAt,
  updated_at: news.updatedAt,
  images: news.images
    ? news.images.map((g) => ({
        id_news_gallery: g.idNewsGallery,
        url: g.url,
        alt: g.alt,
        news_id: g.newsId,
      }))
    : [],
});
