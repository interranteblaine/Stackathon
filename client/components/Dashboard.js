import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = (props) => {
  const { livePrice, onCoinbase } = props;
  const { history } = useSelector((state) => state);

  if (onCoinbase) {
    return <p>{livePrice}</p>;
  } else {
    return <p>Not live</p>;
  }
};

export default Dashboard;
