import React, { useState } from "react";
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
  const [zoom, setZoom] = useState({});

  return (
    <div>
      {!data.length ? (
        <div>Historical data is not available</div>
      ) : (
        <div>
          <VictoryChart
            theme={VictoryTheme.material}
            width={550}
            height={300}
            scale={{ x: "time" }}
            containerComponent={
              <VictoryZoomContainer
                responsive={false}
                zoomDimension="x"
                zoomDomain={zoom}
                onZoomDomainChange={setZoom}
              />
            }
          >
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={data}
              x="date"
              y="close"
            />
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default Historical;
