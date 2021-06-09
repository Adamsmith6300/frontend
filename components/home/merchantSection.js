import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import MerchantGrid from "./merchantGrid";
import { shuffleArray } from "../../store/helpers";

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
        setMerchants(shuffleArray(resp.data.Merchants).slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-8 pb-16">
      <h2 className="max-w-1250 mx-auto mb-12 text-center">
        <span className="text-4xl">{heading}</span>
      </h2>
      <div className="flex flex-wrap justify-center max-w-1040 mx-auto">
        <MerchantGrid merchants={merchants} />
      </div>
      <div className="text-center">
        <Link href={link}>
          <button className="btn-no-size-color px-12 py-4 bg-black">
            View All Vendors
          </button>
        </Link>
      </div>
    </div>
  );
};

export default merchantSection;
