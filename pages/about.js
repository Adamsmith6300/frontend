import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Banner from "../components/home/banner";

const Page = ({}) => {
  return (
    <Layout>
      {/* <Banner bgSrc={"/passion.jpg"} empty /> */}
      <div className="text-center my-24 px-6 lg:px-4">
        <h2>Our Story</h2>
        <p className="mt-4 mb-8">
          Loma gives you another ecommerce option that allows you to support
          your local community
        </p>
      </div>
      {/* <Banner bgSrc={"/lions.jpg"} empty /> */}
      <div className="text-center my-24 px-6 lg:px-4">
        <h2>Mission</h2>
        <p className="mt-4 mb-8">
          Loma gives you another ecommerce option that allows you to support
          your local community
        </p>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
