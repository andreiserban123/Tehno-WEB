import models from '../models/index.mjs'

export default async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      // if no token is provided, return 401 status code
      return res.status(401).json({ message: 'Unauthorized' })
    }
    // find user in database based on token
    const user = await models.User.findOne({
      where: {
        token: req.headers.authorization
      }
    })
    req.user = user
    if (!user) {
      // if user is found, add user to request object
      return res.status(401).json({ message: 'Unauthorized' })
    } 
    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}