
import { BrowserRouter } from "react-router-dom"
import BrainIcon from "./components/icons/brain"
import Signup from "./pages/signup"
import LandingPage from "./pages/landingpage"


function App() {
   
  return (
    <>
    <div className="font-sans">
    <BrowserRouter>
   <LandingPage/> 
  
</BrowserRouter>
         
      </div>    
   
    </>
  )
}

export default App
