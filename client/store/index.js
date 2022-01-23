import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import aggregateReducer from './navbar'
import marketReducer from './home'
import detailsReducer from './details'

const reducer = combineReducers({
  market: marketReducer,
  aggregate: aggregateReducer,
  details: detailsReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
