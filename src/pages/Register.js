import React, { useState, useEffect} from 'react'
import {useHistory, Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from "react-helmet";
import {register} from '../actions/userActions'
import Spinner from '../components/Spinner'

const Register = () => {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')

      const [nameError, setNameError] = useState('')
      const [emailError, setEmailError] = useState('')
      const [passwordError, setPasswordError] = useState('')
      const [confirmPasswordError, setConfirmPasswordError] = useState('')

      const history = useHistory()
      const dispatch = useDispatch()
      const userRegister = useSelector(state => state.userRegister)
      const { userInfo, loading, error } = userRegister
      const userLogin = useSelector(state => state.userLogin)
      useEffect(() => {
            if (userLogin.userInfo || userRegister.userInfo) {
                  history.push('/')
            }
      }, [history, userRegister.userInfo, userLogin.userInfo])

      const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"

      const submitHandler = (e) => {
            e.preventDefault()
            if (email.trim().length > 0 && password.trim().length > 0 && email.match(regex) && password === confirmPassword) {
                  dispatch(register(email, password, name))
            }
            else {
                  if (!email.match(regex)) {
                        setEmailError("Invalid email address")
                  }
                  if (password !== confirmPassword) {
                        setConfirmPasswordError('Passwords do not match')
                  }
                  if (email.trim().length === 0) {
                        setEmailError("Please enter your email address")
                  }
                  if (password.trim().length === 0) {
                        setPasswordError("Please enter your password")
                  }
                  if (name.trim().length === 0) {
                        setNameError("Please enter your name")
                  }
            }
      }
      const nameChangeHandler = (e) => {
            setName(e.target.value)
            setNameError('')
      }

      const emailChangeHandler = (e) => {
            setEmail(e.target.value)
            setEmailError('')
      }

      const passwordChangeHandler = (e) => {
            setPassword(e.target.value)
            setPasswordError('')
      }
      const confirmPasswordHandler = (e) => {
            setConfirmPassword(e.target.value)
            setConfirmPasswordError('')
      }
      return (
            <main className="section__auth">
                  <Helmet>
                        <title>Register </title>
                  </Helmet>
                  {loading && <div><Spinner/></div>}
                  <div className="form-container">
                  <h1>REGISTER</h1>
                  {error && <div className = "alert alert--error">{error}</div>}
                  <form onSubmit={submitHandler}>
                        
                        <div className="form-group">
                              <label>Name:     </label>
                              <input type="text" onChange={nameChangeHandler} value={name} className="form-control form-text"></input>
                              {nameError && <small className = "msg--error">{nameError}</small>}
                        </div>
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
                        <div className="form-group">
                              <label>Confirm Password</label>
                              <input type="password" onChange={confirmPasswordHandler} value={confirmPassword} className="form-control form-text"></input>
                              {confirmPasswordError && <small className = "msg--error">{confirmPasswordError}</small>}
                        </div>
                        <button type="submit" className = "btn btn--dark">REGISTER</button>
                        <Link to = '/login' className = "link">Have an account? Login here</Link>
            </form>
                  </div>
            </main>
      )
}

export default Register
