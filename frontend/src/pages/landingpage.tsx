import { useLocation} from "react-router-dom";
import { Button } from "../components/ui/button";
import ShareIcon from "../components/icons/shareicon";
import {  useState } from "react";

import Sidebar from "../components/sidebar";
import AddContent from "../components/addcontent";
import Card from "../components/ui/card";




const LandingPage = ()=>{
 
    const[visible,setVisible] = useState(false);
  
   
    return(
        <>
        
           
           
            <div className="flex flex-row h-screen ">
              <Sidebar/>
                <div className=" lg:w-4/5 mt-12 flex flex-col ">
                        <div className="justify-between flex gap-2 right-0 px-10 items-center">
                            <div>
                                <h1 className="text-4xl font-semibold" >All Notes</h1>
                            </div>
                            <div className="flex items-center gap-4">   
                                    <Button text ="Share Brain" variant="secondary" size = "lg" startIcon={<ShareIcon size="lg" color='#6962e0'/>}/>
                            <Button text="Add Content" size="lg" onClick={()=>setVisible(!visible)}/>
                            </div>
                        </div>

                        {visible && <AddContent setVisible={setVisible} />}
                        <div className="p-6 m-2 grid grid-cols-4 gap-5  ">
                            <Card title="hello" date={new Date()}/>
                            <Card title="hello" date={new Date()}/>
                            <Card title="hello" date={new Date()}/>
                            <Card title="hello" date={new Date()}/>
                            <Card title="hello" date={new Date()}/>
                        </div>    
                </div>
                
            </div>
            
        </>
    )
    
}

export default LandingPage;