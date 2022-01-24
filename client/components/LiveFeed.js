import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchHistoricalData } from '../store/historical'
import axios from "axios";
import Dashboard from "./Dashboard";

const LiveFeed = (props) => {
  const { symbol } = props;
  const [price, setPrice] = useState("0.00");
  const [onCoinbase, setOnCoinbase] = useState(false);
  const ws = useRef(null);
  const coinBaseUri = "https://api.pro.coinbase.com";
  const currency = "USD";
  const baseQuotePair = `${symbol}-${currency}`;
  const dispatch = useDispatch();

  useEffect(() => {
    // watches for changes in symbol on props
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    async function isOnCoinbase(symbol, currency) {
      try {
        const { data } = await axios.get(`${coinBaseUri}/products`);
        const foundItem = data.find(
          (d) => d.quote_currency === currency && d.base_currency === symbol
        );
        if (foundItem) setOnCoinbase(true);
      } catch (error) {
        console.log(error);
      }
    }

    isOnCoinbase(symbol, currency);
  }, [symbol]);

  useEffect(() => {
    // watches for changes in onCoinbase on state
    if (onCoinbase) {
      dispatch(fetchHistoricalData(coinBaseUri, baseQuotePair));

      const subscribeMessage = {
        type: "subscribe",
        product_ids: [baseQuotePair],
        channels: ["ticker"],
      };
      let subscribeRequest = JSON.stringify(subscribeMessage);
  
      ws.current.addEventListener("open", () => {
        ws.current.send(subscribeRequest);
      });
  
      ws.current.addEventListener("message", (e) => {
        let data = JSON.parse(e.data);
        if (data.type === "ticker" && data.product_id === baseQuotePair) {
          setPrice(data.price);
        }
      });
    }
  }, [onCoinbase])

  useEffect(() => {
    // returns a function to unsubscribe and close websocket when the component unmounts
    return () => {
      let unsubscribeMessage = {
        type: "unsubscribe",
        product_ids: [baseQuotePair],
        channels: ["ticker"],
      };
      let unsubscribeRequest = JSON.stringify(unsubscribeMessage);
      ws.current.send(unsubscribeRequest);
      ws.current.close();
    };
  }, []);

  return <Dashboard livePrice={price} onCoinbase={onCoinbase} />;
};

export default LiveFeed;
