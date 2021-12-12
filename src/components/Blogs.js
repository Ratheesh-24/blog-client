import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { listPosts } from '../actions/postActions'
import BlogCard from './BlogCard'
import Spinner from './Spinner'


const Blogs = () => {
      const [pageNumber, setPageNumber] = useState('')

      const postsList = useSelector((state) => state.postsList)
      const { blogs, loading, error, totalPages } = postsList

      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(listPosts(pageNumber))
            console.log(pageNumber)
      }, [dispatch, pageNumber])

      const pageArr = new Array(totalPages).fill(null).map((item, idx) => idx)

      return (
            <div>
                  {loading && <div><Spinner/></div>}
                  {error && (<div className="alert alert--error">{error}</div>)}
                  {blogs &&
                        <div className="blog-cards">
                        {blogs.map((blog) => (
                              <BlogCard blog={blog} key={blog._id} />
                        ))}
                        </div>}
                  <div className = "paginate-btn-group">
                  {blogs && pageArr.map((pageIndex) => (
                        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)} className = {`paginate-btn ${pageIndex === pageNumber ? 'page-active': ''}`}>
                              {pageIndex + 1}
                        </button>
                        ))}
                  </div>
            </div>
      )
}

export default Blogs
