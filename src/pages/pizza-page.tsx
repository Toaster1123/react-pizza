import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const PizzaPage: React.FC = () => {
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
    return <>Загрузка...</>;
  }
  return (
    <div>
      <img src={itemData.imageUrl} alt="" />
      <h2>{itemData.title}</h2>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur id natus hic facere
        repudiandae iure qui cupiditate, corrupti perferendis itaque!
      </div>
      <div>{itemData.price} р</div>
    </div>
  );
};
