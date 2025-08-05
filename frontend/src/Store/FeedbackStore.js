import { createStore, combineReducers } from 'redux';
import feedbackReducer from '../Reducer/feedbackReducer';

const rootReducer = combineReducers({
  feedback: feedbackReducer
});

const store = createStore(rootReducer);

export default store;
