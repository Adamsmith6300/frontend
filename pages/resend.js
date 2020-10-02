import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
// import { useRouter } from "next/router";
import ResendForm from "../components/resendForm";

const Page = ({ formError, submitResend, successfulResend }) => {
  
  return (
    <Layout>
      <h1 className="text-3xl text-center">Signup</h1>
      <ResendForm
        submitResend={submitResend}
        formError={formError}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitResend: (formData) => dispatch(actions.submitResend(formData)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);
