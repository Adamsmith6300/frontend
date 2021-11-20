const index = ({}) => {
  return (
    <div className="flex flex-wrap">
      <div className="bg-green-900 text-white w-full md:w-1/2 text-center grid lg:place-content-center place-content-start pt-12 md:pt-0">
        <h2>Our Founders</h2>
        <div className="mt-4 mx-auto px-12 lg:px-24">
          <p className="">
            Adam is a permaculture design ethusiast and software developer.
            Early in his career, he travelled through central america studying
            sustainable design while simultaneously teaching himself web
            development. He returned from travelling with a permaculture design
            certificate and enrolled at BCIT to further his software development
            studies. He has always loved technology and after finding
            permaculture has constantly dreamt of ways to merge the two.
          </p>
          <p className="mt-4">Talia </p>
        </div>
      </div>
      <div className="w-full h-500 md:w-1/2 overflow-hidden">
        <img className="w-full" src="/Tal-and-Adam.jpg" />
      </div>
    </div>
  );
};
export default index;
