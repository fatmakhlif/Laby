import { CLEAR_ALERT, DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR  ,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR  ,
    TOGGLE_SIDEBAR ,
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
    EDIT_RESEARCHER_BEGIN,
    EDIT_RESEARCHER_SUCCESS,
    EDIT_RESEARCHER_ERROR,
    CLEAR_FILTERS,
    CHANGE_PAGE,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    } from "./actions";
import { initialState } from './appContext'
const reducer = ( state,action) =>{
    if (action.type === DISPLAY_ALERT){
        return{...state,showAlert:true,alertType:'danger',alertText:'Please provide all values '}
    }
    if (action.type === CLEAR_ALERT){
        return{...state,
        showAlert:false,
        alertType:'',
        alertText:'',    }
    }
    if (action.type === REGISTER_USER_BEGIN){
        return {...state,isLoading:true}
    }
    if (action.type === REGISTER_USER_SUCCESS){
        return{...state,isLoading:false,
            token:action.payload.token,
            user:action.payload.user, 
            userlocation : action.payload.location,
            joblocation : action.payload.joblocation ,
            showAlert : true,
            alertType: 'success',
            alertText :'User Created ! Redirectiong...',  
        }
            }
    if (action.type === REGISTER_USER_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert : true,
            alertType:'danger',
            alertText : action.payload.msg ,

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
          token:action.payload.token,
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
      if (action.type === HANDLE_CHANGE) {
        return { ...state,page: 1, [action.payload.name]: action.payload.value }
      }
      if (action.type === CLEAR_VALUES) {
        const initialState = {
          isEditing: false,
          editResearcherId: '',
          category: 'University teacher',
          grade:'professor ',
          fullName: '',
          dateOfBirth:'',
          CIN :'',
          telephone:'',
          email :'',
          institution:'', 
          status: 'actif',
        
         
        }
        return { ...state, ...initialState }
      }
      if (action.type === CREATE_RESEARCHER_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === CREATE_RESEARCHER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'New Researcher Created!',
        }
      }
      if (action.type === CREATE_RESEARCHER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      if (action.type === GET_RESEARCHERS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
      }
      if (action.type === GET_RESEARCHERS_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          researchers: action.payload.researchers,
          totalResearchers: action.payload.totalResearchers,
          numOfPages: action.payload.numOfPages,
        }
      }
      if (action.type === SET_EDIT_RESEARCHER) {
        const researcher = state.researchers.find((researcher) => researcher._id === action.payload.id)
        const { _id, category, telephone, dateOfBirth, email,institution,fullName,CIN, status,grade } = researcher
        return {
          ...state,
          isEditing: true,
          editResearcherId: _id,
          category,
          grade,
           telephone,
            dateOfBirth,
             email,
             institution,
             fullName,
             CIN,
          
          status,
        }
      }
      if (action.type === EDIT_RESEARCHER_BEGIN) {
        return { ...state, isLoading: true }
      }
      if (action.type === EDIT_RESEARCHER_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'success',
          alertText: 'Researcher Updated!',
        }
      }
      if (action.type === EDIT_RESEARCHER_ERROR) {
        return {
          ...state,
          isLoading: false,
          showAlert: true,
          alertType: 'danger',
          alertText: action.payload.msg,
        }
      }
      if (action.type === CLEAR_FILTERS) {
        return {
          ...state,
          search: '',
          searchStatus: 'all',
          searchType: 'all',
          sort: 'latest',
        }
      }
      if (action.type === CHANGE_PAGE) {
        return { ...state, page: action.payload.page }
      }
      if (action.type === SHOW_STATS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false }
      }
      if (action.type === SHOW_STATS_SUCCESS) {
        return {
          ...state,
          isLoading: false,
          stats: action.payload.stats,
          monthlyApplications: action.payload.monthlyApplications,
        }
      }
           
    throw new Error(`no such action : ${action.type}`)

}
export default reducer ;