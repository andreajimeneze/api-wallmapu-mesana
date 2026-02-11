import express from "express";
import {
  getGalleryByNews,
  createGalleryNews,
} from "./news-gallery.controller.js";
import { upload } from "../../config/multer.js";

const router = express.Router();

router.get("/:news_id", getGalleryByNews);

router.post(
  "/news/:news_id",
  upload.single("url"),
  createGalleryNews,
);

export default router;
