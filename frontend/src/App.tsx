import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import LandingPage from "./pages/landingpage";

import { useAuth } from "./components/context/authProvider";
import { ToastContainer } from "react-toastify";

function AppRoutes() {
  const { authToken } = useAuth();
  console.log(authToken);
  return (
    <Routes>
      <Route
        path="/signup"
        element={authToken ? <Navigate to="/" replace /> : <Signup />}
      />
      <Route
        path="/signin"
        element={authToken ? <Navigate to="/" replace /> : <Signin />}
      />
      <Route
        path="/"
        element={
          authToken ? <LandingPage /> : <Navigate to="/signup" replace />
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <div className="font-sans">
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
