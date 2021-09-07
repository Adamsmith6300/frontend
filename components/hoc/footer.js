import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineMail,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";

const footer = ({ isAuthed }) => {
  let menuItems = [
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Become a Vendor", link: "/become-a-vendor" },
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
    <div className="footer mt-24 py-4 pt-48 md:pt-32 md:pb-8 px-6 md:px-32">
      <div className="max-w-1040 mx-auto">
        <Link href={isAuthed ? "/marketplace" : "/"}>
          <img
            src="/loma-inverted.png"
            className="h-16 loma-logo cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex flex-wrap justify-between mt-12 lg:mt-4 max-w-1040 mx-auto">
        <ul className="w-full pl-5 md:w-64">{menuItems}</ul>
        <div className="w-full pl-5 mt-12 md:w-72">
          <p>
            <a href="mailto: contact@shoploma.ca" className="hover:text-white">
              <AiOutlineMail className="inline ml-1" />
              <span className="ml-3">contact@shoploma.ca</span>
            </a>
          </p>
          <div className="flex my-6">
            <a
              href="https://www.instagram.com/shoploma.ca/"
              target="_blank"
              className="hover:text-white text-4xl mr-3"
            >
              <AiOutlineInstagram className="inline" />
            </a>
            <a
              href="https://www.facebook.com/LOMAyvr"
              target="_blank"
              className="hover:text-white text-4xl mx-3"
            >
              <AiOutlineFacebook className="inline" />
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
// Photo by <a href="https://unsplash.com/@kylethacker?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Kyle Thacker</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

export default footer;
