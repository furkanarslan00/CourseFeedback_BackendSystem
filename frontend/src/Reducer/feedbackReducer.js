const initialState = {
    feedbackEntry: null
  };
  
  const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FEEDBACK_ENTRY':
        return {
          ...state,
          feedbackEntry: action.payload
        };
      default:
        return state;
    }
  };
  
  export default feedbackReducer;