import axios from 'axios'

const SET_AGGREGATE_DATA = 'SET_AGGREGATE_DATA';

const setAggregateData = data => ({type: SET_AGGREGATE_DATA, data});

export const fetchAggregateData = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/aggregate');
            dispatch(setAggregateData(data));
        } catch (error) {
            console.log(error)
        }
    }
}

export default function aggregateReducer (state = {}, action) {
    switch (action.type) {
        case SET_AGGREGATE_DATA:
            return action.data;
        default:
            return state;
    }
}