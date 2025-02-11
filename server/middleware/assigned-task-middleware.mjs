import models from '../models/index.mjs'

export default async (req, res, next) => {
  try {
    const task = await models.Task.findOne({
      where: {
        id: req.params.tid,
        assignedToId: req.params.uid
      }
    })

    console.warn(task)

    if (!task) {
      return res.status(403).json({ message: 'Task not found' })
    }

    next()
  } catch (err) {
    next(err)
  }
}