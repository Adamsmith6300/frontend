import Link from "next/link";

const banner = ({ bgSrc, heading, content, link, overlay, empty }) => {
  if (empty) {
    let bannerStyle = {
      height: "400px",
      width: "100%",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${bgSrc})`,
    };
    return <div style={bannerStyle}></div>;
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
