import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Privacy from "../components/privacy";
import Head from "next/head";

const Page = ({}) => {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Loma</title>
      </Head>
      <div className="grid grid-cols-1 place-items-center">
        <Privacy />
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
