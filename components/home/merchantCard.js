import Link from "next/link";
import moment from "moment";
const merchantCard = ({ merchant }) => {
  let bannerUrl;
  let open = true;
  let isAlcohol = merchant.liquorLicense != null && merchant.liquorLicense > 0;
  if (isAlcohol) {
    const today = moment().format("dddd").toLowerCase();
    if (!("pickupDays" in merchant)) {
      open = false;
    } else {
      if (merchant["pickupDays"][today]["closed"]) {
        open = false;
      }
    }
  }
  if (merchant.bannerImage) {
    bannerUrl = merchant.bannerImage.includes("http")
      ? merchant.bannerImage
      : `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${merchant.MerchantId}/${merchant.bannerImage}`;
  } else {
    bannerUrl = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/sampleBanner`;
  }

  let bgStyle = { backgroundImage: `url(${bannerUrl})` };
  return (
    <Link href={`/vendors/${merchant.MerchantId}`}>
      <div className="merchantCard--home">
        <div className="merchantCard--image" style={bgStyle}>
          {!open ? <div className="banner-overlay-dark"></div> : null}
        </div>
        <p className="text-black text-3xl mt-3">
          {merchant.storename} {!open ? "(Closed)" : null}
        </p>
      </div>
    </Link>
  );
};

export default merchantCard;
