const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static('public'));
//limiting image size to 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


const AdminRouter = require("./routes/adminrouter.js");
// const StudentRouter = require("./routes/studentrouter.js");
// const ProgressRouter = require("./routes/progressrouter.js");
// const SupervisorRouter = require("./routes/supervisorrouter");
// const PanelmemberRouter = require("./routes/panelmemberrouter");
// const Supervisorrouter = require("./routes/supervisorrouter");

const reservationInfoRouter = require('./routes/reservationInforouter.js');


//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL,{
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: true,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("Sara Hotel Reservation connection success");
}); 


//when http://localhost:8070/admin ran it will execute adminrouter.js file
app.use("/admin",AdminRouter);
//when http://localhost:8070/student ran it will execute StudentRouter.js file
//  app.use("/student",StudentRouter);
//  //when http://localhost:8070/student ran it will execute StudentRouter.js file
//  app.use("/progress",ProgressRouter);
// //when http://localhost:8070/supervisor ran it will execute supervisorrouter.js file
// app.use("/supervisor",SupervisorRouter);
// //when http://localhost:8070/panelmember ran it will execute panelmemberrouter.js file
// app.use("/panelmember",PanelmemberRouter);
// //when http://localhost:8070/supervisor ran it will execute supervisorrouter.js file
// app.use("/supervisor",Supervisorrouter);

app.use('/ReservationInfo', reservationInfoRouter);


//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
