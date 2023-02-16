import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login/Login";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
