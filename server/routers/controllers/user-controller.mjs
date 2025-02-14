import { Op } from 'sequelize'
import models from '../../models/index.mjs'

const getUserProfile = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.params.uid)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    next(err)
  }
}

const suggestUser = async (req, res, next) => {
  try {
    const users = await models.User.findAll({
      where: {
        email: {
          [Op.like]: `%${req.query.partial}%`
        }
      },
      attributes: ['id', 'email'],
      limit: 5
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

export default {
  getUserProfile,
  suggestUser
}
