import {  useState } from "react"



function App() {
    const [data,setdata] = useState(null)
    const hanadleClick = async()=>{
       const response = await fetch("/api/user");
       const message = await response.json();
       setdata(message);
    }
  return (
    <>
      <div className="font-medium">
          hello 
          <button onClick={hanadleClick}>Click me</button>
          <p>{data}</p>
      </div>
    </>
  )
}

export default App
