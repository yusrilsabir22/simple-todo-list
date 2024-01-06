// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react'

import { Provider } from 'react-redux'
import store from './store'
import MainPage from '../pages/main'

function App() {

  return (
    <Provider store={store}>
      <MainPage/>
    </Provider>
  )
}

export default App
