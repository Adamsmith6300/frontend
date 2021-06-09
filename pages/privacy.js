import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import Privacy from "../components/privacy";

const Page = ({}) => {
  return (
    <Layout>
      <div className="grid grid-cols-1 place-items-center">
        <Privacy />
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
