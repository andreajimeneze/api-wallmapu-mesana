export const createNewsGalleryDTO = ({ alt, image, newsId }) => {
    if(!newsId) {
         throw new Error('news_id es obligatorio');
    }
    if(!alt && !image ) {
        throw new Error('Campos de la imagen son obligatorios');
    }

    return {
        alt,
        url: image,
        newsId: Number(newsId)
    }
};

export const newsGalleryResponseDTO = (newsGallery) => ({
    id_news_gallery: newsGallery.idNewsGallery,
    url: newsGallery.url,
    alt: newsGallery.alt,
    news_id: newsGallery.newsId
})