import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
// import { useRouter } from "next/router";
import SignupForm from "../components/signupForm/index";
import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

const Page = ({ submitSignup, formError, successfulSignup, clearFlag }) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Signup</h1>
      <div className="max-w-500 mx-auto">
        <div className="w-full flex flex-wrap mt-6">
          <a
            className="social-btn w-full py-4 text-center my-3 text-xl"
            href="https://shoploma.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=http://localhost:3000/login&response_type=TOKEN&client_id=66mvecqdvf707kid13h8qlluk6&scope=email openid profile"
          >
            <AiFillFacebook className="inline mr-2 color-fb" />
            Continue With Facebook
          </a>
          <a
            className="social-btn w-full py-4 text-center my-3 text-xl"
            href="https://shoploma.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=http://localhost:3000/login&response_type=TOKEN&client_id=66mvecqdvf707kid13h8qlluk6&scope=email openid profile"
          >
            <FcGoogle className="inline mr-2" /> Continue With Google
          </a>
        </div>
        <p className="my-6 text-center">OR</p>
        <SignupForm
          submitSignup={submitSignup}
          formError={formError}
          successfulSignup={successfulSignup}
        />
        <p className="mt-12 text-center">
          <Link href="/login">
            <span className="cursor-pointer">
              Already have an account? Login
            </span>
          </Link>
        </p>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignup: (formData) => dispatch(actions.submitSignup(formData)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(Page);
