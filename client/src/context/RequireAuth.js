import { useContext } from "react";
import { Login } from "../components/Login/Login";
import AuthContext from "./AuthProvider";

function RequireAuth({ children }){

    const auth = useContext(AuthContext);

    if(!auth.user){
        return <Login />;
    }

    return children;
}

export default RequireAuth