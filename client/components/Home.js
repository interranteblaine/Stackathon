import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMarketData } from "../store/home";
import { floatToDollars, formatPercent, formatBigFloat } from "../utility";
import { setPage } from "../store/pagination";

const Home = () => {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { market: data, page } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMarketData(page, itemsPerPage));
  }, [page]);

  return (
    <div className="content-assets">
      <div className="assets-pagination">
        <p>
          <small>{`Displaying page ${page + 1} of ${
            !data.totalPages ? 0 : data.totalPages
          }`}</small>
        </p>
        <button onClick={() => dispatch(setPage(Math.max(0, page - 1)))}>
          Prev
        </button>
        <button
          onClick={() =>
            dispatch(
              setPage(
                Math.min(!data.totalPages ? 0 : data.totalPages - 1, page + 1)
              )
            )
          }
        >
          Next
        </button>
      </div>
      <table>
        <thead>
          <tr className="table-header-row">
            <td className="text-align-center">#</td>
            <td className="text-align-left">NAME</td>
            <td>PRICE</td>
            <td>24H %</td>
            <td>7D %</td>
            <td>MARKET CAP</td>
            <td>VOLUME(24H)</td>
            <td>CIRCULATING SUPPLY</td>
          </tr>
        </thead>
        <tbody>
          {!data.content ? (
            <tr>
              <td colSpan={8}>Loading...</td>
            </tr>
          ) : (
            data.content.map((d) => (
              <tr key={d.cmc_id} className="table-row-hover">
                <td className="text-align-center">{d.cmc_rank}</td>
                <td className="text-align-left">
                  <div className="table-name">
                    <img src={d.logoUrl} />
                    <Link to={`/details/${d.cmc_id}`}>{d.name}</Link>
                  </div>
                </td>
                <td>{floatToDollars(d.price)}</td>
                <td>{formatPercent(d.percent_change_24h)}</td>
                <td>{formatPercent(d.percent_change_7d)}</td>
                <td>{floatToDollars(d.market_cap)}</td>
                <td>{formatBigFloat(d.volume_24h)}</td>
                <td>{formatBigFloat(d.circulating_supply)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
