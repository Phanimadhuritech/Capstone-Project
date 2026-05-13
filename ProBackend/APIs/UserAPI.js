import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";
export const userApp = exp.Router();

//Read articles of all authors
userApp.get("/articles", verifyToken("USER", "AUTHOR"), async (req, res) => {
  //read artcles
  const articlesList = await ArticleModel.find({ isArticleActive: true });
  //send res
  res.status(200).json({ message: "artciles", payload: articlesList });
});

//Read single article by ID
userApp.get("/article/:id", verifyToken("USER", "AUTHOR"), async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findById(id).populate("comments.user");
    if (!article || !article.isArticleActive) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article retrieved", payload: article });
  } catch (err) {
    res.status(400).json({ error: "Invalid article ID" });
  }
});

//Add comment to an article
userApp.put("/articles", verifyToken("USER", "AUTHOR"), async (req, res) => {
  //get body from req
  const { articleId, comment } = req.body;

  if (!articleId) {
    return res.status(400).json({ message: "articleId is required" });
  }

  if (!comment || typeof comment !== "string" || !comment.trim()) {
    return res.status(400).json({ message: "Comment cannot be empty" });
  }

  //check article
  const articleDocument = await ArticleModel.findOne({ _id: articleId, isArticleActive: true });

  //if article not found
  if (!articleDocument) {
    return res.status(404).json({ message: "Article not found" });
  }
  //get user id
  const userId = req.user?.id;
  //add comment to comments array of articleDocument
  articleDocument.comments.push({ user: userId, comment: comment.trim() });
  //save
  await articleDocument.save();
  await articleDocument.populate("comments.user");
  //send res
  res.status(200).json({ message: "Comment added successfully", payload: articleDocument });
});