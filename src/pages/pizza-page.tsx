import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Placeholder } from '../components';

const PizzaPage: React.FC = () => {
  const [itemData, setItemData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetthData() {
      try {
        const { data } = await axios.get(`https://25f07d3b31d1ec56.mokky.dev/pizzas/${id}`);
        setItemData(data);
      } catch (error) {
        alert('Такой пиццы нету ( ');
        navigate('/');
      }
    }
    fetthData();
  }, []);
  if (!itemData) {
    return <Placeholder />;
  }
  return (
    <div className="pizza-page-desc">
      <img src={itemData.imageUrl} alt="" />
      <h2>{itemData.title}</h2>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur id natus hic facere
        repudiandae iure qui cupiditate, corrupti perferendis itaque!
      </div>
      <div className="pizza-page-price">
        <b>{itemData.price}</b> P.
      </div>
      <button className="button button--outline button--add">
        <Link to={'/'}>
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
          <span>назад</span>
        </Link>
      </button>
    </div>
  );
};
export default PizzaPage;
