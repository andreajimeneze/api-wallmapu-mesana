export const generateFileName = (path) => {
    const base36Time = Date.now().toString(36);

    return  `${path}-${base36Time}`
}