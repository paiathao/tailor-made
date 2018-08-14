import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';

const serviceList = (state = [], action) =>{
  switch(action.type){
    case 'GET_SERVICES':
      return action.payload
    default:
      return state;
  }
}

const store = combineReducers({
  user,
  login,
  serviceList,
});

export default store;
