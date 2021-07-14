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
    default:
      return state

  }
}

export default reducer;

