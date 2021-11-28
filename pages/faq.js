import { useState } from "react";
import Layout from "../components/hoc/layout";
import { connect } from "react-redux";
import Head from "next/head";
import { Accordion, Icon } from "semantic-ui-react";

const Page = ({}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  let questions = [
    {
      question: "What are your delivery fees?",
      answer:
        "We charge $7 per order plus there is a service fee of 5% of your subtotal to cover processing fees.",
    },
    {
      question: "Where do you deliver?",
      answer:
        "We currently deliver to most cities throughout Greater Vancouver (Vancouver, North Vancouver, West Vancouver, Burnaby, Richmond, New Westminster, Coquitlam, Port Coquitlam and Surrey). Let us know via email (contact@shoploma.ca) if you'd like us to add one of the neighboring cities in the future!",
    },
    {
      question: "What are the benefits of signing up?",
      answer:
        "When you create an account, you are able to track and manage your current and previous orders. You can also save your delivery details for your future orders.",
    },
    {
      question: "Do I need an account to order?",
      answer:
        "Nope! You can checkout as a guest. To do this, add items to your cart, open your cart and click Guest Checkout.",
    },
    {
      question: "How long do deliveries take?",
      answer:
        "1-2 days on average. We try to deliver as fast as possible! However, some vendors offer made-to-order products and may take a little longer to prepare/pickup.",
    },
    {
      question: "Can I track my delivery?",
      answer:
        "Yup! People who have created an account can log in and visit their account page to see order status updates.",
    },
    {
      question: "Do you accept returns, refunds or exchanges?",
      answer:
        "If we haven't picked up your order yet, you can cancel your order and request a refund by contacting us at orders@shoploma.ca. As we work with many different vendors, each vendor has their own return/refund/exchange policy. If you would like to know about a specific vendors policy, please visit their website or contact us and we will put you in touch with the vendor.",
    },
    {
      question: "Can I order from multiple vendors at once?",
      answer:
        "Yup! Add items to your cart from multiple vendors. At checkout, we will process the order as one order, then deliver the items all together!",
    },
  ].map((q, i) => {
    return (
      <>
        <Accordion.Title
          key={q["question"]}
          active={activeIndex === i}
          index={i}
          onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
        >
          <Icon name="dropdown" />
          {q["question"]}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === i}>
          <p>{q["answer"]}</p>
        </Accordion.Content>
      </>
    );
  });

  return (
    <Layout>
      <Head>
        <title>FAQ - Loma</title>
      </Head>
      <div className="my-account-container">
        <>
          <h3 className="text-3xl">Frequently Asked Questions</h3>
          <Accordion id="account-details" fluid styled>
            {questions}
          </Accordion>
        </>
      </div>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect((state) => state, mapDispatchToProps)(Page);
