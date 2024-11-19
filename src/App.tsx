import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useDispatch } from 'react-redux';
import { checkAuth } from './Auth/Authslice';
import Home from './Pages/Home/Home';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/Route/Providerroute';

const App: React.FC = () => {
  const client = new QueryClient();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    {
      path: "/",
      element: <PrivateRoute />,
      children: [
        { path: "/", element: <Home /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
