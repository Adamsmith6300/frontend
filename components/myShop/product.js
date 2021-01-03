import Products from "./products";

const index = ({ product, index, selectedProduct, setSelectedProduct }) => {
  const imgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${
    product.MerchantId
  }/products/${
    product.ProductId.length > 36
      ? product.ProductId.substring(2)
      : product.ProductId
  }/${product.images[product.mainImage]}`;
  return (
    <div
      className="m-2 cursor-pointer"
      onClick={() =>
        setSelectedProduct(selectedProduct == index ? null : index)
      }
    >
      <img className="w-32" src={imgSrc} alt="" align="top" />
      <span>{product.title}</span>
    </div>
  );
};

export default index;
