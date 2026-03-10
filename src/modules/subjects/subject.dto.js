export const subjectResponseDTO = (subj) => ({
  id_subject: subj.idSubject,
  name: subj.name,
  created_at: subj.created_at,
  updated_at: subj.updated_at,
});

export const createSubjectDTO = ({ name }) => {
  if (!name?.trim()) {
    throw new Error("Nombre del descriptor es obligatorio");
  }

  return {
    name: name.trim(),
  };
};
