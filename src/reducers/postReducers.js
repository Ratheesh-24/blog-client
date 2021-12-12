import { GET_POSTS_FAIL, GET_POSTS_REQUEST, GET_POSTS_SUCCESS, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, POST_DETAIL_REQUEST, POST_DETAIL_SUCCESS, POST_DETAIL_FAIL, POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL } from '../constants/postConstants'

export const postsListReducer = (state = { blogs: [] }, action) => {
      switch (action.type) {
            case GET_POSTS_REQUEST:
                  return { loading: true }
            case GET_POSTS_SUCCESS:
                  return { loading: false, blogs: action.payload.blogs, totalPages: action.payload.totalPages }
            case GET_POSTS_FAIL: {
                  return { loading: false, error: action.payload }
            }
            default:
                  return state
      }
}

export const postCreateReducer = (state = {}, action) => { 
      switch (action.type) { 
            case CREATE_POST_REQUEST: 
                  return { loading: true } 
            case CREATE_POST_SUCCESS: 
                  return { loading: false, blog: action.payload } 
            case CREATE_POST_FAIL: 
                  return { loading: false, error: action.payload } 
            default: 
                  return state 
      } 
}

export const postDetailReducer = (state = {blog:{}}, action) => {
      switch (action.type) {
            case POST_DETAIL_REQUEST:
                  return { loading: true, ...state }
            case POST_DETAIL_SUCCESS:
                  return { loading: false, blog: action.payload }
            case POST_DETAIL_FAIL:
                  return { loading: false, error: action.payload }
            default: 
                  return state
      }
}

export const postDeleteReducer = (state = {}, action) => {
      switch (action.type) {
            case POST_DELETE_REQUEST:
                  return { loading: true }
            case POST_DELETE_SUCCESS:
                  return { loading: false }
            case POST_DELETE_FAIL:
                  return { loading: false, error: action.payload }
            default: 
                  return state
      }
}