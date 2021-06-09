import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LargeLoader } from "../components/loaders";

const Page = ({ router }) => {
  useEffect(() => {
    const call = async (new_uuid) => {
      localStorage.setItem("shopify_state", JSON.stringify(new_uuid));
    };
    let queryParams = router.query;
    let new_uuid = uuidv4();
    if (
      "hmac" in queryParams &&
      "shop" in queryParams &&
      "timestamp" in queryParams
    ) {
      call(new_uuid).then((resp) => {
        let shop = queryParams.shop;
        let redir = window.location["origin"];
        let scopes = "read_products,write_inventory";

        window.location.replace(
          `https://${shop}/admin/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_SHOPIFY_API_KEY}&scope=${scopes}&redirect_uri=${redir}/become-a-vendor&state=${new_uuid}`
        );
      });
    }
  }, []);
  return (
    <Layout>
      <LargeLoader />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(withRouter(Page));
