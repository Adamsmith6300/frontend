import Layout from "../components/hoc/layout";
import { connect } from "react-redux";

const Page = ({}) => {
  return (
    <Layout>
      <h1>Terms + Conditions</h1>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
