import {
    DISPLAY_ALERT,
    CLEAR_ALERT,

    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    LOGIN_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_LAB_BEGIN,
    CREATE_LAB_SUCCESS,
    CREATE_LAB_ERROR,
    GET_LABS_BEGIN,
    GET_LABS_SUCCESS,
    SET_EDIT_LAB,
    EDIT_LAB_BEGIN,
    EDIT_LAB_SUCCESS,
    EDIT_LAB_ERROR
} from "./actions";
import { initialState } from './appContext'
const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values ' }
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }
    if (action.type === LOGIN_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'Login Successful! Redirecting...',
        }
    }
    if (action.type === LOGIN_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSidebar: !state.showSidebar }
    }
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: '',
        }
    }
    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_USERS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_USERS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            users: action.payload.users,
            totalUsers: action.payload.totalUsers,
        }
    }
    if (action.type === HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value }
    }
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            labName: '',
            acronym: '',
            phone: '',
            email: '',
            specialty: '',
            domain: '',
            researchAreas: '',
            labType: 'Research laboratory',
        }
        return { ...state, ...initialState }
    }
    if (action.type === CREATE_LAB_BEGIN) {
        return { ...state, isLoading: true }
    }
    if (action.type === CREATE_LAB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New Laboratory Created!',
        }
    }
    if (action.type === CREATE_LAB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    if (action.type === GET_LABS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
    }
    if (action.type === GET_LABS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            labs: action.payload.labs,
            totalLabs: action.payload.totalLabs,
        }
    }
    if (action.type === SET_EDIT_LAB) {
        const lab = state.labs.find((lab) => lab._id === action.payload.id)
        const { _id, name,
            acronym,
            phone,
            email,
            specialty,
            domain,
            researchAreas,
            labType } = lab
        return {
            ...state,
            isEditing: true,
            editLabId: _id,
            name,
            acronym,
            phone,
            email,
            specialty,
            domain,
            researchAreas,
            labType
        }
    }
    if (action.type === EDIT_LAB_BEGIN) {

        return { ...state, isLoading: true }

    }
    if (action.type === EDIT_LAB_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Lab Updated!',
        }
    }
    if (action.type === EDIT_LAB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }
    throw new Error(`no such action : ${action.type}`)

}
export default reducer;