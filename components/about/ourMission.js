const index = ({}) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full h-500 md:w-1/2 overflow-hidden">
        <img className="w-full" src="/hands-on-trees.jpg" />
      </div>
      <div className="bg-green-900 text-white w-full md:w-1/2 text-center grid lg:place-content-center place-content-start pt-12 md:pt-0">
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
