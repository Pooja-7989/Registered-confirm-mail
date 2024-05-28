import React ,{useState}from 'react'
import { Link } from 'react-router-dom';
import './SignUp.css'


export default function SignUp() { 
  const [user,SetUser]=useState('');
  const [email,SetEmail]=useState('');
  const [password,setPassword]=useState('');
  
  


  const handleEmailInput=async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email}),
    });
    const data = await response.json();
      console.log(data);
      SetUser('');
      SetEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
//  const handlePasswordInput=()=>{
  
//  } 
  
  


  return (
 <div className='body'>
 
 <div className='formbody'>
 <h3>SignUp </h3>
      <form >
      <table>
        <tr>
        <td><input 
        
        type='text' id='user' placeholder='Enter UserName' value={user} onChange={(e)=>{SetUser(e.target.value)}}/>
        </td></tr>
      <tr>
        <td><input
         type='email' id='email' placeholder='Enter Email'  value={email} onChange={(e)=>{SetEmail(e.target.value)}}/></td></tr>
        <tr>
        <td><input type='password' id='pass' placeholder='Enter Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/></td></tr>
        </table>
      </form>
      <br/>
      <button onClick={handleEmailInput}>Register</button>
      <Link to="/" style={{color:"white", textDecoration:"none"}}><button>login</button></Link>
      </div>
      <div className='img'><img src="https://static.vecteezy.com/system/resources/previews/017/027/596/original/man-working-on-computer-cartoon-icon-illustration-people-technology-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg" width={"500px"}/></div>
    </div>
  )
}
