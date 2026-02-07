export const createNewsGalleryDTO = ({ alt, img, id_news }) => {
    if(!alt || !img ) {
        throw new Error('Campos de la galería son obligatorios');
    }

    return {
        alt: alt.trim(),
        img: img.trim(),
        id_news: id_news
    }
};

export const newsGalleryResponseDTO = (news_gallery) => ({
    id: news_gallery.id_news_gallery,
    alt: news_gallery.alt,
    img: news_gallery.img,
    id_news: news_gallery.id_news
})