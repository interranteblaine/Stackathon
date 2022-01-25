import React, { useEffect, useState, useRef } from "react";

const LiveFeed = (props) => {
  const { symbol } = props;
  const [price, setPrice] = useState("0.00");
  const ws = useRef(null);
  const currency = "USD";
  const baseQuotePair = `${symbol}-${currency}`;

  useEffect(() => {
    // watches for changes in symbol on props
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
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
  }, [symbol]);

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

  return <p>{price}</p>;
};

export default LiveFeed;
