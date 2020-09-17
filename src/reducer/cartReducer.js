import {GET_CART, GET_CART_END, GET_CART_START} from "../action"

const INITIAL_STATE={
    cart: [],
    total: 0,
    loading: false
}

const cartReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case GET_CART_START:
            return{...state, loading: true}
        case GET_CART:
            return{...state, 
                cart: action.payload.cart, 
                total: action.payload.total.total_price}
        case GET_CART_END:
            return{...state, loading: false}
        default:
            return state
    }
}

export default cartReducer