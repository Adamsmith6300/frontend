import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Banner from "../components/home/banner";
import Head from "next/head";

const Page = ({}) => {
  return (
    <Layout>
      <Head>
        <title>About - Loma</title>
      </Head>
      <Banner bgSrc={"/lions.jpg"} empty />
      <div className="text-center my-12 md:my-24 pb-12">
        <h2>Our Story</h2>
        <div className="mt-4 lg:w-1/2 w-3/4 mx-auto">
          <p className="">
            It started with our appreciation for the incredible vendors in our
            neighborhood. Mid-pandemic we were visiting farmers markets and
            thought about how hard it must be for smaller vendors to sell once a
            week at a market. Especially during the lockdown.
          </p>
          <p className="mt-4 mb-8">
            There are so many businesses around Vancouver that we were not aware
            of, so we wanted to build a platform to bring these vendors together
            online. We wanted to make it easy for other Vancouverites to find
            these amazing vendors and at the same time offering vendors an easy,
            low-cost way to deliver locally.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 md:h-500 overflow-hidden">
          <img className="w-full" src="/Tal-and-Adam.jpg" />
        </div>
        <div className="w-full md:w-1/2 text-center grid place-content-center pt-12 md:pt-0">
          <h2>Our Mission</h2>
          <div className="mt-4 mx-auto px-12 lg:px-24">
            <p className="">
              Support local vendors, work with vendors to build a platform that
              really helps them succeed and compete with all the larger
              competitors.
            </p>
            <p className="mt-4">
              Sustainability is really important to us. There are not many
              online markets that have delivery services focused on
              sustainability and many of them do not focus on local businesses.
            </p>
            <p className="mt-4 mb-8">
              We value our team! We want to ensure that they are treated with
              respect and properly compensated for their time. We also aim to
              keep our team as diverse as possible!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
