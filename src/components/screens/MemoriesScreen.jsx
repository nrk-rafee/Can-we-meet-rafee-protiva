"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
  Star,
} from "lucide-react";
import Button from "../Button";

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

/* =========================================================
   REALISTIC-STYLE BUTTERFLY
   ========================================================= */

function Butterfly({
  id,
  size = 80,
  className = "",
  delay = 0,
  duration = 8,
  blur = 0,
  opacity = 1,
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-[5] ${className}`}
      style={{
        width: size,
        height: size * 0.85,
        filter: blur ? `blur(${blur}px)` : "none",
        opacity,
      }}
      animate={{
        x: [0, 18, -12, 8, 0],
        y: [0, -25, -8, -30, 0],
        rotate: [-3, 5, -4, 4, -3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <svg
        viewBox="0 0 180 150"
        width="100%"
        height="100%"
        style={{
          overflow: "visible",
          filter:
            "drop-shadow(0 7px 10px rgba(107, 63, 88, 0.18))",
        }}
      >
        <defs>
          <linearGradient
            id={`wingLeft-${id}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffd9ee" />
            <stop offset="35%" stopColor="#f9a8d4" />
            <stop offset="70%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <linearGradient
            id={`wingRight-${id}`}
            x1="1"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffd9ee" />
            <stop offset="35%" stopColor="#f9a8d4" />
            <stop offset="70%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <radialGradient id={`shine-${id}`}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id={`body-${id}`}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop offset="0%" stopColor="#4c263c" />
            <stop offset="50%" stopColor="#211526" />
            <stop offset="100%" stopColor="#5b304a" />
          </linearGradient>
        </defs>

        {/* LEFT UPPER WING */}
        <motion.path
          d="M86 68
             C67 30 38 6 17 13
             C-3 20 3 57 18 78
             C31 96 53 101 82 86
             Z"
          fill={`url(#wingLeft-${id})`}
          stroke="#9d4d83"
          strokeWidth="2"
          animate={{
            scaleX: [1, 0.72, 1],
          }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "84px 70px" }}
        />

        {/* RIGHT UPPER WING */}
        <motion.path
          d="M94 68
             C113 30 142 6 163 13
             C183 20 177 57 162 78
             C149 96 127 101 98 86
             Z"
          fill={`url(#wingRight-${id})`}
          stroke="#9d4d83"
          strokeWidth="2"
          animate={{
            scaleX: [1, 0.72, 1],
          }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.02,
          }}
          style={{ transformOrigin: "96px 70px" }}
        />

        {/* LEFT LOWER WING */}
        <motion.path
          d="M83 79
             C62 83 39 92 34 112
             C30 128 50 139 68 131
             C81 125 87 108 88 84
             Z"
          fill="#f0a6d3"
          stroke="#9d4d83"
          strokeWidth="2"
          animate={{
            scaleX: [1, 0.78, 1],
          }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "84px 82px" }}
        />

        {/* RIGHT LOWER WING */}
        <motion.path
          d="M97 79
             C118 83 141 92 146 112
             C150 128 130 139 112 131
             C99 125 93 108 92 84
             Z"
          fill="#c084c7"
          stroke="#9d4d83"
          strokeWidth="2"
          animate={{
            scaleX: [1, 0.78, 1],
          }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.02,
          }}
          style={{ transformOrigin: "96px 82px" }}
        />

        {/* WING VEINS */}
        <g
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.48"
          strokeWidth="1.4"
        >
          <path d="M78 68 C55 48 37 32 19 26" />
          <path d="M78 72 C53 62 35 57 17 55" />
          <path d="M77 77 C55 77 42 82 28 88" />

          <path d="M102 68 C125 48 143 32 161 26" />
          <path d="M102 72 C127 62 145 57 163 55" />
          <path d="M103 77 C125 77 138 82 152 88" />
        </g>

        {/* WING SPOTS */}
        <g fill="#ffffff" opacity="0.65">
          <circle cx="32" cy="35" r="5" />
          <circle cx="48" cy="51" r="3.5" />
          <circle cx="30" cy="64" r="3" />

          <circle cx="148" cy="35" r="5" />
          <circle cx="132" cy="51" r="3.5" />
          <circle cx="150" cy="64" r="3" />
        </g>

        <g fill={`url(#shine-${id})`}>
          <circle cx="45" cy="39" r="18" />
          <circle cx="135" cy="39" r="18" />
        </g>

        {/* BODY */}
        <ellipse
          cx="90"
          cy="76"
          rx="7"
          ry="34"
          fill={`url(#body-${id})`}
        />

        <circle cx="90" cy="43" r="7" fill="#2a1726" />

        {/* ANTENNA */}
        <path
          d="M87 46 C77 30 69 29 63 22"
          fill="none"
          stroke="#3a2032"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M93 46 C103 30 111 29 117 22"
          fill="none"
          stroke="#3a2032"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="62" cy="21" r="2.3" fill="#3a2032" />
        <circle cx="118" cy="21" r="2.3" fill="#3a2032" />
      </svg>
    </motion.div>
  );
}

