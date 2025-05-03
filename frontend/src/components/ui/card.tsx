import DocumentIcon from "../icons/document"
import ShareIcon from "../icons/shareicon";
import { FileTextIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Share2 } from "lucide-react";
import { ZodDate } from "zod";
interface Card{
    type?:any,
    shareicon?:any,
    image?:any,
    title?:string,
    date:Date
}

const Card  = (props:Card)=>{
    return (
        <>
            <div className="w-96 bg-blue-100 rounded-lg flex flex-col gap-4 py-4 px-3 ">
             <div className="flex justify-between " >
                <div className="flex gap-2">
                    <FileTextIcon color='grey'/>
                    {props.title}
                </div>
                <div className="flex gap-4">
                    <Share2 color="grey"/>
                    <Trash2 color="grey"/>

                </div>
             </div>
             <div >

             </div>
             <div className="flex gap-5">
               
             </div>
             <div>
                  <span className="text-gray-500 ">Added on</span>
                  
             </div>
            </div>
        </>
    )
} 

export default Card;