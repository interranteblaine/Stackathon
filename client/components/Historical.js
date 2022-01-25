import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import { formatDayDate, floatToDollars } from "../utility";

const Historical = () => {
  const { historical: data } = useSelector((state) => state);
  const [chartDays, setChartDays] = useState(7);
  const [high, setHigh] = useState({});
  const [low, setLow] = useState({});

  useEffect(() => {
    setLow(
      data
        .filter((e, i) => i <= chartDays)
        .reduce((a, b) => (a.close <= b.close ? a : b), {})
    );
    setHigh(
      data
        .filter((e, i) => i <= chartDays)
        .reduce((a, b) => (a.close >= b.close ? a : b), {})
    );
  }, [data, chartDays]);

  function handleRadioButtonChange(e) {
    setChartDays(e.target.value);
  }

  return (
    <div>
      {!data.length ? (
        <div className="chart-container">Historical data is not available</div>
      ) : (
        <div className="chart-container">
          <div className="chart info-tile">
            <div className="above-chart">
              <div
                onChange={handleRadioButtonChange}
                className="days-selection-button-container"
              >
                <input type="radio" value={7} name="days" defaultChecked />{" "}
                <small>7D</small>
                <input type="radio" value={30} name="days" /> <small>30D</small>
                <input type="radio" value={60} name="days" /> <small>60D</small>
                <input type="radio" value={180} name="days" />{" "}
                <small>180D</small>
                <input type="radio" value={data.length} name="days" />{" "}
                <small>{`${data.length}D`}</small>
              </div>
              <p>
                <small>{`${chartDays}D Low: `}</small>{" "}
                {` ${floatToDollars(low.close)}`}
              </p>
              <p>
                <small>{`${chartDays}D High: `}</small>{" "}
                {`${floatToDollars(high.close)}`}
              </p>
            </div>
            <VictoryChart
              width={1200}
              height={500}
              scale={{ x: "time" }}
              padding={{ top: 5, bottom: 50, left: 50, right: 50 }}
              containerComponent={
                <VictoryVoronoiContainer
                  responsive={false}
                  labels={({ datum }) =>
                    `${formatDayDate(datum.date)} ${floatToDollars(
                      datum.close
                    )}`
                  }
                  labelComponent={
                    <VictoryTooltip
                      dy={-7}
                      constrainToVisibleArea
                      flyoutStyle={{
                        fill: "gray",
                      }}
                      style={{
                        fill: "white",
                        fontSize: 18,
                      }}
                    />
                  }
                />
              }
            >
              <VictoryLine
                style={{
                  data: { stroke: "#2aea20" },
                  parent: { border: "1px solid #000000" },
                }}
                data={data.filter((e, i) => i <= chartDays)}
                x="date"
                y="close"
              />
              <VictoryAxis
                crossAxis
                style={{
                  tickLabels: {
                    fill: "white",
                    fontSize: 18,
                  },
                  axis: {
                    stroke: "white",
                  },
                }}
              />
              <VictoryAxis
                dependentAxis
                style={{
                  tickLabels: {
                    fill: "white",
                  },
                  axis: {
                    stroke: "white",
                  },
                }}
              />
            </VictoryChart>
          </div>
        </div>
      )}
    </div>
  );
};

export default Historical;
