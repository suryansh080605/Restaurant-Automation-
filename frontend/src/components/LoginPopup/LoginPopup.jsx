import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup=({setShowLogin})=>{

  const {url,setToken} =useContext(StoreContext)

const [currState,setCurrState]=useState("Login")
// setting the singup state for the login popup

const [data,setData]=useState({
  name:"",
  email:"",
  password:""
})
// iske just uparr maine ek state handle ki h login k liye ki jo bhi name email and password h woh shai h  ya nhi
const onChangeHandler=(event)=>{
const name=event.target.name;
const value=event.target.value;
setData(data=>({...data,[name]:value}))
}


const onLogin=async(event)=>{
// iss function ko form tag se link karunga 

event.preventDefault();
// this is the place for user to login where i will need the id and password for authentication

let newUrl=url;
if(currState==="Login"){
  newUrl+="/api/user/login" //idhar login pe redirect kar rha hu 
}
else{
  newUrl+="/api/user/register"  //idhar agar login nhi hoga to signup
}
const response = await axios.post(newUrl,data); //yeh dono login aur signup m chalegi


if(response.data.success){
  //agar yeh succes hoga to i will get one token to usko dekh rhaaur save kar rha statevariable m 
  setToken(response.data.token);
  localStorage.setItem("token",response.data.token);
  setShowLogin(false)
}
else{
  alert(response.data.message)
}
}
// useEffect(()=>{
// console.log(data);
// },[data])  yeh useEffect maine testing k liye liya tha ki sba data console m aa rha h ki nhi


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name='name' onChange ={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />}
            
             <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required/>
             <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        {/* idhar m current state check kar rhaha hu  */}
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing,i agree to the terms of use and privacy policy</p>
        </div>
        {currState==="Login"?
        <p>Create a new Account?<span onClick={()=>setCurrState("Sign Up")}>CLick here</span></p>
        :<p>Already Have an Accoount?<span onClick={()=>setCurrState("Login")}>Login Here</span></p>
}
      </form>
    </div>
  )
}

export default LoginPopup
