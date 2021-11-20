const index = ({}) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full max-h-500 xl:hidden overflow-hidden grid place-content-center">
        <img className="w-full" src="/Tal-and-Adam.jpg" />
      </div>
      <div className="bg-green-900 text-white w-full xl:w-1/2 text-center grid lg:place-content-center place-content-start py-8 lg:pb-16">
        <h2>Our Founders</h2>
        <div className="mt-4 mx-auto px-12 lg:px-24">
          <p className="">
            <span className="font-bold">Adam</span> - is a permaculture design
            ethusiast and software developer. Early in his career, he travelled
            through central america studying sustainable design while
            simultaneously teaching himself web development. He returned from
            travelling with a permaculture design certificate and enrolled at
            BCIT to further his software development studies. He has always
            loved technology and after finding permaculture has constantly
            dreamt of ways to merge the two.
          </p>
          <p className="mt-4">
            <span className="font-bold">Talia</span> - grew up on the
            sunshine-coast of BC. She is a passionate environmentalist and
            animal lover. She is an MBB gradute from SFU and current graduate
            student in Resource and Environmental Managment at SFU, with a focus
            on environmental toxicology. Talia believes that sustainable
            businesses are an important vehicle to drive sustainable change, now
            more than ever.
          </p>
        </div>
      </div>
      <div className="w-full hidden xl:block xl:w-1/2 overflow-hidden">
        <img className="h-full" src="/Tal-and-Adam.jpg" />
      </div>
    </div>
  );
};
export default index;
