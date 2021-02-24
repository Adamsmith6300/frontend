import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineMail,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";
import Banner from "../components/home/banner";

const Page = ({}) => {
  return (
    <Layout>
      <div className="text-center my-24">
        <h2>Contact Us</h2>
        <p className="mt-4 mb-8 max-w-500 mx-auto">
          We'd be excited to hear from you! Email us with any questions or
          feedback and we'll get back to you as soon as we can.
        </p>
        <p>
          <a href="mailto: contact@shoploma.ca" className="hover:text-black">
            <AiOutlineMail className="inline ml-1" />
            <span className="ml-3">contact@shoploma.ca</span>
          </a>
        </p>
        <div className="flex my-12 justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-black text-4xl mr-3"
          >
            <AiOutlineInstagram className="inline" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-black text-4xl mx-3"
          >
            <AiOutlineFacebook className="inline" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-black text-4xl mx-3"
          >
            <AiOutlineTwitter className="inline" />
          </a>
        </div>
      </div>
      <Banner bgSrc={"/passion.jpg"} empty />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
