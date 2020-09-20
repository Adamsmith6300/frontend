import Layout from "../components/hoc/layout";
import SignupForm from "../components/signupForm";

const signup = () => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Signup</h1>
      <SignupForm />
    </Layout>
  );
};

export default signup;
