import { Link } from "react-router-dom";
import BrainIcon from "../components/icons/brain";
import DocumentIcon from "../components/icons/document";
import LinkTag from "../components/icons/linkTag";
import HashTag from "../components/icons/hastag";
import TwitterIcon from "../components/icons/twitter";
import { Button } from "../components/ui/button";
import ShareIcon from "../components/icons/shareicon";

interface Tabs{
    icon:any
    text:string,

}
const LandingPage = ()=>{
    return(
        <>
            <div className="flex flex-row h-screen ">
                <div className="flex flex-col items-start w-1/5 border-2 py-4 px-5 space-y-10">
                    <div className="flex justify-between items-center gap-3 " >
                       <Link to="/"><BrainIcon className="cursor-pointer"/></Link> 
                        <h1 className="text-3xl font-semibold">Second Brain</h1>
                    </div>

                    <div className="flex flex-col gap-10 px-6 w-full ">
                        <Tabs text ="Document" icon = {<DocumentIcon size="lg"/>} />
                        <Tabs text ="Tags" icon = {<HashTag  size="lg"/>} />
                        <Tabs text ="Tweets" icon = {<TwitterIcon />} />
                        <Tabs text="Links" icon={<LinkTag size="lg"/>}/>
                    </div>
                </div>
                <div className=" lg:w-4/5 mt-12 flex flex-col ">
                        <div className="justify-between flex gap-2 right-0 px-10 items-center">
                            <div>
                                <h1 className="text-4xl font-semibold" >All Notes</h1>
                            </div>
                            <div className="flex items-center gap-4">   
                                    <Button text ="Share Brain" variant="secondary" size = "lg" startIcon={<ShareIcon size="lg" color='#6962e0'/>}/>
                            <Button text="Add Content" size="lg"/>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
    
}

const Tabs = (props:Tabs)=>{
    return(
        <>
            <Link to={`/${props.text.toLowerCase()}`} >
            <div className="flex items-center gap-4 hover:bg-slate-200 w-full py-1 px-2 hover:rounded-lg transition-all duration-300 hover:cursor-pointer">
                {props.icon}
                <h2 className="text-xl font-medium">{props.text}</h2>
            </div></Link>
        </>
    )
}

export default LandingPage;