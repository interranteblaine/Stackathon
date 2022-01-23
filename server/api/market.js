const router = require("express").Router();
const {
  models: { Market },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
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
      offset: page * size,
      order: [["cmc_rank", "ASC"]],
      attributes: [
        "cmc_id",
        "cmc_rank",
        "name",
        "symbol",
        "price",
        "percent_change_24h",
        "percent_change_7d",
        "market_cap",
        "volume_24h",
        "circulating_supply",
      ],
    });

    res.json({
      content: data.rows,
      totalPages: Math.ceil(data.count / size),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:cmc_id", async (req, res, next) => {
  try {
    const { cmc_id } = req.params;
    const data = await Market.findByPk(cmc_id);
    if (!data) {
      const error = new Error("Cryptocurrency not found");
      error.status = 404;
      next(error);
    } else {
      res.json(data);
    }
  } catch (error) {
    next(error);
  }
});
