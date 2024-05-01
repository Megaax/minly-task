import { Request, Response } from "express";
import Content from "../models/content.model";
import * as sharp from "sharp";
import {
  uploadFile,
  generateFileName,
  getObjectSignedUrl,
} from "../services/fileupload.service";


const getAllContent = async (req, res) => {
  try {
    // Fetch all content from the database
    const allContent = await Content.find({}, { url: true, likes: true, user: true });


    // Send the content with URL and like status to the client
    res.json(allContent);
  } catch (error) {
    console.error('Error fetching all content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const uploadContent = async (req: Request, res: Response) => {
  const file = req.file;
  const description = req.body.description;
  const type = req.body.type;
  const currentUser = req.currentUser;
  const imageName = generateFileName();
  const fileBuffer =
    type === "image"
      ? await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer()
      : file.buffer;

  console.log(req);

  await uploadFile(fileBuffer, imageName, file.mimetype);
  const url = await getObjectSignedUrl(imageName);

  const newContent = new Content({
    user: currentUser.userId,
    type: type,
    url: url,
    description: description,
  });

  await newContent.save();

  res.send("Post created");
};

const likeContent = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;

    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const { userId } = req.currentUser;

    // Check if the likes field exists and is an array
    if (!Array.isArray(content.likes)) {
      // If not, initialize it as an empty array
      content.likes = [];
    }

    // Check if the user has already liked the content
    const isLiked = content.likes.includes(userId);

    if (isLiked) {
      return res.status(400).json({ message: "Content already liked" });
    }

    // Add the user ID to the likes array
    content.likes.push(userId);
    await content.save();

    res.json({ message: "Content liked successfully" });
  } catch (error) {
    console.error('Error liking content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const unlikeContent = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;

    const content = await Content.findById(contentId);

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    const { userId } = req.currentUser;

    // Check if the likes field exists and is an array
    if (!Array.isArray(content.likes)) {
      // If not, initialize it as an empty array
      content.likes = [];
    }

    // Check if the user has already liked the content
    const indexOfUser = content.likes.indexOf(userId);

    if (indexOfUser === -1) {
      return res.status(400).json({ message: "Content not liked yet" });
    }

    // Remove the user ID from the likes array
    content.likes.splice(indexOfUser, 1);
    await content.save();

    res.json({ message: "Content unliked successfully" });
  } catch (error) {
    console.error('Error unliking content:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export { getAllContent, uploadContent, likeContent, unlikeContent };
