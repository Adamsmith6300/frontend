import { useState } from "react";
import MerchantCard from "./merchantCard";
const categories = ["Home + decor", "healthy + beauty", "jewellery"];

const pOIS = [80, 120, 260, 200, 150, 60, 200, 260];

const allMerchants = ({ merchants, addToCart, cartData }) => {
  const [selectedId, setSelectedId] = useState(null);
  if (merchants != undefined && merchants.length > 0) {
    merchants = merchants.map((merchant, index) => {
      let isSelected = selectedId == merchant.MerchantId;
      return (
        <MerchantCard
          key={merchant.MerchantId}
          merchant={merchant}
          addToCart={addToCart}
          cartData={cartData}
          isSelected={isSelected}
          setSelectedId={setSelectedId}
          pointOfInterest={pOIS[index]}
        />
      );
    });
  }

  return <ul className="card-list">{merchants}</ul>;
};

export default allMerchants;
