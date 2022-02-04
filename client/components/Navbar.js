import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAggregateData } from "../store/navbar";
import { floatToDollars, formatPercent, timeStampToDate } from "../utility";

const Navbar = () => {
  const dispatch = useDispatch();
  const {
    aggregate: {
      last_updated,
      total_market_cap,
      total_market_cap_yesterday_percentage_change,
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchAggregateData());
  }, []);

  return (
    <div className="header">
      {!last_updated ? (
        <div className="top-info-bar">
          <p><small>Crypto Market Cap:</small> loading...</p>
          <p><small>24h %:</small> loading...</p>
          <p><small>Last Updated:</small> loading...</p>
        </div>
      ) : (
        <div className="top-info-bar">
          <p>
            <small>Crypto Market Cap:</small>{" "}
            {floatToDollars(total_market_cap)}
          </p>
          <p>
            <small>24h %:</small>{" "}
            {formatPercent(total_market_cap_yesterday_percentage_change)}
          </p>
          <p><small>Market Data Last Updated:</small>{" "}
            {timeStampToDate(last_updated)}
          </p>
        </div>
      )}
      <div className="logo-name-nav-container">
        <img src="/torch.png" alt="torch" id="torch"/>
        <h1>Torch</h1>
        <nav>
            <Link to="/home">Assets</Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
