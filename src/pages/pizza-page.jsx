import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PizzaPage = () => {
  const [itemData, setItemData] = React.useState();
  const { id } = useParams();
  React.useEffect(() => {
    async function fetthData() {
      try {
        const { data } = await axios.get(`https://25f07d3b31d1ec56.mokky.dev/pizzas/${id}`);
        setItemData(data);
        console.log(itemData);
      } catch (error) {
        console.error(error);
      }
    }
    fetthData();
  }, []);
  if (!itemData) {
    return null;
  }
  return (
    <div>
      <h2>{itemData.title}</h2>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur id natus hic facere
        repudiandae iure qui cupiditate, corrupti perferendis itaque!
      </div>
      <div>{itemData.price} р</div>
    </div>
  );
};
