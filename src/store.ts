import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'

const rootReducer = combineReducers({
  user: userReducer
})

function loadState() {
  try {
    const serialized = sessionStorage.getItem('reduxState')
    return serialized ? JSON.parse(serialized) : undefined
  } catch {
    return undefined
  }
}

function saveState(state: ReturnType<typeof rootReducer>) {
  try {
    sessionStorage.setItem('reduxState', JSON.stringify(state))
  } catch {}
}

const preloadedState = loadState()

const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export default store
