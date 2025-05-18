import Input from "./ui/input";
import { Button } from "./ui/button";
interface AddContentProp {
    setVisible : (visible:boolean)=>void;
}

const AddContent = ({setVisible}:AddContentProp)=>{
   
    return(
        <>
            <div className="fixed inset-0 backdrop-blur-sm" />
            <div className="fixed inset-0 flex justify-center items-center z-10">
                <div className="flex flex-col gap-10 w-96 bg-white p-8 rounded-lg shadow-lg border"> 

                    <div className="flex justify-between">
                        <h1>Add Content to Your Second Brain</h1>
                        <Button
              text="close"
              size="sm"
              
              variant="danger"
              onClick={()=>{setVisible(false)}}
            />  
                      
                        </div>
                    <select name="" id=""> 
                        <option value="document">Document</option>
                        <option value="twitter">Tweet</option>
                        <option value="video">Video</option>
                        <option value="link">Links</option>
                    </select>
                    <Input variant="text" placeholder="title"/>
                    <Input variant="text" placeholder="link"/>
                    <Button text="Add Content" size="lg" />
                    
                </div>
            </div>
        </>
    )
}

export default AddContent;