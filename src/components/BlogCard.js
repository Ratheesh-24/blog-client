import React from 'react'
import { Link } from 'react-router-dom'
import {Image} from 'cloudinary-react'

const BlogCard = ({ blog }) => {
      const { title, description, name, _id, content, image } = blog
      let readingTime
      const length = content.split(" ").length / 200 
            if (length < 1) {
                   readingTime = "Less Than A Min Read"
            }
            else {
                   readingTime = `${Math.round(length)} Min Read`
            }
      return (
            <div className="blog-card">
                  <div className = "blog-card__img-wrapper">
                        {image && <Image cloudName={image.cloud_name} publicId={image.imageID} className="blog-card__image" />}
                  </div>
                  <div className = "blog-card__content">
                        <p className="blog-card__name">By <strong>{name}</strong></p>
                        <h2 className = "blog-card__title">{title}</h2>
                        <p className="blog-card__desc">{description}</p>
                        <div className = "blog-card__highlight">
                              <div className="blog-card__duration">{readingTime}</div>
                              <Link to={`/blog/${_id}`} className="blog-card__link">Continue Reading</Link>
                        </div>
                  </div>                  
            </div>
      )
}

export default BlogCard
