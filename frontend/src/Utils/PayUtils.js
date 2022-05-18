import axios from "axios";
import { useHistory } from "react-router-dom";

export const AddPay = (roomid,id,roomNo,Price,Date,Type) => {

    const history = useHistory()
    const roomID = roomid
    const customerID = id
    const roomNum = roomNo
    const date = Date
    const type = Type
    const price = Price
    // let total = quantity*price;

    const booking = {roomID, customerID, date, type, price}
    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("customerAuthToken")}`
        }
    };
    
    axios.post("http://localhost:8090/booking/add", booking , config).then((res)=>{
        alert("Booking Added")
        // history.push(`/customer/payment/${roomNum}/${price}/${date}`)
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
     history.push(`/customer/payment/${roomNum}/${price}/${date}`)
}