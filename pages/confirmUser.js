import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from 'next/router'
import React, { useEffect } from 'react';
import { Button } from "semantic-ui-react";
import Link from "next/link"

const Page = ({ verifiedUser, verifyUser, router, error }) => {
  
  useEffect( ()=>{
    if (router && router.query && verifiedUser == undefined && error == undefined) {
      if (router.query.confirmation_code && router.query.user_name) {
          verifyUser({
              code: router.query.confirmation_code,
              username: router.query.user_name
          })
      } else {
        router.push("/");
      }   
    }
  });
  
  if (verifiedUser) {
    router.push("/login");
  }

  return (
    <Layout verifyUser={verifyUser}>
      {error != undefined ?
        <div className="text-center">
          <p className="text-2xl text-red-500 mb-4">{error}</p>
           <Link href='/login'>
                <Button>Login</Button>
            </Link>
        </div>
        : 
        <h1 className="text-3xl text-center">Verifying user...</h1>
      }
    </Layout>
  );
};



const mapDispatchToProps = (dispatch) => {
  return {verifyUser: (data) => dispatch(actions.verifyUser(data)),};
};

export default  connect((state) => state, mapDispatchToProps)(withRouter(Page));
