import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from 'next/router'
import React, { useEffect } from 'react';

const Page = ({ verifiedUser, verifyUser, router }) => {
  
  useEffect( ()=>{
    if (router && router.query) {
      if (router.query.confirmation_code && router.query.user_name) {
          verifyUser({
              code: router.query.confirmation_code,
              username: router.query.user_name
          })
      }   
    }
  });
  
  // if (verifiedUser) {
  //   router.push("/");
  // }

  return (
    <Layout verifyUser={verifyUser}>
      <h1 className="text-3xl text-center">Verifying user...</h1>
    </Layout>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {verifyUser: (data) => dispatch(actions.verifyUser(data)),};
};

export default  connect((state) => state, mapDispatchToProps)(withRouter(Page));
