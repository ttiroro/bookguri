import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import SetRoute from './routes/SetRoute';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
      <BrowserRouter>
        <Header />
        <SetRoute />
        <Footer />
      </BrowserRouter>
  )
}

export default App