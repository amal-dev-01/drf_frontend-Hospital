import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const PrivateRouter = ({children})=>{
    const { user }= useContext(AuthContext)


return(
    <>
    {!user ? <Navigate to="/" /> : children} 
    </>

)
}

export default PrivateRouter