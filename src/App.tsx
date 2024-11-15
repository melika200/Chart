import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Table from "./Pages/Table/Table";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/table", element: <Table /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
