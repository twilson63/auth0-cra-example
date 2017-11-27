import React from 'react'
import { Link } from 'react-router-dom'

const Protected = props => {
  return (
    <div>
      <h1>Protected</h1>
      <button onClick={props.logout}>Logout</button>
    </div>
  )
}

export default Protected
