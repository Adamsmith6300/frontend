import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../../utils/use-dimensions";
import { MenuToggle } from "./menuToggle";
import { Navigation } from "./navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 80px 80px)`,
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

export const SideMenu = ({ clearFlag }) => {
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
      <motion.div
        className={`background ${isOpen ? "front" : ""}`}
        variants={sidebar}
      />
      <Navigation isOpen={isOpen} clearFlag={clearFlag} />
      <MenuToggle isOpen={isOpen} toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
