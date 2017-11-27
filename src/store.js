import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default createStore((state = {}, action) => {
  if (action.type === 'SET_DATA') {
    return { data: action.payload }
  }
  return state
}, applyMiddleware(thunk))
