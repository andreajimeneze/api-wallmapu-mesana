export const createNewsGalleryDTO = ({ alt, url, id_news }) => {
    if(!id_news) {
         throw new Error('id_news es obligatorio');
    }
    if(!alt && !url ) {
        throw new Error('Campos de la imagen son obligatorios');
    }

    return {
        alt,
        url,
        id_news: Number(id_news)
    }
};

export const newsGalleryResponseDTO = (news_gallery) => ({
    id: news_gallery.id_news_gallery,
    alt: news_gallery.alt,
    url: `${process.env.URL_BASE}/public/images/news-gallery/${news_gallery.url}`,
    id_news: news_gallery.id_news
})