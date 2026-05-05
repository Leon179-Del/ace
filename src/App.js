import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // 1. Added Navigate
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
import Delivery from './components/Delivery'; // 1. Import your new component

// 1. FIXED: Pointing to the correct folder (/components/)
import { CartProvider } from './components/CartContext.jsx';

function App() {
  // Helper to check admin status
  const isAdmin = localStorage.getItem("role") === "admin";

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />

          <Routes>
            <Route path='/' element={<Getproducts />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/makepayment' element={<Makepayment />} />
            
            {/* 2. New Route for Delivery */}
            <Route path='/delivery' element={<Delivery />} />

            {/* 2. PROTECTED ROUTE: Only renders Addproducts if user is admin */}
            {/* <Route 
              path='/addproducts' 
              element={isAdmin ? <Addproducts /> : <Navigate to="/" />} 
            /> */}

            <Route path='/addproducts' element={<Addproducts />} />

            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='*' element={<Notfound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;