const db = require('./db')

const Market = require('./models/Market')
const Aggregate = require('./models/Aggregate')

//associations could go here!

module.exports = {
  db,
  models: {
    Market,
    Aggregate
  },
}
