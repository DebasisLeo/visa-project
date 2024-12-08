import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from './components/Root.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Authprovider from './components/Providers/Authprovider.jsx';
import PrivateRoutes from './components/Routes/Privateroutes.jsx';
import AddVisa from './components/AddVisa.jsx';
import MyAddedVisas from './components/MyAddedVisas.jsx';
import MyVisaApplication from './components/MyVisaApplication.jsx';
import Home from './components/Home.jsx';
import AllVisas from './components/AllVisas.jsx';
import VisaDetails from './components/VisaDetails.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement:<NotFoundPage></NotFoundPage>,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: () => fetch('http://localhost:4000/visa').then((res) => res.json()),
      },
      {
        path: '/all-visa',
        element: <AllVisas />,
        loader: () => fetch('http://localhost:4000/visa').then((res) => res.json()),
      },
      {
        path: '/visa/:id',
        element: <PrivateRoutes><VisaDetails /></PrivateRoutes>,
        loader: ({ params }) => fetch(`http://localhost:4000/visa/${params.id}`).then((res) => res.json()),
      },
      {
        path: '/add-visa',
        element: <PrivateRoutes><AddVisa /></PrivateRoutes>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/my-visas',
        element: <PrivateRoutes><MyAddedVisas /></PrivateRoutes>,
        loader:()=>fetch('http://localhost:4000/visa')
      },
      {
        path: '/my-applications',
        element: <PrivateRoutes><MyVisaApplication /></PrivateRoutes>,
        loader:()=>fetch('http://localhost:4000/visa')
        
      },
    ],
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>
);