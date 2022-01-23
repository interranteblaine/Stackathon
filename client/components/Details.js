import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchDetailsData } from "../store/details";
import { floatToDollars, formatPercent, formatBigFloat } from "../utility";

const Details = () => {
  const { cmc_id } = useParams();
  const dispatch = useDispatch();
  const { details } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchDetailsData(cmc_id));
  }, []);

  return (
    <div>
      {!details.cmc_id ? (
        <div>
          <h3>Loading...</h3>
        </div>
      ) : (
        <div>
          <h3>{details.name}</h3>
        </div>
      )}
    </div>
  );
};

export default Details;
