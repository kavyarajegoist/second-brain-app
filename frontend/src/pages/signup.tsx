import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
interface inputfield {
    field:string,
    placeholder:string
}

const Signup = ()=>{
    return(
        <>  <div className="flex justify-center h-screen " >

              
  <form onSubmit={()=>{}} className="w-[500px] h-[400px] border  rounded-xl shadow-lg flex flex-col  py-6 px-8  mt-24 gap-4 bg-white z-50 " >
            <div className="text-center">
                    <h1 className="text-3xl font-medium">Sign Up</h1>
                </div>
                    <div className="flex flex-col gap-4">

                       <InputField field = 'Username' placeholder = "john1243"/>
             <InputField field = 'Password' placeholder = "*******"/>
               <Button text="Submit" variant="primary" className="mt-3" size="md"/>
                    </div>
                    <p className="px-1">Already have an account?<Link to="/signin" className="p-1 underline text-purple-600 font-medium">Log in</Link></p>
            </form>
        </div>
          
            
        </>
    )
}

const InputField = (props:inputfield)=>{
    return(
        <>
            <div className="flex flex-col items-start gap-1">
                <p className="text-xl font-medium text-center">{props.field}</p>
                <input type={props.field=="Password"?"password":"text"} placeholder={props.placeholder} className=" w-full px-2 py-1 border-2 rounded-md items-center flex justify-center"></input>
            </div>
        </>
    )
}

export default Signup;