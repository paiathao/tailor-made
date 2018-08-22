import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from 'axios';


export default function* rootSaga() {
  yield takeEvery('FETCH_SERVICES', fetchServices)
  yield takeEvery('FETCH_CUSTOMERS', fetchCustomers)
  yield takeEvery('ADD_SERVICES', addServices)
  yield takeEvery('DELETE_SERVICE', deleteService)
  yield takeEvery('POST_CUSTOMER', postCustomer)
  yield takeEvery('UPDATE_CUSTOMER', updateCustomer)
  yield takeEvery('UPDATE_STATUS', updateStatus)
  yield all([
    userSaga(),
    loginSaga(),
  ]);
}

function* addServices(action) {
  yield dispatch({
    type: 'NEW_SERVICES',
    payload: action.payload
  })
}

function* deleteService(action) {
  yield dispatch({
    type: 'REMOVE_SERVICE',
    payload: action.payload
  })
}

function* fetchServices() {
  try {
    const servicesList = yield call(axios.get, '/api/service')
    yield dispatch({
      type: 'GET_SERVICES',
      payload: servicesList.data
    })
  } catch (err) {
    yield console.log(err);
  }
} 

function* fetchCustomers() {
  try {
    const customerList = yield call(axios.get, '/api/customer')
    yield dispatch({
      type: 'GET_CUSTOMER',
      payload: customerList.data
    })
  } catch (err) {
    yield console.log(err);
  }
} 

function* postCustomer(action) {
  try{
    yield call(axios.post, '/api/customer', action.payload)

  } catch (error) {
    console.log(error);
  }
}

function* updateCustomer(action) {
  try{
    console.log('saga', action.payload)
    yield call(axios.put, `/api/customer`, action.payload)
    yield dispatch({
      type: 'FETCH_CUSTOMERS'
    })

  } catch (error) {
    console.log(error);
  }
}

function* updateStatus (action) {
  try{
    yield call(axios.put, `/api/customer/${action.payload}`)
    yield dispatch({
      type: 'FETCH_CUSTOMERS'
    })

  } catch (error) {
    console.log(error);
  }
}