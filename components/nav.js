import Link from "next/link";

const nav = (props) => {
  const navItems = [
    { title: "home", link: "/" },
    { title: "signup", link: "/signup" },
    { title: "login", link: "/login" },
  ].map((item, index) => {
    return (
      <Link href={item.link} key={index}>
        <span className="cursor-pointer px-4 mx-3 py-4 shadow-md text-gray-600 hover:text-gray-800">
          {item.title}
        </span>
      </Link>
    );
  });

  return (
    <div className="">
      <div className="flex justify-end">{navItems}</div>
    </div>
  );
};

export default nav;
