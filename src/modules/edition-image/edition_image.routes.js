import express from 'express';
import { createCoverImage } from './edition-image.controller.js';
import { upload } from '../../services/images/multer.js';

const router = express.Router();

router.post('/', upload.single('file'), createCoverImage);

export default router;