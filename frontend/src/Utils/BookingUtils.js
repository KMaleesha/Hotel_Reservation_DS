import axios from "axios";

export const AddBooking = (roomid,id,Price,Date,Type) => {

    const roomID = roomid
    const customerID = id
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
}