import models from "../models/index.mjs";

const commentAccessMiddleware = async (req, res, next) => {
  try {
    const { tid, uid } = req.params;

    // Userul are asignat taskul
    const isAssigned = await models.Task.findOne({
      where: {
        id: tid,
        assignedToId: uid,
      },
    });

    // Userul este ownerul
    const hasPermission = await models.Permission.findOne({
      where: {
        forResource: tid,
        forUser: uid,
        type: "task",
      },
    });

    if (!isAssigned && !hasPermission) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default commentAccessMiddleware;
