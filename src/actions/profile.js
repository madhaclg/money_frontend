import axios from "axios";
import { PROFILES_LOADED, PROFILES_ERROR, HISTORY_LOADED, HISTORY_ERROR, TRANSFER_SUCCESS, TRANSFER_ERROR } from "./types";
// const Url="https://money-ewvr.onrender.com"
export const loadProfile = () => async dispatch => {
    try {
        const res = await axios.get('https://money-ewvr.onrender.com/api/allUsers')
//         console.log(res);
        dispatch({
            type: PROFILES_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILES_ERROR,
            payload: { msg: "error", status: "error.response.status" }
        })
    }
}

export const loadHistory = () => async dispatch => {
    try {
            const res = await axios.get('https://money-ewvr.onrender.com/api/history')
        dispatch({
            type: HISTORY_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: HISTORY_ERROR,
            payload: { msg: "error", status: "error.response.status" }
        })
    }
}

export const transfer = ({ From, To, amount }, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ From, To, amount })
    try {
        const res = await axios.post('https://money-ewvr.onrender.com/api/transaction', body, config)
        dispatch({
            type: TRANSFER_SUCCESS,
            payload: res.data
        })
        history.push('/profile')
        alert(`${res.data}`)
    } catch (error) {
        dispatch({
            type: TRANSFER_ERROR,
            payload: { msg: "error.response.statusText", status: "error.response.status" }

        })
//         console.log(dispatch);
    }

}
