import { useContext } from "react";
import AuthContext from "../private/PrivateRoute";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;