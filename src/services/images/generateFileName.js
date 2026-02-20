export const generateFileName = (newsId, path) => {
    const base36Time = Date.now().toString(36);

    return  `${newsId}-${path}-${base36Time}`
}