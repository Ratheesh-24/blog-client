import React from 'react'

const Modal = ({message, type}) => {
      return (
            <div className = "modal-bg">
                  <div className = "modal-text">
                        {type === 'success' && <span className='modal-text modal-text--success'>{message} &#127882; </span>}
                        {type === 'warning' && <span className = 'modal-text modal-text--warning'>{message}</span>}
                  </div>
            </div>
      )
}

export default Modal
