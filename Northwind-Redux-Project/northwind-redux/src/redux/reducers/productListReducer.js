import * as actiontypes from '../actions/actionTypes'
import initialState from './initialState'

const productListReducer=(state=initialState.products,action)=>{
    switch (action.type) {
        case actiontypes.GET_PRODUCT_SUCCESS:
            return action.payload
        default:
            return state
    }
}


export default productListReducer