export const createNewsGalleryDTO = ({ alts, files, newsId }) => {
    if(!newsId) {
         throw new Error('news_id es obligatorio');
    }
    if(!alts && !files ) {
        throw new Error('Campos de la imagen son obligatorios');
    }

    return {
        alts,
        url: files,
        newsId: Number(newsId)
    }
};

export const newsGalleryResponseDTO = (newsGallery) => ({
    id_news_gallery: newsGallery.idNewsGallery,
    url: newsGallery.url,
    alt: newsGallery.alt,
    news_id: newsGallery.newsId
})