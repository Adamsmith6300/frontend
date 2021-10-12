import React, { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = ({ setLoading, submitLogin, formError }) => {
  let isValidEmail = true
    ? null
    : {
        content: "Please enter a valid email address",
        pointing: "below",
      };
  const [formData, updateFormData] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    submitLogin(formData);
  };

  return (
    <Form
      error={formError != null}
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        handleSubmit();
      }}
    >
      <Form.Input
        label="Email"
        placeholder="adam@email.com"
        error={isValidEmail}
        name="email"
        required
        type="email"
        onChange={handleChange}
      />
      <fieldset className="flex">
        <Form.Input
          className="w-full"
          label="Enter Password"
          name="password"
          type={showPwd ? "text" : "password"}
          placeholder="Password123!"
          required
          onChange={handleChange}
        />
        <span
          onClick={() => setShowPwd(!showPwd)}
          className="pt-2 w-50 grid place-items-center"
        >
          {showPwd ? (
            <AiOutlineEye className="text-2xl" />
          ) : (
            <AiOutlineEyeInvisible className="text-2xl" />
          )}
        </span>
      </fieldset>

      <Message error content={formError} />
      <div className="flex justify-center">
        <button className="standard-btn" type="submit">
          Login
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
