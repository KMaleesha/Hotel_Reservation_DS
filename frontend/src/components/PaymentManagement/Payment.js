import React,{useState} from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import './AddPayment.css';
import Paypal from './Paypal'
import { OutlinedInput,InputAdornment} from "@material-ui/core";


export default function BuyPayment(props){
    const user = JSON.parse(localStorage.getItem('user'));
    const customerID = user._id;
    const roomNum = props.match.params.roomNum
    const amount = props.match.params.price
    const date = props.match.params.date
    const history = useHistory();
    const [email,setEmail]= useState("");
    const [mobile,setMobile]= useState("");
    console.log(customerID, roomNum, amount, date)
    //const client = require('twilio')('process.env.ACCOUNT_SID','process.env.AUTH_TOKEN');
    const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey = process.env.ApiKey 

 
   
    async function transitionSuccess(e){
        e.preventDefault();
        const newPayment={
            customerID,
            roomNum,
            amount,
            email,
            mobile,
            date    
        }
    
        //getting data from backend
        await axios.post("http://localhost:8070/Payment/add",newPayment).then((res)=>{
            alert("Payment Successful")

            const paymentID = res.data.payment._id

           //confirm message

            const confirm={
                paymentID,
                amount,
                roomNum,
                date,
                email,
                mobile
            }
            
            //header with authorization token
            const config = {
                headers: {
                    "content-Type": "application/json",
                    Authorization: `${localStorage.getItem("customerAuthToken")}`,
                },
                
            };
            //email send 
                
                let msg = "Payment Successfull"
            
                const message = {
                    to: email,
                    from: 'saraHotel@info.com',
                    subject: msg,
                    html:paymentID,  amount,roomNum,date,email,mobile
                }
                sgMail
                .send(message)
                // console.log('Email Sent');
                .catch((error)=>{
                    console.error('Error: ',error)
                });
              
            

            // navigate to backend sms send 
            axios.post("http://localhost:8090/sms",confirm,config).then((res)=>{
                alert ("Confirmation SMS Sended ") 
                
            }).catch((error)=>{
                alert("Failed to Confirmation SMS Send")
            })

        }).catch((error)=>{
            alert("adding failed")
        }) 
    }
    // function transitionSuccess(){
    //     console.log('Paypal Success')
    // }
    function transitionError(){
        console.log('Paypal error')
    }
    function transitionCanceled(){
        console.log('Transaction canceled')
    }
    
    
   
    
    return(
        <div className="container" align="center">
            <div className="card-form">
                <form onSubmit={transitionSuccess} className="boxAddPayment">
                    <div className="row">
                        <div className="col-12">
                            <div div className="row">
                                <h3>Payment method</h3>
                                <div className="col-12">
                                <img src="/images/payment.png" height="50px" width="180px" alt="payment" />
                                </div>
                                <br></br>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="number" placeholder="Date" 
                                            required fullWidth readOnly 
                                            value={roomNum}
                                            inputProps={{style: {padding: 12}}}
                                            // startAdornment={
                                            //     <InputAdornment position="start">
                                            //         LKR
                                            //     </InputAdornment>
                                            // }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="mobile" placeholder="Mobile"
                                            required fullWidth
                                            onChange={(event)=> {setMobile(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="email" placeholder="Email"
                                            required fullWidth
                                            onChange={(event)=> {setEmail(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="amount" placeholder="Total Amount" 
                                            required fullWidth  
                                            
                                            inputProps={{style: {padding: 12}}}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    LKR
                                                </InputAdornment>
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="number" placeholder="Date" 
                                            required fullWidth readOnly 
                                            value={date}
                                            inputProps={{style: {padding: 12}}}
                                            // startAdornment={
                                            //     <InputAdornment position="start">
                                            //         LKR
                                            //     </InputAdornment>
                                            // }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>                       
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">

                                {/* PayPal Button  */}

                                <Paypal 
                                    toPay={amount}
                                    onSuccess={transitionSuccess}
                                    transitionError = {transitionError}
                                    transitionCanceled = {transitionCanceled}
                                />

                            </div>
                        </div>
                    </div>       
                </form>                  
            </div>
        </div>               
    )
}
 
    
    

