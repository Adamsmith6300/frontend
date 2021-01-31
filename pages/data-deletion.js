import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";
// import { useRouter } from "next/router";

const Page = ({}) => {
  return (
    <Layout>
      <h1 className="text-3xl text-center text-black">
        Data Deletion Instructions{" "}
      </h1>
      <p>
        If you would like you data deleted from LOMA. Please email us at
        privacy@shoploma.ca
      </p>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
