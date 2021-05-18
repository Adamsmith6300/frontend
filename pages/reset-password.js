import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { LargeLoader } from "../components/loaders";
import Link from "next/link";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { Form } from "semantic-ui-react";
import { useEffect, useState } from "react";

const Page = ({}) => {
  const [loading, setLoading] = useState(false);
  return (
    <Layout>
      {loading ? (
        <LargeLoader />
      ) : (
        <>
          <h1 className="text-3xl text-center">Reset Password</h1>
          <div className="max-w-full md:max-w-screen-sm mx-auto px-6">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                // handleSubmit();
              }}
            >
              <Form.Input
                label="Email"
                placeholder="adam@email.com"
                name="email"
                required
                type="email"
                // onChange={handleChange}
              />
              <div className="flex justify-center">
                <button className="standard-btn" type="submit">
                  Reset
                </button>
              </div>
            </Form>
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

export default connect((state) => state, mapDispatchToProps)(Page);
