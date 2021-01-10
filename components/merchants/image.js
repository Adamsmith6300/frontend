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

  return (
    <motion.div
      className="card-image-container"
      style={{ ...inverted, backgroundColor, originX: 0, originY: 0 }}
    >
      <motion.div
        className="card-image"
        // src={imgSrc}
        // align="center"
        // alt=""
        style={{
          backgroundImage: "url(" + imgSrc + ")",
        }}
        initial={false}
        animate={isSelected ? { x: -20, y: -20 } : { x: -200, y: 0 }}
        transition={closeSpring}
      />
    </motion.div>
  );
};
