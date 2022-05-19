import React from 'react'
import './Footer.css'
import { blue} from '@material-ui/core/colors';
import {Link,useHistory } from 'react-router-dom'; 
import { Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RateReviewIcon from '@material-ui/icons/RateReview';

function Footer() {
    const history=useHistory();
    function RateUs(){
        // history.push("/patient/review")
    }
    return (
        <footer className="px-5">
            <div className="">
                <div className="row">
                    <div className="col-xl-1" align="center">
                        <br/>
                        <img src="/images/Logo.png" className="logoFooter" alt="logo"/>
                    </div>
                    <div className="col-xl-3"style={{ paddingLeft: 70 }}>
                        <br/>
                        <p>
                            This website is mainly focused on the current pandemic  situation of our country.
                            We hope to monitor the current situation of the country by making awareness     
                        </p>
                    </div>
                    <div className="col-xl-1" align="left">
                        <h3>Links</h3>
                        <ul className="list-group">
                            <li><Link to="/" style={{ color: '#FFF' }}>Home</Link></li>
                            <li><Link to="/hotel/rooms"  style={{ color: '#FFF' }}>Rooms</Link></li>
                            <li><Link to=""  style={{ color: '#FFF' }}>About Us</Link></li>
                            <li><Link to=""  style={{ color: '#FFF' }}>Contacts</Link></li>
                            <li><Link to="/admin/signin"  style={{ color: '#FFF' }}>Admin</Link></li>
                            <li><Link to="/admin/signin"  style={{ color: '#FFF' }}>Hotel Admin</Link></li>
                        </ul>
                    </div>
                    <div className="col-xl-3" >
                        <h3>&nbsp;Reach Us On </h3>
                        <br/>
                        <p><LocationOnIcon fontSize="small"/>&nbsp;Petta Road, Maradana, colombo 10</p>
                        <p><EmailIcon fontSize="small"/>&nbsp; info.saraHotele@gmail.com</p>
                        <p><PhoneIcon fontSize="small"/>&nbsp;011 - 277202099</p>
                    </div>
                    <div className="col-xl-3"align="center">
                        <h5> We value your feedback</h5>    
                        

                        <br/> <br/>
                        <span>
                            <img src="https://img.icons8.com/color/48/000000/facebook-circled--v4.png" alt="facebook"/>
                            <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" alt="instagram"/>
                            <img src="https://img.icons8.com/color/48/000000/twitter-circled--v2.png" alt="twitter"/>
                        </span>
                    </div>
                </div>
                <div className="col-xl-12 text-center "> 
                    <p className ="mb-0"> Sara Hotel © 2021 - All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
