import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Reducers } from "../../../redux/reducers";
import { useEffect } from "react";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const user = useSelector<Reducers>(state => state.logger);

    useEffect(() => {
        if(!user) {
            window.location.assign('http://localhost/crm_actuel/');
        }
    }, [user])

    return (
        <Route {...rest} render={(props) => (<Component {...props} />)} />
    )
};

export default PrivateRoute;