import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchDetailsData } from "../store/details";
import { floatToDollars, formatPercent, formatBigFloat } from "../utility";
import LivePrice from "./LivePrice";

const Details = () => {
  const { cmc_id } = useParams();
  const dispatch = useDispatch();
  const { details: data } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchDetailsData(cmc_id));
  }, []);

  return (
    <div>
      {!data.cmc_id ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div>
          <div>
            <p><small>{`#${data.cmc_id}`}</small></p>
            <img src={data.logoUrl} style={{width: "34px", height: "34px"}}/>
            <h3>{data.name}</h3>
            <div>
              <h4>{floatToDollars(data.price)}</h4>
              <p><small>{`(${data.symbol} 24H PRICE)`}</small></p>
            </div>
            {/* <LivePrice symbol={data.symbol} currency={'USD'} /> */}
          </div>
          <div>
            <div>
              <p>MARKET CAP (24H)</p>
              <p>{floatToDollars(data.market_cap)}</p>
            </div>
            <div>
              <p>VOLUME (24H)</p>
              <p>{formatBigFloat(data.volume_24h)}</p>
            </div>
            <div>
              <p>CIRCULATING SUPPLY</p>
              <p>{formatBigFloat(data.circulating_supply)}</p>
            </div>
            <div>
              <p>PRICE CHANGE</p>
              <p><small>24H </small>{formatPercent(data.percent_change_24h)}</p>
              <p><small>7D </small>{formatPercent(data.percent_change_7d)}</p>
              <p><small>30D </small>{formatPercent(data.percent_change_30d)}</p>
              <p><small>60D </small>{formatPercent(data.percent_change_60d)}</p>
              <p><small>90D </small>{formatPercent(data.percent_change_90d)}</p>
            </div>
          </div>
          <div>
            <p>DESCRIPTION</p>
            <p>{data.description}</p>
          </div>

        </div>
      )}
    </div>
  );
};

export default Details;
