import React ,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import '../Rooms/Rooms.css'
import '../SingleRoom/SingleRoom.css'
import axios from 'axios'
import {orange,blue,red } from '@material-ui/core/colors';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
// import {AddToCart} from './../../../Utils/CartUtils'

function RoomDetails(props) {

    const [isAdmin,setIsAdmin]=useState(false)
    const[id,setId]=useState("");
    const[roomNum,setroomNum]=useState("");
    const[type, settype] = useState("");
    const[description,setDescription]=useState("");
    const[price,setPrice]=useState("");
    const[imgUrl,setImgUrl]=useState("");
    const [rooms, setRooms] = useState([]);
    const history=useHistory();
    const [user, setUser] = useState("");

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
        }

      async function getRoomDetails() {
        axios.get(`http://localhost:8070/reservationInfo/${props.match.params.id}`).then((res) => {
            setId(res.data.reservationInfo._id) 
            setroomNum(res.data.reservationInfo.roomNum)
            settype(res.data.reservationInfo.type)
            setDescription(res.data.reservationInfo.description)
            setPrice(res.data.reservationInfo.price)   
            setImgUrl(res.data.reservationInfo.imgUrl)
        }).catch((err) => {
            alert("Failed to Fetch Rooms")
        })
      }
      getRoomDetails();
    
    }, [props])

    async function deleteRoom(id){        
        await axios.delete(`http://localhost:8070/reservationInfo/delete/${id}`,config).then(() => {
            alert("Room deleted successfully")
            history.push('/hotel/rooms')
        }).catch((error) => {
            alert(`Failed to delete the Room\n${error.message}`)
        }) 
    } 
        
            
    function view(id){
        history.push(`/hotel/room/${id}`)
    }
    function update(uid){
        history.push(`/hotel/room/update/${uid}`)
    }

    // function Buy(){
    //     history.push(`/patient/buyPayment/${id}/${price}`)
    // }



  return (
    <div className='container' align ="center">
        <div className='detailRoomCard'>
            <div className='detailRoom'>
                    <img src={`${imgUrl}`} alt="roomDetails" />
                <div className='box-detailRoom'>
                        <div className='row'>
                            <h2>{roomNum}</h2>
                        </div>
                        <h5>{type}</h5>
                        <h5>Rs.{price}.00</h5>
                        <p className='text-muted'>{description}</p>
                </div>
            </div>
            <table className='singleItemBtn'>
                        <div>
                            {isAdmin === true ?
                                <div>
                                    <button className="mx-2 roomBtn" style={{backgroundColor:blue[400]}} onClick={()=>update(id)}>
                                    Update <EditIcon/>
                                    </button>
                                    <button className="mx-2 roomBtn" style={{backgroundColor:red[500]}} onClick={()=>deleteRoom(id)} >
                                    Delete <DeleteForeverIcon/>
                                    </button>
                                </div>
                                :
                                <div>
                                    <button className="mx-2 roomBtn" style={{backgroundColor:orange[500]}} 
                                    onClick={()=>""(id, user._id, price)}>
                                    Add To MyBookings
                                    </button> 
                                    <button className="mx-2 roomBtn" style={{backgroundColor:red[500]}} 
                                        onClick={()=>""()}>
                                        Book Now
                                    </button> 
                            </div>   
                            }
                        </div>
            </table>
        </div>
        <br></br>

        <div>
            <div>
                <h2 align ='left'> &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Related Rooms
                <br></br>
                </h2>
            </div>
            <table className='relatedRoom'>
                <div className='reservations'>
                    <div className='container roomGridR'>
                        {rooms.slice(0, 5).map((Room, key)=>(
                            <div key={key}>
                                <div className='roomCard'>
                                    <div className='imgBx'>
                                        <img  src={`${Room.imgUrl}`} alt="room"  className="roomReserve"/>
                                    </div>
                                    <div className='p-3'>
                                        <h7>{Room.roomNum}</h7>
                                        <h7>{Room.type}</h7>
                                        <h6>Rs.{Room.price}.00</h6>
                                    <div align ='right'>
                                        <span>
                                            <button className='roomBtn' style={{backgroundColor:orange[600]}} onClick={()=>""(Room._id, user._id, Room.price)}>
                                            Reserve
                                            </button>
                                            &nbsp;&nbsp;&nbsp;
                                            <button className="roomBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Room._id)}>
                                            View Room
                                            </button>
                                        </span>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </table>
        </div>
    </div>
  )
}

export default RoomDetails