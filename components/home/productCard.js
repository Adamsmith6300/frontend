import { memo, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { ContentPlaceholder } from "./contentPlaceholder";
import { Image } from "./image";
import { openSpring, closeSpring } from "../animations";
import { useScrollConstraints } from "../../utils/use-scroll-constraints";
import { useWheelScroll } from "../../utils/use-wheel-scroll";
import Link from "next/link";
import { roundToTwo } from "../../store/helpers";
const dismissDistance = 100;

const productCard = memo(
  ({ isSelected, setSelectedId, product, addToCart, cartData }) => {
    const id = product.ProductId;
    const title = product.title;
    let price = product.variants ? product.variants[0].price : product.price;
    price = roundToTwo(price);
    const y = useMotionValue(0);
    const zIndex = useMotionValue(isSelected ? 2 : 0);

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
      <li ref={containerRef} className={`card--products`}>
        <Overlay isSelected={isSelected} setSelectedId={setSelectedId} />
        <div className={`card-content-container ${isSelected && "open"}`}>
          <motion.div
            ref={cardRef}
            className={`card-content ${isSelected && "shadow"}`}
            style={{ zIndex, y }}
            layoutTransition={isSelected ? openSpring : closeSpring}
            drag={isSelected ? "y" : false}
            dragConstraints={constraints}
            onDrag={checkSwipeToDismiss}
            onUpdate={checkZIndex}
          >
            <button
              className={`close-card-btn ${!isSelected ? "hidden" : ""}`}
              onClick={() => setSelectedId(-1)}
            >
              <svg width="23" height="23" viewBox="0 0 23 23">
                <path
                  d="M 3 16.5 L 17 2.5"
                  fill="transparent"
                  strokeWidth="2"
                  stroke="hsl(0, 0%, 0%)"
                  strokeLinecap="round"
                />
                <path
                  d="M 3 2.5 L 17 16.346"
                  fill="transparent"
                  strokeWidth="2"
                  stroke="hsl(0, 0%, 0%)"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <Image
              id={id}
              isSelected={isSelected}
              source={product.source}
              MerchantId={product.MerchantId}
              ProductId={product.ProductId}
              images={product.images}
              mainImageIndex={0}
            />
            <ContentPlaceholder
              product={product}
              addToCart={addToCart}
              cartData={cartData}
            />
          </motion.div>
        </div>
        {!isSelected ? (
          <>
            <p className="text-black md:text-3xl my-2 mt-4">
              {title.length > 45 ? title.substring(0, 42) + "..." : title}
            </p>
            <Link href={`/vendors/${product.MerchantId}`}>
              <p className="cursor-pointer text-black text-base md:text-xl my-2">
                by {product.storename}
              </p>
            </Link>
            <p className="text-md">${price}</p>
          </>
        ) : null}
        {!isSelected && (
          <a
            onClick={() => setSelectedId(id)}
            className={`card-open-link cursor-pointer`}
          ></a>
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
    <a
      onClick={() => {
        setSelectedId(-1);
      }}
    ></a>
  </motion.div>
);

export default productCard;
