import React from 'react'
import SignUp from './SignUp/SignUp'
import {Routes,Route} from 'react-router-dom'
import Login from './Login/login'
// import RegisterButton from './SendMail/SendMail'

export default function App() {
  return (
    <div>
    
      <Routes>
      
      <Route path='/SignUp' element={<SignUp/>}/>
      
      <Route path='/' element={<Login/>}/>
      </Routes>
      
      {/* <RegisterButton/> */}
      
    </div>
  )
}
