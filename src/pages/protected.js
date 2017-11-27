import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Protected = props => {
  return (
    <div>
      <h1>Protected</h1>
      {props.data || 'No Data'}
      <button onClick={props.getData}>Get Data</button>
      <button onClick={props.logout}>Logout</button>
    </div>
  )
}

const mapStateToProps = state => state
const mapActionsToProps = dispatch => {
  return {
    getData: () => dispatch(getData)
  }
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(Protected)

function getData(dispatch, getState) {
  fetch('http://localhost:5000/private', {
    headers: {
      Authorization: 'Bearer ' + window.localStorage.getItem('access_token')
    }
  })
    .then(res => res.json())
    .then(result => {
      dispatch({ type: 'SET_DATA', payload: result.message })
    })
}
