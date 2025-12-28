import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from './auth/AuthContext';
import NavBar from './component/NavBar';
import Chat from './component/Chat';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './Sidepages/About';
import PrivateRoute from "./auth/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import PublicRoute from './auth/PublicRoute';
import Updates from './Sidepages/Updates';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { index: true, element: <Home /> },
        {
          element: <PrivateRoute />,
          children: [
            { path: "chat/:conversationId", element: <Chat /> },
            { path: "chat", element: <Chat /> },
            { path: "profile", element: <Profile /> },
            { path: "history", element: <History /> },
            { path: "about", element: <About /> },
            { path: "update", element: <Updates /> },

          ],
        },
      ]

    },

    {
      element: <PublicRoute />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> }
      ]
    },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthContext>
  );
}

export default App;
