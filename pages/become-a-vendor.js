import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";
import { Form } from "semantic-ui-react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

import actions from "../store/actions";
import {
  checkMerchant,
  checkPerson,
  refreshIdToken,
  isLoggedIn,
  submitSocialLoginMerchant,
  saveLoginSession,
} from "../store/helpers";

import Layout from "../components/hoc/layout";
import MerchantSignupForm from "../components/merchantSignupForm/index";
import { LargeLoader } from "../components/loaders";

const Page = ({
  formError,
  successfulSignup,
  clearFlag,
  router,
  submitMerchantApplication,
  successfulMerchantApplication,
  savePersonInfo,
}) => {
  const [loading, setLoading] = useState(true);
  const [formData, updateFormData] = useState({});
  const [showApplication, setShowApplication] = useState(successfulSignup);
  const [params, setParams] = useState(null);
  const [userPass, setUserPass] = useState(null);
  const [merchantSignupSuccess, setMerchantSignupSuccess] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async () => {
    let loggedIn = isLoggedIn();
    if (loggedIn) {
      if (params) {
        try {
          let resp = await submitSocialLoginMerchant(params);
          savePersonInfo(resp.data);
        } catch (err) {
          console.log(err);
        }
      }
      try {
        await submitMerchantApplication(formData);
        let resp = await refreshIdToken();
        if (resp) {
          await saveLoginSession(resp);
          setMerchantSignupSuccess(true);
          router.push("/my-store");
        } else {
          //display error
          router.push("/marketplace");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUserPassSubmit = async (formData) => {
    // setUserPass(formData);
    let resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/people/signup`,
      formData
    );
    await saveLoginSession(resp);
    setShowApplication(true);
  };

  useEffect(() => {
    const call = async () => {
      let queryParams = router.query;
      // if (
      //   "hmac" in queryParams &&
      //   "shop" in queryParams &&
      //   "timestamp" in queryParams
      // ) {
      //   let shopify_state = localStorage.getItem("shopify_state");
      //   if (
      //     !shopify_state ||
      //     queryParams.state != shopify_state.replace(/['"]+/g, "")
      //   )
      //     return;
      //   localStorage.setItem("shopify_params", JSON.stringify(queryParams));
      // }
      if ("code" in queryParams) {
        let tokens = await getTokens({
          code: queryParams["code"],
          redirect: "/become-a-merchant",
        });
        if ("id_token" in tokens.data) {
          await saveLoginSession(tokens.data);
          setShowApplication(true);
          setParams(tokens.data);
        }
      }
    };
    let isMerchant = checkMerchant();
    let loggedIn = isLoggedIn();
    if (isMerchant) {
      router.push("/my-store");
    }
    if (loggedIn) {
      setShowApplication(true);
    }
    call().then((resp) => {
      setLoading(false);
    });
    // let merchant = checkMerchant();
    // if (loggedIn) {
    //   if (merchant) {
    //     router.push("/my-store");
    //     clearFlag("successfulLogin");
    //   } else {
    //     router.push("/marketplace");
    //     clearFlag("successfulLogin");
    //   }
    // }
  }, []);

  if (merchantSignupSuccess) {
    return (
      <Layout>
        <p>Successfully signed up as a merchant!</p>;
      </Layout>
    );
  }
  return (
    <Layout>
      {loading ? (
        <LargeLoader />
      ) : (
        <>
          <h1 className="text-3xl text-center">Merchant Signup</h1>
          {showApplication ? (
            <div className="my-account-container">
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  handleSubmit();
                }}
              >
                <Form.Input
                  label="Store Name"
                  onChange={handleChange}
                  name="storename"
                  required
                  placeholder="Store Name"
                />
                <Form.Input
                  label="Contact Name"
                  onChange={handleChange}
                  name="fullname"
                  required
                  placeholder="Contact Name"
                />
                <Form.Input
                  label="Contact Phone"
                  onChange={handleChange}
                  name="phone"
                  required
                  placeholder="(604)-123-1234"
                  type="tel"
                />
                <Form.Input
                  required
                  label="Address"
                  name="address"
                  type="address"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Address 2"
                  name="address2"
                  type="address"
                  onChange={handleChange}
                />
                <Form.Input
                  required
                  label="City"
                  name="city"
                  onChange={handleChange}
                />
                <Form.Input
                  required
                  label="Province"
                  name="province"
                  onChange={handleChange}
                />
                <Form.Input
                  required
                  label="Postal Code"
                  name="postalcode"
                  onChange={handleChange}
                />
                <Form.Input
                  label="Website URL"
                  type="url"
                  onChange={handleChange}
                  name="website"
                />
                <div className="flex justify-center mt-4">
                  <button className="standard-btn" type="submit">
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          ) : (
            <div className="max-w-full md:max-w-screen-sm mx-auto px-6">
              <div className="w-full flex flex-wrap mt-6">
                <a
                  className="social-btn w-full py-4 text-center my-3 text-xl"
                  href={`${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}?identity_provider=Facebook&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/become-a-merchant&response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&scope=email openid profile`}
                >
                  <AiFillFacebook className="inline mr-2 color-fb" />
                  Continue With Facebook
                </a>
                <a
                  className="social-btn w-full py-4 text-center my-3 text-xl"
                  href={`${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}?identity_provider=Google&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/become-a-merchant&response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&scope=email openid profile`}
                >
                  <FcGoogle className="inline mr-2" /> Continue With Google
                </a>
              </div>
              <p className="my-6 text-center">OR</p>
              <MerchantSignupForm
                handleUserPassSubmit={handleUserPassSubmit}
                formError={formError}
              />
              <p className="mt-12 text-center">
                <Link href="/login">
                  <span className="cursor-pointer">
                    Already a merchant? Login
                  </span>
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    submitMerchantApplication: (formData) =>
      dispatch(actions.submitMerchantApplication(formData)),
    savePersonInfo: (info) => dispatch(actions.savePersonInfo(info)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
