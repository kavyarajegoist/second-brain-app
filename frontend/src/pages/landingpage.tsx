import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import ShareIcon from "../components/icons/shareicon";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../components/sidebar";
import AddContent from "../components/addcontent";


const LandingPage = ()=>{
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if(location.state?.signinSuccess)
        {
            toast.success('Signin Successful')
        }
    },[location.state])
    return(
        <>
            <ToastContainer/>
            <div className="flex flex-row h-screen ">
              <Sidebar/>
                <div className=" lg:w-4/5 mt-12 flex flex-col ">
                        <div className="justify-between flex gap-2 right-0 px-10 items-center">
                            <div>
                                <h1 className="text-4xl font-semibold" >All Notes</h1>
                            </div>
                            <div className="flex items-center gap-4">   
                                    <Button text ="Share Brain" variant="secondary" size = "lg" startIcon={<ShareIcon size="lg" color='#6962e0'/>}/>
                            <Button text="Add Content" size="lg" onClick={()=>{navigate('/add-content')}}/>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
    
}

export default LandingPage;