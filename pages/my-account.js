import React, { useEffect, useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import Link from "next/link";
import { Button, Checkbox, Form, Input, TextArea } from "semantic-ui-react";
import { isLoggedIn, checkMerchant } from "../store/helpers";

const Page = ({ router }) => {
  const [isMerchant, updateIsMerchant] = useState(false);
  const [loggedIn, updateLoggedIn] = useState(false);

  useEffect(() => {
    updateLoggedIn(isLoggedIn());
    updateIsMerchant(checkMerchant());
  }, []);

  // if (!loggedIn) {
  //   router.push("/");
  // }

  return (
    <Layout>
      <h1 className="text-3xl text-center text-black">My Account</h1>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearFlag: (flag) => dispatch(actions.clearFlag(flag)),
  };
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
