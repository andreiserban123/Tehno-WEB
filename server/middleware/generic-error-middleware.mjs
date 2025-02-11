export default (err, req, res, next) => {
  // placeholder logging logic
  console.warn(err)
  res.status(500).json({ status: 'server error' })
}