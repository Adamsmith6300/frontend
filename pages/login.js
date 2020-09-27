import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
// import { withRouter } from "next/router";
import LoginForm from "../components/loginForm";

const Page = (
  { submitLogin, formError, successfulLogin }
) => {


  return (
    <Layout>
      <h1 className="text-3xl text-center">Login</h1>
      <LoginForm
        props={ submitLogin, formError, successfulLogin }
      />
    </Layout>
  );

};



const mapDispatchToProps = (dispatch) => {
  return {submitLogin: (formData) => dispatch(actions.submitLogin(formData)),};
};

export default connect((state) => state, mapDispatchToProps)(Page);
