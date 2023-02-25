import * as actionType from '../action';

const initialState = {
    results: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.STORE_RESULT:{
            const newResults= state.results.concat({id: new Date(), value: action.resultValue});
            return{
                ...state,
                results: newResults
            }
        }
        case actionType.DELETE_RESULT:{
            const newResults = state.results.filter(result => result.id !== action.resultId);
            return{
                ...state,
                results: newResults
            }
        }
        default:
            return state;
    }
}


export default reducer;