import Link from "next/link";

const merchantCard = ({ merchant }) => {
  let bannerUrl;
  if (merchant.bannerImage) {
    bannerUrl = merchant.bannerImage.includes("http")
      ? merchant.bannerImage
      : `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${merchant.MerchantId}/${merchant.bannerImage}`;
  } else {
    bannerUrl = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/sampleBanner`;
  }

  let bgStyle = { backgroundImage: `url(${bannerUrl})` };

  return (
    <Link href={`/merchants/${merchant.MerchantId}`}>
      <div className="merchantCard--home">
        <div className="merchantCard--image" style={bgStyle} />
        <p className="text-black text-3xl mt-3">{merchant.busname}</p>
      </div>
    </Link>
  );
};

export default merchantCard;
