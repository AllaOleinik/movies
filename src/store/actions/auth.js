import axios from 'axios';

import { SIGN_UP } from '../../containers/Auth/Auth';
import * as actionTypes from '../actionTypes'

export const authenticateUser = (mode, email, password) => {
    return dispatch => {
        const apiKey = 'AIzaSyByq4mJssDLwZsCTE-C86G-MCl_Hj__xnA';
        const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        const url = mode === SIGN_UP ? 'signUp' : 'signInWithPassword';

        const payload = {
            email,
            password,
            returnSecureToken: true
        };

        dispatch(toggleSubmittingStatus(true));
        
        axios.post(baseUrl + url + `?key=${apiKey}`, payload)
            .then(res => {
                const { idToken, localId } = res.data;

                dispatch(saveAuthenticatedUser(idToken, localId));
            })
            .catch(errorRes => {
                const { error } = errorRes.response.data;
                
                dispatch(saveAuthenticationError(error));
            })
            .finally(() => dispatch(toggleSubmittingStatus(false)));
    };
};

const toggleSubmittingStatus = status => ({
    type: actionTypes.TOGGLE_SUBMITTING_STATUS,
    status
});

const saveAuthenticatedUser = (idToken, localId) => ({
    type: actionTypes.SAVE_AUTHENTICATED_USER,
    idToken,
    localId
});

const saveAuthenticationError = error => ({
    type: actionTypes.SAVE_AUTHENTICATION_ERROR,
    error
});

export const removeAuthenticationError = () => ({
    type: actionTypes.REMOVE_AUTHENTICATION_ERROR
});

export const logoutUser = () => ({
    type: actionTypes.LOGOUT_USER
});
