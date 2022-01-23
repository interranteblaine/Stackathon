import axios from 'axios'

const SET_DETAILS_DATA = 'SET_DETAILS_DATA';

const setDetailsData = data => ({type: SET_DETAILS_DATA, data});

export const fetchDetailsData = (cmc_id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/market/${cmc_id}`);
            dispatch(setDetailsData(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export default function detailsReducer (state = {}, action) {
    switch (action.type) {
        case SET_DETAILS_DATA:
            return action.data;
        default:
            return state;
    }
}