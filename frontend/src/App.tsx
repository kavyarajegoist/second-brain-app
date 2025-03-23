
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import BrainIcon from "./components/icons/brain"
import Signup from "./pages/signup"
import LandingPage from "./pages/landingpage"


function App() {
   
  return (
    <>
    <div className="font-sans">
    <BrowserRouter>

   <Routes>
    <Route path = "/signup" element={<Signup/>}/>
   </Routes>
  
</BrowserRouter>
         
      </div>    
   
    </>
  )
}

export default App
