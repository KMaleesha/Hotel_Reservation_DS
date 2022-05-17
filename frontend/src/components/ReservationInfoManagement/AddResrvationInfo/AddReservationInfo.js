import { useState } from 'react';
import axios from 'axios';
import './AddReservationInfo.css'
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';

function AddReservationInfo() {
    const[roomNum,setroomNum]=useState(""); 
    const[description,setDescription]=useState("");
    const[type,setType]=useState("");
    const[price,setPrice]=useState("");

    const [previewSource, setPreviewSource] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');

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

    async function add(event){
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "ReservationImg")
            
            try {
                await axios.post("https://api.cloudinary.com/v1_1/tbrmy/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const newReservationInfo = {roomNum, description, type, price, imgUrl}

        try {
            await axios.post('http://localhost:8070/reservationInfo/add', newReservationInfo , config)
            alert("Reservation Information Added Successfully")  
            event.target.reset(); 
        }catch (error) {         
            alert("Reservation Information can't be Added");
        }
    }

    return (
    <div className='container' align="center">
        <div className='row'>
            <div className='col-12'>
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Add New Hotel Room</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className='create_reservationInfo'>
            <form onSubmitCapture={add} className='addReservationInfo'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='row'>
                            <div className='col-md-8 mb-4'>
                                <div className='form-name'>
                                    <OutlinedInput
                                        type ='text' id='roomNum' placeholder ="Room Number"
                                        required fullWidth
                                        onChange={(e)=>setroomNum(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='col-md-8 mb-4'>
                                    <div className='form-price'>
                                        <OutlinedInput
                                            type="price" id="price" placeholder="Room Price" required fullWidth
                                            onChange={(e)=>setPrice(e.target.value)}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-10 mb-4'>
                                <div className='form-description'>
                                    <TextField
                                        id="description" placeholder="Room Description" 
                                        required fullWidth variant="outlined" 
                                        onChange={(e)=>setDescription(e.target.value)}
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12 mb-4'>
                                <div className='form-group'>
                                <div>
                                    <label><h6>Type</h6></label> &nbsp;
                                </div>
                                    <div className='form-check form-check-inline'>
                                            <input
                                                className="form-check-input" type="radio" name="Type" id="Pre-Paid" value="Pre-Paid" required
                                                onChange={(e)=>setType(e.target.value)}
                                            />
                                            <label className="form-check-label" for="Pre-Paid">
                                                Pre-Paid
                                            </label>
                                    </div>
                                    <div className='form-check form-check-inline'>
                                            <input 
                                                className="form-check-input" type="radio" name="Type" id="Post-Paid" value="Post-Paid" required
                                                onChange={(e)=>setType(e.target.value)}
                                            />
                                            <label className="form-check-label" for="Post-Paid">
                                                Post-Paid
                                            </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 d-flex justify-content-center'>
                        <div>
                            {previewSource ? 
                                <img src={previewSource} alt="preview" className="previewImgReservation"/>
                            :
                                <img src="/images/reservation.png" className="previewImgReservation" alt="reservation pic"/>
                            }
                            <div className='form-group'>
                                <label htmlFor="profilepic">
                                    <input
                                        style={{ display: 'none' }}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />

                                    <Button color="primary" variant="contained" component="span">
                                        <AddAPhotoIcon/> &nbsp; Upload Image
                                    </Button>
                    
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-submit-btn" type="submit" value="Add Room Info" />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default AddReservationInfo