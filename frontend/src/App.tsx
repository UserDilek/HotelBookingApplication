import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from './layouts/Layout';


const App = () =>{
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Layout></Layout>}/>
      <Route path='/search' element={<>Search Page</>}/>
      <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>

    </Router>
   
  )
}

export default App;