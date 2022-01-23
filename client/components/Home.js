import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMarketData } from "../store/home";
import { floatToDollars, formatPercent, formatBigFloat } from "../utility";
import { setPage } from "../store/pagination"

const Home = () => {
  const dispatch = useDispatch();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { market: data, page } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchMarketData(page, itemsPerPage));
  }, [page]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td colSpan={8}>
              <div>
                <p>{`Displaying page ${page + 1} of ${
                  !data.totalPages ? 0 : data.totalPages
                }`}</p>
                <button onClick={() => dispatch(setPage(Math.max(0, page - 1)))}>
                  Prev
                </button>
                <button
                  onClick={() =>
                    dispatch(setPage(
                      Math.min(
                        !data.totalPages ? 0 : data.totalPages - 1,
                        page + 1
                      )
                    ))
                  }
                >
                  Next
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>#</td>
            <td>Name</td>
            <td>Price</td>
            <td>24h %</td>
            <td>7d %</td>
            <td>Market Cap</td>
            <td>Volume(24h)</td>
            <td>Circulating Supply</td>
          </tr>
        </thead>
        <tbody>
          {!data.content ? (
            <tr>
              <td colSpan={8}>Loading...</td>
            </tr>
          ) : (
            data.content.map((d) => (
              <tr key={d.cmc_id}>
                <td>{d.cmc_rank}</td>
                <td><Link to={`/details/${d.cmc_id}`}>{d.name}</Link></td>
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
