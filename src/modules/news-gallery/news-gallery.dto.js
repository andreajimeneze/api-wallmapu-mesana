export const createNewsGalleryDTO = ({ alt = [], images = [], newsId }) => {
    if(!newsId) {
         throw new Error('news_id es obligatorio');
    }
    if(!alt && !images ) {
        throw new Error('Campos de la imagen son obligatorios');
    }

    return {
        alt,
        images,
        newsId: Number(newsId)
    }
};

export const newsGalleryResponseDTO = (newsGallery) => ({
    idNewsGallery: newsGallery.idNewsGallery,
    alt: newsGallery.alt,
    //url: `${process.env.URL_BASE}/public/images/news-gallery/${news_gallery.url}`,
    images: newsGallery.images,
    newsId: newsGallery.newsId
})