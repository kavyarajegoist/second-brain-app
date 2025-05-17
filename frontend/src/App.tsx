import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Signin from "./pages/signin"
import Signup from "./pages/signup"
import LandingPage from "./pages/landingpage"

import { useAuth } from "./components/authProvider"


function AppRoutes() {
  const { authToken } = useAuth();
  console.log(authToken);
  return (
    <Routes>
      <Route path="/signup" element={(authToken !== undefined || !authToken) ? <Navigate to="/" replace /> : <Signup />} />
      <Route path="/signin" element={(authToken !== undefined || !authToken)? <Navigate to="/" replace /> : <Signin />} />
      <Route path="/" element={(authToken !== undefined || !authToken) ? <LandingPage /> : <Navigate to="/signin" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <div className="font-sans">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
