import express from "express";
import {
  getGalleryByNews,
  createGalleryNews,
} from "./news-gallery.controller.js";
import { upload } from "../../config/multer.js";
import { processImage } from "../../middlewares/processImage.js";

const router = express.Router();
/**
 * @swagger
 * /api/news/{news_id}/gallery:
 *   get:
 *     summary: Obtener la galería de imágenes asociada a una noticia
 *     parameters:
 *       - in: path
 *         name: news_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la noticia
 *     responses:
 *       200:
 *         description: Galería de imágenes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gallery:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       alt:
 *                         type: string
 *                       url:
 *                         type: string
 *                       news_id:
 *                         type: integer
 *             example:
 *               gallery:
 *                 - id: 1
 *                   alt: "Imagen 1"
 *                   url: "http://example.com/image1.jpg"
 *                   news_id: 10
 *       404:
 *         description: No existen imágenes en la galería
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "No existen imágenes en la galería"
 *       500:
 *         description: Error al obtener las imágenes de la galería
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Error al obtener las imágenes de la galería"
 */

router.get("/:news_id", getGalleryByNews);

router.post(
  "/:news_id",
  upload.single("image"),
  processImage("news-gallery"),
  createGalleryNews,
);

export default router;
