import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Home from "./pages/home"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/nopage";
import Preview from "./pages/preview";



export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview/:name" element={<Preview />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)
