import { BrowserRouter as Router, Route } from 'react-router-dom';

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

function App() {
  return (
    <div className="App">
      
      <Router>
        <div>
            <Header/>
            
            <Route path="hotel/admin/signin" exact component={AdminSignIn} />
            <Route path="/booking/:id/:type" exact component={Booking} />
            
            <Route path="/admin/signin" exact component={AdminSignIn} />
            <Route path="/customer/signin" exact component={CustomerSignIn} />
            <Route path="/hotelAdmin/signin" exact component={HotelAdminSignIn} />
            <Route path="/customer/signup" exact component={CustomerSignUp} />
            <Route path="/hotelAdmin/signup" exact component={HotelAdminSignUp} />
            <Route path = '/admin/addReservationInfo' exact component={AddReservationInfo} />
            <Route path = '/admin/rooms' exact component={ Rooms }/>
            <Route path= '/admin/singleRoom/:id' exact component= {SingleRoom} />

        </div>
      </Router>
    </div>
  );
}

export default App;
