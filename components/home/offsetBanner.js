import Link from "next/link";

const banner = ({ bgSrc, heading, content, link, left }) => {
  let bgStyle = {
    backgroundImage: `url(${bgSrc})`,
  };
  let Image = (props) => {
    return (
      <div
        style={bgStyle}
        className={`offset-banner-image ${
          props.mobile ? "sm:hidden block" : "hidden sm:block"
        }`}
      ></div>
    );
  };
  return (
    <div className="flex flex-wrap">
      <Image mobile />
      <div className="text-center w-full py-16 px-8 sm:w-1/2 grid grid-cols-1 place-items-center">
        <h2 className="text-black text-4xl">{heading}</h2>
        <p className="my-6">{content}</p>
        <Link href={link}>
          <button className="standard-btn">Signup</button>
        </Link>
      </div>
      <Image />
    </div>
  );
};

export default banner;
