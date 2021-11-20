import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Banner from "../components/home/banner";
import Head from "next/head";
import {
  OurMission,
  OurStory,
  OurEthos,
  OurFounders,
} from "../components/about";

const Page = ({}) => {
  return (
    <Layout>
      <Head>
        <title>About - Loma</title>
      </Head>
      <OurMission />
      <OurEthos />
      <Banner bgSrc={"/lions.jpg"} empty />
      <OurStory />
      <OurFounders />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
