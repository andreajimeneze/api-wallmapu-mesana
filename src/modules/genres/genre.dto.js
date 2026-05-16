export const baseGenreDTO = (res) => ({
    id_genre: res.idGenre,
    name: res.name,
    created_at: res.created_at,
    updated_at: res.updated_at
});

export const createGenreDTO = ({name}) => ({
    name: name.trim()
});

export const updateGenreDTO = (data) => ({
    idGenre: data.id_genre,
    name: data.name.trim()
});


