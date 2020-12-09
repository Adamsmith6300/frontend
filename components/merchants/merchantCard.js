import { memo, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "next/link";
import { useInvertedBorderRadius } from "../../utils/use-inverted-border-radius";
import { ContentPlaceholder } from "./contentPlaceholder";
import { Title } from "./title";
import { Image } from "./image";
import { openSpring, closeSpring } from "../animations";
import { useScrollConstraints } from "../../utils/use-scroll-constraints";
import { useWheelScroll } from "../../utils/use-wheel-scroll";
const dismissDistance = 100;

const MerchantCard = memo(
  ({
    isSelected,
    setSelectedId,
    merchant,
    addToCart,
    cartData,
    pointOfInterest,
  }) => {
    const id = merchant.MerchantId;
    const title = merchant.name;
    const backgroundColor = "#a1a1a1";
    const imgSrc = `${process.env.NEXT_PUBLIC_MERCHANT_IMAGE_URL}/${merchant.MerchantId}/banner`;

    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

    // Maintain the visual border radius when we perform the layoutTransition by inverting its scaleX/Y
    const inverted = useInvertedBorderRadius(10);

    // We'll use the opened card element to calculate the scroll constraints
    const cardRef = useRef(null);
    const constraints = useScrollConstraints(cardRef, isSelected);

    function checkSwipeToDismiss() {
      y.get() > dismissDistance && setSelectedId(null);
    }

    function checkZIndex(latest) {
      if (isSelected) {
        zIndex.set(2);
      } else if (!isSelected && latest.scaleX < 1.01) {
        zIndex.set(0);
      }
    }

    // When this card is selected, attach a wheel event listener
    const containerRef = useRef(null);
    useWheelScroll(
      containerRef,
      y,
      constraints,
      checkSwipeToDismiss,
      isSelected
    );

    return (
      <li ref={containerRef} className={`card`}>
        <Overlay isSelected={isSelected} setSelectedId={setSelectedId} />
        <div className={`card-content-container ${isSelected && "open"}`}>
          <motion.div
            ref={cardRef}
            className="card-content"
            style={{ ...inverted, zIndex, y }}
            layoutTransition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? "y" : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <Image
              id={id}
              isSelected={isSelected}
              pointOfInterest={pointOfInterest}
              backgroundColor={backgroundColor}
              imgSrc={imgSrc}
            />
            <Title title={title} isSelected={isSelected} />
            <ContentPlaceholder
              merchant={merchant}
              addToCart={addToCart}
              cartData={cartData}
            />
          </motion.div>
        </div>
        {!isSelected && (
          <a onClick={() => setSelectedId(id)} className={`card-open-link`}></a>
        )}
      </li>
    );
  },
  (prev, next) => prev.isSelected === next.isSelected
);

const Overlay = ({ isSelected, setSelectedId }) => (
  <motion.div
    initial={false}
    animate={{ opacity: isSelected ? 1 : 0 }}
    transition={{ duration: 0.2 }}
    style={{ pointerEvents: isSelected ? "auto" : "none" }}
    className="overlay"
  >
    <a onClick={() => setSelectedId(-1)}></a>
  </motion.div>
);

export default MerchantCard;
