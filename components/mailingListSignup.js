import { useState } from "react";
import { Form } from "semantic-ui-react";
import { createContactSendgrid } from "../store/helpers";

const MailingListSignup = ({}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(null);

  const handleSubmit = async () => {
    try {
      let resp = await createContactSendgrid({
        list_ids: ["2acb748b-63c6-47a3-8158-b6a2acf6af4b"],
        email: email,
      });
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  if (success) {
    return (
      <p className="w-300 mx-auto text-center">Thank you for subscribing!</p>
    );
  }
  return (
    <Form
      loading={loading}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (email != null) {
          handleSubmit();
        }
      }}
      className="w-300 text-left mx-auto"
    >
      <Form.Input
        label="Email"
        placeholder="Please enter your email"
        name="email"
        required
        type="email"
        onChange={(e) => {
          setEmail(e.target.value.trim());
        }}
      />
      <div className="flex justify-start">
        <button
          className="btn-no-size-color px-8 py-3 bg-green-900"
          type="submit"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};
export default MailingListSignup;
