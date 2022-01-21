const Sequelize = require('sequelize')
const db = require('../db')

const Aggregate = db.define('Aggregate', {
    last_updated: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    total_cryptocurrencies: {
        type: Sequelize.FLOAT
    },
    active_exchanges: {
        type: Sequelize.FLOAT
    },
    total_volume_24h_reported: {
        type: Sequelize.FLOAT
    },
    total_market_cap: {
        type: Sequelize.FLOAT
    },
    total_market_cap_yesterday: {
        type: Sequelize.FLOAT
    },
    total_market_cap_yesterday_percentage_change: {
        type: Sequelize.FLOAT
    }
})

module.exports = Aggregate