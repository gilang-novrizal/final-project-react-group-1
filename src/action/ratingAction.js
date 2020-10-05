import {URL, ADD_RATING, GET_ORDER} from "./helper";
import Axios from "axios";

export const addRating = (body) => {
    return async (dispatch) => {
        try {
            const add = await Axios.post(URL + '/rating/add', body);
            const res = await Axios.get(URL + `/orders/get`)
            console.log(res.data)
            dispatch({ type: GET_ORDER, payload: res.data })
        } catch (error) {
            console.log(error.response ? error.response.data : error);
        }
    };
};