import Layout from "../components/hoc/layout";
import LoginForm from "../components/loginForm";

const login = () => {
  return (
    <Layout>
      <h1 className="text-3xl text-center">Login</h1>
      <LoginForm />
    </Layout>
  );
};

export default login;
