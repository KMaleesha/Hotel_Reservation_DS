import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './Rooms.css'
import axios from 'axios'
import { orange,red,blue,green } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
// import {AddToCart} from './../../../Utils/CartUtils'
import GetAppIcon from '@material-ui/icons/GetApp';
import AddIcon from '@material-ui/icons/Add';

function Rooms() {

  const [isAdmin,setIsAdmin]= useState(false)
  const [rooms, setRooms] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] = useState("");

  useEffect(() => { 
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    if(localStorage.getItem("adminAuthToken")){
      setIsAdmin(true)
    }
    async function getAllRooms() {
      axios.get(`http://localhost:8070/reservationInfo`).then((res) => {
        setRooms(res.data)  
      }).catch((error) => {
        alert("Failed to fetch Rooms")
      })
    }

    if(isAdmin === true){
      getAllRooms();
    }else{
      getAllRooms();
    }
  }, [location,isAdmin])

  function view(id){
    history.push(`/hotel/singleRoom/${id}`)
  }

  function addReservationInfo(){
    history.push(`/hotel/addReservationInfo`)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4'>
          <div className='pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between'>
              <h2>Hotel Rooms</h2>
          </div>
        </div>
        <div className='col-3'>
        </div>
        <div className='col-5'>
        {isAdmin === true ?
          <div className='px-3 search' align="right">
            <input 
              type="text" 
              name="search" 
              id="search"
              placeholder="Search" 
              // onChange={handleSearchAll} 
              required 
            />
          </div>
          :
          <div className='px-3 search' align="right">
              <input 
                type="text" 
                name="search" 
                id="search"
                placeholder="Search" 
                // onChange={handleSearch} 
                required 
              />
          </div>
        }      
        </div>
      </div>
      <div className='roomGrid'>
        {isAdmin && 
            <Button  className="mx-2 roomBtn" style={{backgroundColor:blue[400],color:'white'}} onClick={()=>addReservationInfo()}>
            Add Room <AddIcon/>
            </Button>  
        }
        {isAdmin && 
            <Button  className="mx-2 roomBtn" style={{backgroundColor:green[400],color:'white'}} onClick={""} >
            Room Report<GetAppIcon />
            </Button>  
        }
        {rooms.map((Room, key)=>(
              <div key={key}>
                <div className='roomCard'>
                  <div className="imgBx">
                      <img  src={`${Room.imgUrl}`} alt="room" className="roomReserve"/>
                  </div>
                  <div className='p-3'>
                    <h7>{Room.roomNum}</h7><br></br>
                    <h7>{Room.type}</h7>
                    <h6>Rs.{Room.price}.00</h6>
                    <div align ="right">
                      <span>
                          <button className='roomBtn' style={{backgroundColor:orange[600]}}
                          onClick={()=>""(Room._id, user._id, Room.price)}> Reserve
                          </button>
                          &nbsp;&nbsp;&nbsp;
                          <button className="roomBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Room._id)}> Details </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
        ))}
      </div>
    </div>
  )
}

export default Rooms
