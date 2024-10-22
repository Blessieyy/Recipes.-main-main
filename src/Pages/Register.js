import { useState } from "react"
import { Link } from 'react-router-dom';

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState ('');
    

    
    return(
    <div className="details" >
        <form >
        <h1 className="det-titl">
        <Link to="/" className="logo">Foodie<span>Space</span></Link>
        </h1>
        <h3 className="slogan">From your eyes to your stomach!</h3>
            <h2>Welcome!</h2>
            <p>Create your Account here:</p>
            <label htmlFor='name' >Full Name :</label>
            <input onChange={e => { setName(e.target.value) }} type='name' id='name' />  
            <label htmlFor='email' >Email address :</label>
            <input onChange={e => { setEmail(e.target.value) }} type='email' id='email' />
            <label htmlFor='password'>Password :</label>
            <input onChange={e => { setPassword(e.target.value) }} type='password' id='password' />
           <Link to={"/recipes"}>
            <button className="btn" >Sign up</button>
            <p style={{ marginTop: "2vh" }}><Link to={'/login'}>Already Have an account?</Link></p>
            </Link>
        </form>
    </div>
    )
}