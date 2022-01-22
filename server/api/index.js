const router = require('express').Router()
module.exports = router

router.use('/market', require('./market'))
router.use('/aggregate', require('./aggregate'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
