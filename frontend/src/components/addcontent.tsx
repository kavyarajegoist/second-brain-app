import Input from "./ui/input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import {  Plus, X } from "lucide-react";

interface AddContentProp {
    setVisible : (visible:boolean)=>void;
}


const AddContent = ({setVisible}:AddContentProp)=>{
    const [newTag,setNewTag] = useState<string>("")
    const [title,setTitle] = useState<string>()
    const [link,setLink] = useState<string>()
    const tagRef = useRef(null)
    const [tags,setTags] = useState<string[]>(["productive","dsa","#100xdevs"])
   const handleAddContent = async()=>{
        console.log(title,link)
   }
   const deleteTag = (tag:string)=>{
        const updatedTag = tags.filter(t=>t != tag)
        setTags(updatedTag)
   }
    return (
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
                onClick={() => {
                  setVisible(false);
                }}
              />
            </div>
            <select name="" id="">
              <option value="document">Document</option>
              <option value="twitter">Tweet</option>
              <option value="video">Video</option>
              <option value="link">Links</option>
            </select>
            <Input
              variant="text"
              placeholder="title"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <Input
              variant="text"
              placeholder="link"
              onChange={(e) => setLink(e.currentTarget.value)}
            />
            <div className="flex flex-col gap-4 w-full ">
              <div className=" flex flex-wrap gap-2 w-full ">
                {tags.map((tag) => (
                  <div key={tag} className="flex gap-2 items-center border-2 px-2 py-1 rounded-full bg-yellow-100 border-yellow-500">
                    {tag}{" "}
                    <button onClick={()=>deleteTag(tag)}>
                      <X
                        size={"16"}
                        strokeWidth={"3"}
                        className="text-yellow-700"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-2 ">
                <Input ref={tagRef} className="w-full" placeholder="#tags" onChange={(e)=>setNewTag(e.currentTarget.value)} />
                <Button variant="secondary" startIcon={<Plus />} onClick={()=>{
                    const t = (newTag ?? "").trim();
                    if (!t || tags.includes(t)) return;
                    setTags([...tags,t])
                    setNewTag("")
                }} ></Button>
              </div>
            </div>
            <Button onClick={handleAddContent} text="Add Content" size="lg" />
          </div>
        </div>
      </>
    );
}

export default AddContent;