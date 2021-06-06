import Layout from "../components/hoc/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import actions from "../store/actions";
import {
  checkMerchant,
  saveLoginSession,
  submitSocialLogin,
  isLoggedIn,
  getTokens,
} from "../store/helpers";
import { withRouter } from "next/router";
import LoginForm from "../components/loginForm";
import { LargeLoader } from "../components/loaders";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { VscDebugBreakpointData } from "react-icons/vsc";

const Page = ({
  verifiedUser,
  submitLogin,
  formError,
  router,
  clearFlag,
  savePersonInfo,
  successfulLogin,
}) => {
  const [loading, setLoading] = useState(true);

  if (successfulLogin) router.push("/marketplace");

  useEffect(() => {
    const call = async () => {
      let queryParams = router.query;
      if ("code" in queryParams) {
        try {
          let tokens = await getTokens({
            code: queryParams["code"],
            redirect: "/login",
          });
          if ("id_token" in tokens.data) {
            try {
              let resp = await submitSocialLogin(tokens.data);
              if (resp.status == 200) {
                saveLoginSession(tokens.data);
                savePersonInfo(resp.data);
              }
            } catch (err) {
              console.log(err);
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    call().then((resp) => {
      let loggedIn = isLoggedIn();
      let merchant = checkMerchant();
      if (loggedIn) {
        if (merchant) {
          router.push("/my-store");
        } else {
          router.push("/marketplace");
        }
      }
      if (!window.location.href.includes("#")) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <Layout>
      {loading ? (
        <LargeLoader />
      ) : (
        <>
          <h1 className="text-3xl text-center">Login</h1>
          <div className="max-w-full md:max-w-screen-sm mx-auto px-6">
            <div className="w-full flex flex-wrap mt-6">
              <a
                className="social-btn w-full py-4 text-center my-3 text-xl"
                href={`https://shoploma.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Facebook&redirect_uri=${window.location.origin}/login&response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&scope=email openid profile`}
              >
                <AiFillFacebook className="inline mr-2 color-fb" />
                Continue With Facebook
              </a>
              <a
                className="social-btn w-full py-4 text-center my-3 text-xl"
                href={`https://shoploma.auth.us-east-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&redirect_uri=${window.location.origin}/login&response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&scope=email openid profile`}
              >
                <FcGoogle className="inline mr-2" /> Continue With Google
              </a>
            </div>
            <p className="my-6 text-center">OR</p>
            <LoginForm
              submitLogin={submitLogin}
              formError={formError}
              loading={loading}
              setLoading={setLoading}
            />
            <p className="mt-12 text-center">
              <Link href="/reset-password">
                <span className="cursor-pointer">Forgot password?</span>
              </Link>
              <VscDebugBreakpointData className="inline mx-2" />
              <Link href="/signup">
                <span className="cursor-pointer">Signup for an account</span>
              </Link>
            </p>
          </div>
        </>
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitLogin: (formData) => dispatch(actions.submitLogin(formData)),
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    savePersonInfo: (info) => dispatch(actions.savePersonInfo(info)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
