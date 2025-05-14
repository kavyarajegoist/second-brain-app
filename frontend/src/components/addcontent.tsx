import Input from "./ui/input";
import { XIcon } from "lucide-react";

interface AddContentProp {
    setVisible : (visible:boolean)=>void;
}

const AddContent = ({setVisible}:AddContentProp)=>{
    return(
        <>
            <div className="fixed inset-0 backdrop-blur-sm" />
            <div className="fixed inset-0 flex justify-center items-center z-20">
                <div className="flex flex-col gap-10 w-96 p-8 rounded-lg shadow-lg"> 

                    <div className="flex justify-between">
                        <h1>Add Content to Your Second Brain</h1>
                        <XIcon onClick={()=>{setVisible(false)}} className="cursor-pointer"/>
                        </div>
                    <select name="" id=""> 
                        <option value="document">Document</option>
                        <option value="twitter">Tweet</option>
                        <option value="video">Video</option>
                        <option value="link">Links</option>
                    </select>
                    <Input variant="text" placeholder="title"/>
                    <Input variant="text" placeholder="link"/>
                    
                </div>
            </div>
        </>
    )
}

export default AddContent;