import { createNewsDTO, newsResponseDTO } from "./news.dto.js";
import { getAllNewsService, createNewsService } from "./news.service.js";


export const getAllNews = async (req, res) => {
    try {
        const { count, rows } = await getAllNewsService();
        if(allNews.length > 0) {
            return res.status(200).json({total: count, news: rows});
        } else {
            res.status(404).json({message: 'No hay noticias actualmente'});
        }
    } catch(error) {
        res.status(500).json({error: "Error al obtener las noticias" });
    }
}

export const getOneNews = async (req, res) => {
  const { id } = req.params;
  try {
    const oneNews = await NewsModel.findByPk(id);
    if (oneNews) {
      return res.status(200).json(oneNews);
    } else {
      return res.status(404).json({ message: "Noticia no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la noticia solicitada" });
  }
};

export const createNews = async (req, res) => {
  try {
    const dto = createNewsDTO(req.body);
    const createdNews = await createNewsService(dto);
    // const { title, subtitle, body } = req.body;
    //const currentDate = new Date();
res.status(201).json(newsResponseDTO(createdNews), { message: "Noticia creada exitosamente" });
  } catch (error) {    
    res.status(400).json({ error: error.message });
  }
};

export const editNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, body } = req.body;
    const existingNews = await NewsModel.findByPk(id);

    if (!existingNews) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }

    const editedNews = await existingNews.update({
      title: title || existingNews.title,
      subtitle: subtitle || existingNews.subtitle,
      body: body || existingNews.body,
      date: existingNews.date
    });

    return res.status(200).json({message: "Noticia editada correctamente",
      data: editedNews });
  } catch (error) {
    return res.status(500).json({ error: "Error al intentar editar la noticia"  });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const newsSelected = await NewsModel.findByPk(id);

    if (!newsSelected) {
      return res.status(404).json({ error: "Noticia no encontrada" });
    }

    await newsSelected.destroy();

    res.status(200).json({ message: "Noticia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la noticia"  });
  }
};
