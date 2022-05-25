import axios from "axios";
import { useHistory } from "react-router-dom";

export const AddPay = (roomid,id,Price,Date,Type) => {

    
    const roomID = roomid
    const customerID = id
    const date = Date
    const type = Type
    const price = Price
    const history = useHistory()
    // let total = quantity*price;

    const booking = {roomID, customerID, date, type, price}
    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("customerAuthToken")}`
        }
    };
    history.push('/customer/payment') 
    axios.post("http://localhost:8280/booking/add", booking , config).then((res)=>{
        alert("Booking Added")
      
    }).catch((error)=>{         
        if(error.response.status === 409){
            alert("Booking already exists")

         }else if(error.response.status === 401){
            alert("Please login")
        }
        else{
            alert("Booking can't be Added")
            console.log(error)     
        }        
    })
    //  history.push(`/customer/payment/${roomNum}/${price}/${date}`)
}