export const floatToDollars = (float) => {
  if (float > 0.01) {
    return parseFloat(float).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  } else {
    return parseFloat(float).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
      style: "currency",
      currency: "USD",
    });
  }
};

export const formatPercent = (float) => {
  return `${float.toFixed(2)}%`;
};

export const timeStampToDate = (timeStamp) => {
  return timeStamp.slice(0, 10);
};

export const formatBigFloat = (float) => {
  return Math.round(float).toLocaleString("en");
};

export const formatLivePrice = (str) => {
  return floatToDollars(parseFloat(str));
};

export const formatHistoricalData = (arr) => {
  let formattedResults = [];
  for (let i = 0; i < arr.length; i++) {
    let date = new Date(arr[i][0] * 1000); 
    formattedResults.push({
      date,
      low: arr[i][1],
      high: arr[i][2],
      open: arr[i][3],
      close: arr[i][4],
      volume: arr[i][5]
    });
  }
  return formattedResults;
}

export const formatDayDate = (dateObj) => {
  const date = new Date (Date.parse(dateObj));
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}