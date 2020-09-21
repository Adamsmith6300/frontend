import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";

import SignupForm from "../components/signupForm";

const Page = ({ submitSignup }) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Signup</h1>
      <SignupForm submitSignup={submitSignup} />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignup: (formData) => dispatch(actions.submitSignup(formData)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);
