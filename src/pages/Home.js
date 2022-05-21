import React from 'react'
import "./styles.css"
import SingleProduct from '../components/SingleProduct';
import { CartState } from '../Context/Context'
import Filters from './Filters';

const Home = () => {
  const {state:{products},productState: { sort, byStock, byFastDelivery, byRating, searchQuery },} = CartState();
  console.log(products);
  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <div className='home'>
      <Filters/>

      <div className='ProductContainer'>
        {transformProducts().map((prod)=>{
          return <SingleProduct prod={prod} key={prod.id}/>
        })}

      </div>
    </div>
  )
}

export default Home