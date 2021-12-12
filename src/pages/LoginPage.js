import React, { useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from "react-helmet";
import { login } from '../actions/userActions'
import Spinner from '../components/Spinner'

const LoginPage = () => {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [emailError, setEmailError] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const history = useHistory()
      const dispatch = useDispatch()

      const userLogin = useSelector(state => state.userLogin)
      const { userInfo, loading, error } = userLogin

      useEffect(() => {
            if (userInfo) {
                  history.push('/')
            }
      }, [history, userInfo])

      const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"

      const emailChangeHandler = (e) => {
            setEmail(e.target.value)
            setEmailError('')
      }

      const passwordChangeHandler = (e) => {
            setPassword(e.target.value)
            setPasswordError('')
      }

      const submitHandler = (e) => {
            e.preventDefault()
            if (email.trim().length > 0 && password.trim().length > 0 && email.match(regex)) {
                  dispatch(login(email, password))
            }
            else {
                  if (!email.match(regex)) {
                        setEmailError("Invalid email address")
                  }
                  if (email.trim().length === 0) {
                        setEmailError("Please enter your email address")
                  }
                  if (password.trim().length === 0) {
                        setPasswordError("Please enter your password")
                  }
            }
      }

      return (
            <main className = "section__auth">
                  <Helmet>
                        <title>Login </title>
                  </Helmet>
                  {loading && <div><Spinner/></div>}
                  <div className= "form-container"><h1>LOGIN</h1>
                  {error && <div className = "alert alert--error">{error}</div>}
                  <form onSubmit = {submitHandler}>
                        <div className="form-group">
                              <label>Email</label>
                                    <input type="text" onChange={emailChangeHandler} value={email} className="form-control form-text"></input>
                                    {emailError && <small className = "msg--error">{emailError}</small>}
                        </div>
                        <div className="form-group">
                              <label>Password</label>
                                    <input type="password" onChange={passwordChangeHandler} value={password} className="form-control form-text"></input>
                                    {passwordError && <small className = "msg--error">{passwordError}</small>}
                        </div>
                        <button type="submit" className = "btn btn--dark">LOGIN</button>
                        <Link to = '/register' className = "link">New Customer ? Register here</Link>
                        <h2 style={{color: "red", paddingTop:20, marginTop:20}}> DEMO CREDENTIALS</h2>
                         <h4>Email : test@gmail.com</h4>
                        <h4>Password : Test</h4>
                  </form></div>
            </main>
      )
}

export default LoginPage
