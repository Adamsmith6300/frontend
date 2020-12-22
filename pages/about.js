import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
// import { useRouter } from "next/router";

const Page = ({}) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center text-black">About Loma </h1>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
