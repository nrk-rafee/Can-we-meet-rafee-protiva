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

/* -------------------------------------------------------
   REALISTIC-STYLE BUTTERFLY
------------------------------------------------------- */

function Butterfly({
  className = "",
  scale = 1,
  rotate = 0,
  duration = 9,
  delay = 0,
  blur = 0,
  opacity = 1,
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-40 ${className}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity,
        x: [0, 12, -8, 14, 0],
        y: [0, -18, 7, -14, 0],
        rotate: [rotate, rotate + 4, rotate - 3, rotate + 5, rotate],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        scale,
        filter: `blur(${blur}px)`,
      }}
    >
      <motion.svg
        width="82"
        height="82"
        viewBox="0 0 100 100"
        fill="none"
        animate={{
          scaleX: [1, 0.78, 1],
        }}
        transition={{
          duration: 0.55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient
            id="wingPink"
            x1="10"
            y1="10"
            x2="80"
            y2="90"
          >
            <stop offset="0%" stopColor="#ffd9ed" />
            <stop offset="35%" stopColor="#f79bc8" />
            <stop offset="72%" stopColor="#d967aa" />
            <stop offset="100%" stopColor="#9d477f" />
          </linearGradient>

          <linearGradient
            id="wingPurple"
            x1="20"
            y1="0"
            x2="90"
            y2="100"
          >
            <stop offset="0%" stopColor="#ead7ff" />
            <stop offset="45%" stopColor="#b68ee8" />
            <stop offset="100%" stopColor="#76529f" />
          </linearGradient>

          <radialGradient id="wingGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <filter id="butterflyShadow">
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="3"
              floodColor="#8b426f"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        <g filter="url(#butterflyShadow)">
          {/* LEFT UPPER WING */}
          <path
            d="M48 48
               C29 43 8 30 13 12
               C17 -1 36 4 48 19
               C54 27 55 38 48 48Z"
            fill="url(#wingPink)"
            stroke="#9e477e"
            strokeWidth="1.3"
          />

          {/* RIGHT UPPER WING */}
          <path
            d="M52 48
               C71 43 92 30 87 12
               C83 -1 64 4 52 19
               C46 27 45 38 52 48Z"
            fill="url(#wingPurple)"
            stroke="#76529f"
            strokeWidth="1.3"
          />

          {/* LEFT LOWER WING */}
          <path
            d="M47 50
               C31 49 17 53 16 68
               C15 79 28 82 40 73
               C47 68 50 59 47 50Z"
            fill="url(#wingPurple)"
            stroke="#76529f"
            strokeWidth="1.2"
          />

          {/* RIGHT LOWER WING */}
          <path
            d="M53 50
               C69 49 83 53 84 68
               C85 79 72 82 60 73
               C53 68 50 59 53 50Z"
            fill="url(#wingPink)"
            stroke="#9e477e"
            strokeWidth="1.2"
          />

          {/* WING VEINS */}
          <path
            d="M46 45 C35 34 25 24 17 16
               M45 47 C33 42 23 37 14 31
               M54 45 C65 34 75 24 83 16
               M55 47 C67 42 77 37 86 31
               M44 55 C34 60 27 66 21 72
               M56 55 C66 60 73 66 79 72"
            stroke="#ffffff"
            strokeOpacity="0.45"
            strokeWidth="1"
          />

          {/* SPOTS */}
          <circle cx="27" cy="19" r="3" fill="#fff" fillOpacity="0.65" />
          <circle cx="72" cy="19" r="3" fill="#fff" fillOpacity="0.55" />
          <circle cx="20" cy="31" r="2" fill="#fff" fillOpacity="0.5" />
          <circle cx="80" cy="31" r="2" fill="#fff" fillOpacity="0.45" />
          <circle cx="29" cy="64" r="2.5" fill="#fff" fillOpacity="0.5" />
          <circle cx="71" cy="64" r="2.5" fill="#fff" fillOpacity="0.45" />

          {/* BODY */}
          <ellipse
            cx="50"
            cy="51"
            rx="3.2"
            ry="20"
            fill="#4b3042"
          />

          <ellipse
            cx="50"
            cy="51"
            rx="1.5"
            ry="17"
            fill="#1f1720"
          />

          {/* ANTENNA */}
          <path
            d="M49 33 C43 26 38 25 35 27
               M51 33 C57 26 62 25 65 27"
            stroke="#3d2936"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* WING HIGHLIGHT */}
          <ellipse
            cx="33"
            cy="25"
            rx="17"
            ry="13"
            fill="url(#wingGlow)"
            opacity="0.25"
          />

          <ellipse
            cx="67"
            cy="25"
            rx="17"
            ry="13"
            fill="url(#wingGlow)"
            opacity="0.2"
          />
        </g>
      </motion.svg>
    </motion.div>
  );
}

