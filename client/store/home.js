import axios from 'axios'

const SET_MARKET_DATA = 'SET_MARKET_DATA';

const setMarketData = data => ({type: SET_MARKET_DATA, data});

export const fetchMarketData = (page, itemsPerPage) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/market?page=${page}&size=${itemsPerPage}`);
            dispatch(setMarketData(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export default function marketReducer (state = {}, action) {
    switch (action.type) {
        case SET_MARKET_DATA:
            return action.data;
        default:
            return state;
    }
}