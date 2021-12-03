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
      <div className="lg:hidden w-full text-center py-6 pb-3 px-2 shadow-lg border border-1">
        <h2 className="text-xl ">
          Free delivery on your first order! Use code: FIRSTFREE
        </h2>
        <p className="text-lg">
          (no minimum order, expires December 31st, 2021)
        </p>
      </div>
      <div className="text-center w-full py-10 lg:py-16 px-8 sm:w-1/2 grid grid-cols-1 place-items-center">
        <div>
          <h2 className="text-black text-4xl">{heading}</h2>
          <p className="my-6">{content}</p>
        </div>
        {/* <Link href={link}>
          <button className="standard-btn">Signup</button>
        </Link> */}
      </div>
      <Image />
    </div>
  );
};

export default banner;
