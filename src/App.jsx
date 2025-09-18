import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./Context/AuthContext";

const routes = createBrowserRouter([
  { path: "login", element: <Login /> },
  { path: "", element: <Register /> },
  { path: "register", element: <Register /> },

]);

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={routes} />
    </AuthProvider>
  );
}

export default App;
