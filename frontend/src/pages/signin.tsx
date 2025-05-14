
import { Button } from "../components/ui/button";
import {  Link, useLocation, useNavigate } from "react-router-dom";
import { UserSchema } from "../schema/userSchma";
import User from "../schema/userSchma";
import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";




const Signin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
      if(location.state?.signupSuccess)
      {
        toast.success('Signup Successful')
      }
    },[location.state])
    const onSubmit:SubmitHandler<User> = async(data)=>{
       try{
         const response = await axios.post("/api/user/signin",
         data)
        console.log(response.data.accessToken);
        if(response.status == 200)
        {     reset();
            navigate("/",{state:{signinSuccess:true}});
        }
        useEffect(()=>{
          if(location.state?.signupSuccess)
          {
            alert("Signup Successfully");
          }
        },[location.state])
       
      
       }catch(errors)
       {
          if(axios.isAxiosError(errors))
          {
            const error = errors.response;
            if(error?.status === 403)
            {
              setError("username",{message:error.data.message ||"User already exsist"})
              console.log(error.data.message)
            }
            else if(error?.status === 401)
            {
              setError("root",{message:error.data.message})
            }
            else if(error?.status === 500)
            {
              setError("root",{message:error?.data.message})
            }
            
          }
          else {
            setError("root",{message:"Something went wrong..."})
          }
        
        
       }
      
      
    }
    const {register,setError,reset,handleSubmit,formState:{errors,isSubmitting}} = useForm<User>({resolver:zodResolver(UserSchema)});
  return (
    <>
      <ToastContainer/>
      <div className="flex justify-center h-screen ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] h-[400px] border  rounded-xl shadow-lg flex flex-col  py-6 px-8  mt-24 gap-4 bg-white z-50 "
        >
          <div className="text-center">
            <h1 className="text-3xl font-medium">Sign In</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-1">
              <p className="text-xl font-medium text-center">Username</p>
              <input {...register('username')}
                type="text"
                placeholder="john123"
                className=" w-full px-2 py-1 border-2 rounded-md items-center flex justify-center"
              ></input>
            </div>
            {errors.username && (<div className="text-red-500">{errors.username.message}</div>)}

            <div className="flex flex-col items-start gap-1">
              <p className="text-xl font-medium text-center">Password</p>
              <input {...register('password')}
                type="password"
                placeholder="**********"
                className=" w-full px-2 py-1 border-2 rounded-md items-center align-middle flex justify-center"
              ></input>
            </div>
            {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}

            <Button
              text={isSubmitting?"...Submitting":"Submit"}
              variant="primary"
              className="mt-3"
              size="md"
            />
          </div>
          <p className="px-1">
            Don't have an account?
            <Link
              to="/signup"
              className="p-1 underline text-purple-600 font-medium"
            >
              Sign up
            </Link>
          </p>
          {errors.root && (<div className="text-red-500">{errors.root.message}</div>)}
        </form>
      </div>
    </>
  );
};

export default Signin;
