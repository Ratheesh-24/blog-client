import React, { useState, useEffect } from 'react'
import ReactQuill from "react-quill";
import Modal from '../components/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Helmet } from "react-helmet";
import { createPost } from '../actions/postActions'

const AddArticle = () => {
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [content, setContent] = useState('')
      const [text, setText] = useState('')
      const [file, setFile] = useState('')
      const [preview, setPreview] = useState('')

      const [successMessage, setSuccessMessage] = useState('')

      const [titleError, setTitleError] = useState('')
      const [descriptionError, setDescriptionError] = useState('')
      const [contentError, setContentError] = useState('')
      const [imageError, setImageError] = useState('')

      const dispatch = useDispatch()
      const userLogin = useSelector((state) => state.userLogin)
      const { userInfo } = userLogin
      
      const modules = {
            toolbar: [
                  ["bold", "italic", "underline", "strike"],
                  [{ 'script': 'sub'}, { 'script': 'super' }],
                  ]
            };
  
      const formats = [
            "bold",
            "italic",
            "underline",
            "strike",
            "script"
      ];

      const history = useHistory()
      useEffect(() => {
            if (!userInfo) {
                  history.push('/login')
            }
      }, [userInfo, history])

      const titleChangeHandler = (e) => {
            setTitleError('')
            setTitle(e.target.value)
      }

      const descriptionChangeHandler = (e) => {
            setDescriptionError('')
            setDescription(e.target.value)
      }

      const onEditorChange = (content, delta, source, editor) => {
            setContent(content)
            setText(editor.getText())
            setContentError('')
            if (content.trim().length > 4000) {
                  setContentError("Character limit exceeded")
            }
      }

      const createPostHandler = (e) => {
            e.preventDefault()
            if (title.trim().length > 0 && description.trim().length > 0 && text.trim().length > 0 && content.trim().length < 4000 && preview) {
                  dispatch(createPost(title.trim(), description.trim(), content.trim(), preview))
                  setSuccessMessage("Published! Redirecting ...")
                  setTimeout(function () {
                        history.push('/')
                  }, 3000)
            }
            else {
                  if (title.trim().length === 0) {
                        setTitleError("Title is required")
                  }
                  if (description.trim().length === 0) {
                        setDescriptionError("Description is required")
                  }
                  if (text.trim().length === 0) {
                        setContentError("Content is required")
                  }
                  if (!preview) {
                        setImageError("Please upload an image")
                  }
            }
      }
      const onFileChange = (e) => {
            setImageError('')
            setPreview('')
            const inputFile = e.target.files[0]
            console.log(inputFile)
            if (inputFile.type === "image/png" || inputFile.type === "image/jpeg" || inputFile.type === "image/jpg") {
                  imagePreview(inputFile)
            }
            else {
                  setImageError("Please upload image of type jpeg/jpg/png")
            }
      }

      const imagePreview = (file) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                  setPreview(reader.result)
            }
      }

      return (
            <main className= 'section__create'>
            {successMessage && <Modal message={successMessage} type="success" />}
            <Helmet>
                  <title>Create</title>
            </Helmet>
            <h2>Create</h2>
                  <form onSubmit={createPostHandler}>
                  <div className = "create-form-group">
                  <label>Title:</label>
                              <input type="text" className="create-form-control form-text" name="title" value={title} onChange={titleChangeHandler} maxLength="60"/>
                              {titleError && <small className = "msg--error">{titleError}</small>}
                  </div>
                  <div className = "create-form-group">
                  <label>Description:</label>
                        <textarea className="create-form-control form-text" name="description" value={description} onChange={descriptionChangeHandler} maxLength="160"/>
                        {descriptionError && <small className = "msg--error">{descriptionError}</small>}
                  </div>
                  <div className = "create-form-group">
                  <label>Content:</label>
                              <ReactQuill value={content} onChange={onEditorChange} modules={modules} formats={formats} className="create-form-control create-form-textarea"/>
                        {contentError && <small className = "msg--error">{contentError}</small>}
                  </div>
                  <div>
                        <label>Upload an image:</label>
                        <input type="file" value={file} onChange={onFileChange} className = "file-input"></input>  
                        {preview && <img src={preview} className = "image-preview" alt="preview"/>}  
                        {imageError && <small className = "msg--error">{imageError}</small>}      
                  </div>      
                  <button type = "submit" className = "btn btn--success">Publish</button>
            </form>
            </main>
      )
}

export default AddArticle
