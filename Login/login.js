import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './login.css'

export default function Login() {
    const[email,SetEmail]=useState('');
    const[pass,SetPass]=useState('');
    useEffect(()=>{
      const storedEmail=localStorage.getItem('email');
      const storedPassword=localStorage.getItem('pass')
      if(storedEmail&&storedPassword){
        SetEmail(storedEmail);
      }
    },[])
    const handleEmail=(e)=>{
      SetEmail(e.target.value)
    }
    const handlePass=(e)=>{
      SetPass(e.target.value);
    }
    const handleLogin=()=>{
      return(
        <p>loginSuccessfull</p>
      )
    }
  return (
    <div className='form'>
       <div className='formData'>
    <h3>Login </h3>
    <form onSubmit={handleLogin}>
    <div class="mb-3">
      
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmail} placeholder='Enter Email'/>
      <br/> 
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder='Enter Password' value={pass} onChange={handlePass}/>
      </div>
    
      <button type="submit" class="btn btn-primary">Login</button>
 
      <Link to="/SignUp" style={{color:"white", textDecoration:"none"}}><button>SignUp</button></Link><br/>
      <Link style={{margin:"25px"}}>Forgot Password</Link>
      </form>
      </div>
      <div className='formImg'>
        <img src='https://img.freepik.com/free-vector/illustration-cartoon-female-user-entering-login_241107-682.jpg?size=626&ext=jpg'/>
      </div>
      
    </div>
  )
}
