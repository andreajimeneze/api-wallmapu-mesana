import express from "express";
import {
  getGalleryByNewsId,
  createGalleryByNewsId,
  getImageByIdGallery,
  deleteImageByIdGallery,
  deleteGalleryByNewsId
} from "./news-gallery.controller.js";
import { upload } from "../../services/images/multer.js";

const router = express.Router();

router.get("/news/:newsId", getGalleryByNewsId);

router.get("/:id", getImageByIdGallery);

router.post(
  "/news/:id",
  upload.array("files", 3),
  createGalleryByNewsId,
);

router.delete('/:id', deleteImageByIdGallery);

router.delete('/news/:id', deleteGalleryByNewsId);

export default router;
