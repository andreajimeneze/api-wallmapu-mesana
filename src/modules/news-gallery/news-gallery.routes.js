import express from "express";
import {
  getGalleryByNewsId,
  createGalleryByNewsId,
  getImageByIdGallery,
  deleteImageByIdGallery,
  deleteGalleryByNewsId
} from "./news-gallery.controller.js";
import { upload } from "../../core/lib/multer.js";
import { jwtMiddleware, checkRole } from "../auth/auth.middleware.js";

const router = express.Router();

router.get("/:id", getImageByIdGallery);

router.get("/news/:newsId", getGalleryByNewsId);

router.post(
  "/news/:id",
  upload.array("files", 3), jwtMiddleware, checkRole('Admin'),
  createGalleryByNewsId,
);

router.delete('/:id', jwtMiddleware, checkRole('Admin'), deleteImageByIdGallery);

router.delete('/news/:id', jwtMiddleware, checkRole('Admin'), deleteGalleryByNewsId);

export default router;
