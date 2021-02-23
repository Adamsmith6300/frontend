import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineMail,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";

const footer = ({}) => {
  let menuItems = [
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Terms + Conditions", link: "/terms" },
    { title: "Privacy Policy", link: "/privacy" },
  ];

  menuItems = menuItems.map((item, index) => {
    return (
      <Link key={item.link + index} href={item.link}>
        <li className="text-2xl py-3 cursor-pointer">{item.title}</li>
      </Link>
    );
  });
  return (
    <div className="w-full py-32 px-64">
      <div className="max-w-1040 mx-auto">
        <Link href="/">
          <img src="/loma.png" className="h-16 loma-logo cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-wrap justify-between mt-12 max-w-1040 mx-auto">
        <ul className="pl-3">{menuItems}</ul>
        <div className="mx-32">
          <p>
            <a href="mailto: contact@shoploma.ca" className="hover:text-black">
              <AiOutlineMail className="inline ml-1" />
              <span className="ml-3">contact@shoploma.ca</span>
            </a>
          </p>
          <div className="flex my-12">
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
          <p className="text-base mt-4">
            <AiOutlineCopyrightCircle className="inline ml-1" />
            <span className="ml-3">
              2021 LOMA SOFTWARE INC. All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default footer;
