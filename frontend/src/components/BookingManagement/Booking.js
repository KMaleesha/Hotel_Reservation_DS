import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SubIcon from '@material-ui/icons/Remove';
import { Button, IconButton } from '@material-ui/core';
import { red , orange, green} from '@material-ui/core/colors';
import './Booking.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckRound from '@material-ui/icons/TripOrigin';
import OutlinedInput from "@material-ui/core/OutlinedInput";


import Aos from "aos";
import "aos/dist/aos.css"


function Bookings(props) {
    const [rooms, setRooms] = useState([])
    const [isType, setIsType] = useState(true)
    const history = useHistory()
    const [address, setAddress] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState("");
    const [passengerNo, setPassengerNo] = useState("");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    
    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("customerAuthToken")}`
        }
    };
    Aos.init({duration:2000})

    useEffect(() => {
        //check Booking type
        if (props.match.params.type === "postpaid") {
            setIsType(true)
        }
        else if(props.match.params.type === "prepaid"){
            setIsType(false)
        }
        
        //Fetch Room 
        async function getData() {
            await axios.get(`http://localhost:8280/booking/${props.match.params.id}&${props.match.params.type}`,config).then((res) => {
                setRooms(res.data.result) 
            }).catch((error) => {
              alert("Failed to fetch Bookings")
            })
        }
        getData();        
    }, [props])


    //delete Room
    async function deleteItem(id){        
        await axios.delete(`http://localhost:8280/booking/${id}`, config).then(() => {
            alert("Booking deleted successfully")
            setRooms(rooms.filter(element => element._id !== id))
        }).catch((error) => {
            alert(`Failed to delete the booking\n${error.message}`)
        }) 
    } 

    async function orderTaxi(event) {
        event.preventDefault();
        
        const customerID = user._id;
        const newTaxiOrder = {customerID,address, destination, date, passengerNo}

        try {
            await axios.post('http://localhost:8280/taxi/add', newTaxiOrder , config)
            alert("Taxi Order Added Successfully")  
            event.target.reset(); 
        }catch (error) { 
            if(error.response.status === 409){
                alert("Taxi already booked on this date")
            }else {       
                alert("Taxi Order can't be placed");
            }
        }      
    }

          
    return (
        <div>
            <div className="container">
                {/* check booking type */}
                <div className = "row">
                    <div className="col-4">
                        <div className="dropdown">
                            <span>{isType ? <h2>Bookings</h2> : <h2>Paid Bookings</h2> }</span>
                            <div className="dropdown-content">
                                {isType ? <a href={`/booking/${props.match.params.id}/prepaid`}><h5 className="linkColor">Paid Bookings</h5></a> : <a href={`/booking/${props.match.params.id}/postpaid`}><h5 className="linkColor">Bookings</h5></a>}
                            </div>
                        </div>
                    </div>                    
                    <div className="col-3">
                    </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
    
                </div>
                <div className="row">
                    <div className="col-xl-8"data-aos="slide-up">
                        {/* map */}
                        {rooms.map((Room, key) => ( 
                            <div key={key} >                                
                                <div className="cart-box mb-3 shadow">                        
                                    <div className="row align-items-center ">
                                        {/* Room Image */}
                                        <div className="col-sm-2">
                                            <div ><img className="room-Img" src={Room.roomID.imgUrl} alt="room"></img></div>
                                        </div>
                                        {/* Room Name and description */}
                                        <div className="col-sm-4">                                                
                                            <h4>{Room.roomID.roomNum}</h4>
                                            <p className="textShort mb-1">{Room.roomID.description}</p>    
                                        </div>
                                        <div className="col-sm-2">
                                            <h6>{Room.type}</h6>
                                            <h6>{Room.date}</h6>
                                        </div>
                                        {/* Price */}
                                        <div className="col-sm-2">
                                            LKR&nbsp;{Room.roomID.price}.00
                                            {}
                                        </div>
                                        <div className="col-sm-1">
                                            <IconButton onClick={()=>deleteItem(Room._id)}>
                                                <DeleteOutlinedIcon fontSize="large"></DeleteOutlinedIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Taxi Card */}
                    <div className="col-xl-4" >
                        <div className="cardSummary shadow">

                            <h5>Order Taxi</h5>
                                <br/>
                                <form onSubmitCapture={orderTaxi}>
                                <div className="row">
                                    <div className="col-xl-12 mb-3">
                                        <h6>PickUp:</h6>
                                        <OutlinedInput  
                                            type="text" id="adress" placeholder="Address" 
                                            required fullWidth
                                            onChange={(e)=>setAddress(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />                                   
                                    </div> 
                                    
                                    <div className="col-xl-12 mb-3">
                                    <h6>Destination:</h6>
                                        <OutlinedInput 
                                            type="text" id="destination" placeholder="Destination" required fullWidth
                                            onChange={(e)=>setDestination(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                   
                                    <div className="col-xl-12 mb-3">
                                        <OutlinedInput 
                                            type="date" id="date" placeholder="Date" 
                                            onChange={(e)=>setDate(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                    
                                    <div className="col-xl-12 mb-3">
                                        <OutlinedInput 
                                            type="Number" id="passengerNo" placeholder="No. of Passengers" 
                                            onChange={(e)=>setPassengerNo(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                    <hr/>                                                                  
                                    <hr/>                                                                  
                                    {/* Checkout Button */}
                                    <Button disableElevation style={{backgroundColor:red[500]}} variant="contained" color="secondary" 
                                    type="submit" value="AddtaxiOrder">
                                    <b>Order</b>
                                    </Button>
                                </div>
                                </form>                                
                        </div>
                    </div>
                </div>        
            </div>               
        </div>
    )
}
export default Bookings
