import "./App.css";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
function App() {
  return (
    <BrowserRouter>
      
        <Header />
        <div>
          <Route path="/" exact>
            <Home/>

          
          </Route>
          <Route path="/cart">
            

            <Cart/>
          </Route>
        </div>
        
      
    </BrowserRouter>
  );
}

export default App;
