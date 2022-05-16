import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'
import AdminSignIn from './components/AdminManagement/AdminLogin';
import AddReservationInfo from './components/ReservationInfoManagement/AddResrvationInfo/AddReservationInfo';

function App() {
  return (
    <div className="App">
      
      <Router>
        <div>
            <Header/>
            
            <Route path="hotel/admin/signin" exact component={AdminSignIn} />
            
            <Route path = '/admin/addReservationInfo' exact component={AddReservationInfo} />

        </div>
      </Router>
    </div>
  );
}

export default App;
