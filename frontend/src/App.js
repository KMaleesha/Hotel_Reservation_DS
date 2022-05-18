import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'
import AdminSignIn from './components/AdminManagement/AdminLogin';
import AddReservationInfo from './components/ReservationInfoManagement/AddResrvationInfo/AddReservationInfo';
import Rooms from './components/ReservationInfoManagement/Rooms/Rooms';
import SingleRoom from './components/ReservationInfoManagement/SingleRoom/SingleRoom';
import UpdateRoom from './components/ReservationInfoManagement/UpdateRoom/UpdateRoom';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      
      <Router>
        <div>
            <Header/>
            
            <Route path="hotel/admin/signin" exact component={AdminSignIn} />
            
            <Route path = '/admin/addReservationInfo' exact component = {AddReservationInfo} />
            <Route path = '/admin/rooms' exact component = { Rooms }/>
            <Route path = '/admin/singleRoom/:id' exact component = {SingleRoom} />
            <Route path = '/admin/updateRoom//update/:id' exact component = {UpdateRoom} />

            <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
