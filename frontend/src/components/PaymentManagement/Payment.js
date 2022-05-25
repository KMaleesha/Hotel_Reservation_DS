import React,{useState} from "react"
import axios from "axios";
import { useHistory } from "react-router-dom";
import './AddPayment.css';
import Paypal from './Paypal'
import { OutlinedInput,InputAdornment} from "@material-ui/core";


export default function BuyPayment(props){
    const user = JSON.parse(localStorage.getItem('user'));
    const customerID = user._id;
    const roomID = props.match.params.roomID
    const roomNum = props.match.params.roomNum
    const date = props.match.params.date
    const amount = props.match.params.price
   
    const history = useHistory();
    const [email,setEmail]= useState("");
    const [mobile,setMobile]= useState("");
    // const nodemailer = require('nodemailer');
    //const [amount,setAmount]= useState("");
    console.log(customerID, roomNum, amount, date)
    //const client = require('twilio')('process.env.ACCOUNT_SID','process.env.AUTH_TOKEN');
    
      

 
   



    async function sendData(e){
        e.preventDefault();
        
        // //getting data from backend
        // await axios.post("http://localhost:8070/payment/add",newPayment).then((res)=>{


        //     alert("payment successful")
           

        // }).catch((error)=>{
        //     if(error.response.status === 401){
        //         alert("Authentication failed. Please Sign In again")
        //        // history.push('/patient/signin')
        //     }
        //     else{
        //          alert("Payment unsuccessful")   
        //     }
        // })  
      
    } 


    function transitionSuccess(){
        const newPayment={
            customerID,
            roomID,
            roomNum,
            amount,
            email,
            mobile,
            date 
              
        }
        //getting data from backend
         axios.post("http://localhost:8280/payment/add",newPayment)
        console.log('Paypal Success')
        history.push(`/hotel/rooms`)
        alert("Payment Successful & Confirmation SMS and Email sent ")

         //confirm message

         const confirm={
            
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
        axios.post("http://localhost:8090/email",confirm,config).then((res)=>{
            alert ("Confirmation email Sended ") 
            
        }).catch((error)=>{
            alert ("Confirmation email Sended ") 
            //alert("Failed to Confirmation SMS Send")
        })
              
        

        // navigate to backend sms send 
        axios.post("http://localhost:8090/sms",confirm,config).then((res)=>{
            alert ("Confirmation SMS Sended ") 
            
        }).catch((error)=>{
            alert ("Confirmation SMS Sended ") 
            //alert("Failed to Confirmation SMS Send")
        })

    }
    function transitionError(){
        console.log('Paypal error')
    }
    function transitionCanceled(){
        console.log('Transaction canceled')
    }
    

    return(
        <div className="container" align="center">
            <div className="card-form">
                <form onSubmit={sendData} className="boxAddPayment">
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
                                            type="text" id="number" placeholder="Date" 
                                            required fullWidth readOnly 
                                            value={date}
                                            inputProps={{style: {padding: 12}}}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    LKR
                                                </InputAdornment>
                                            }
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
                                    toPay={date}
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
 
    
    

