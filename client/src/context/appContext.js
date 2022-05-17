import React, { useReducer, useContext } from 'react';
import {
    DISPLAY_ALERT, CLEAR_ALERT, ADD_USER_BEGIN, ADD_USER_SUCCESS, ADD_USER_ERROR, LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from "./actions";
import axios from 'axios';
import reducer from './reducer';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alerttext: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    LabLocation: userLocation || '',
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        console.log('display alerte temchi');
        dispatch({ type: DISPLAY_ALERT })
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000);
    }
    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }


    const addUser = async (currentUser) => {
        dispatch({ type: ADD_USER_BEGIN })
        try {
            const response = await axios.post('api/v1/auth/add-user', currentUser);
            console.log(response);
            const { user, token, location } = response.data;
            dispatch({
                type: ADD_USER_SUCCESS,
                payload: { user, token, location },
            })
            addUserToLocalStorage({ user, token, location })

        }
        //local storage later
        catch (error) {
            console.log(error.response)

            dispatch({
                type: ADD_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert();


    }
    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
            const { data } = await axios.post('/api/v1/auth/login', currentUser)
            console.log(data)
            const { user, token, location } = data
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, location },
            })
            
            addUserToLocalStorage({ user, token, location })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: { msg: error.response.data.msg },
            })
        }
        clearAlert()
    }

    return (<AppContext.Provider value={{ ...state, displayAlert, addUser, loginUser }}>
        {children}
    </AppContext.Provider>)
}
export const useAppContext = () => {
    return (useContext(AppContext));
}
export { AppProvider, initialState };