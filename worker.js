const { db, models: { Market, Aggregate } } = require('./server/db')
const axios = require('axios')

async function fetchData(uri, apiKey) {
    try {
        const response = await axios.get(uri, {
            headers: {
                'X-CMC_PRO_API_KEY': apiKey
            }
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

async function refreshData(apiKey) {
    try {
        const marketDataUri = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
        const aggregateDataUri = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';
        const metaDataUri = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info';
        const { data: marketData } = await fetchData(marketDataUri, apiKey);
        const { data: aggregateData } = await fetchData(aggregateDataUri, apiKey);
        const metaDataQueryParams = "?id=" + marketData.map(data => data.id).join(',');
        const { data: metaData } = await fetchData(metaDataUri + metaDataQueryParams, apiKey);

        // await Market.destroy({ truncate: true }); // clears instances in model
        await db.sync({ force: true }) // clears db and matches models to tables

        await Promise.all(marketData.map(async data => Market.create({
            cmc_id: data.id,
            last_updated: data.last_updated,
            name: data.name,
            symbol: data.symbol,
            slug: data.slug,
            cmc_rank: data.cmc_rank,
            circulating_supply: data.circulating_supply,
            total_supply: data.total_supply,
            price: data.quote.USD.price,
            volume_24h: data.quote.USD.volume_24h,
            volume_change_24h: data.quote.USD.volume_change_24h,
            percent_change_1h: data.quote.USD.percent_change_1h,
            percent_change_24h: data.quote.USD.percent_change_24h,
            percent_change_7d: data.quote.USD.percent_change_7d,
            percent_change_30d: data.quote.USD.percent_change_30d,
            percent_change_60d: data.quote.USD.percent_change_60d,
            percent_change_90d: data.quote.USD.percent_change_90d,
            market_cap: data.quote.USD.market_cap,
            market_cap_dominance: data.quote.USD.market_cap_dominance,
            fully_diluted_market_cap: data.quote.USD.fully_diluted_market_cap,
            logoUrl: metaData[data.id].logo,
            description: metaData[data.id].description
        })));

        await Aggregate.create({
            last_updated: aggregateData.quote.USD.last_updated,
            total_cryptocurrencies: aggregateData.total_cryptocurrencies,
            active_exchanges: aggregateData.active_exchanges,
            total_volume_24h_reported: aggregateData.quote.USD.total_volume_24h_reported,
            total_market_cap: aggregateData.quote.USD.total_market_cap,
            total_market_cap_yesterday: aggregateData.quote.USD.total_market_cap_yesterday,
            total_market_cap_yesterday_percentage_change: aggregateData.quote.USD.total_market_cap_yesterday_percentage_change
        })

        // await db.close();
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = refreshData
