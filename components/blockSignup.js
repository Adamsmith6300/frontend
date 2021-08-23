import Link from "next/link";

const index = ({ signupLink }) => {
  return (
    <div className="w-500 max-w-full mx-auto text-center">
      <h1 className="text-3xl">Thank you for your interest in signing up!</h1>
      <p className="my-3">
        This is the demo version of Loma. To sign up, please visit the live site
      </p>
      <p>
        <Link href={signupLink}>
          <button className="btn-no-size-color bg-black px-6 py-2">Here</button>
        </Link>
      </p>
    </div>
  );
};

export default index;
