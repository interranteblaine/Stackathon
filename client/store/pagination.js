const SET_PAGE = 'SET_PAGE';

export const setPage = page => ({type: SET_PAGE, page});

export default function paginationReducer (state = 0, action) {
    switch (action.type) {
        case SET_PAGE:
            return action.page;
        default:
            return state;
    }
}