import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import './scss/app.scss';
import Loadable from 'react-loadable';
import Home from './pages/Home';
import { MainLayout } from './layouts/MainLayout';
import { Placeholder } from './components';
// const Cart = React.lazy(() =>
//   import(/*webpackChunkName: "Cart"*/ './pages/Cart').then((module) => ({ default: module.Cart })),
// );
const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart"*/ './pages/Cart'),
  loading: () => <div>Loading...</div>,
});

const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/ './pages/not-found'));
const PizzaPage = React.lazy(() => import(/*webpackChunkName: "PizzaPage"*/ './pages/pizza-page'));

function App() {
  return (
    <div className="wrapper">
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home />} />
              <Route
                path="cart"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <Cart />
                  </Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <NotFound />
                  </Suspense>
                }
              />
              <Route
                path="pizza/:id"
                element={
                  <Suspense fallback={<Placeholder />}>
                    <PizzaPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
