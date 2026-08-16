import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
<img src={assets.logo} alt="" />
<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum quod et, nesciunt minima sunt esse exercitationem, accusantium fugiat, atque repellat omnis non? Ad quos quia, adipisci quam unde ex cum, neque repudiandae sapiente ipsam magnam aut. Expedita eius ullam corrupti minus nemo. Quos, adipisci sed!</p>
<div className="footer-social-icons">
    <img src={assets.facebook_icon} alt="" />
    <img src={assets.twitter_icon} alt="" />
    <img src={assets.linkedin_icon} alt="" />
</div>
        </div>
        
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>

        </div>

        <div className="footer-content-right">
            <h2>Get in Touch</h2>
            <ul>
                <li>yeh h hamar phone number</li>
                <li>contact@tomato.com</li>
            </ul>

        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
