import {  createContext, PropsWithChildren, useContext, useState } from "react";
import { IUser } from "../types/user.type";
import User from "../schema/userSchma";
import axios from "axios";


 type AuthContext = {
    authToken ?: string|null,
    handlelogin: (data:User)=>Promise<void>,
    handlelogout: ()=>Promise<void>,
    currentUser?: IUser|null
}
const AuthContext = createContext<AuthContext|undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children}:AuthProviderProps) {
    const [authToken,setAuthToken] = useState<string|null>();
    const [currentUser,setCurrentUser] = useState<IUser|null>();

    async function handlelogin  (data:User){
        try{
            const response = await axios.post('/api/user/signin',data);
            console.log(response.data.accessToken)
            setAuthToken(response.data.accessToken);
            setCurrentUser(response.data.user)
            
        }
        catch(error){
            setAuthToken(null);
            setCurrentUser(null);   
            throw error;
        }
    }

    async function handlelogout() {
        try {
            await axios.post('/api/user/logout');
            setAuthToken(null);
            setCurrentUser(null);
        } catch (error) {
            
        }
    }
    return <AuthContext.Provider value={{authToken,currentUser,handlelogin,handlelogout}} >
        {children}
    </AuthContext.Provider>
}


export function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) 
        throw new Error('useAuth must be used under a auth Provider')

    return context;
}
