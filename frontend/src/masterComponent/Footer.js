import React from 'react'
import './footer.css'
import {Link } from 'react-router-dom'
const Footer = () => {
    return (
        <div className="footerSection">
           <p>Contact us for any queries</p>
            <ul className="querySection">

                <input type="text" name="email" className="emailQuery" placeholder="your email"></input>
                <button type="submit" className="btnQuery">Submit</button>

            </ul>
            <div className="footerComp">
                <ul className="footerLinks">
                <div className="footHeader"> 
                      <h4 >About us</h4>
                    </div>
                    <Link to="" className="link_items">Careers</Link>
                    <Link to="" className="link_items">Testimonials</Link>
                    <Link to="" className="link_items">Terms of Service</Link>

                </ul>
                <ul className="footerLinks">
                    <div className="footHeader"> 
                      <h4 >Contact Us</h4>
                    </div>
                     
                     <Link to="" className="link_items">Contact</Link>
                    <Link to="" className="link_items">Support</Link>
                    <Link to="" className="link_items">Location</Link>
                    
               
               </ul>
            
            </div>
       
            <p>Copyright © 2020 Aosenba All rights reserved.</p>
        </div>
    )
}

export default Footer
