import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";
import { Form, Checkbox } from "semantic-ui-react";
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
  router,
  submitMerchantApplication,
  successfulMerchantApplication,
  savePersonInfo,
}) => {
  const [loading, setLoading] = useState(true);
  const [formData, updateFormData] = useState({});
  const [showApplication, setShowApplication] = useState(successfulSignup);
  const [params, setParams] = useState(null);
  // const [userPass, setUserPass] = useState(null);
  const [merchantSignupSuccess, setMerchantSignupSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      if ("code" in queryParams) {
        let tokens = await getTokens({
          code: queryParams["code"],
          redirect: "/become-a-vendor",
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
        <LargeLoader />
      </Layout>
    );
  }
  return (
    <Layout loading={loading}>
      {loading ? null : (
        <>
          <h1 className="text-3xl text-center">Vendor Signup</h1>
          {showApplication ? (
            <div className="my-account-container">
              {showTerms ? (
                <div>
                  <h2 className="text-3xl mb-2">
                    Thank you for wanting to become a vendor!
                  </h2>
                  <p className="font-bold mb-2">
                    Before continuing, please confirm:
                  </p>
                  <ul className="">
                    <li className="my-3">
                      1. Your business is based out of Greater Vancouver, B.C.
                    </li>
                    <li className="my-3">
                      2. You can prepare orders for pickup within 24 hours. (we
                      want to deliver as fast as possible)
                    </li>
                    <li className="my-3">
                      3. Your product pricing must not be greater than anywhere
                      else your products are sold online. We don't charge
                      commission fees, so we want our customers to be offered
                      fair prices.
                    </li>
                    <li className="my-3">
                      4. You agree to handle all returns, refunds and exchanges
                      for your products.
                    </li>
                    <li className="my-3">
                      5. Work with us and communicate! This is a beta release,
                      so we really appreciate your feedback and will work hard
                      to improve the platform as we continue.
                    </li>
                  </ul>
                  <p className="font-bold">
                    Note: We aim to be as transparent as possible. The platform
                    is currently free, but in the future we plan to implement a
                    small monthly fee to help us cover our costs. We will work
                    with our vendors to make sure it's an appropriate amount.
                  </p>
                  <div className="mt-3">
                    <Checkbox
                      onChange={(e) => setAgreedTerms(!agreedTerms)}
                      label="I agree to the Vendor Terms and Conditions above."
                    />
                  </div>
                  <button
                    disabled={!agreedTerms}
                    onClick={() => setShowTerms(false)}
                    className={`${
                      agreedTerms
                        ? "bg-black"
                        : "bg-gray-400 cursor-not-allowed"
                    } btn-no-size-color px-6 py-2 my-3`}
                  >
                    Apply to be a vendor
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          ) : (
            <div className="max-w-full md:max-w-screen-sm mx-auto px-6">
              {/* <div className="w-full flex flex-wrap mt-6">
                <a
                  className="social-btn w-full py-4 text-center my-3 text-xl"
                  href={`${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}?identity_provider=Facebook&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/become-a-vendor&response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&scope=email openid profile`}
                >
                  <AiFillFacebook className="inline mr-2 color-fb" />
                  Continue With Facebook
                </a>
                <a
                  className="social-btn w-full py-4 text-center my-3 text-xl"
                  href={`${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}?identity_provider=Google&redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/become-a-vendor&response_type=code&client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}&scope=email openid profile`}
                >
                  <FcGoogle className="inline mr-2" /> Continue With Google
                </a>
              </div>
              <p className="my-6 text-center">OR</p> */}
              <MerchantSignupForm
                handleUserPassSubmit={handleUserPassSubmit}
                formError={formError}
              />
              <p className="mt-12 text-center">
                <Link href="/login">
                  <span className="cursor-pointer">
                    Already a vendor? Login
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
