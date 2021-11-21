const index = ({}) => {
  const missionImgStyle = {
    height: "auto",
    minHeight: "400px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(/our-mission.png)`,
  };
  return (
    <div className="flex flex-wrap">
      <div style={missionImgStyle} className="w-full xl:w-1/2"></div>
      <div className="bg-green-900 text-white w-full xl:w-1/2 text-center grid lg:place-content-center place-content-start py-8 lg:pb-16">
        <h2>Our Mission</h2>
        <div className="mt-4 mx-auto px-12 lg:px-24">
          <p className="">
            We created Loma to support local vendors and allow them to really
            compete with larger competitors online. For this reason, we take{" "}
            <span className="font-bold">no commission fees</span> from vendors
            for sales through the marketplace.
          </p>
          <p className="mt-4">
            Our mission and ethos are grounded in the principles of permaculture
            (Earth Care, People Care, Fair Share). We believe that we need
            sustainable solutions without compromising on benefits. This is why
            we offer fast, sustainable delivery, to encourage local shopping.
          </p>
        </div>
      </div>
    </div>
  );
};

export default index;
