import { RouterProvider } from "react-router-dom";
// import Login from "./Components/Login/Login";
// import Register from "./Components/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./Context/AuthContext";
import router from "./routes/router";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
