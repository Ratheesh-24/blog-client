import axios from 'axios'
import { GET_POSTS_REQUEST, GET_POSTS_SUCCESS, GET_POSTS_FAIL, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, POST_DETAIL_SUCCESS, POST_DETAIL_REQUEST, POST_DETAIL_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL,   } from '../constants/postConstants'

export const listPosts = (pageNumber = '') => async (dispatch) => {
      try {
            dispatch({
                  type: GET_POSTS_REQUEST
            })
            
            const { data } = await axios.get(`/api/posts?pageNumber=${pageNumber}`)
      
            dispatch({
                  type: GET_POSTS_SUCCESS,
                  payload: {
                        totalPages: data.totalPages,
                        blogs: data.posts
                  }
            })
      }
      catch (error) {
            dispatch({
                  type: GET_POSTS_FAIL,
                  payload:
                        error.response && error.response.data.message
                              ? error.response.data.message
                              : error.message,
            })
      }
}

export const createPost = (title, description, content, image) => async (dispatch) => { 
      try { 
            dispatch({ 
                  type: CREATE_POST_REQUEST 
            }) 
             
            const userInfo = JSON.parse(localStorage.getItem('userInfo')) 
            const config = { 
                  headers: { 
                  'Content-Type': 'application/json', 
                  Authorization: `Bearer ${userInfo.token}`, 
                }, 
            }  
            const { data } = await axios.post('api/posts/', { title, description, content, image }, config) 
            dispatch({ 
                type: CREATE_POST_SUCCESS, 
                payload: data 
            }) 
      } 
      catch (error) { 
            dispatch({ 
                  type: CREATE_POST_FAIL, 
                  payload: error.response && error.response.data.message 
                  ? error.response.data.message 
                  : error.message, 
            }) 
      } 
}

export const getPostDetails = (id) => async (dispatch) => {
      try {
            dispatch({
                  type: POST_DETAIL_REQUEST
            })
            const { data } = await axios.get(`/api/posts/${id}`)
            dispatch({
                  type: POST_DETAIL_SUCCESS,
                  payload: data
            })
      }
      catch (error) {
            dispatch({ 
                  type: POST_DETAIL_FAIL, 
                  payload: error.response && error.response.data.message 
                  ? error.response.data.message 
                  : error.message
            }) 
      }
}

export const deletePost = (id) => async(dispatch) => {
      try {
            dispatch({
                  type: POST_DELETE_REQUEST
            })

            const userInfo = JSON.parse(localStorage.getItem('userInfo')) 
            const config = { 
                  headers: { 
                  Authorization: `Bearer ${userInfo.token}`, 
                }, 
            } 
            const { data } = await axios.delete(`/api/posts/${id}`, config)

            dispatch({
                  type: POST_DELETE_SUCCESS
            })
      }
      catch (error) {
            dispatch({ 
                  type: POST_DELETE_FAIL, 
                  payload: error.response && error.response.data.message 
                  ? error.response.data.message 
                  : error.message, 
            }) 
      }
}