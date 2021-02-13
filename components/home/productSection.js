import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductGrid from "./productGrid";

const productSection = ({ heading, link, addToCart, cartData }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/market/products`
      );
    };
    getProducts()
      .then((resp) => {
        // console.log(resp);
        setProducts(resp.data.slice(0, 8));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-8 pb-4 pt-8">
      <h2 className="flex justify-between">
        <span>{heading}</span>
        <Link href={link}>
          <button className="standard-btn">View All</button>
        </Link>
      </h2>
      <div className="flex flex-wrap justify-start">
        <ProductGrid
          products={products}
          addToCart={addToCart}
          cartData={cartData}
        />
      </div>
    </div>
  );
};

export default productSection;
