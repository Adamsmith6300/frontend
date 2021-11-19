const index = ({}) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2 overflow-hidden">
        <img className="w-full" src="/Tal-and-Adam.jpg" />
      </div>
      <div className="w-full md:w-1/2 text-center grid lg:place-content-center place-content-start pt-12 md:pt-0">
        <h2>Our Mission</h2>
        <div className="mt-4 mx-auto px-12 lg:px-24">
          <p className="">
            Support local vendors, work with vendors to build a platform that
            really helps them succeed and compete with all the larger
            competitors.
          </p>
          <p className="mt-4">
            We take no fees from our vendors to help them grow without taking
            away from them.
          </p>
          <p className="mt-4">To create sustainable solutions!</p>
        </div>
      </div>
    </div>
  );
};

export default index;
