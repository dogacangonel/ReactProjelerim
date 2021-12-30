import * as actiontypes from "../actions/actionTypes"
import initialState from "./initialState";

export default function saveProductReducer (state=initialState.savedProduct,action) {
    switch (action.type) {
        case actiontypes.UPDATE_PRODUCT_SUCCESS:
            return action.payload
        case actiontypes.CREATE_PRODUCT_SUCCESS:
            return action.payload
        default:
            return state
    }
    
}