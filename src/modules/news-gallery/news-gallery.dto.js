export const createNewsGalleryDTO = ({ alt, url, news_id }) => {
    if(!news_id) {
         throw new Error('news_id es obligatorio');
    }
    if(!alt && !url ) {
        throw new Error('Campos de la imagen son obligatorios');
    }

    return {
        alt,
        url,
        news_id: Number(news_id)
    }
};

export const newsGalleryResponseDTO = (news_gallery) => ({
    id_news_gallery: news_gallery.id_news_gallery,
    alt: news_gallery.alt,
    url: `${process.env.URL_BASE}/public/images/news-gallery/${news_gallery.url}`,
    news_id: news_gallery.news_id
})