export const createNewsGalleryDTO = ({ alt, url, news_id }) => {
    if(!alt || !url || !news_id) {
        throw new Error('Campos de la galería son obligatorios');
    }

    return {
        alt: alt.trim(),
        url: url.trim(),
        news_id: news_id
    }
};

export const newsGalleryResponseDTO = (news_gallery) => ({
    id: news_gallery.id_news_gallery,
    alt: news_gallery.alt,
    url: news_gallery.url,
    news_id: news_gallery.news_id
})