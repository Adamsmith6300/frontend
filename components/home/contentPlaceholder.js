import * as React from "react";
import { Button } from "semantic-ui-react";
import { motion, useInvertedScale } from "framer-motion";

export const ContentPlaceholder = React.memo(
  ({ product, addToCart, cartData, title }) => {
    const inverted = useInvertedScale();
    return (
      <motion.div
        className="content-container"
        style={{ ...inverted, originY: 0, originX: 0 }}
      >
        <p>{title}</p>
        <Button
          inverted
          color="black"
          onClick={() => addToCart(product, cartData)}
        >
          Add to Cart
        </Button>
        <p>{product.description}</p>
      </motion.div>
    );
  }
);
