import { useState } from "react"

const createStore = (preloadedState) => { }

let store

export const initializeStore = (preloadedState) => {
  let _store = store ?? createStore(preloadedState)

  if (store && preloadedState) {
    _store = createStore({ ...store.getState(), ...preloadedState })
  }

  if (typeof window === 'undefined') return _store
  else store = _store
  return store
}

export const useReduxStore = (initialState) => {
  const [store] = useState(() => initializeStore(initialState))
  return store
}