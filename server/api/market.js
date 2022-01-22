const router = require('express').Router()
const { models: { Market }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const pageNum = Number.parseInt(req.query.page);
        const sizeNum = Number.parseInt(req.query.size);
        
        let page = 0;
        if (!Number.isNaN(pageNum) && pageNum > 0) {
            page = pageNum;
        }

        let size = 10;
        if (!Number.isNaN(sizeNum) && sizeNum > 0 && sizeNum < 10) {
            size = sizeNum;
        }

        const data = await Market.findAndCountAll({
            limit: size,
            offset: page * size
        });

        res.json({
            content: data.rows,
            totalPages: Math.ceil(data.count / size)
        });
    } catch (error) {
        next(error)
    }
})