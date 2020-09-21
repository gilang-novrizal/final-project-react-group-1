import { GET_PROFILE, GET_FAVORITE, UPLOAD_PIC_ERROR } from "../action"

const INITIAL_STATE = {
    profile: [],
    favorite: [],
    error: ''
}

const profileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return { ...state, profile: action.payload }
        case GET_FAVORITE:
            return { ...state, favorite: action.payload }
        case UPLOAD_PIC_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}

export default profileReducer