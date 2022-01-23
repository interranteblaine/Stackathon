import React, { useEffect, useState, useRef } from "react";

const LivePrice = (props) => {
  const { symbol, currency } = props;
  const [price, setPrice] = useState("0.00");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    const subscribe = {
      type: "subscribe",
      product_ids: [`${symbol}-${currency}`],
      channels: ["ticker"],
    };
    let request = JSON.stringify(subscribe);

    ws.current.addEventListener("open", () => {
      ws.current.send(request);
    });

    ws.current.addEventListener("message", (e) => {
        let data = JSON.parse(e.data);
        console.log(data.product_id);
      setPrice(data.price);
    });

    return () => {
      let unsubscribe = {
        type: "unsubscribe",
        product_ids: [`${symbol}-${currency}`],
        channels: ["ticker"],
      };
      let request = JSON.stringify(unsubscribe);
      ws.current.send(request);
      ws.current.close();
    };
  }, []);

  return <td>{price}</td>;
};

export default LivePrice;
