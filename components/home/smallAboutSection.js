import Link from "next/link";
const index = ({}) => {
  let mainTitle = "What We Offer";
  let points = [
    {
      title: "We Love Local",
      subtitle:
        "We can't say it enough...we love our local shops and want to keep them around!",
      img: "./firstBanner.jpg",
    },
    {
      title: "Fast Delivery",
      subtitle:
        "Shop from multiple stores and only pay for one delivery. Because we only pickup and deliver locally, your order comes faster!",
      img: "./loma-car-back.jpg",
    },
    {
      title: "High Quality Products",
      subtitle:
        "We carefully select our merchants to make sure you get the best products possible.",
      img: "./5stars.jpg",
    },
  ];
  points = points.map((point, index) => {
    let imageStyle = {
      height: "150px",
      width: "150px",
      margin: "0 auto",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${point.img})`,
      borderRadius: "9999px",
    };
    return (
      <div
        key={point.title + index}
        className="w-300 text-center mx-12 my-5 lg:my-auto"
      >
        <div style={imageStyle}></div>
        {/* <img className="h-150 w-150 rounded-full mx-auto" src={point.img} /> */}
        <h4 className="text-3xl my-5">{point.title}</h4>
        <p>{point.subtitle}</p>
      </div>
    );
  });
  return (
    <div className="text-center my-12 px-2 lg:px-auto">
      <h2 className="text-4xl mb-8">{mainTitle}</h2>
      <div className="flex flex-wrap justify-center">{points}</div>
      <Link href="/signup">
        <button className="standard-btn mt-8">Get Started</button>
      </Link>
    </div>
  );
};

export default index;
