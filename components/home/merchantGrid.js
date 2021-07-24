import MerchantCard from "./merchantCard";
import { Loader } from "semantic-ui-react";
const merchantGrid = ({ merchants }) => {
  if (merchants == null) return <Loader inline="centered" active />;
  if (merchants.length < 1)
    return (
      <div className="mb-12">
        <p>No Vendors</p>
      </div>
    );
  return merchants.map((merchant, index) => {
    return <MerchantCard key={index} merchant={merchant} />;
  });
};

export default merchantGrid;
