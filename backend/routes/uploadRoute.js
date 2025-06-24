import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import Image from "../models/Image.js";

// import {verifyToken} from '../middleware/verifyToken.js'

const router = express.Router();

// მულტერის კონფიგურაცია (ფაილის ატვირთვა)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

/**
 * GET - ყველა სურათისა და სათაურის გამოტანა
 */
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ _id: -1 }); // ბოლო ატვირთული ზემოთ
    res.status(200).json(images);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

/**
 * POST - ატვირთავს სურათს და სათაურს
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description  } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;
    const newImage = new Image({ title, description, imageUrl });
    await newImage.save();
    res.status(201).json({ message: "Uploaded successfully", image: newImage });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

/**
 * PUT - სათაურის განახლება
 */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = await Image.findById(req.params.id);

    if (!image) return res.status(404).json({ message: "Image not found" });

    // ძველი სურათის წაშლა თუ ახალი აიტვირთა
    if (req.file) {
      const oldPath = path.join("uploads", path.basename(image.imageUrl));
      fs.unlink(oldPath, (err) => {
        if (err) console.warn("ძველი სურათის წაშლა ვერ მოხერხდა:", err);
      });

      image.imageUrl = `/uploads/${req.file.filename}`;
    }

    image.title = title || image.title;
    image.description = description || image.description;

    const updated = await image.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error("რედაქტირების შეცდომა:", err);
    res.status(500).json({ message: "ჩასწორება ვერ მოხერხდა" });
  }
});

/**
 * DELETE - კონკრეტული ჩანაწერის და ფაილის წაშლა
 */

router.delete("/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // ფაილის წაშლა uploads ფოლდერიდან
    const imagePath = path.join("uploads", path.basename(image.imageUrl));
    fs.unlink(imagePath, (err) => {
      if (err) console.warn("ფაილის წაშლა ვერ მოხერხდა:", err);
    });

    // მონაცემის წაშლა MongoDB-დან
    await Image.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "წაშლა წარმატებულია ✅" });
  } catch (error) {
    console.error("წაშლის შეცდომა:", error);
    res.status(500).json({ message: "წაშლა ვერ მოხერხდა" });
  }
});



export default router;
