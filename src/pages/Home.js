import React from 'react'
import Blogs from '../components/Blogs'
import { Helmet } from "react-helmet";

const Home = () => {
      return (
            <div>
                  <Helmet>
                        <title>BLOGGR | Home </title>
                  </Helmet>
                  <main><h1 className = "section__home">RECENT POSTS</h1><Blogs/></main>
            </div>
      )
}

export default Home
