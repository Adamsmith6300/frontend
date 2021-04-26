import Link from "next/link";

const banner = ({ bgSrc, heading, content, link, empty }) => {
  let bgStyle = {
    backgroundImage: `url(${bgSrc})`,
  };
  return (
    <div style={bgStyle} className="banner">
      {!empty ? (
        <div className="banner-content">
          <h2 className="text-black text-4xl">{heading}</h2>
          <p className="my-6">{content}</p>
          <Link href={link}>
            <button className="standard-btn">Signup</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default banner;
