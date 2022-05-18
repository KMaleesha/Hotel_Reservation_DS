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
    // const [isCheckAll, setIsCheckAll] = useState(false);
    // const [isCheck, setIsCheck] = useState([]);
    const [customer, setCustomer] = useState(JSON.parse(localStorage.getItem('customer')));
    // let finalTotal = 0;
    
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
            await axios.get(`http://localhost:8090/booking/${props.match.params.id}&${props.match.params.type}`,config).then((res) => {
                console.log(res)
                setRooms(res.data.result) 
            }).catch((error) => {
              alert("Failed to fetch Bookings")
            })
        }
        getData();        
    }, [props])

    
    //select all checkbox
    // const handleSelectAll = event => {
    //     setIsCheckAll(!isCheckAll);
    //     setIsCheck(items.map(item => item._id));
    //     if (isCheckAll) {
    //         setIsCheck([]);
    //     }
    // };

    //one checkbox
    // function handleClick(event) {
    //     const id = event.currentTarget.id;
    //     const checked = event.currentTarget.checked;
    //     setIsCheck([...isCheck, id]);

    //     if (!checked) {
    //         setIsCheck(isCheck.filter(item => item !== id));
    //     }
    // };

    // isCheck.map(roomID => (                                              
    //     getTotal(roomID)

    // ))

    // localStorage.setRooms("selectedItem",JSON.stringify(isCheck))

    // async function getTotal(id) {
    //     let iTotal
    //     await axios.get(`http://localhost:8090/booking/${id}`,config).then((res) => {
    //         iTotal = res.data.result.total 
    //         finalTotal = finalTotal + iTotal            
            
            
    //     }).catch((error) => {
    //       alert("Failed to fetch cal")
    //     })
    //     localStorage.setItem("total",finalTotal)
    // }

    //Update Room
    // async function updateQuantity(id,quantity,price) {
        
    //     try {
    //         await axios.put(`http://localhost:8070/cart/update/${id}`,{quantity,price},config)
    //         history.push(`/cart/${props.match.params.id}/${props.match.params.type}`)
    //     } catch (error) {            
    //         if(error.response.status === 401){
    //             alert("Authentication failed. Please Sign In again")
    //             history.push('/patient/signin')
    //             } 
    //             else{
    //                 alert("Update failed")
    //             }
    //     }  
                     
    // }

    //Increment Quantity
    // function increment(id,Price) {
    //     items.forEach(Room => {
    //         if(Room._id === id){
    //             if(Room.quantity<10){
    //                 Room.quantity++
    //                 updateQuantity(Room._id,Room.quantity,Price)
    //             }
    //         }
    //     })       
    // }

    //Decrease Room
    // function decrease(id,Price) {
    //     items.forEach(Room => {
    //         if(Room._id === id){
    //             if(Room.quantity>1){
    //                 Room.quantity--
    //                 updateQuantity(Room._id,Room.quantity,Price)
    //             }
    //         }
    //     })       
    // }

    //delete Room
    async function deleteItem(id){        
        await axios.delete(`http://localhost:8090/booking/delete/${id}`, config).then(() => {
            alert("Booking deleted successfully")
            setRooms(rooms.filter(element => element._id !== id))
        }).catch((error) => {
            alert(`Failed to delete the booking\n${error.message}`)
        }) 
    } 

    // search
    // function filterContent(data, searchTerm){
    //     const result = data.filter((items) => 
    //         items.roomNum.name.toLowerCase().includes(searchTerm)
    //     )
    //     setItems(result)
    //   }
    
    //   function handleSearch(event){
    //     const searchTerm = event.currentTarget.value
    //     axios.get(`http://localhost:8070/cart/${props.match.params.id}&${props.match.params.type}`).then((res) => {
    //       filterContent(res.data.result, searchTerm.toLowerCase())
    //     }).catch((error) => {
    //       alert("Failed to fetch item")
    //     })
    //   }

      function order() {
          history.push(`/customer/taxi/`)
      }

    //   function generateReport() {
    //     history.push(`/cart/report/${props.match.params.id}/${props.match.params.type}`)
    // }

      
     
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
                    {/* <div className="col-5">
                        <div className="px-3 search" align="center">
                            <input 
                                type="text" 
                                name="search" 
                                id="search"
                                placeholder="Search" 
                                onChange={handleSearch} 
                                required 
                            />
                        </div>
                    </div>                     */}
                </div>
                {/* <div className="row">
                    <div className="col-12 exp"> <br/> */}
                    {/* select all check box*/}
                        {/* <FormControlLabel
                            control={<Checkbox icon={<CheckRound/>}
                            checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}
                            id="selectAll" 
                            name="checkedH" />}
                            onChange={handleSelectAll}
                            checked={isCheckAll}
                            label="Select All"
                        />            
                        <br/><br/>
                    </div>                     */}
                {/* </div> */}
                <div className="row">
                    <div className="col-xl-8"data-aos="slide-up">
                        {/* map */}
                        {rooms.map((Room, key) => ( 
                            <div key={key} >                                
                                <div className="cart-box mb-3 shadow">                        
                                    <div className="row align-items-center ">
                                        {/* <div className="col-sm-1"> */}
                                            {/* Check box for item */}
                                            {/* <FormControlLabel                                                    
                                                checked={isCheck.includes(Room._id)}
                                                control={
                                                    <Checkbox icon={<CheckRound />} 
                                                        checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}  name="checkedH" 
                                                        id = {Room._id}
                                                        onChange={handleClick}
                                                    />
                                                }
                                            />
                                        </div> */}
                                        {/* Room Image */}
                                        <div className="col-sm-2">
                                            <div ><img className="room-Img" src={Room.roomID.imgUrl} alt="room"></img></div>
                                        </div>
                                        {/* Room Name and description */}
                                        <div className="col-sm-4">                                                
                                            <h4>{Room.roomID.roomNum}</h4>
                                            <p className="textShort mb-1">{Room.roomID.description}</p>    
                                            {/* <Link to={`/pharmacy/item/${Room.roomNum._id}`}>Show more</Link> */}
                                        </div>
                                        <div className="col-sm-2">
                                            <h6>{Room.type}</h6>
                                            <h6>{Room.date}</h6>
                                        </div>
                                        {/* <div className="col-sm-2">
                                            <div> */}
                                                {/* Quantity decrease button */}
                                                {/* <IconButton onClick={()=>decrease(Room._id,Room.roomNum.price)}>
                                                    <SubIcon style={{fontSize:"small"}}></SubIcon>
                                                </IconButton> */}

                                                {/* Quantity */}
                                                {/* <Input type="text" name="quantity" className="quantity" disableUnderline margin="dense" readOnly value={(Room.quantity)}/> */}
                                                
                                                {/* Quantity decrease button */}
                                                {/* <IconButton onClick={()=>increment(Room._id,Room.roomNum.price)}>
                                                    <AddIcon style={{fontSize:"small"}}></AddIcon>
                                                </IconButton> */}
                                            {/* </div>
                                        </div> */}
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
                                <div className="row">
                                    {/* Address */}
                                    {/* <div className="col-xl-12 mb-3">
                                        <h6>Address:</h6>
                                        <OutlinedInput  
                                            type="text" id="adress" placeholder="Address" 
                                            required fullWidth
                                            value={customer.address}
                                        />                                   
                                    </div> */}
                                    <hr/>                                                                  
                                    {/* Checkout Button */}
                                    <Button disableElevation style={{backgroundColor:red[500]}} variant="contained" color="secondary" onClick={order}>
                                    <b>Order</b>
                                    </Button>
                                </div>                                
                        </div>
                        {/* <div> */}
                            {/* Report Generate Button  */}
                            {/* <center>
                            <Button variant="contained" className="mb-4" disableElevation size="large" onClick={generateReport}
                                style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon/>}>
                                Generate Report
                            </Button>
                            </center> */}
                        {/* </div> */}
                    </div>
                </div>        
            </div>               
        </div>
    )
}
export default Bookings
