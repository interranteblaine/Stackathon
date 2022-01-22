const router = require('express').Router()
const { models: { Aggregate }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const data = await Aggregate.findOne({ where: { id: 1 }});
        res.json(data);
    } catch (error) {
        next(error)
    }
})