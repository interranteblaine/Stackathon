import React, { useEffect, useState, useRef } from "react";
import { formatLivePrice } from "../utility";

const LivePrice = (props) => {
  const { symbol, currency } = props;
  const [price, setPrice] = useState("0.00");
  const ws = useRef(null);

  useEffect(() => {
    // watches for changes in symbol prop
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    const productIdPair = `${symbol}-${currency}`;

    const subscribeMessage = {
      type: "subscribe",
      product_ids: [productIdPair],
      channels: ["ticker"],
    };
    let subscribeRequest = JSON.stringify(subscribeMessage);

    ws.current.addEventListener("open", () => {
      ws.current.send(subscribeRequest);
    });

    ws.current.addEventListener("message", (e) => {
        let data = JSON.parse(e.data);
        if (data.type === "ticker" && data.product_id === productIdPair) {
          setPrice(data.price);
        }
    });
  }, [symbol]);

  useEffect(() => {
    // returns a function to unsubscribe and close websocket when the component unmounts
    return () => {
      let unsubscribeMessage = {
        type: "unsubscribe",
        product_ids: [`${symbol}-${currency}`],
        channels: ["ticker"],
      };
      let unsubscribeRequest = JSON.stringify(unsubscribeMessage);
      ws.current.send(unsubscribeRequest);
      ws.current.close();
    };
  }, []);

  return <p>{formatLivePrice(price)}</p>;
};

export default LivePrice;
