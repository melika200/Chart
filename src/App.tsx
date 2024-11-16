import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Table from "./Pages/Table/Table";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const client = new QueryClient();
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/table", element: <Table /> },
  ]);
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
