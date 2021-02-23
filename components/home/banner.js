import Link from "next/link";

const banner = ({ bgSrc, heading, content, link }) => {
  let bgStyle = {
    backgroundImage: `url(${bgSrc})`,
  };
  return (
    <div style={bgStyle} className="banner">
      <div className="banner-content">
        <h2 className="text-black">{heading}</h2>
        <p className="my-6">{content}</p>
        <Link href={link}>
          <button className="standard-btn">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default banner;
