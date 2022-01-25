import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchDetailsData } from "../store/details";
import { fetchHistoricalData } from "../store/historical";
import { floatToDollars, formatPercent, formatBigFloat } from "../utility";
import Historical from "./Historical";

const Details = () => {
  const { cmc_id } = useParams();
  const dispatch = useDispatch();
  const { details: data } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchDetailsData(cmc_id));
  }, []);

  useEffect(() => {
    if (!data.symbol) return;
    dispatch(fetchHistoricalData(`${data.symbol}-USD`));
  }, [data]);

  return (
    <div className="details-container">
      {!data.cmc_id ? (
        <div className="details-main">
          <h3>Loading...</h3>
        </div>
      ) : (
        <div>
          <div className="details-main">
            <div className="details-header info-tile">
              <div className="details-header-title">
                <img src={data.logoUrl} />
                <h2>{data.name}</h2>
              </div>
              <div className="details-header-price">
                <p>
                  <small>{`${data.symbol} 24H PRICE USD`}</small>
                </p>
                <h2>{floatToDollars(data.price)}</h2>
              </div>
            </div>
            <div className="details-price info-tile">
              <p className="details-title">PRICE CHANGE</p>
              <p>
                <small>24H </small>
                {formatPercent(data.percent_change_24h)}
              </p>
              <p>
                <small>7D </small>
                {formatPercent(data.percent_change_7d)}
              </p>
              <p>
                <small>30D </small>
                {formatPercent(data.percent_change_30d)}
              </p>
              <p>
                <small>60D </small>
                {formatPercent(data.percent_change_60d)}
              </p>
              <p>
                <small>90D </small>
                {formatPercent(data.percent_change_90d)}
              </p>
            </div>
            <div className="details-info info-tile">
              <p className="details-title">MARKET CAP (24H)</p>
              <p>{floatToDollars(data.market_cap)}</p>

              <p className="details-title">VOLUME (24H)</p>
              <p>{formatBigFloat(data.volume_24h)}</p>

              <p className="details-title">CIRCULATING SUPPLY</p>
              <p>{formatBigFloat(data.circulating_supply)}</p>
            </div>

            <div className="details-info-description info-tile">
              <p className="details-title">DESCRIPTION</p>
              <p>{data.description}</p>
            </div>
          </div>
          <Historical />
        </div>
      )}
    </div>
  );
};

export default Details;
