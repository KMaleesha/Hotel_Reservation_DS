import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import './UpdateRooom.css';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';

function UpdateRoom(props) {
    const [roomNum,setroomNum]= useState("");
    const [description,setDescription]= useState("");
    const [price,setPrice]= useState("");
    const [type,setType]= useState("");
    const history=useHistory();
    const[imgUrl,setImgUrl]=useState("");

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();
    const types = [
        { value: 'Pre-Paid', label: 'Pre-Paid',},
        { value: 'Post-Paid', label: 'Post-Paid',},];


    useEffect(()=>{
      async function fetchroom(){
        await axios.get(`http://localhost:8070/reservationInfo/${props.match.params.id}`).then((res)=>{
            setroomNum(res.data.reservationInfo.roomNum)
            setDescription(res.data.reservationInfo.description)
            setPrice(res.data.reservationInfo.price)
            setType(res.data.reservationInfo.type)
            setImgUrl(res.data.reservationInfo.imgUrl)
        }).catch((error)=>{
            alert("Failed to fetch Room data")
        })
      }
      fetchroom()
    },[props]);

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };

    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    //update the product
    async function Update(event){

        event.preventDefault();

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile)
            formData.append("upload_preset", "ReservationImg")

            try{
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) => {
                    imgUrl = res.data.secure_url
                })
            }catch(error){
                alert(error)
            }
        }

        const updateroom = {roomNum, description, price, type,imgUrl}

        const config = {
            headers: {
                "content-Type": "application/json",
            }
        };

        try{
            await axios.put(`http://localhost:8070/reservationInfo/update/${props.match.params.id}`,updateroom, config);
            alert("Room Info Updated Successfully")
            history.push('/hotel/rooms')
        }catch (error){
            alert("Room Info Updating Failed")
        }
    }

  return (
    <div className='container' align ='center'>
        <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Update Room Info</h2>
                </div>
            </div>
        </div>
        <div className="update_roomInfo">
            <form onSubmit={Update} className="updateRoomInfo">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-md-8 mb-4">
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="name" placeholder="Room Name" 
                                        required fullWidth 
                                        value={roomNum}
                                        onChange={(event)=> {setroomNum(event.target.value)}}
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="col-md-8 mb-4">
                                    <div className="form-price">
                                        <OutlinedInput 
                                            type="price" id="price" placeholder="Room Price"
                                            required fullWidth value={price}
                                            onChange={(event)=> {setPrice(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>  
                                </div>
                            </div>
                            <div>
                                <br></br>
                                <div className="col-md-10 mb-4">
                                    <div className="form-description">
                                        <TextField
                                            multiline rows={5}
                                            id="description" placeholder="Room Description" 
                                            required fullWidth variant="outlined" value={description}
                                            onChange={(event)=> {setDescription(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        /> 
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="form-group">
                                    <TextField 
                                        id="type"
                                        select
                                        SelectProps={{
                                        native: true,
                                        }}
                                        variant="outlined"
                                        fullWidth
                                        value={type}
                                        onChange={(event)=> {setType(event.target.value)}}
                                        inputProps={{style: {padding: 12}}}
                                        >
                                        {types.map((option) => (
                                        <option key={option.value} value={option.value}>
                                        {option.label}
                                        </option>
                                        ))}
                                    </TextField>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="col-4 d-flex justify-content-center">
                        <div>
                            {previewSource ? 
                                <img src={previewSource} alt="preview" className="previewImgRoom"/>
                            :
                                <img src={`${imgUrl}`} className="updatePreviewImgRoom" alt="room pic"/>
                            }
                            <div className="form-group">
                                <label htmlFor="roomImg">
                                    <input
                                        style={{ display: 'none' }}
                                        id="roomImg"
                                        name="roomImg"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />
                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Update Image
                                    </Button>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-submit-btn" type="submit" value="Update Room" /> 
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateRoom