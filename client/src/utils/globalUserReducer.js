/* Expects action to follow following format:
action = {
  type: "",
  value: ""
}*/

const reducer = (state, action) => {
  switch(action.type){

    case 'LOG_IN':
      return { ...state,
      loggedIn: true,
    user: action.value}
    
    case 'LOG_OUT':
      return { ...state,
      loggedIn: false,
    user: action.value }
    
    case 'SET_SUCCESS_MESSAGE':
      return { ...state,
      successMessage: action.value
      }
    case 'SET_ERROR_MESSAGE':
      return { ...state,
      
        errorMessage: action.value }
    
    case 'RESET_MESSAGES':
      return { ...state, 
      successMessage: "",
      errorMessage: "" }
    
    case 'TOGGLE_MESSAGE_CONTAINER':
      return {...state, messageContainer: !this.messageContainer}
    
    case 'SET_IS_LOADING':
      return {...state, isLoading: action.value}

    case 'ADD_RESERVATION':
      state.user.reservations.push(action.value)
      return state
    // case 'REFRESH_USER_DATA':
    //   return {...state, user: action.value}
    case 'TOGGLE_SEARCH_RESULTS':
      return {...state, showTickets: action.value}

    case 'SET_SEARCH_URL':
      return {...state, searchURL: action.value}

    case 'SET_FLIGHTS':
      return {...state, flights: action.value}

    case 'TOGGLE_SEARCH_BOX':
      return {...state, showSearchBox: action.value}

    default:
      return state

  }
}

export default reducer;

