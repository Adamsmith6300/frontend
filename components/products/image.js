import * as React from "react";
import { motion, useInvertedScale } from "framer-motion";
import { closeSpring } from "../animations";

export const Image = ({
  id,
  isSelected,
  pointOfInterest = 0,
  backgroundColor,
  imgSrc,
}) => {
  const inverted = useInvertedScale();
  // console.log(pointOfInterest);
  return (
    <motion.div
      className="card-image-container"
      style={{ ...inverted, backgroundColor, originX: 0, originY: 0 }}
    >
      <motion.img
        className="card-image--products"
        src={imgSrc}
        alt=""
        align="top"
        initial={false}
        // animate={isSelected ? { x: 0, y: 0 } : { x: -0, y: 0 }}
        transition={closeSpring}
        style={isSelected ? { width: "700px", height: "100%" } : {}}
      />
    </motion.div>
  );
};
