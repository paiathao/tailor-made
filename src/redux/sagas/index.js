import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from 'axios';


export default function* rootSaga() {
  yield takeEvery('FETCH_SERVICES', fetchServices)
  yield all([
    userSaga(),
    loginSaga(),
    // watchIncrementAsync()
  ]);
}

function* fetchServices() {
    try {
      console.log('fetch Services');
  
      const servicesList = yield call(axios.get, '/api/service')
      yield dispatch({
        type: 'GET_SERVICES',
        payload: servicesList.data
      })

    } catch (err) {
      yield console.log(err);
    }
} 