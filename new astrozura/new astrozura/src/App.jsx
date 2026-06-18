import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Allproduct from "./pages/Allproduct";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SR from "./pages/SR";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SupportPage from "./pages/SupportPage";
import RefundPolicy from "./pages/RefundPolicy";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/allproduct" element={<Allproduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/shipping-return" element={<SR />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;