import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants.js'

export const login = (email, password) => async (dispatch) => {
      try {
            dispatch({
                  type: USER_LOGIN_REQUEST,
            })
    
            const config = {
                  headers: {
                        'Content-Type': 'application/json',
                  },
            }
    
            const { data } = await axios.post(
                  '/api/users/login',
                  { email, password },
                  config
            )
    
            dispatch({
                  type: USER_LOGIN_SUCCESS,
                  payload: data,
            })
    
            localStorage.setItem('userInfo', JSON.stringify(data))
      } catch (error) {
            dispatch({
                  type: USER_LOGIN_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            })
      }
}

export const logout = () => (dispatch) => {
      localStorage.removeItem('userInfo')
      try {
            dispatch({
                  type: USER_LOGOUT
            })
      }
      catch (err) {
            
      }
}

export const register = (email, password, name) => async (dispatch) => {
      try {
            dispatch({
                  type: USER_REGISTER_REQUEST,
            })
    
            const config = {
                  headers: {
                        'Content-Type': 'application/json',
                  },
            }
    
            const { data } = await axios.post(
                  '/api/users/',
                  { email, password, name },
                  config
            )
    
            dispatch({
                  type: USER_REGISTER_SUCCESS,
                  payload: data,
            })
            dispatch({
                  type: USER_LOGIN_SUCCESS,
                  payload: data,
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
      } catch (error) {
            dispatch({
                  type: USER_REGISTER_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            })
      }
}
