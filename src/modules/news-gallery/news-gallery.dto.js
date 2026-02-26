export const createNewsGalleryDTO = ({ alt, file, newsId }) => {
    if(!newsId) {
         throw new Error('news_id es obligatorio');
    }
    if(!alt && !file ) {
        throw new Error('Campos de la imagen son obligatorios');
    }

    return {
        alt,
        url: file,
        newsId: Number(newsId)
    }
};

export const newsGalleryResponseDTO = (newsGallery) => ({
    id_news_gallery: newsGallery.idNewsGallery,
    url: newsGallery.url,
    alt: newsGallery.alt,
    news_id: newsGallery.newsId
})