/* =========================================================
   FLOATING DECORATIONS
   ========================================================= */

const floatingHearts = [
  { left: "7%", top: "28%", size: 14, delay: 0 },
  { left: "89%", top: "32%", size: 17, delay: 1.2 },
  { left: "11%", top: "67%", size: 12, delay: 0.8 },
  { left: "91%", top: "70%", size: 15, delay: 1.8 },
];

const sparkles = [
  { left: "18%", top: "22%", delay: 0 },
  { left: "82%", top: "24%", delay: 0.8 },
  { left: "8%", top: "49%", delay: 1.4 },
  { left: "93%", top: "52%", delay: 0.4 },
  { left: "16%", top: "81%", delay: 1.1 },
  { left: "84%", top: "82%", delay: 1.8 },
];

/* =========================================================
   MAIN SCREEN
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
    <div className="relative w-screen min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff5fa] via-[#fdeaf5] to-[#fff7fb]">

      {/* =================================================
          SOFT BACKGROUND LIGHT
          ================================================= */}

      <motion.div
        className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[430px] h-[430px] rounded-full bg-pink-300/20 blur-[90px] pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[280px] h-[280px] rounded-full bg-purple-300/15 blur-[90px] pointer-events-none"
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =================================================
          BUTTERFLIES — FULL SCREEN
          ================================================= */}

      {/* LEFT TOP — MAIN FOCUSED */}
      <Butterfly
        id="one"
        size={105}
        className="left-[2%] top-[18%]"
        duration={8}
        delay={0}
      />

      {/* RIGHT TOP */}
      <Butterfly
        id="two"
        size={67}
        className="right-[4%] top-[25%]"
        duration={7}
        delay={1.5}
      />

      {/* LEFT MIDDLE */}
      <Butterfly
        id="three"
        size={55}
        className="left-[4%] top-[53%]"
        duration={9}
        delay={2}
        blur={0.4}
        opacity={0.9}
      />

      {/* RIGHT MIDDLE — FOCUSED */}
      <Butterfly
        id="four"
        size={90}
        className="right-[1%] top-[57%]"
        duration={8.5}
        delay={0.7}
      />

      {/* LEFT BOTTOM — DISTANT */}
      <Butterfly
        id="five"
        size={48}
        className="left-[10%] bottom-[9%]"
        duration={10}
        delay={2.5}
        blur={1}
        opacity={0.72}
      />

      {/* RIGHT BOTTOM — DISTANT */}
      <Butterfly
        id="six"
        size={60}
        className="right-[9%] bottom-[8%]"
        duration={9}
        delay={1.8}
        blur={0.7}
        opacity={0.8}
      />

      {/* =================================================
          FLOATING HEARTS
          ================================================= */}

      {floatingHearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-[4]"
          style={{
            left: heart.left,
            top: heart.top,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, index % 2 === 0 ? 5 : -5, 0],
            opacity: [0.25, 0.8, 0.25],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            className="text-pink-300"
          />
        </motion.div>
      ))}

      {/* =================================================
          SPARKLES
          ================================================= */}

      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-[3]"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            rotate: [0, 90, 180],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={15}
            className="text-pink-300"
          />
        </motion.div>
      ))}

      {/* =================================================
          TOP HEADER
          ================================================= */}

      <motion.div
        className="relative z-20 text-center mt-3"
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{
              rotate: [-6, 6, -6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={20}
              className="text-pink-400"
            />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-700">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [6, -6, 6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={20}
              className="text-pink-400"
            />
          </motion.div>
        </div>

        <motion.p
          className="text-xl md:text-2xl font-hand text-purple-400 mt-2"
          animate={{
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          Little moments, forever ours ♡
        </motion.p>
      </motion.div>

      {/* =================================================
          PHOTO DOTS
          ================================================= */}

      <div className="relative z-20 flex items-center justify-center gap-3 mt-4">
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-3.5 h-3.5 bg-pink-500"
                : "w-2.5 h-2.5 bg-pink-200"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 rgba(236,72,153,0)",
                      "0 0 12px rgba(236,72,153,0.5)",
                      "0 0 0 rgba(236,72,153,0)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* =================================================
          LUXURY ALBUM AREA
          ================================================= */}

      <div className="relative z-20 w-full max-w-[470px] h-[430px] md:h-[470px] mt-3 flex items-center justify-center">

        {/* OUTER GOLD ORNAMENT */}
        <motion.div
          className="absolute w-[350px] h-[405px] md:w-[390px] md:h-[435px] rounded-[32px] border border-[#d9a86c]/45"
          animate={{
            rotate: [0, 0.7, 0, -0.7, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* INNER LUXURY FRAME */}
        <div className="absolute w-[340px] h-[395px] md:w-[378px] md:h-[425px] rounded-[30px] bg-gradient-to-br from-[#fffaf5] via-[#fff] to-[#fbe7ef] shadow-[0_25px_70px_rgba(92,45,75,0.16)] border border-white/80" />

        {/* GOLD INNER BORDER */}
        <div className="absolute w-[326px] h-[381px] md:w-[364px] md:h-[411px] rounded-[26px] border border-[#d6a65f]/35 pointer-events-none" />

        {/* DECORATIVE CORNERS */}

        <div className="absolute left-[64px] md:left-[48px] top-[30px] text-[#d4a45d] z-30">
          <Star size={15} fill="currentColor" />
        </div>

        <div className="absolute right-[64px] md:right-[48px] top-[30px] text-[#d4a45d] z-30">
          <Star size={15} fill="currentColor" />
        </div>

        <div className="absolute left-[66px] md:left-[50px] bottom-[35px] text-[#d4a45d] z-30">
          <Sparkles size={16} />
        </div>

        <div className="absolute right-[66px] md:right-[50px] bottom-[35px] text-[#d4a45d] z-30">
          <Sparkles size={16} />
        </div>

        {/* BACK PHOTO LAYER */}
        <motion.div
          className="absolute w-[292px] h-[365px] md:w-[315px] md:h-[390px] bg-white rounded-2xl shadow-xl border border-pink-100"
          animate={{
            rotate: [-4, -3, -4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* BACK PHOTO 2 */}
        <motion.div
          className="absolute w-[292px] h-[365px] md:w-[315px] md:h-[390px] bg-[#fff9fb] rounded-2xl shadow-xl border border-pink-100"
          animate={{
            rotate: [4, 3, 4],
          }}
          transition={{
            duration: 6.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* MAIN PHOTO */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 100 : -100,
              rotate: direction > 0 ? 4 : -4,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -100 : 100,
              rotate: direction > 0 ? -4 : 4,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute w-[285px] h-[360px] md:w-[310px] md:h-[385px] bg-[#fffdfd] rounded-2xl p-3 pb-12 shadow-[0_25px_55px_rgba(80,35,65,0.2)] border border-[#e7c48b]/45 cursor-pointer"
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >

            {/* TOP TAPE */}
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-[88px] h-[25px] bg-gradient-to-r from-pink-200 to-pink-100 rounded-sm shadow-sm z-40"
              animate={{
                rotate: [-3, 1, -3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="flex justify-center items-center h-full">
                <Heart
                  size={13}
                  fill="currentColor"
                  className="text-pink-400"
                />
              </div>
            </motion.div>

            {/* PHOTO */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              {/* SOFT PHOTO GLOW */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/15 via-transparent to-white/10 pointer-events-none" />

              {/* PHOTO SHINE */}
              <motion.div
                className="absolute inset-y-0 -left-[50%] w-[30%] bg-white/25 skew-x-[-20deg] pointer-events-none"
                animate={{
                  left: ["-50%", "140%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* POLAROID CAPTION */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SIDE RIBBON */}
        <motion.div
          className="absolute -right-[4px] md:-right-[5px] top-[150px] w-[72px] h-[25px] bg-gradient-to-r from-pink-300/60 to-pink-200/20 rounded-r-full z-10"
          animate={{
            rotate: [3, 7, 3],
            x: [0, 3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -left-[4px] md:-left-[5px] top-[235px] w-[72px] h-[25px] bg-gradient-to-l from-purple-300/40 to-purple-100/10 rounded-l-full z-10"
          animate={{
            rotate: [-3, -7, -3],
            x: [0, -3, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* NEXT BUTTON */}
        <motion.div
          className="absolute right-[24px] md:right-[30px] top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white/90 backdrop-blur shadow-lg border border-pink-100 flex items-center justify-center cursor-pointer"
          animate={{
            x: [0, 4, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
          onClick={nextPhoto}
        >
          <ChevronRight
            size={18}
            className="text-pink-400"
          />
        </motion.div>
      </div>

      {/* =================================================
          PHOTO COUNTER
          ================================================= */}

      <motion.div
        className="relative z-30 -mt-1 mb-3"
        key={currentIndex}
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-pink-300" />

          <span className="tracking-[0.22em] font-medium text-slate-500">
            {String(currentIndex + 1).padStart(2, "0")}
            {" "}
            /
            {" "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-10 h-px bg-gradient-to-l from-transparent to-pink-300" />
        </div>
      </motion.div>

      {/* =================================================
          NEXT BUTTON
          ================================================= */}

      <motion.div
        className="relative z-30 mb-5"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.6,
        }}
      >
        <Button
          onClick={onNext}
          text="A Letter For You"
          animateIcon={false}
          icon={<Mail size={18} />}
        />
      </motion.div>

      {/* BOTTOM LITTLE HEARTS */}
      <motion.div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Heart size={10} fill="currentColor" className="text-pink-300" />
        <Heart size={14} fill="currentColor" className="text-pink-400" />
        <Heart size={10} fill="currentColor" className="text-pink-300" />
      </motion.div>
    </div>
  );
}

export default MemoriesScreen;
