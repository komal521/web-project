import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductPage from "./pages/ProductPage";
import Services from "./pages/Services";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
         <Route path="/product" element={<ProductPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path ="Login" element ={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;