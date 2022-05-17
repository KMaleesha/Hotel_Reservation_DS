import {Redirect, Route} from 'react-router-dom'

const PrivateRoute =({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                localStorage.getItem("hotelAdminAuthToken") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/hotelAdmin/signin" />
                )
                    
            }
        />
    )
}

export default PrivateRoute