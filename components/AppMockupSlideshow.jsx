import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const mockups = [
  { src: "/mockups/pippin_mockup_1.webp", number: 1 },
  { src: "/mockups/pippin_mockup_2.webp", number: 2 },
  { src: "/mockups/pippin_mockup_3.webp", number: 3 },
  { src: "/mockups/pippin_mockup_4.webp", number: 4 },
];

export default function AppMockupSlideshow({ interval = 5000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % mockups.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative w-64 h-128 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={mockups[index].src}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="absolute w-full h-full flex flex-col items-center justify-center"
        >
          <img
            src={mockups[index].src}
            alt={`Pippin app mockup ${mockups[index].number}`}
            className="w-full h-auto object-contain"
          />
          <span className="absolute top-4 left-4 bg-[#B6A16B] text-white text-2xl font-bold rounded-full px-3.5 py-1 shadow">
            {mockups[index].number}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
