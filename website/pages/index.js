import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import actions from "../store/actions";

import { Button } from "semantic-ui-react";

const Page = (props) => {
  console.log(props);
  return (
    <Layout>
      <h1 className="text-3xl text-center">LOMA</h1>
      <Button
        onClick={() => {
          props.setTest(Math.random());
        }}
      >
        TEST
      </Button>
      <div>Prop from Redux {props.val}</div>
    </Layout>
  );
};
// No need to wrap pages if App was wrapped
// Page.getInitialProps = ({ store, pathname, query }) => {
//   // console.log(store);
//   store.dispatch({ type: "FOO", payload: "waaa" }); // The component can read from the store's state when rendered
//   return { custom: "we" }; // You can pass some custom props to the component from here
// };
const mapDispatchToProps = (dispatch) => {
  return { setTest: (val) => dispatch(actions.setTest(val)) };
};

export default connect((state) => state, mapDispatchToProps)(Page);
