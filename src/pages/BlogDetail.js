import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { Helmet } from "react-helmet";
import {Image} from 'cloudinary-react'
import { deletePost, getPostDetails } from '../actions/postActions'
import Spinner from '../components/Spinner'

const BlogDetail = () => {
      const [message, setMessage] = useState('')

      const postDetail = useSelector((state) => state.postDetail)
      const userLogin = useSelector((state) => state.userLogin)
      const { userInfo } = userLogin
      const { loading, blog, error } = postDetail
      
      const history = useHistory()
      const location = useLocation()
      const id = location.pathname.split("/")[2]
      
      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(getPostDetails(id))
      }, [id, location, dispatch])

      let readingTime
      if (blog && blog.content) {
            const length = blog.content.split(" ").length / 200
            if (length < 1) {
                  readingTime = "Less than a min read"
            }
            else {
                  readingTime = `${Math.round(length)} min read`
            }
      }

      const deletePostHandler = () => {
            dispatch(deletePost(id))
            setMessage("Post deleted")
            setTimeout(function () {
                  history.push('/')
            }, 500)
      }
      return (
            <main className="blog-detail">
            {loading && <div><Spinner/></div>}
            { error && <div className="alert alert--error">{error}</div>}
                  {message && <div className="alert alert--error">{message}</div>}      
                  { blog && <div>
                        <Helmet>
                              <title>{blog.title}</title>
                         </Helmet>
                        <h2>{blog.title}</h2>
                        {userInfo && userInfo._id === blog.user && 
                              <div><button onClick={deletePostHandler} className="blog-detail__delete btn btn--warning">
                              DELETE POST
                        </button></div>}
                        <p className="blog-detail__description">{blog.description}</p>
                        <div className="blog-detail__highlight">
                              <p className="blog-detail__author">By <strong>{blog.name}</strong></p>
                              {readingTime && <p className="blog-detail__duration">{readingTime}</p>}
                        </div>
                        <hr className="blog-detail__hr"></hr>
                        {blog.image && <Image cloudName={blog.image.cloud_name} publicId={blog.image.imageID} className = "blog-detail__image"/>}
                        <div className="blog-detail__content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}></div>
                  </div>}
            </main>)
}

export default BlogDetail
