import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </>
      </div>
    </div>
  );
}

export default App;
