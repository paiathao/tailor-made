import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';

const serviceList = (state = [], action) => {
  switch (action.type) {
    case 'GET_SERVICES':
      return action.payload
    default:
      return state;
  }
}

const customerList = (state = [], action) => {
  switch (action.type) {
    case 'GET_CUSTOMER':
      return action.payload
    default:
      return state;
  }
}

const defaultState = {
  firstName: '',
  lastName: '',
  phone: '',
  orderNumber: '',
  orderDetails: [],
  totalCost: '',
  dropDate: '',
  pickUp: '',
  paid: false,
  complete: false
}

const newCustomer = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_SERVICES':
      return {
        ...state,
        orderDetails: [...state.orderDetails, ...action.payload]
      }
      case 'REMOVE_SERVICE':
        const matchService = (service) => service._id !== action.payload._id;
        return {
          ...state,
          orderDetails: state.orderDetails.filter(matchService)
        }
    case 'ADD_CUSTOMER':
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        orderNumber: action.payload.orderNumber,
        dropDate: action.payload.dropDate,
        pickUp: action.payload.pickUp,
        paid: action.payload.paid,
      }
    case 'ADD_TOTALCOST':
      return {
        ...state,
        totalCost: action.payload
      }
    case 'RESET_CUSTOMER':
      return {
        firstName: '',
        lastName: '',
        phone: '',
        orderNumber: '',
        orderDetails: [],
        totalCost: '',
        dropDate: '',
        pickUp: '',
        paid: false,
        complete: false
      }
    default:
      return state;
  }
}

const calendarTask = (state = [], action) => {
  switch (action.type) {
    case 'SET_CUSTOMERCALENDER':
      return action.payload
    default:
      return state;
  }
}

const store = combineReducers({
  user,
  login,
  serviceList,
  newCustomer,
  customerList,
  calendarTask
});

export default store;
