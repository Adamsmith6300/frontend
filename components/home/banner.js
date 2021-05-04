import Link from "next/link";

const banner = ({ bgSrc, heading, content, link }) => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h2 className="text-black text-4xl">{heading}</h2>
        <p className="my-6">{content}</p>
        <Link href={link}>
          <button className="standard-btn">Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default banner;
