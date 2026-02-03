import express from 'express';
import {
  getAllNews,
  getOneNews,
  createNews,
  updateNews,
  deleteNews,
} from './news.controller.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         subtitle:
 *           type: string
 *           nullable: true
 *         body:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Obtener noticias (paginado)
 *     responses:
 *       200:
 *         description: Lista de noticias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 news:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 *             example:
 *               total: 2
 *               page: 1
 *               news:
 *                 - id: 1
 *                   title: Noticia 1
 *                   subtitle: null
 *                   body: Texto de la noticia
 *                   date: 2026-01-28
 *       404:
 *         description: No hay noticias actualmente
 *       500:
 *         description: Error al intentar obtener las noticias
 */
router.get('/', getAllNews);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Obtener noticia por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Noticia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *             example:
 *               id: 1
 *               title: Noticia 1
 *               subtitle: null
 *               body: Texto de la noticia
 *               date: 2026-01-28
 *       404:
 *         description: Noticia no encontrada
 *       500:
 *         description: Error al intentar obtener la noticia
 */
router.get('/:id', getOneNews);

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Crear noticia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *           example:
 *             title: Nueva noticia
 *             subtitle: Subtítulo opcional
 *             body: Texto de la noticia
 *             date: 2026-01-28
 *     responses:
 *       201:
 *         description: Noticia creada
 *       404:
 *         description: Noticia no encontrada
 *       500:
 *         description: Error al intentar crear la noticia
 */
router.post('/', createNews);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Actualizar noticia
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *           example:
 *             id: 1
 *             title: Noticia actualizada
 *             subtitle: Nuevo subtítulo
 *             body: Texto actualizado
 *             date: 2026-01-29
 *     responses:
 *       200:
 *         description: Noticia editada correctamente
 *       404:
 *         description: Noticia no encontrada
 *       500:
 *         description: Error al intentar editar la noticia
 */
router.put('/:id', updateNews);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Eliminar noticia
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Noticia eliminada correctamente
 *       404:
 *         description: Noticia no encontrada
 *       500:
 *         description: Error al intentar eliminar la noticia
 */
router.delete('/:id', deleteNews);

export default router;
