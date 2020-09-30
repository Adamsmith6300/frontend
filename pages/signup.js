import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
// import { useRouter } from "next/router";
import SignupForm from "../components/signupForm/index";

const Page = ({ submitSignup, formError, successfulSignup }) => {
  
  return (
    <Layout>
      <h1 className="text-3xl text-center">Signup</h1>
      <SignupForm
        submitSignup={submitSignup}
        formError={formError}
        successfulSignup={successfulSignup}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignup: (formData) => dispatch(actions.submitSignup(formData)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);
