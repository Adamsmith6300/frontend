import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";

import LoginForm from "../components/loginForm";

const Page = (props) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Login</h1>
      <LoginForm />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
