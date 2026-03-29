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



function App() {
  return (
    <Router>
      <div className="App">
        
  
        {/*  Navbar goes here */}
        <Navbar />

        {/* Routes ONLY contain Route */}
        <Routes>
          <Route path='/' element={<Getproducts />} />

         
        


          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='*' element={<Notfound />} />
        </Routes>

        <Footer />

      </div>
    </Router>
  );
}

export default App;