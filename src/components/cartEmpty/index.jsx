import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 🫤</h2>
      <p>
        Вероятнее всего, вы ешё не заказывали пиццу. <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img
        src="https://img.freepik.com/free-vector/add-basket_78370-6851.jpg?t=st=1731441434~exp=1731445034~hmac=c1b18d8525603013b142a37b42e0123f8918ffbe3e9a20c84bd222b0c73921cf&w=740"
        alt="empty cart image"
      />
      <Link to="/" className="button button--black">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
