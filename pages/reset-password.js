import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
const Page = ({}) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Reset Password</h1>
      <div className="max-w-500 mx-auto"></div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
