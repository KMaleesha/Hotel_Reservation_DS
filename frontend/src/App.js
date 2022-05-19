import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './Routes/PrivateRoute';
import CustomerPrivateRoute from './Routes/CustomerPrivateRoute';
import HotelAdminPrivateRoute from './Routes/HotelAdminPrivateRoute';
import Footer from './components/Footer/Footer';
import './App.css';
import Header from './components/Header/Header'
import AdminSignIn from './components/AdminManagement/AdminLogin';
import Booking from './components/BookingManagement/Booking';
import CustomerSignIn from './components/CustomerManagement/SignIn/SignIn';
import HotelAdminSignIn from './components/HotelAdminManagement/HotelAdminLogin/HotelAdminLogin';
import CustomerSignUp from './components/CustomerManagement/SignUp/SignUp';
import HotelAdminSignUp from './components/HotelAdminManagement/HotelAdminSignUp/HotelAdminSignUp';
import AddReservationInfo from './components/ReservationInfoManagement/AddResrvationInfo/AddReservationInfo';
import Rooms from './components/ReservationInfoManagement/Rooms/Rooms';
import SingleRoom from './components/ReservationInfoManagement/SingleRoom/SingleRoom';
import payment from './components/PaymentManagement/Payment';


function App() {
  return (
    <div className="App">
      
      <Router>
        <div>
            <Header/>
            
            <Route path="/admin/signin" exact component={AdminSignIn} />
            <Route path="hotel/admin/signin" exact component={AdminSignIn} />
            <Route path = '/admin/addReservationInfo' exact component={AddReservationInfo} />

            <Route path="/hotelAdmin/signin" exact component={HotelAdminSignIn} />
            <Route path="/hotelAdmin/signup" exact component={HotelAdminSignUp} />

            <Route path="/" exact component={CustomerSignIn} />
            <Route path = '/hotel/rooms' exact component={ Rooms }/>
            <Route path= '/hotel/singleRoom/:id' exact component= {SingleRoom} />
            <Route path="/customer/signup" exact component={CustomerSignUp} />
            <CustomerPrivateRoute path="/booking/:id/:type" exact component={Booking} />            
            <CustomerPrivateRoute path="/customer/payment/:roomNum/:date/:amount" exact component= {payment}/>

            <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
