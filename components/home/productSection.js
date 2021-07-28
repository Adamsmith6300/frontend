import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductGrid from "./productGrid";
import { shuffleArray } from "../../store/helpers";

const productSection = ({
  heading,
  link,
  addToCart,
  cartData,
  category,
  lim = 8,
  start,
}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/market/products?lim=${lim}`;
      if (category != null) {
        url += "&category=" + category;
      }
      if (start) {
        url += "&start=" + start;
      }
      console.log(url);
      return await axios.get(url);
    };
    getProducts()
      .then((resp) => {
        setProducts(resp.data.Products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="md:px-8 pb-4 pt-8">
      <h2 className="max-w-1250 mx-auto text-center">
        <span className="text-4xl">{heading}</span>
      </h2>
      <div className="flex flex-wrap justify-center max-w-1250 mx-auto pb-12 sm:pb-auto">
        <ProductGrid
          products={products}
          addToCart={addToCart}
          cartData={cartData}
        />
      </div>
      {heading != "Featured Products" ? (
        <div className="text-center">
          <Link href={link}>
            <button className="standard-btn">
              {link == "/products" ? "All Products" : "View All"}
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default productSection;
