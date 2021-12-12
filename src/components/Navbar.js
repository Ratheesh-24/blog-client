import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'
import { logout } from '../actions/userActions'

const Navbar = () => {
      const [hidden, setHidden] = useState(true)
      const userLogin = useSelector(state => state.userLogin)
      const { userInfo } = userLogin
      const dispatch = useDispatch()
      const logoutHandler = () => {
            dispatch(logout())
      }
      return (
            <header>
            <nav className="nav">
                  <NavLink to = '/'><h1 className = "nav-brand">BLOGGY</h1></NavLink>            
                  <div className = {`nav-links ${hidden ? '' : 'hidden'}`}>
                        <NavLink to='/create' className = "nav-link" activeClassName="active-link">Create</NavLink>
                        {userInfo ?
                        (<button onClick={logoutHandler} className = "nav-btn">Logout</button>)
                        : (<><NavLink to ='/login' className = "nav-link" activeClassName="active-link">Login</NavLink><NavLink to='/register' className = "nav-link" activeClassName="active-link">Register</NavLink></>)
                              }
                  </div>
                        <button className="nav-open-btn" onClick={(e) => setHidden(!hidden)}>{hidden ? <GiHamburgerMenu size={20}/> : <AiOutlineClose size={20}/>}</button>
            </nav>
            </header>
      )
}

export default Navbar
