import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import MerchantGrid from "./merchantGrid";

const merchantSection = ({ heading, link }) => {
  const [merchants, setMerchants] = useState([]);
  useEffect(() => {
    const getMerchants = async () => {
      return await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/market/merchants`
      );
    };
    getMerchants()
      .then((resp) => {
        console.log(resp);
        setMerchants(resp.data.Merchants.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="px-8 pb-4 pt-8">
      <h2 className="flex justify-between max-w-1250 mx-auto">
        <span>{heading}</span>
        <Link href={link}>
          <button className="standard-btn">View All</button>
        </Link>
      </h2>
      <div className="flex flex-wrap justify-start max-w-1040 mx-auto">
        <MerchantGrid merchants={merchants} />
      </div>
    </div>
  );
};

export default merchantSection;
