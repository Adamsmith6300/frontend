import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";

const Page = ({ successfulLogin }) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Checkout</h1>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
