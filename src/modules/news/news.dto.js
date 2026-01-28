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
    id: news.id_news,
    title: news.title,
    subtitle: news.subtitle,
    body: news.body,
    date: news.date
});