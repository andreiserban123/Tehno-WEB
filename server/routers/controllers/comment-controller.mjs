import models from "../../models/index.mjs";

const getAllTaskComments = async (req, res, next) => {
  try {
    const taskComments = await models.Comment.findAll({
      where: {
        taskId: req.params.tid,
      },
      include: [
        {
          model: models.User,
          attributes: ["email"],
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(taskComments);
  } catch (err) {
    next(err);
  }
};

const createTaskComment = async (req, res, next) => {
  try {
    const taskComment = await models.Comment.create({
      content: req.body.content,
      taskId: req.params.tid,
      userId: req.params.uid,
    });
    res.status(201).json(taskComment);
  } catch (error) {
    next(error);
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
  getAllTaskComments,
  createTaskComment,
  deleteComment,
  updateComment,
};
