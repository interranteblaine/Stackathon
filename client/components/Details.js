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
    dispatch(fetchHistoricalData(`${data.symbol}-USD`))
  }, [data])

  return (
    <div>
      {!data.cmc_id ? (
        <div className="details-container">
          <h3>Loading...</h3>
        </div>
      ) : (
        <div className="details-container">
          <div className="details-header">
            <div className="details-header-title">
              <p>
                <small>{`#${data.cmc_rank}`}</small>
              </p>
              <img
                src={data.logoUrl}
                style={{ width: "34px", height: "34px" }}
              />
              <h3>{data.name}</h3>
            </div>
            <div className="details-header-price">
              <p>
                <small>{`${data.symbol} 24H PRICE`}</small>
              </p>
              <h4>{floatToDollars(data.price)}</h4>
            </div>
          </div>
          <div className="details-info">
            <div className="details-info-kpi">
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
            </div>
            <div className="details-info-description">
              <p>DESCRIPTION</p>
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
