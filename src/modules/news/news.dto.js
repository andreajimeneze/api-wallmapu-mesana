export const createNewsDTO = ({ title, subtitle, body, images = [] }) => {
  if (!title.trim() || !body.trim()) {
    throw new Error("Título y cuerpo de la noticia son obligatorios");
  }

  const formatedImages = Array.isArray(images)
    ? images.map((img) => {
        if (!img.url.trim()) {
          throw new Error("La URL de la imagen no puede estar vacía");
        }

        return {
          url: img.url.trim(),
          alt: img.alt?.trim() || null,
        };
      })
    : [];

  return {
    title: title.trim(),
    subtitle: subtitle?.trim() || null,
    body: body.trim(),
    images: formatedImages,
  };
};

export const newsResponseDTO = (news) => ({
  id_news: news.id_news,
  title: news.title,
  subtitle: news.subtitle,
  body: news.body,
  created_at: news.created_at,
  updated_at: news.updated_at,
  images: news.images
    ? news.images.map((g) => ({
        id_news_gallery: g.id_news_gallery,
        url: g.url,
        alt: g.alt,
        news_id: g.news_id,
      }))
    : [],
});
