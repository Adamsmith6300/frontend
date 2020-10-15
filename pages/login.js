import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import LoginForm from "../components/loginForm";

const Page = ({
  verifiedUser,
  submitLogin,
  formError,
  router,
  successfulLogin,
}) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Login</h1>
      {verifiedUser != undefined ? (
        <p className="text-green-500 text-2xl mb-3">
          Successfully Verified User!
        </p>
      ) : null}
      <LoginForm
        submitLogin={submitLogin}
        formError={formError}
        successfulLogin={successfulLogin}
      />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { submitLogin: (formData) => dispatch(actions.submitLogin(formData)) };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
