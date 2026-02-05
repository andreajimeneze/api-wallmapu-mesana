import express from "express";
import {
  getGalleryByNews,
  createGalleryNews,
} from "./news-gallery.controller.js";
import { upload } from "../../config/multer.js";
import { processImage } from "../../middlewares/processImage.js";

const router = express.Router();

router.get("/:news_id", getGalleryByNews);

router.post(
  "/:news_id",
  upload.single("image"),
  processImage("news-gallery"),
  createGalleryNews,
);

export default router;
