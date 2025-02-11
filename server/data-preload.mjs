import models from './models/index.mjs'
import bcrypt from 'bcrypt'

const preloadData = async () => {
  await models.User.create({
    email: 'andrei@nowhere.net',
    passwordHash: await bcrypt.hash('welcome', 10),
    type: 'regular'
  })
  await models.User.create({
    email: 'andrei@somewhere.net',
    passwordHash: await bcrypt.hash('welcome', 10),
    type: 'regular'
  })
  await models.User.create({
    email: 'andrei@admin.net',
    passwordHash: await bcrypt.hash('welcome', 10),
    type: 'admin'
  })
}

try {
  await preloadData()
} catch (error) {
  console.warn(error)
}