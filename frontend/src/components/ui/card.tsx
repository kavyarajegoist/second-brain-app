
import { FileTextIcon } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Share2 } from "lucide-react";


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
            <div className="max-w-72 bg-blue-100 rounded-xl flex flex-col gap-4 px-4 py-5 ">
             <div className="flex justify-between items-center" >
                <div className="flex gap-2">
                    <FileTextIcon size={20} color='grey'/>
                    {props.title}
                </div>
                <div className="flex gap-4">
                    <Share2 size={20} color="grey" className="cursor-pointer" />
                    <Trash2 size={20} color="grey" className="cursor-pointer"/>

                </div>
             </div>
             <div >

             </div>
             <div className="flex flex-col gap-5 w-full border-none">
             {/* <iframe className="w=" src="https://www.youtube.com/embed/WmvpJ4KX30s" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe> */}
         
             </div>
             <div>
                  <span className="text-gray-500 ">Added on</span>
             </div>
            </div>
        </>
    )
} 

export default Card;