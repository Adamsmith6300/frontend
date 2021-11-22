import Link from "next/link";

const banner = ({ bgSrc, heading, content, link, empty }) => {
  if (empty) {
    let bannerStyle = {
      width: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${bgSrc})`,
    };
    return <div style={bannerStyle} className="h-300"></div>;
  }
  return (
    <div className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <div>
            <h2 className="text-black text-4xl">{heading}</h2>
            <p className="my-6 text-xl lg:text-3xl">{content}</p>
          </div>
          {/* <Link href={link}>
            <button className="standard-btn">Signup</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default banner;
