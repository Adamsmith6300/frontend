const index = ({}) => {
  let points = [
    {
      title: "We Love Local",
      subtitle:
        "We can't say it enough...we love our local shops and want to keep them around!",
      img: "./mountain.jpg",
    },
    {
      title: "Fast + Affordable Delivery",
      subtitle:
        "Shop from multiple stores and only pay for 1 delivery. Because we only pickup and deliver locally, your order comes faster!",
      img: "./mountain.jpg",
    },
    {
      title: "High Quality Products",
      subtitle:
        "We carefully select our merchants to make sure you get the best products possible.",
      img: "./mountain.jpg",
    },
  ];
  points = points.map((point, index) => {
    return (
      <div
        key={point.title + index}
        className="w-300 text-center mx-12 my-5 lg:my-auto"
      >
        <img className="h-150 w-150 rounded-full mx-auto" src={point.img} />
        <h4 className="text-3xl my-5">{point.title}</h4>
        <p>{point.subtitle}</p>
      </div>
    );
  });
  return (
    <div className="text-center my-12 px-2 lg:px-auto">
      <h2 className="text-4xl">A Better Option</h2>
      <p className="mt-4 mb-8">We want to give you an option to</p>
      <div className="flex flex-wrap justify-center">{points}</div>
    </div>
  );
};

export default index;