/* -------------------------------------------------------
   MEMORIES SCREEN
------------------------------------------------------- */

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
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-visible">

      {/* ==================================================
          SOFT LUXURY BACKGROUND
      ================================================== */}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-pink-200/20 blur-[100px] pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-[45%] -translate-x-1/2 w-[380px] h-[380px] rounded-full bg-purple-200/15 blur-[90px] pointer-events-none"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ==================================================
          BUTTERFLIES — FULL SCREEN
      ================================================== */}

      {/* LEFT TOP */}
      <Butterfly
        className="left-[2%] top-[19%]"
        scale={0.72}
        rotate={-12}
        duration={8}
        delay={0}
        opacity={0.92}
      />

      {/* RIGHT TOP */}
      <Butterfly
        className="right-[2%] top-[23%]"
        scale={0.58}
        rotate={10}
        duration={10}
        delay={2}
        opacity={0.82}
      />

      {/* LEFT MIDDLE */}
      <Butterfly
        className="left-[0%] top-[47%]"
        scale={0.48}
        rotate={-8}
        duration={7.5}
        delay={1}
        opacity={0.65}
        blur={0.2}
      />

      {/* RIGHT MIDDLE */}
      <Butterfly
        className="right-[0%] top-[48%]"
        scale={0.66}
        rotate={8}
        duration={9}
        delay={3}
        opacity={0.88}
      />

      {/* LEFT BOTTOM */}
      <Butterfly
        className="left-[7%] bottom-[17%]"
        scale={0.52}
        rotate={-5}
        duration={11}
        delay={1.8}
        opacity={0.72}
        blur={0.3}
      />

      {/* RIGHT BOTTOM — slightly bigger */}
      <Butterfly
        className="right-[5%] bottom-[13%]"
        scale={0.82}
        rotate={7}
        duration={10}
        delay={4}
        opacity={0.9}
      />

      {/* FAR BACK BUTTERFLIES */}
      <Butterfly
        className="left-[17%] top-[31%]"
        scale={0.28}
        rotate={-5}
        duration={13}
        delay={5}
        opacity={0.35}
        blur={1.2}
      />

      <Butterfly
        className="right-[16%] top-[35%]"
        scale={0.32}
        rotate={6}
        duration={12}
        delay={2.5}
        opacity={0.38}
        blur={1.2}
      />

      {/* ==================================================
          FLOATING HEARTS
      ================================================== */}

      <motion.div
        className="absolute left-[8%] top-[38%] pointer-events-none z-20"
        animate={{
          y: [0, -12, 0],
          rotate: [-8, 8, -8],
          opacity: [0.25, 0.75, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart
          size={17}
          fill="currentColor"
          className="text-pink-300"
        />
      </motion.div>

      <motion.div
        className="absolute right-[9%] top-[39%] pointer-events-none z-20"
        animate={{
          y: [0, -15, 0],
          rotate: [8, -8, 8],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 4.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Heart
          size={14}
          fill="currentColor"
          className="text-purple-300"
        />
      </motion.div>

      {/* ==================================================
          SPARKLES
      ================================================== */}

      {[
        ["left-[12%]", "top-[28%]", 0],
        ["right-[13%]", "top-[30%]", 1],
        ["left-[11%]", "top-[66%]", 1.8],
        ["right-[12%]", "top-[68%]", 0.6],
        ["left-[23%]", "top-[42%]", 2],
        ["right-[23%]", "top-[44%]", 1.2],
      ].map(([left, top, delay], index) => (
        <motion.div
          key={index}
          className={`absolute ${left} ${top} pointer-events-none z-20`}
          animate={{
            scale: [0.6, 1.2, 0.6],
            rotate: [0, 90, 180],
            opacity: [0.15, 0.9, 0.15],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={14 + (index % 2) * 4}
            className="text-pink-300"
          />
        </motion.div>
      ))}

      {/* ==================================================
          HEADER
      ================================================== */}

      <motion.div
        className="relative z-30 text-center mt-3"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="flex items-center justify-center gap-2">
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
              size={19}
              className="text-pink-400"
            />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-700 tracking-tight">
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
              size={19}
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

      {/* ==================================================
          MEMORY DOTS
      ================================================== */}

      <div className="flex items-center justify-center gap-2 mt-5 mb-1 relative z-30">
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-3 h-3 bg-pink-400"
                : "w-2 h-2 bg-pink-200"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.3, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* ==================================================
          LUXURY ALBUM AREA
      ================================================== */}

      <div className="relative w-full max-w-[500px] h-[440px] md:h-[470px] my-2 flex items-center justify-center z-30">

        {/* OUTER LUXURY FRAME */}
        <motion.div
          className="absolute w-[350px] h-[395px] md:w-[390px] md:h-[420px] rounded-[34px] border border-white/70 bg-white/20 backdrop-blur-[2px] pointer-events-none"
          animate={{
            rotate: [0, 0.5, 0, -0.5, 0],
            boxShadow: [
              "0 25px 70px rgba(236,72,153,0.08)",
              "0 30px 90px rgba(168,85,247,0.16)",
              "0 25px 70px rgba(236,72,153,0.08)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* GOLDEN/PINK INNER BORDER */}
        <motion.div
          className="absolute w-[335px] h-[380px] md:w-[375px] md:h-[405px] rounded-[30px] border border-pink-200/70 pointer-events-none"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        {/* BACK POLAROIDS */}
        <motion.div
          className="absolute w-[300px] h-[365px] md:w-[325px] md:h-[390px] bg-white/80 rounded-2xl shadow-xl"
          animate={{
            rotate: [-5, -4, -5],
            x: [-9, -7, -9],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-[300px] h-[365px] md:w-[325px] md:h-[390px] bg-[#fffafc] rounded-2xl shadow-xl"
          animate={{
            rotate: [4, 3, 4],
            x: [9, 7, 9],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* RIBBON BEHIND ALBUM */}
        <motion.div
          className="absolute -right-[4px] md:right-[12px] top-[43%] w-[105px] h-[35px] bg-gradient-to-r from-pink-300/60 to-pink-400/50 rounded-r-full pointer-events-none"
          animate={{
            rotate: [7, 9, 7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute -left-[4px] md:left-[12px] top-[48%] w-[105px] h-[35px] bg-gradient-to-l from-pink-300/60 to-pink-400/50 rounded-l-full pointer-events-none"
          animate={{
            rotate: [-7, -9, -7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 0.4,
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
              scale: 0.93,
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
              scale: 0.93,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute top-[24px] w-[285px] h-[355px] md:w-[310px] md:h-[380px] bg-[#fffdfd] rounded-[22px] p-3 pb-12 shadow-[0_25px_60px_rgba(80,30,60,0.20)] border border-white z-20 cursor-pointer"
            onClick={nextPhoto}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >
            {/* PHOTO */}
            <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-slate-100 border border-pink-50">
              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              {/* PHOTO LIGHT */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-white/15 pointer-events-none" />

              {/* MOVING LIGHT */}
              <motion.div
                className="absolute inset-y-0 -left-1/2 w-1/3 bg-white/20 skew-x-[-20deg] pointer-events-none"
                animate={{
                  left: ["-50%", "130%"],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />

              {/* LITTLE SPARKLE */}
              <motion.div
                className="absolute top-4 right-4 pointer-events-none"
                animate={{
                  scale: [0.7, 1.15, 0.7],
                  opacity: [0.2, 0.9, 0.2],
                  rotate: [0, 90, 180],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <Star
                  size={15}
                  fill="white"
                  className="text-white"
                />
              </motion.div>
            </div>

            {/* TAPE */}
            <motion.div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-[82px] h-[25px] bg-gradient-to-r from-pink-200/90 via-pink-100/95 to-pink-200/90 rounded-sm rotate-[-2deg] z-30 shadow-sm"
              animate={{
                rotate: [-2, 1, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="flex items-center justify-center h-full">
                <Heart
                  size={12}
                  fill="currentColor"
                  className="text-pink-400"
                />
              </div>
            </motion.div>

            {/* CAPTION */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SIDE ARROW */}
        <motion.div
          className="absolute right-[18px] md:right-[28px] top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-pink-100 flex items-center justify-center pointer-events-none"
          animate={{
            x: [0, 4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          <ChevronRight
            size={18}
            className="text-pink-400"
          />
        </motion.div>

        {/* BOTTOM HINT */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50"
          animate={{
            y: [0, 4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md shadow-md border border-pink-100">
            <span className="text-xs text-pink-400">
              tap for next memory ♡
            </span>
          </div>
        </motion.div>
      </div>

      {/* ==================================================
          COUNTER
      ================================================== */}

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
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="w-10 h-px bg-gradient-to-r from-transparent to-pink-300" />

          <span className="tracking-[0.2em] font-medium text-slate-500">
            {String(currentIndex + 1).padStart(2, "0")}
            {" / "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-10 h-px bg-gradient-to-l from-transparent to-pink-300" />
        </div>
      </motion.div>

      {/* ==================================================
          BUTTON
      ================================================== */}

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
          delay: 0.7,
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
    </div>
  );
}

export default MemoriesScreen;
