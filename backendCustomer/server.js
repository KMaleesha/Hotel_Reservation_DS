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



const smsRouter = require("./routes/smsrouter.js");
const paymentRouter = require("./routes/paymentrouter.js");

const CustomerRouter = require("./routes/customerrouter");
// const StudentRouter = require("./routes/studentrouter.js");

// const ProgressRouter = require("./routes/progressrouter.js");
// const SupervisorRouter = require("./routes/supervisorrouter");
// const PanelmemberRouter = require("./routes/panelmemberrouter");
const BookingRouter = require("./routes/bookingrouter");


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
    console.log("Sara Hotel Reservation db connection success");
}); 



//when http://localhost:8090/sms ran it will execute smsRouter.js file
 app.use("/sms",smsRouter);
//when http://localhost:8090/Payment ran it will execute paymentRouter.js file
 app.use("/payment",paymentRouter);

//when http://localhost:8090/customer ran it will execute customerrouter.js file
app.use("/customer",CustomerRouter);
//when http://localhost:8090/student ran it will execute StudentRouter.js file
//  app.use("/student",StudentRouter);

//  //when http://localhost:8090/student ran it will execute StudentRouter.js file
//  app.use("/progress",ProgressRouter);
// //when http://localhost:8090/supervisor ran it will execute supervisorrouter.js file
// app.use("/supervisor",SupervisorRouter);
// //when http://localhost:8090/panelmember ran it will execute panelmemberrouter.js file
// app.use("/panelmember",PanelmemberRouter);
//when http://localhost:8090/booking ran it will execute bookingrouter.js file
app.use("/booking",BookingRouter);


//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8091;

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
