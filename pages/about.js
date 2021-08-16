import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Banner from "../components/home/banner";

const Page = ({}) => {
  return (
    <Layout>
      <Banner bgSrc={"/passion.jpg"} empty />
      <div className="text-center my-24">
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
      <Banner bgSrc={"/lions.jpg"} empty />
      <div className="text-center my-24 px-6 lg:px-4">
        <h2>Our Mission</h2>
        <div className="mt-4 lg:w-1/2 w-3/4 mx-auto">
          <p className="">
            Support local vendors, work with vendors to build a platform that
            really helps them succeed and compete with all the larger
            competitors.
          </p>
          <p className="mt-4">
            Sustainability is really important to us. There are not many online
            markets that have delivery services focused on sustainability and
            many of them do not focus on local businesses or deliver locally.
          </p>
          <p className="mt-4 mb-8">
            We value our employees. Unlike many delivery services, we want to
            ensure that our employees are treated with respect and properly
            compensated for their time (our drivers are our employees, with all
            the rights that entitles them to).
          </p>
        </div>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
