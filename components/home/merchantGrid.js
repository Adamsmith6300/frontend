import MerchantCard from "./merchantCard";

const merchantGrid = ({ merchants }) => {
  return merchants.map((merchant, index) => {
    return <MerchantCard key={index} merchant={merchant} />;
  });
};

export default merchantGrid;
