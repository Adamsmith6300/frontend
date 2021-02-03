import React, { useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import { Button, Checkbox, Form, Input, TextArea } from "semantic-ui-react";
import { isLoggedIn } from "../store/helpers";

const Page = ({
  clearFlag,
  router,
  submitMerchantApplication,
  successfulMerchantApplication,
}) => {
  const loggedIn = isLoggedIn();

  const [isLoading, setLoading] = useState(false);
  const [formData, updateFormData] = useState({});

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async () => {
    if (loggedIn) {
      await submitMerchantApplication(formData);
      router.push("/my-account");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl text-center">Merchant Application</h1>
      {loggedIn ? (
        <Form
          loading={isLoading}
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            handleSubmit();
            setLoading(false);
          }}
        >
          <Form.Input
            label="Business Name"
            onChange={handleChange}
            name="busname"
            required
            placeholder="Business Name"
          />
          <Form.Input
            label="Business Email"
            onChange={handleChange}
            name="busemail"
            type="email"
            required
            placeholder="adam@mybusiness.com"
          />
          <Form.Input
            label="Business Phone"
            onChange={handleChange}
            name="busphone"
            required
            placeholder="(604)-123-1234"
            type="tel"
          />
          <Input
            required
            label="Address 1"
            name="address1"
            type="address"
            onChange={handleChange}
          />
          <Input
            label="Address 2"
            name="address2"
            type="address"
            onChange={handleChange}
          />
          <Input required label="City" name="city" onChange={handleChange} />
          <Input
            required
            label="Province"
            name="province"
            onChange={handleChange}
          />
          <Input
            required
            label="Postal Code"
            name="postalcode"
            onChange={handleChange}
          />
          <Form.Input
            label="Website"
            type="url"
            onChange={handleChange}
            name="website"
          />
          <TextArea
            placeholder="Tell us about your business!"
            label="About"
            name="about"
            onChange={handleChange}
          />
          <Form.Field>
            <Checkbox
              name="agreeTerms"
              label="I agree to the Terms and Conditions"
            />
          </Form.Field>
          <Button color="black" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <div className="mx-auto w-1/2 mt-12 text-center">
          <p className="text-xl mb-4">
            You must be logged in to apply. Please click below to signup or
            login.
          </p>
          <Link href="/signup">
            <Button color="black">Signup</Button>
          </Link>
          <Link href="/login">
            <Button color="black">Login</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
    submitMerchantApplication: (formData) =>
      dispatch(actions.submitMerchantApplication(formData)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
