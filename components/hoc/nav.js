import Link from "next/link";

const nav = ({ toggleCart, showCart }) => {
  const navItems = [
    { title: "home", link: "/" },
    { title: "signup", link: "/signup" },
    { title: "login", link: "/login" },
    { title: "cart" },
  ].map((item, index) => {
    if (item.link != undefined) {
      return (
        <Link href={item.link} key={index}>
          <span className="cursor-pointer px-4 mx-3 py-4 shadow-md text-gray-600 hover:text-gray-800">
            {item.title}
          </span>
        </Link>
      );
    } else {
      return (
        <span
          key={index}
          onClick={() => toggleCart(!showCart)}
          className="cursor-pointer px-4 mx-3 py-4 shadow-md text-gray-600 hover:text-gray-800"
        >
          {item.title}
        </span>
      );
    }
  });

  return (
    <div className="">
      <div className="flex justify-end">{navItems}</div>
    </div>
  );
};

export default nav;
