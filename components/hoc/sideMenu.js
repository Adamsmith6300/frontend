import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../utils/use-dimensions";
import { MenuToggle } from "./menuToggle";
import { Navigation } from "./navigation";

const sidebar = {
  open: (height = 3000) => ({
    clipPath: `circle(3200px at 80px 80px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 290px 80px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const SideMenu = ({ clearFlag, categories, logoutPerson, isGuest }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      variants={sidebar}
      className={`nav ${isOpen ? "front" : ""}`}
    >
      {/* <span className="tag-wrap"> */}
      <motion.div
        className={`background ${isOpen ? "front" : ""}`}
        variants={sidebar}
      />
      {/* </span> */}
      <Navigation
        categories={categories}
        isOpen={isOpen}
        clearFlag={clearFlag}
        logoutPerson={logoutPerson}
        isGuest={isGuest}
      />
      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
