import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryZoomContainer,
} from "victory";

const Historical = () => {
  const { historical: data } = useSelector((state) => state);
  const [chartDays, setChartDays] = useState(7);
  const [high, setHigh] = useState([]);
  const [low, setLow] = useState([]);

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
        <div>Historical data is not available</div>
      ) : (
        <div>
          <div onChange={handleRadioButtonChange}>
            <input type="radio" value={7} name="days" defaultChecked /> 7D
            <input type="radio" value={30} name="days" /> 30D
            <input type="radio" value={60} name="days" /> 60D
            <input type="radio" value={180} name="days" /> 180D
            <input type="radio" value={data.length} name="days" />{" "}
            {`${data.length}D`}
          </div>
          <div>
            <p>{`Low: ${low.date} ${low.close}`}</p>
            <p>{`High: ${high.date} ${high.close}`}</p>
          </div>
          <VictoryChart
            theme={VictoryTheme.material}
            width={550}
            height={300}
            scale={{ x: "time" }}
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
            <VictoryAxis crossAxis />
            <VictoryAxis dependentAxis />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default Historical;
