import BrainIcon from "./icons/brain"
import DocumentIcon from "./icons/document";
import LinkTag from "./icons/linkTag";
import { Link } from "react-router-dom";
import HashTag from "./icons/hastag";
import TwitterIcon from "./icons/twitter";
import {motion} from "framer-motion"
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "./context/authProvider";

const Sidebar = () => {
    const{handlelogout} = useAuth();
    return (
        <>
              <div className="flex flex-col items-start w-1/5 border-2 py-4 px-5 space-y-10">
                    <div className="flex justify-between items-center gap-3 " >
                       <Link to="/"><BrainIcon className="cursor-pointer"/></Link> 
                        <h1 className="text-3xl font-semibold">Second Brain</h1>
                    </div>

                    <div className="flex flex-col gap-10 px-6 w-full  ">
                        <Tabs text ="Document" icon = {<DocumentIcon size="lg"/>} />
                        <Tabs text ="Tags" icon = {<HashTag  size="lg"/>} />
                        <Tabs text ="Tweets" icon = {<TwitterIcon />} />
                        <Tabs text="Links" icon={<LinkTag size="lg"/>}/>
                        
                    </div>

                    <div className=" absolute bottom-10 left-20">
                        
                        <Button text = "Logout" variant="dangerOutline" startIcon={<LogOutIcon/>} size="lg" onClick={handlelogout} />
                    </div>
                </div>
                
        </>
    )
}
interface Tabs{
    icon:any
    text:string,

}

const Tabs = (props:Tabs)=>{
    return(
        <>
            <Link to={`/${props.text.toLowerCase()}`} >
            <motion.div 
            whileHover={{scale:1.1}}
            whileTap={{scale:0.96}}
            transition={{duration:-1}}
            className="flex items-center gap-4 hover:bg-slate-200 w-full py-1 px-2 hover:rounded-lg transition-all duration-300 hover:cursor-pointer">
                {props.icon}
                <h2 className="text-xl font-medium">{props.text}</h2>
            </motion.div></Link>
        </>
    )
}

export default Sidebar;