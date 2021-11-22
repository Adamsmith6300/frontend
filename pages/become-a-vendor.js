import { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import Link from "next/link";
import { Form, Checkbox, Message } from "semantic-ui-react";
import { FcGoogle, FcCheckmark } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import Head from "next/head";
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
import BlockSignup from "../components/blockSignup";

const Page = ({
  formError,
  successfulSignup,
  router,
  submitMerchantApplication,
  successfulMerchantApplication,
  savePersonInfo,
}) => {
  // return (
  //   <Layout>
  //     <BlockSignup signupLink="https://shoploma.ca/become-a-vendor" />
  //   </Layout>
  // );
  const [loading, setLoading] = useState(true);
  const [formData, updateFormData] = useState({});
  const [showApplication, setShowApplication] = useState(successfulSignup);
  const [params, setParams] = useState(null);
  const [merchantSignupSuccess, setMerchantSignupSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [formErrorSubmit, setFormErrorSubmit] = useState(null);

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
        let res = await submitMerchantApplication(formData);
        let resp = await refreshIdToken();
        if (resp) {
          await saveLoginSession(resp);
          setMerchantSignupSuccess(true);
          router.push("/my-store");
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
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
    setLoading(false);
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
    // if (isMerchant) {
    //   router.push("/my-store");
    // }
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
      <Head>
        <title>Become a Vendor - Loma</title>
      </Head>
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
                      2. You can prepare orders for pickup within 48 hours.
                      (this is flexible, we understand some products are made to
                      order and managing inventory isn't simple, but we want to
                      deliver as fast as possible)
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
                      5. Work with us and communicate! We really appreciate your
                      feedback and will work hard to improve the platform as we
                      continue.
                    </li>
                  </ul>
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
                        ? "bg-green-900"
                        : "bg-gray-400 cursor-not-allowed"
                    } btn-no-size-color px-6 py-2 my-3 mt-6`}
                  >
                    Apply to be a vendor
                  </button>
                </div>
              ) : (
                <Form
                  error={formError == "You are already signed up as a vendor."}
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
                    label="Address (For Order Pickups)"
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
                  <Message
                    error
                    content={"You are already signed up as a vendor."}
                  />
                  <div className="flex justify-center mt-4">
                    <button
                      className="btn-no-size-color bg-green-900 px-8 py-4"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </div>
          ) : (
            <div className="max-w-full md:max-w-screen-sm mx-auto px-6">
              <p className="py-3">
                Create an account before applying to be a vendor. Vendor terms
                will be on the next page.
              </p>
              <div className="py-6">
                <p>
                  <FcCheckmark className="inline mr-3 mb-1" />
                  No commissions
                </p>
                <p>
                  <FcCheckmark className="inline mr-3 mb-1" />
                  No monthly fees
                </p>
                <p>
                  <FcCheckmark className="inline mr-3 mb-1" />
                  Pickup + delivery included
                </p>
              </div>
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
                setLoading={setLoading}
              />
              <p className="mt-12 text-center">
                <Link href="/login">
                  <span className="cursor-pointer">
                    Already signed up? Login
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
