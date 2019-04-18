import { combineReducers } from 'redux';
import authReducer from './authreducers';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    form: reduxForm
});