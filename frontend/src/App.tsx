
import { BrowserRouter ,Routes,Route} from "react-router-dom"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import LandingPage from "./pages/landingpage"
import Card from "./components/ui/card"
import AddContent from "./components/addcontent"


function App() {
   
  return (
    <>
    <div className="font-sans">
    <BrowserRouter>
    {/* <Card title="Hello" date={new Date()}/> */}
    <AddContent/>
   <Routes>
    <Route path = "/signup" element={<Signup/>}/>
    <Route path = '/signin' element={<Signin/>}/>
    <Route path = '/' element={<LandingPage/>}/>
   </Routes>
  
</BrowserRouter>
         
      </div>    
   
    </>
  )
}

export default App
