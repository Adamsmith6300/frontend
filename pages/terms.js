import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Terms from "../components/terms";
import Head from "next/head";

const Page = ({}) => {
  return (
    <Layout>
      <Head>
        <title>Terms of Service - Loma</title>
      </Head>
      <div className="grid grid-cols-1 place-items-center">
        <Terms />
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
