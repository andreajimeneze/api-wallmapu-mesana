import express from "express";
import {
  getGalleryByNews,
  createGalleryNews,
} from "./news-gallery.controller.js";
import { upload } from "../../config/multer.js";

const router = express.Router();

router.get("/:id_news", getGalleryByNews);

router.post(
  "/news/:id_news",
  upload.single("url"),
  createGalleryNews,
);

export default router;
