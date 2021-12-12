import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers'
import { postsListReducer, postCreateReducer, postDetailReducer, postDeleteReducer } from './reducers/postReducers'

const reducer = combineReducers({
      userLogin: userLoginReducer,
      userRegister: userRegisterReducer,
      postsList: postsListReducer,
      postCreate: postCreateReducer,
      postDetail: postDetailReducer,
      postDelete: postDeleteReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
      userLogin: {
            userInfo: userInfoFromStorage
      }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store