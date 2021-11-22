import { useState } from "react";
// import { motion, useInvertedScale } from "framer-motion";
// import { closeSpring } from "../animations";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export const Image = ({
  isSelected,
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  let imgSrc = images[currentIndex].src
    ? images[currentIndex].src
    : images[currentIndex];

  // const selectedStyle = isSelected
  //   ? {
  //       height: "420px",
  //       width: "100%",
  //       display: "flex",
  //       paddingTop: "1rem",
  //       justifyContent: "space-between",
  //     }
  //   : {
  //       height: "250px",
  //       width: "100%",
  //       display: "flex",
  //       justifyContent: "center",
  //     };

  return (
    <div
      className={
        isSelected ? "card-image-container-selected" : "card-image-container"
      }
    >
      {isSelected ? (
        <div
          className="h-full w-32 flex justify-center cursor-pointer text-black"
          onClick={() => {
            if (currentIndex != 0)
              setCurrentIndex(Math.max(0, currentIndex - 1));
          }}
        >
          <AiFillCaretLeft
            className={`${
              currentIndex == 0 && "text-gray-300"
            } align-middle h-full text-2xl`}
          />
        </div>
      ) : null}
      <img className="h-full no-max-width" src={imgSrc} alt="" align="center" />
      {isSelected ? (
        <div
          className="h-full w-32 flex justify-center cursor-pointer text-black"
          onClick={() => {
            if (currentIndex < images.length - 1)
              setCurrentIndex(Math.min(images.length - 1, currentIndex + 1));
          }}
        >
          <AiFillCaretRight
            className={`${
              currentIndex >= images.length - 1 && "text-gray-300"
            } align-middle h-full text-2xl`}
          />
        </div>
      ) : null}
    </div>
  );
};
