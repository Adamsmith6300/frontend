import * as React from "react";
// import { Button } from "semantic-ui-react";
import { LoremIpsum } from "react-lorem-ipsum";
import { motion, useInvertedScale } from "framer-motion";

export const ContentPlaceholder = React.memo(
  ({ product, addToCart, cartData, title, isSelected }) => {
    const inverted = useInvertedScale();
    return (
      <motion.div
        className="content-container"
        style={{ ...inverted, originY: 0, originX: 0 }}
      >
        {/* <Button
          inverted
          color="black"
          onClick={() => addToCart(product, cartData)}
        >
          Add to Cart
        </Button> */}

        {isSelected ? <h2>{title}</h2> : null}
        <LoremIpsum
          p={3}
          avgWordsPerSentence={6}
          avgSentencesPerParagraph={1}
        />
      </motion.div>
    );
  }
);
