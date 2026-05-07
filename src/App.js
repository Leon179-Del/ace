import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Getproducts from './components/Getproducts';
import Addproducts from './components/Addproducts.jsx';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Notfound from './components/Notfound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Makepayment from './components/Makepayment';
import './css/global.css';
import Navbar from './components/Navbar';
import Footer from "./components/Footer.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartPage from './components/CartPage'; 
import Delivery from './components/Delivery';
import { CartProvider } from './components/CartContext.jsx';
import ChatBot from './components/Chatbot.jsx'; 
import Service from './components/Service';

function App() {
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path="/installations" element={<Service />} />
            <Route path='/' element={<Getproducts />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/makepayment' element={<Makepayment />} />
            <Route path='/delivery' element={<Delivery />} />
            <Route path='/addproducts' element={<Addproducts />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='*' element={<Notfound />} />
          </Routes>

          {/* 2. Place ChatBot here so it floats on every page */}
          <ChatBot />

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;