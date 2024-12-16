// import './App.css';
import { Routes, Route } from 'react-router-dom';



// importing components 
import Home from './components/Home';
import Detail from './components/Detail';
import LoginSignup from './components/LoginSignup';
import Courses from './components/Courses.js'; 
import IDE from './components/IDE'; 
import About from './components/About'; 
import Payment from './components/Payment.js';
import Profile from './components/Profile.js';
import Insert from './components/Insert.js';
import Register from './components/Register.js';
import { CartProvider } from './components/contexts/CartContext.js';
import Cart from './components/Cart.js';
import PaymentSuccess from './components/PaymentSuccess.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Community from './components/Community.js';

function App() {

  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/insert" element={<Insert/>}></Route>
        <Route path = "/Profile" element = {<Profile/>}></Route>
        <Route path="/Cart" element={<Cart/>}></Route>
        <Route path="/Detail" element={<Detail/>}></Route>
        <Route path="/Login" element={<LoginSignup/>}></Route>
        <Route path="/Courses" element={<Courses/>}></Route>
        <Route path="/IDE" element={<IDE/>}></Route>
        
        <Route path="/About" element={<About/>}></Route>
        <Route path="/Checkout" element={<Payment/>}></Route>
        <Route path="/payment-success" element={<PaymentSuccess/>}></Route>
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
