const getUserTypeMiddleware = (type) => {
  return (req, res, next) => {
    if (req.user.type === type) {
      next()
    } else {
      res.status(403).send('Forbidden')
    }
  }
}

export default getUserTypeMiddleware