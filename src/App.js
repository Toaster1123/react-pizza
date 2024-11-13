import { Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/not-found';
import { Cart } from './pages/Cart';
import { PizzaPage } from './pages/pizza-page';
import { MainLayout } from './layouts/MainLayout';
function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route path="pizza/:id" element={<PizzaPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
