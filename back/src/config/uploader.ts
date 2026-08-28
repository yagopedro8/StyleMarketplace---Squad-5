import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadsPath = path.resolve(__dirname, "..", "..", "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

const uploader = multer({
  storage,
});

export const uploadSingle = uploader.single("file");

export default uploader;