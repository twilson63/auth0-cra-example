import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import auth from './auth'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './history'

import Home from './pages/home'
import Login from './pages/login'
import Callback from './pages/callback'
import Protected from './pages/protected'

const { login, handleAuthentication, isAuthenticated, logout } = auth()

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/login"
          component={props => {
            return <Login login={login} {...props} />
          }}
        />
        <Route
          path="/callback"
          component={props => {
            return (
              <Callback
                handleAuthentication={handleAuthentication}
                {...props}
              />
            )
          }}
        />
        <Route
          path="/protected"
          component={props => {
            if (isAuthenticated()) {
              return <Protected logout={logout} {...props} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
      </Switch>
    </Router>
  )
}

export default App

function enhanced(Component) {
  return props => {
    return <Component login={login} {...props} />
  }
}
