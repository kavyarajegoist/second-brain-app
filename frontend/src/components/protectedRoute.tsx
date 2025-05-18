import { PropsWithChildren } from "react";
import { useAuth } from "./context/authProvider";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({children}:ProtectedRouteProps){
    const {authToken} = useAuth();

    if(!authToken)
        return <Navigate to="/signin" replace/>
    
    return children;
}

