import express from "express";
import {
  getGalleryByNewsId,
  createGalleryNews,
  getImageByIdGallery,
  deleteImageByIdGallery,
  deleteGalleryByNewsId
} from "./news-gallery.controller.js";
import { upload } from "../../services/images/multer.js";

const router = express.Router();

router.get("/news/:news_id", getGalleryByNewsId);

router.get("/:id", getImageByIdGallery);

router.post(
  "/news/:id",
  upload.array("image", 3),
  createGalleryNews,
);

router.delete('/:id', deleteImageByIdGallery);

router.delete('/news/:id', deleteGalleryByNewsId);

export default router;
