import {URL, LOG_IN, LOG_IN_ERROR, REGISTER, REGISTER_ERROR, VERIFY, VERIFY_ERROR, LOG_OUT} from "./helper"
import Axios from "axios"

export const userLogin = (body) =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.post(URL + `/users/login`, body)
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.id)
            dispatch({type: LOG_IN, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: LOG_IN_ERROR, payload: error.response.data})
        }
    }
}
export const userRegister = (body) =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.post(URL + `/users/register`, body)
            console.log(res.data)
            dispatch({type: REGISTER, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: REGISTER_ERROR, payload: error.response.data})
        }
    }
}
export const userVerify = (token) =>{
    return async(dispatch)=>{
        try {
            const res = await Axios.post(URL + '/users/verification', {token})
            console.log(res.data)
            dispatch({type: VERIFY, payload: res.data})
        } catch (error) {
            console.log(error.response? error.response.data : error)
            dispatch({type: VERIFY_ERROR, payload: error.response.data})
        }
    }
}
export const userKeepLogin = () =>{
    return async(dispatch)=>{
        try {
            const token = localStorage.getItem('token')
            // const id = localStorage.getItem('id')
            const res = await Axios.post(URL + '/users/keepLogin', {token})
            console.log(res.data)
            dispatch({ type : LOG_IN, payload : res.data })
        } catch (error) {
            console.log(error.response? error.response.data : error)
            // jaga2 kalo error lgsg logout
            localStorage.removeItem('id')
            localStorage.removeItem('token')
            dispatch({type: LOG_OUT})
        }
    }
}
export const userLogout = () => {
    return async(dispatch) => {
        try {
            await localStorage.clear()
            dispatch({type: LOG_OUT})
        } catch (error) {
            console.log(error.response? error.response.data : error)
        }
    }
}