import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'
import AdminSignIn from './components/AdminManagement/AdminLogin';
import Booking from './components/BookingManagement/Booking';

function App() {
  return (
    <div className="App">
      
      <Router>
        <div>
            <Header/>
            
            <Route path="hotel/admin/signin" exact component={AdminSignIn} />
            <Route path="hotel/customer/booking" exact component={Booking} />
            
        </div>
      </Router>
    </div>
  );
}

export default App;
