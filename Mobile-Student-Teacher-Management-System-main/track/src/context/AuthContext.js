import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import { navigateToTrackList } from "../navigationHelper";
import { navigateToTeacherHome } from "../navigationHelper";
import { navigateToadmin } from "../navigationHelper";
import { navigateToSignup } from "../navigationHelper";


const authReducer = (state,action) => {
    switch(action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload};
        case 'signin':
            return { errorMessage:'', token:action.payload.token, userType: action.payload.userType};
        case 'clear_error_message':
            return {...state, errorMessage:''};
        case 'signout':
            return {token:null, userType: null, errorMessage:''};    
        default:
            return state;
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    const userTypeStr = await AsyncStorage.getItem('userType');
    const userType = userTypeStr ? parseInt(userTypeStr) : null;

    if (token && userType){
        dispatch ({type:'signin', payload: { token, userType }});
        if (userType === 1) navigateToTrackList();
        else if (userType === 2) navigateToTeacherHome();
        else if (userType === 3) navigateToadmin();
        else navigateToSignup();
    } else {
        navigateToSignup();
    }
};

const clearErrorMessage = dispatch => () => {
    dispatch({type:'clear_error_message'});
}

const signup = dispatch =>  async ({email, password, batchCode, regNum, name, role = 'student'}) => {
        try{
            let endpoint = '/signupS';
            let userType = 1;
            let payload = {email, password, batchCode, regNum};

            if (role === 'teacher') {
                endpoint = '/signupT';
                userType = 2;
                payload = {email, password, name};
            } else if (role === 'admin') {
                endpoint = '/signupA';
                userType = 3;
                payload = {email, password};
            }

            const response = await trackerApi.post(endpoint, payload);
            const token = response.data.token;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userType', userType.toString());

            dispatch({type:'signin', payload: { token, userType }});

            if (userType === 1) navigateToTrackList();
            else if (userType === 2) navigateToTeacherHome();
            else if (userType === 3) navigateToadmin();
        } catch (err) {
            console.log('Signup error details:', err.response ? err.response.data : err.message);
            dispatch({type: 'add_error', payload: 'Something went wrong with sign up'})
        }
    };


    const signin = dispatch =>  async ({email,password}) => {
        try{
            const response = await trackerApi.post('/signin', {email,password});
            const { token, userType } = response.data;

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userType', userType.toString());

            dispatch({type:'signin', payload: { token, userType }});
            
            if (userType == 1) {
                navigateToTrackList()
            } else if (userType == 2) {
                navigateToTeacherHome()
            } else if (userType == 3) {
                navigateToadmin()
            }
        } catch (err) {
            console.log('Signin error details:', err.response ? err.response.data : err.message);
            dispatch({type: 'add_error', payload: 'Something went wrong with sign in'})
        }
    };

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userType');
    dispatch({type:'signout'});
    navigateToSignup();
};


export const { Provider, Context} = createDataContext(
    authReducer,
    {signup,signin,signout, clearErrorMessage,tryLocalSignin},
    { token: null, errorMessage: ''}
);