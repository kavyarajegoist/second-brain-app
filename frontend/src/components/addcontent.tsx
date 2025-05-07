const AddContent = ()=>{
    return(
        <>
            
            <div className="flex flex-col gap-10 w-96"> 
                <h1>Add Content to Your Second Brain</h1>
                <select name="" id=""> 
                    <option value="document">Document</option>
                    <option value="twitter">Tweet</option>
                    <option value="video">Video</option>
                    <option value="link">Links</option>

                </select>
                <input type="text" placeholder="title" />
                <input type="text" placeholder="content" />
                <input type="text" placeholder="tags" />
    
             </div>
        </>
    )
}

export default AddContent;