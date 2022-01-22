export const floatToDollars = (float) => {
    return float.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD' 
    });
}

export const formatPercent = (float) => {
    return `${float.toFixed(2)}%`;
}

export const timeStampToDate = (timeStamp) => {
    return timeStamp.slice(0, 10);
}

export const formatBigFloat = (float) => {
    return Math.round(float).toLocaleString('en');
}
