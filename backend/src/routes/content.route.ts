import * as express from "express";
import { Router } from "express";
import verifyToken from "../middleware/verifyToken";
import { upload } from "../services/fileupload.service";
import {
  getAllContent,
  uploadContent,
  likeContent,
  unlikeContent
} from "../controllers/content.controller";

const router: Router = express.Router();

router.post("/upload", verifyToken, upload.single("content"), uploadContent);

router.get("/", getAllContent);
router.post("/:contentId/like", verifyToken, likeContent);
router.post("/:contentId/unlike", verifyToken, unlikeContent);

export default router;
