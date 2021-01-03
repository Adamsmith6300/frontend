const { defineLocale } = require("moment");

const index = ({ product, setSelectedProduct }) => {
  const imgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${
    product.MerchantId
  }/products/${
    product.ProductId.length > 36
      ? product.ProductId.substring(2)
      : product.ProductId
  }/${product.images[product.mainImage]}`;
  return (
    <div className="pl-2">
      <span
        className="cursor-pointer border px-4 py-1"
        onClick={() => setSelectedProduct(null)}
      >
        Back
      </span>
      <div className="w-500 mx-auto">
        <img className="w-350 mt-2" src={imgSrc} alt="" align="top" />
        <div>
          <p className="text-2xl font-bold">Title:</p>
          <p>{product.title}</p>
        </div>
        <div>
          <p className="text-2xl font-bold">Description:</p>
          <p>{product.description}</p>
        </div>
        <div>
          <p className="text-2xl font-bold">Images:</p>
          <p>"PLACE IMAGES HERE"</p>
        </div>
        <div>
          <p className="text-2xl font-bold">Options:</p>
          <p>"List options"</p>
        </div>
      </div>
    </div>
  );
};

export default index;
