const index = ({}) => {
  return (
    <div className="py-12">
      <h2 className="text-center mb-6">Our Ethos</h2>
      <div className="flex flex-wrap justify-center py-8">
        <div className="sm:hidden w-300 grid place-content-center">
          <img className="h-200" src="/plant.png" />
        </div>
        <div className="w-300 px-4 ">
          <h3 className="text-4xl">Earth Care</h3>
          <p>
            We believe in sustainable solutions. With everything we do at Loma,
            we start by thinking about how it impacts the environment. We
            constantly try to incorporate sustainable solutions into our
            operations and our offerings. Our future must be more sustainable!
            The incremental changes we make now will produce exponential results
            in the future.
          </p>
        </div>
        <div className="hidden sm:grid w-300 grid place-content-center">
          <img className="h-200" src="/plant.png" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center py-8">
        <div className="w-300 grid place-content-center">
          <img className="h-200" src="/heart.png" />
        </div>
        <div className="w-300 px-4 ">
          <h3 className="text-4xl">People Care</h3>
          <p>
            We believe in strengthening our local communities. We do this by
            focusing on supporting our local businesses. We work with and serve
            our vendors. We take zero commissions from our vendors. Our success
            comes from helping our vendors succeed and making their life easier!
            Simply put: we love to help!
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center py-8">
        <div className="sm:hidden w-300 grid place-content-center">
          <img className="h-200" src="/pie.png" />
        </div>
        <div className="w-300 px-4 ">
          <h3 className="text-4xl">Fair Share</h3>
          <p>
            We believe in ‘Return of Surplus’. We feel that a sustainable
            economic system should reinvest profits back into the local
            community. We return at least 10% of profits back into our community
            through local causes.
          </p>
        </div>
        <div className="hidden sm:grid w-300 grid place-content-center">
          <img className="h-200" src="/pie.png" />
        </div>
      </div>
    </div>
  );
};

export default index;
