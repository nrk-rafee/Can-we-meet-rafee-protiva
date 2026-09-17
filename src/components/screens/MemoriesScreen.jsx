"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
  Flower2,
} from "lucide-react";
import Button from "../Button";

/* =========================================================
   YOUR 5 MEMORIES
========================================================= */

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

/* =========================================================
   REALISTIC-STYLE BUTTERFLY
   SVG/CSS butterfly instead of emoji
========================================================= */

function Butterfly({
  size = 70,
  color = "pink",
  flip = false,
  blur = 0,
  opacity = 1,
}) {
  const colors = {
    pink: {
      wing1: "#ff8fbd",
      wing2: "#ffb9d5",
      wing3: "#ffd6e6",
      body: "#6d4561",
      glow: "rgba(255,105,170,0.55)",
    },
    purple: {
      wing1: "#b98cff",
      wing2: "#d8b9ff",
      wing3: "#efdfff",
      body: "#60406f",
      glow: "rgba(168,100,255,0.5)",
    },
    blue: {
      wing1: "#72c9ff",
      wing2: "#a9e2ff",
      wing3: "#d9f4ff",
      body: "#365d78",
      glow: "rgba(80,180,255,0.45)",
    },
  };

  const c = colors[color] || colors.pink;

  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{
        width: size,
        height: size,
        opacity,
        filter: `blur(${blur}px)`,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <motion.svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        style={{
          overflow: "visible",
          filter: `drop-shadow(0 5px 10px ${c.glow})`,
        }}
      >
        {/* Left upper wing */}
        <motion.path
          d="M59 54 C43 21 15 12 10 25 C5 39 19 60 48 67 C53 68 57 64 59 54Z"
          fill={c.wing1}
          opacity="0.92"
          animate={{
            scaleX: [1, 0.72, 1],
          }}
          transition={{
            duration: 0.32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "59px 54px" }}
        />

        {/* Right upper wing */}
        <motion.path
          d="M61 54 C77 21 105 12 110 25 C115 39 101 60 72 67 C67 68 63 64 61 54Z"
          fill={c.wing1}
          opacity="0.92"
          animate={{
            scaleX: [1, 0.72, 1],
          }}
          transition={{
            duration: 0.32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "61px 54px" }}
        />

        {/* Left lower wing */}
        <motion.path
          d="M57 65 C38 60 15 64 18 78 C21 91 40 96 56 78Z"
          fill={c.wing2}
          opacity="0.94"
          animate={{
            scaleX: [1, 0.72, 1],
          }}
          transition={{
            duration: 0.32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "57px 65px" }}
        />

        {/* Right lower wing */}
        <motion.path
          d="M63 65 C82 60 105 64 102 78 C99 91 80 96 64 78Z"
          fill={c.wing2}
          opacity="0.94"
          animate={{
            scaleX: [1, 0.72, 1],
          }}
          transition={{
            duration: 0.32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "63px 65px" }}
        />

        {/* Wing patterns */}
        <ellipse
          cx="29"
          cy="39"
          rx="9"
          ry="13"
          fill={c.wing3}
          opacity="0.7"
        />

        <ellipse
          cx="91"
          cy="39"
          rx="9"
          ry="13"
          fill={c.wing3}
          opacity="0.7"
        />

        <circle
          cx="22"
          cy="54"
          r="3"
          fill="#ffffff"
          opacity="0.65"
        />

        <circle
          cx="98"
          cy="54"
          r="3"
          fill="#ffffff"
          opacity="0.65"
        />

        {/* Butterfly body */}
        <ellipse
          cx="60"
          cy="66"
          rx="3.5"
          ry="15"
          fill={c.body}
        />

        <circle
          cx="60"
          cy="49"
          r="4"
          fill={c.body}
        />

        {/* Antennae */}
        <path
          d="M58 48 C52 40 48 39 44 36"
          stroke={c.body}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M62 48 C68 40 72 39 76 36"
          stroke={c.body}
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />

        <circle cx="44" cy="36" r="1.6" fill={c.body} />
        <circle cx="76" cy="36" r="1.6" fill={c.body} />
      </motion.svg>
    </motion.div>
  );
}

/* =========================================================
   FLOATING BUTTERFLY ANIMATION
========================================================= */

function FlyingButterfly({
  className = "",
  size = 70,
  color = "pink",
  flip = false,
  duration = 12,
  delay = 0,
}) {
  return (
    <motion.div
      className={`absolute z-[3] ${className}`}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.95, 0.9, 0],
        x: [0, 25, -15, 20, 0],
        y: [0, -35, -10, -55, 0],
        rotate: [-4, 8, -5, 7, -4],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Butterfly
        size={size}
        color={color}
        flip={flip}
      />
    </motion.div>
  );
}

/* =========================================================
   PETAL
========================================================= */

function FloatingPetal({
  left,
  top,
  delay,
  duration,
  rotate,
  size,
}) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[1]"
      style={{
        left,
        top,
        width: size,
        height: size * 1.6,
        borderRadius: "100% 0 100% 0",
        background:
          "linear-gradient(135deg, rgba(255,154,195,.75), rgba(255,211,228,.25))",
        rotate,
      }}
      animate={{
        y: [0, 90, 180],
        x: [0, 25, -10],
        rotate: [rotate, rotate + 80, rotate + 150],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* =========================================================
   MEMORIES SCREEN
========================================================= */

function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentPhoto = memories[currentIndex];

  const nextPhoto = () => {
    setDirection(1);

    setCurrentIndex((prev) =>
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-visible px-2 py-5">

      {/* =====================================================
          DREAMY BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 overflow-visible pointer-events-none">

        {/* Main pink glow */}
        <motion.div
          className="absolute left-1/2 top-[45%] -translate-x-1/2 w-[430px] h-[430px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,170,205,.32), rgba(255,220,235,.08), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.55, 0.8, 0.55],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Purple glow */}
        <motion.div
          className="absolute left-[15%] top-[35%] w-[190px] h-[190px] rounded-full blur-[65px]"
          style={{
            background:
              "radial-gradient(circle, rgba(202,167,255,.2), transparent 70%)",
          }}
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Bokeh circles */}
        {[
          ["8%", "18%", 10],
          ["88%", "21%", 14],
          ["12%", "74%", 8],
          ["91%", "69%", 11],
          ["5%", "50%", 6],
          ["94%", "47%", 7],
        ].map(([left, top, size], index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white/50 blur-[1px]"
            style={{
              left,
              top,
              width: size,
              height: size,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.25, 0.8, 0.25],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
        ))}

        {/* Tiny stars */}
        {[
          ["16%", "29%"],
          ["82%", "32%"],
          ["9%", "61%"],
          ["87%", "58%"],
          ["20%", "78%"],
          ["79%", "76%"],
        ].map(([left, top], index) => (
          <motion.div
            key={index}
            className="absolute text-pink-200"
            style={{ left
