import * as React from "react";
import { motion, useInvertedScale } from "framer-motion";
import { closeSpring } from "../animations";

export const Image = ({ id, isSelected, imgSrc }) => {
  const inverted = useInvertedScale();
  const selectedStyle = isSelected
    ? {
        height: "420px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }
    : {};
  return (
    <motion.div
      className="card-image-container"
      style={{
        ...inverted,
        originX: 0,
        originY: 0,
        ...selectedStyle,
      }}
    >
      <motion.img
        // className="card-image--products"
        className={`${isSelected && "h-full"}`}
        src={imgSrc}
        alt=""
        align="center"
        initial={false}
        transition={closeSpring}
        // style={isSelected ? {} : { minHeight: "250px" }}
      />
    </motion.div>
  );
};
