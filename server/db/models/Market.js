const Sequelize = require('sequelize')
const db = require('../db')

const Market = db.define('market', {
    cmc_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    last_updated: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING
    },
    symbol: {
        type: Sequelize.STRING
    },
    slug: {
        type: Sequelize.STRING
    },
    cmc_rank: {
        type: Sequelize.INTEGER
    },
    circulating_supply: {
        type: Sequelize.FLOAT
    },
    total_supply: {
        type: Sequelize.FLOAT
    },
    price: {
        type: Sequelize.FLOAT
    },
    volume_24h: {
        type: Sequelize.FLOAT
    },
    volume_change_24h: {
        type: Sequelize.FLOAT
    },
    percent_change_1h: {
        type: Sequelize.FLOAT
    },
    percent_change_24h: {
        type: Sequelize.FLOAT
    },
    percent_change_7d: {
        type: Sequelize.FLOAT
    },
    percent_change_30d: {
        type: Sequelize.FLOAT
    },
    percent_change_60d: {
        type: Sequelize.FLOAT
    },
    percent_change_90d: {
        type: Sequelize.FLOAT
    },
    market_cap: {
        type: Sequelize.FLOAT
    },
    market_cap_dominance: {
        type: Sequelize.FLOAT
    },
    fully_diluted_market_cap: {
        type: Sequelize.FLOAT
    }
})

module.exports = Market
