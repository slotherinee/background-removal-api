import { Router } from "express";
import multer from "multer";
import { removeBackgroundController } from "../controllers/background.controller";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/remove-background", upload.single("image"), removeBackgroundController);

export default router;
