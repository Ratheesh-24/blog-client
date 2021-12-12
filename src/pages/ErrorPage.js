import React from 'react'
import { Helmet } from "react-helmet";
import svg from '../error.svg'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
      return (
            <main className="errorPage">
            <Helmet>
                  <title>BLOGGR | Page Not Found</title>
            </Helmet>
                  <img src = {svg} alt = "error-svg" className = "error-svg"/>
                  <h1>Page Not Found</h1>
                  <Link to = "/">Back to Home Page</Link>
            </main>
      )
}

export default ErrorPage
