import React,{useReducer,useContext,useEffect} from 'react';
import { DISPLAY_ALERT,
    CLEAR_ALERT ,
    REGISTER_USER_BEGIN,REGISTER_USER_SUCCESS,REGISTER_USER_ERROR, LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR  , 
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_RESEARCHER_BEGIN,
    CREATE_RESEARCHER_ERROR,
    CREATE_RESEARCHER_SUCCESS,
    GET_RESEARCHERS_BEGIN,
    GET_RESEARCHERS_SUCCESS,
    SET_EDIT_RESEARCHER,
    EDIT_RESEARCHER_SUCCESS,
    EDIT_RESEARCHER_ERROR,
    EDIT_RESEARCHER_BEGIN,
} from "./actions";
import axios from 'axios';
import reducer from './reducer';

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
  isEditing: false,
  editResearcherId: '',
  category:'',
  fullName:'',
  dateOfBirth:'',
  CIN:'',
  telephone:'',
  email:'',
  institution:'',
  categoryOptions:['Professor', 'Associate Professor', 'Assistant Professor','Post-Doc','PhD Student','Ph.D'],
    isLoading: false ,
    showAlert: false ,
    alerttext : '',
    alertType : '',
    user: user ? JSON.parse(user): null ,
    token : token ,
    userLocation :userLocation ||'',
    LabLocation : userLocation ||'',
    showSidebar: false,
    researchers: [],
  totalResearchers: 0,
  numOfPages: 1,
  page: 1,
  statusOptions: ['actif', 'inactif'],
  status: 'actif',
}

const AppContext = React.createContext()

 const AppProvider = ({children})=>{
     const [state,dispatch]=useReducer(reducer,initialState);
     
     const authFetch = axios.create({
      baseURL: '/api/v1',
    })
    //request
    authFetch.interceptors.request.use(
      (config) => {
        config.headers.common['Authorization'] = `Bearer ${state.token}`
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // response interceptor
authFetch.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    //console.log(error.response)
    if (error.response.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  }
)



     const displayAlert = ()=>{console.log('display alerte temchi');
         dispatch({type:DISPLAY_ALERT})
    clearAlert()}

     const clearAlert =()=>{ 
         setTimeout(()=>{dispatch({type:CLEAR_ALERT})
        },3000);
    }
    const addUserToLocalStorage = ({user,token,location})=>{
        localStorage.setItem('user',JSON.stringify(user))
        localStorage.setItem('token',token)
        localStorage.setItem('location',location)
    }
    const removeUserFromLocalStorage = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }


     const registerUser = async(currentUser)=>{
      dispatch({type: REGISTER_USER_BEGIN})
      try {
        const response = await axios.post('api/v1/auth/register',currentUser);
        console.log(response);
        const {user,token,location}= response.data;
        dispatch({
            type:REGISTER_USER_SUCCESS,
            payload:{user,token,location},
        })
        addUserToLocalStorage({user,token,location}       )

      } 
      //local storage later
      catch (error) {
          console.log(error.response)
          
          dispatch({
            type:REGISTER_USER_ERROR,
            payload:{msg:error.response.data.msg},
        })
          
      }
      clearAlert();


     } 
     const loginUser = async (currentUser)=>{
        dispatch({ type: LOGIN_USER_BEGIN })
        try {
          const { data } = await axios.post('/api/v1/auth/login', currentUser)
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
        const { data } = await authFetch.patch('/auth/updateUser', currentUser)
    
        // no token
        const { user, location, token } = data
    
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: { user, location, token },
        })
    
        addUserToLocalStorage({ user, location, token })
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
    const createResearcher = async () => {
      dispatch({ type: CREATE_RESEARCHER_BEGIN })
      try {
        const { category, fullName,CIN,dateOfBirth,telephone, email, institution,status } = state
    
        await authFetch.post('/researchers', {
          fullName,
          CIN,
          dateOfBirth,
          telephone,
          category,
          email,
          institution,
          status,
          
        })
        dispatch({
          type: CREATE_RESEARCHER_SUCCESS,
        })
        // call function instead clearValues()
        dispatch({ type: CLEAR_VALUES })
      } catch (error) {
        if (error.response.status === 401) return
        dispatch({
          type: CREATE_RESEARCHER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
      clearAlert()
    }
    const getResearchers = async () => {
      let url = `/researchers`
    
      dispatch({ type: GET_RESEARCHERS_BEGIN })
      try {
        const { data } = await authFetch(url)
        const { researchers, totalResearchers, numOfPages } = data
        dispatch({
          type: GET_RESEARCHERS_SUCCESS,
          payload: {
            researchers,
            totalResearchers,
            numOfPages,
          },
        })
      } catch (error) {
        console.log(error.response)
       // logoutUser()
      }
      clearAlert()
    }
    //useEffect(() => {
    //  getResearchers()
    //}, [])
    const setEditResearcher = (id) => {
      dispatch({ type: SET_EDIT_RESEARCHER, payload: { id } })
    }
    const editResearcher = async () => {
      dispatch({ type: EDIT_RESEARCHER_BEGIN })
  try {
    const {fullName,
      CIN,
      dateOfBirth,
      telephone,
      category,
      email,
      institution,
       status } = state

    await authFetch.patch(`/researchers/${state.editResearcherId}`, {
      fullName,
          CIN,
          dateOfBirth,
          telephone,
          category,
          email,
          institution,
          status,
    })
    dispatch({
      type: EDIT_RESEARCHER_SUCCESS,
    })
    dispatch({ type: CLEAR_VALUES })
  } catch (error) {
    if (error.response.status === 401) return
    dispatch({
      type: EDIT_RESEARCHER_ERROR,
      payload: { msg: error.response.data.msg },
    })
  }
  clearAlert()
    }
    

     return(<AppContext.Provider value={{...state,displayAlert,registerUser,loginUser,toggleSidebar,logoutUser,updateUser,handleChange,clearValues,createResearcher,getResearchers,setEditResearcher,editResearcher}}>
         {children}
     </AppContext.Provider>)
 }
 export const  useAppContext= ()=>{
     return ( useContext(AppContext));
 }
 export {AppProvider,initialState} ;
