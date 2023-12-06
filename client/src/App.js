import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import SetRoute from './routes/SetRoute';

const App = () => {
  return (
      <BrowserRouter>
        <SetRoute />

      </BrowserRouter>
  )
}

export default App