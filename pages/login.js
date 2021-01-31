import Layout from "../components/hoc/layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import actions from "../store/actions";
import {
  checkMerchant,
  saveLoginSession,
  submitSocialLogin,
} from "../store/helpers";
import { withRouter } from "next/router";
import LoginForm from "../components/loginForm";
import { LargeLoader } from "../components/loaders";

const Page = ({
  verifiedUser,
  submitLogin,
  formError,
  router,
  successfulLogin,
  clearFlag,
}) => {
  const [loading, setLoading] = useState(false);
  if (successfulLogin) {
    if (checkMerchant()) {
      router.push("/my-shop");
      clearFlag("successfulLogin");
    } else {
      router.push("/");
      clearFlag("successfulLogin");
    }
  }

  const socialParameters = (href) => {
    const strippedDomain = href.split("#")[1];
    const parameterList = strippedDomain.split("&");
    const parameters = {};
    parameterList.forEach((param) => {
      const splitParam = param.split("=");
      const key = splitParam[0];
      const value = splitParam[1];
      parameters[key] = value;
    });
    return parameters;
  };

  useEffect(() => {
    const call = async () => {
      if (!window.location.href.includes("#")) {
        return;
      }
      setLoading(true);
      const parameters = socialParameters(window.location.href);
      console.log(parameters);
      if ("id_token" in parameters) {
        try {
          let resp = await submitSocialLogin(parameters);
          if (resp.status == 200) {
            saveLoginSession(parameters);
            router.push("/");
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    call();
  }, []);

  return (
    <Layout>
      {loading ? (
        <LargeLoader />
      ) : (
        <>
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
            loading={loading}
            setLoading={setLoading}
          />
          <div className="mt-12">
            <a href="https://shoploma.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=66mvecqdvf707kid13h8qlluk6&redirect_uri=http://localhost:3000/login">
              Login With Social
            </a>
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
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
