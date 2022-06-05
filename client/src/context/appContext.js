import React, { useReducer, useContext, useEffect } from 'react';
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
import axios from 'axios';
import reducer from './reducer';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
    isLoading: false,
    showAlert: false,
    alerttext: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    showSidebar: false,
    users: [],
    totalUsers: 0,
    isEditing: false,
    labName: '',
    acronym: '',
    phone: '',
    email: '',
    specialty: '',
    domain: '',
    university: '',
    researchAreas: '',
    labTypeOptions: ['Research Unit', 'Research laboratory'],
    labType: 'Research laboratory',
    statusOptions: ['active', 'inactive'],
    status: 'active',
    search: '',
    shearchStatus: 'all',
    searchType: 'all',
    sort: 'a-z',
    sortOptions: ['a-z', 'z-a'],
    labs: [],
    totalLabs: 0
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const authFetch = axios.create({
        baseURL: '/api/v1',
        headers: {
            Authorization: `Bearer ${state.token}`,
        },
    })

    authFetch.interceptors.request.use(
        (config) => {
            config.headers.common['Authorization'] = `Bearer ${state.token}`
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            console.log(error.response)
            if (error.response.status === 401) {
                logoutUser()
            }
            return Promise.reject(error)
        }
    )
    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000);
    }
    const addUserToLocalStorage = ({ user, token }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }
    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const { data } = await authFetch.post('/auth/login', currentUser)
            console.log(data)
            const { user, token } = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token },
            })

            addUserToLocalStorage({ user, token })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }
    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }
    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/update-User', currentUser)

            // no token
            const { user, token } = data

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, token },
            })
            delete user.password
            addUserToLocalStorage({ user, token: initialState.token })
        } catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                })
            }
        }
        clearAlert()
    }
    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value },
        })
    }
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }
    const createLab = async () => {
        dispatch({ type: CREATE_LAB_BEGIN })
        try {
            const { name, acronym, phone, email, specialty, domain, researchAreas, type, status, university } = state

            await authFetch.post('/lab', {
                name,
                acronym,
                phone,
                email,
                specialty,
                domain,
                researchAreas,
                type,
                status,
                university
            })
            dispatch({
                type: CREATE_LAB_SUCCESS,
            })
            // call function instead clearValues()
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: CREATE_LAB_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }
    const getLabs = async () => {
        let url = '/lab'
        dispatch({ type: GET_LABS_BEGIN })
        try {
            const { data } = await authFetch(url)
            const { labs, totalLabs } = data
            dispatch({
                type: GET_LABS_SUCCESS,
                payload: {
                    labs,
                    totalLabs,
                },
            })
        } catch (error) {
            console.log(error.response)
            logoutUser()
        }
        clearAlert()
    }
    const setEditLab = (id) => {
        dispatch({ type: SET_EDIT_LAB, payload: { id } })
    }
    const editLab = async () => {
        dispatch({ type: EDIT_LAB_BEGIN })
        try {
            const { name, acronym, phone, email, specialty, domain, researchAreas, type, status } = state
            await authFetch.patch(`/lab/${state.editLabId}`, {
                name, acronym, phone, email, specialty, domain, researchAreas, type, status
            })
            dispatch({
                type: EDIT_LAB_SUCCESS,
            })
            dispatch({ type: CLEAR_VALUES })
        } catch (error) {
            if (error.response.status === 401) return
            dispatch({
                type: EDIT_LAB_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }
   

    return (
        <AppContext.Provider value={{ ...state, displayAlert, loginUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createLab, getLabs, setEditLab, editLab }}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return (useContext(AppContext));
}
export { AppProvider, initialState };