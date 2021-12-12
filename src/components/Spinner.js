import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = () => {
      return (
            <div>
            <Loader
            type="Oval"
            height={50}
            width={50}
            color = "#000000"
            className = "loader"
            />
            </div>
      )
}

export default Spinner
