import models from "../../models/index.mjs";

const getAllCommentsForTask = async (req, res, next) => {
  try {
    const comments = await models.Comment.findAll({
      where: { taskId: req.params.tid },
      include: {
        model: models.User,
        attributes: ["id", "email"],
      },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const createCommentForTask = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = await models.Comment.create({
      content,
      taskId: req.params.tid,
      userId: req.params.uid,
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

// UPDATE - doar ownerul poate modifica comentariul
const updateComment = async (req, res, next) => {
  try {
    const comment = await models.Comment.findOne({
      where: {
        id: req.params.cid,
        userId: req.params.uid,
      },
    });

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found or unauthorized" });
    }

    await comment.update({ content: req.body.content });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

// DELETE - doar ownerul poate sterge comentariul
const deleteComment = async (req, res, next) => {
  try {
    const comment = await models.Comment.findOne({
      where: {
        id: req.params.cid,
        userId: req.params.uid, // User can only delete their own comments
      },
    });

    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found or unauthorized" });
    }

    await comment.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

export default {
  getAllCommentsForTask,
  createCommentForTask,
  updateComment,
  deleteComment,
};
