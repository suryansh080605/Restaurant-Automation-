import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'

const App = () => {
  const [showLogin,setShowLogin]=useState(false) //idhar m state handle kar raha hu login k time ki
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {/* idharr maine fragments banaya h kyuki m do elements ko use kar rha hu */}
    <div className='app'>
      {/* {idhar m prop se handle kar raha hu } */}
      <Navbar setShowLogin={setShowLogin}/> 
        <Routes>
          < Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path= '/order' element={<PlaceOrder/>}/>
          <Route path= '/verify' element={<Verify/>}/>
          <Route path= '/myorders' element={<MyOrders/>}/>
        </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App
