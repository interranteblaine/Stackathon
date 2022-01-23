import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchDetailsData } from "../store/details";
import LivePrice from "./LivePrice";
import { floatToDollars, formatPercent, formatBigFloat } from "../utility";

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
          <h3>{data.name}</h3>
          <LivePrice symbol={data.symbol} currency={'USD'} />
        </div>
      )}
    </div>
  );
};

export default Details;
