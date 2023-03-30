import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import './scss/app.scss';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
function App() {
  const [searchValue, setSearchValue] = useState('');


  return (
    <div class="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div class="content">
        <>
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </>
      </div>
    </div>
  );
}

export default App;
