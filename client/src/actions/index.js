import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    return async function(dispatch){
       // axios.get('/login/current_user').then(res => dispatch({ type: FETCH_USER, payload: res.data }))
       const res = await axios.get('/api/current_user');
        dispatch({ type:FETCH_USER, payload: res.data });
    };
}

export const handleToken = (token) => {
    return async function(dispatch) {
        const res = await axios.post('/api/stripe', token);
        dispatch({ type: FETCH_USER, payload: res.data })
    }
}

export const submitSurvey = (values, history) => {
    return async function(dispatch) {
        const res = await axios.post('/api/surveys', values);
        history.push('/surveys');
        dispatch({ type: FETCH_USER, payload: res.data });
    }
    // console.log(values);
    // return { type: 'submit_survey' };


}

// export const fetchUser = () => { async dispatch => {
//     const res = await axios.get('/login/current_user');
//     dispatch({ type:FETCH_USER, payload: res });
//     }
// }