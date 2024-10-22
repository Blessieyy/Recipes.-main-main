import React, {useRef, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return(
        <div className="details" >
            <form >
        <h1 className="det-titl">
        <Link to="/" className="logo">Foodie<span>Space</span></Link>
        </h1>
        <h3 className="slogan">From your eyes to your stomach!</h3>
            <p>Sign In:</p> 
            <label htmlFor='email' >Email address :</label>
            <input onChange={e => { setEmail(e.target.value) }} type='email' id='email' />
            <label htmlFor='password'>Password :</label>
            <input onChange={e => { setPassword(e.target.value) }} type='password' id='password' />
           <Link to={"/recipes"}>
            <button className="btn" >LOG IN</button>
            </Link>
        </form>
        </div>
    )    
}