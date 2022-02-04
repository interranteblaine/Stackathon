import React from 'react'
import Navbar from './components/Navbar'
import Routes from './Routes'

const App = () => {
  return (
    <div className='main'>
      <Navbar />
      <Routes />
      <div className='footer'>
        <p><small>Market data from CoinMarketCap API & Historical daily price data from Coinbase API</small></p>
      </div>
    </div>
  )
}

export default App
