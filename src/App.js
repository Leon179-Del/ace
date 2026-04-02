import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// 1. FIXED: Pointing to the correct folder (/components/)
import { CartProvider } from './components/CartContext.jsx';

// We comment this out because the "Your Selection" now lives horizontally 
// inside Getproducts.jsx to stop it from pushing the carousel down.
// import CartSidebar from './components/CartSidebar'; 

function App() {
  return (
    /* The Provider wraps everything so the Cart state is available everywhere */
    <CartProvider>
      <Router>
        <div className="App">
          
          {/* Navbar sits at the top to show the cart count badge */}
          <Navbar />

          {/* FIX: We removed CartSidebar from here. 
            Because it was placed outside of <Routes>, it was rendering 
            as a static block above your content, pushing the carousel down.
          */}

          <Routes>
            <Route path='/cart' element={<CartPage />} />
            <Route path='/' element={<Getproducts />} />
            <Route path='/makepayment' element={<Makepayment />} />
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