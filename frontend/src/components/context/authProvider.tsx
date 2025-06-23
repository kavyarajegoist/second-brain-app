import {  createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { IUser } from "../../types/user.type";
import User from "../../schema/userSchma";
import axios from "axios";
import {toast} from "react-toastify"


 type AuthContext = {
    authToken ?: string|null,
    handlelogin: (data:User)=>Promise<void>,
    handlelogout: ()=>Promise<void>,
    currentUser?: IUser|null,
    isLoading:boolean
}
const AuthContext = createContext<AuthContext|undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children}:AuthProviderProps) {
    const [authToken,setAuthToken] = useState<string|null>();
    const [currentUser,setCurrentUser] = useState<IUser|null>();
    const [isLoading,setIsLoading] = useState<boolean>(true);

    // useEffect(()=>{
    //     async function reload () {
    //         try{
    //            const response = await axios.post('/api/user/refresh',{},{withCredentials:true});
            
    //             setAuthToken(response.data.accessToken);
    //             setCurrentUser(response.data.user);
    //         }
    //         catch(error)
    //         {
    //             setAuthToken(null);
    //             setCurrentUser(null);
               
    //         }
    //         finally{
    //             setIsLoading(false);
    //         }
    //     }

    //     reload();
    // },[])

    async function handlelogin  (data:User){
        try{
            const response = await axios.post('/api/user/signin',data);
            console.log(response.data.accessToken);
            toast.success('Successfully signed in!', {
                position: "top-right",
                autoClose: 2000, // Close after 2 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
             });
             await new Promise(resolve=>setTimeout(resolve,1500));  
            setAuthToken(response.data.accessToken);
            setCurrentUser(response.data.user);
            
        }
        catch(error){
            setAuthToken(null);
            setCurrentUser(null);   
            throw error;
        }
    }

    async function handlelogout() {
        try {
            await axios.post('/api/user/logout',{},{headers:{Authorization:`Bearer ${authToken}`}});
            setAuthToken(null);
            setCurrentUser(null);
        } catch (error) {
            
        }
    }
    // if (isLoading) {
    //     return <div>Loading....</div>; // or a loading spinner component
    // }
    return <AuthContext.Provider value={{authToken,currentUser,handlelogin,handlelogout,isLoading}} >
        {children}
    </AuthContext.Provider>
}


export function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) 
        throw new Error('useAuth must be used under a auth Provider')

    return context;
}
