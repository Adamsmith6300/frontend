import MerchantCard from "./merchantCard";
import { LargeLoader } from "../loaders";
const merchantGrid = ({ merchants }) => {
  if (merchants == null || merchants.length < 1) return <LargeLoader />;
  return merchants.map((merchant, index) => {
    return <MerchantCard key={index} merchant={merchant} />;
  });
};

export default merchantGrid;
