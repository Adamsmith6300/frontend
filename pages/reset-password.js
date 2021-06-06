import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { LargeLoader } from "../components/loaders";
import Link from "next/link";
import { withRouter } from "next/router";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { Form, Message } from "semantic-ui-react";
import { useEffect, useState } from "react";
import {
  resetPasswordRequest,
  resetPasswordConfirmation,
} from "../store/helpers";

const Page = ({ router }) => {
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [email, setEmail] = useState(null);
  const [formError, setFormError] = useState(null);
  const [formData, updateFormData] = useState({});
  const [successfulRequest, setSuccessfulRequest] = useState(false);
  const [successfulConfirmation, setSuccessfulConfirmation] = useState(false);

  useEffect(() => {
    let query = router.query;
    if ("codeParam" in query && "email" in query) {
      updateFormData({
        ...formData,
        email: query["email"],
        code: query["codeParam"],
      });
      setShowResetForm(true);
    }
    setLoading(false);
  }, []);

  const validatePassword = (e) => {
    let val = e.target.value;
    if (e.target.value.length < 10) {
      setFormError("Password must be 10 characters long");
    }
    if (val.toLowerCase() == val) {
      setFormError("Password must contain at least 1 uppercase");
    }
    if (val.toUpperCase() == val) {
      setFormError("Password must contain at least 1 lowercase");
    }
    let digits = /[0-9]/;
    if (!digits.test(val)) {
      setFormError("Password must contain at least 1 number");
    }
    let symbols = /\W|_/;
    if (!symbols.test(val)) {
      setFormError("Password must contain at least 1 symbol");
    }
    if (e.target.name == "repassword") {
      if (formData["password"] != e.target.value) {
        setFormError("Passwords don't match!");
      }
    }
    if (e.target.name == "password") {
      if (
        formData["repassword"] != null &&
        formData["repassword"].length > 0 &&
        formData["repassword"] != e.target.value
      ) {
        setFormError("Passwords don't match!");
      }
    }
  };
  const handleChange = (e) => {
    if (formError != null) {
      setFormError(null);
    }
    if (e.target.name == "repassword" || e.target.name == "password") {
      validatePassword(e);
    }
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const submitResetRequest = async () => {
    if (email != null) {
      try {
        let resp = await resetPasswordRequest({ email: email });
        console.log(resp);
        if (resp.status == 200) {
          setSuccessfulRequest(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const submitResetConfirmation = async () => {
    if (
      "code" in formData &&
      "email" in formData &&
      "password" in formData &&
      "repassword" in formData
    ) {
      try {
        let resp = await resetPasswordConfirmation(formData);
        console.log(resp);
        if (resp.status == 200) {
          setSuccessfulConfirmation(true);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Layout>
      {loading ? (
        <LargeLoader />
      ) : (
        <>
          <h1 className="text-3xl text-center">Reset Password</h1>
          <div className="max-w-full md:max-w-screen-sm mx-auto px-6">
            {successfulRequest ? (
              <p>
                Your password reset request has been submitted. Please check
                your email to complete the reset process.
              </p>
            ) : null}
            {successfulConfirmation ? (
              <>
                <p>
                  Your password has been successfully reset. Click the button
                  below to log in.
                </p>
                <Link href="/login">
                  <button className="standard-btn">Login</button>
                </Link>
              </>
            ) : null}
            {!successfulConfirmation && !successfulRequest ? (
              showResetForm ? (
                <Form
                  error={formError != null}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    submitResetConfirmation();
                  }}
                >
                  <p>Confirm Reset Password for {email}</p>
                  <Form.Input
                    label="Enter Password"
                    type="password"
                    onChange={handleChange}
                    name="password"
                    required
                    placeholder="Password123!"
                  />
                  <Form.Input
                    label="Re-enter Password"
                    type="password"
                    onChange={handleChange}
                    name="repassword"
                    required
                    placeholder="Password123!"
                  />
                  <Message error content={formError} />
                  <div className="flex justify-center">
                    <button className="standard-btn" type="submit">
                      Confirm Reset
                    </button>
                  </div>
                </Form>
              ) : (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    submitResetRequest();
                  }}
                >
                  <Form.Input
                    label="Email"
                    placeholder="adam@email.com"
                    name="email"
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex justify-center">
                    <button className="standard-btn" type="submit">
                      Reset
                    </button>
                  </div>
                </Form>
              )
            ) : null}
            <p className="mt-12 text-center">
              <Link href="/login">
                <span className="cursor-pointer">Back to Login</span>
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
  return {};
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
