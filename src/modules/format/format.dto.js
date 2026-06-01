export const baseFormatDTO = (form) => ({
  id_format: form.idFormat,
  name: form.name,
  created_at: form.created_at,
  updated_at: form.updated_at,
});

export const formatResponseDTO = (form) => ({
  id_format: form.idFormat,
  name: form.name,
  created_at: form.created_at,
  updated_at: form.updated_at,
});

export const createFormatDTO = ({ name }) => ({
    name: name.trim()
});

export const updateFormatDTO = (data) => ({
    idFormat: data.id_format,
    name: data.name.trim()
})
