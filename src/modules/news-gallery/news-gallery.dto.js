export const createNewsGalleryDTO = ({ alts, files, newsId }) => {
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