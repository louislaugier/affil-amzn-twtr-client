import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";

import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Outlet
} from "react-router-dom";

import { 
  useState
} from "react";

import Deals from "./Deals";
import Api from "./Api";
import NotFound from "./404";

import WithSubnavigation from "./components/Nav"

function App() {
  const theme = extendTheme({
    fonts: {
      heading: "Open Sans",
      // body: "Raleway",
    },
  });
  const [deals, setDeals] = useState([])
  const [refresh, setRefresh] = useState(0)
  const [noResults, setNoResults] = useState(false)
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <WithSubnavigation deals={deals} setDeals={setDeals} refresh={refresh} setRefresh={setRefresh} noResults={noResults} setNoResults={setNoResults}/>
          <Routes>
            <Route path="/" element={<Root/>}>
              <Route index element={<Deals refresh={refresh} setRefresh={setRefresh} deals={deals} setDeals={setDeals} noResults={noResults} setNoResults={setNoResults}/>}/>
              <Route path="/api" element={<Api/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;

function Root() {
  return (

    <Outlet/>
  );
}