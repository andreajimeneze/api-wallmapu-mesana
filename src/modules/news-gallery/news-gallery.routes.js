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

// router.post(
//   "/news/:id",
//   (req, res, next) => {
//     console.log("AFTER ROUTE");
//     next();
//   },
//   jwtMiddleware,
//   checkRole("Admin"),
//   upload.array("files", 3),
//   createGalleryByNewsId
// );
router.post(
  "/news/:newsId",
  jwtMiddleware, checkRole('Admin'),
  upload.array("files", 3), 
  createGalleryByNewsId,
);

router.delete('/:id', jwtMiddleware, checkRole('Admin'), deleteImageByIdGallery);

router.delete('/news/:newsId', jwtMiddleware, checkRole('Admin'), deleteGalleryByNewsId);

export default router;
