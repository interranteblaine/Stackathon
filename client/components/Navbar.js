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
    <div>
      {!last_updated ? (
        <div>
          <p>Last Updated: loading...</p>
          <p>Market Cap: loading...</p>
          <p>24h %: loading...</p>
        </div>
      ) : (
        <div>
          <p>
            Market Cap:{" "}
            {floatToDollars(total_market_cap)}
          </p>
          <p>
            24h %:{" "}
            {formatPercent(total_market_cap_yesterday_percentage_change)}
          </p>
          <p>Market Data Last Updated:{" "}
            {timeStampToDate(last_updated)}
          </p>
        </div>
      )}
      <div>
        <img src="/torch.png" alt="torch" id="torch"/>
        <h1>Torch</h1>
      </div>
      <nav>
        <div>
          <Link to="/home">Home</Link>
        </div>
      </nav>
      <hr />
    </div>
  );
};

export default Navbar;
