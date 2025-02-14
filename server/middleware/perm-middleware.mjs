import models from '../models/index.mjs'

export default (resourceIdKey, rights) => {
  return async (req, res, next) => {
    const permission = await models.Permission.findOne({
      where: {
        forResource: req.params[resourceIdKey],
        forUser: req.user.id
      }
    })
    if (permission && rights.every(right => permission.rights.includes(right))) {
      next()
    } else {
      res.status(403).json({ message: 'Forbidden' })
    }
  }  
}