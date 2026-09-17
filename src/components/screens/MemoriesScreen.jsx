"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
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
   REALISTIC BUTTERFLY SVG
========================================================= */

function Butterfly({
  size = 90,
  className = "",
  flip = false,
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-[5] ${className}`}
      style={{
        width: size,
        height: size * 0.78,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <motion.svg
        viewBox="0 0 220 170"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: [-2, 2, -2],
          scaleY: [1, 0.82, 1],
        }}
        transition={{
          duration: 0.55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter:
            "drop-shadow(0 8px 10px rgba(90,40,80,0.18))",
        }}
      >
        <defs>
          <linearGradient
            id="wingPink"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#ffd7ee" />
            <stop offset="35%" stopColor="#f78fca" />
            <stop offset="70%" stopColor="#d957a7" />
            <stop offset="100%" stopColor="#91417f" />
          </linearGradient>

          <linearGradient
            id="wingPurple"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#fbdcff" />
            <stop offset="45%" stopColor="#c997e8" />
            <stop offset="100%" stopColor="#78549e" />
          </linearGradient>

          <radialGradient id="wingGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* LEFT UPPER WING */}
        <path
          d="M105 79
             C78 64 43 7 20 15
             C-4 24 8 72 34 91
             C56 107 85 102 105 91 Z"
          fill="url(#wingPink)"
          stroke="#7d356f"
          strokeWidth="2"
        />

        {/* LEFT LOWER WING */}
        <path
          d="M101 91
             C76 96 39 103 31 125
             C25 143 55 149 79 132
             C94 121 102 105 108 94 Z"
          fill="url(#wingPurple)"
          stroke="#7d356f"
          strokeWidth="2"
        />

        {/* RIGHT UPPER WING */}
        <path
          d="M115 79
             C142 64 177 7 200 15
             C224 24 212 72 186 91
             C164 107 135 102 115 91 Z"
          fill="url(#wingPink)"
          stroke="#7d356f"
          strokeWidth="2"
        />

        {/* RIGHT LOWER WING */}
        <path
          d="M119 91
             C144 96 181 103 189 125
             C195 143 165 149 141 132
             C126 121 118 105 112 94 Z"
          fill="url(#wingPurple)"
          stroke="#7d356f"
          strokeWidth="2"
        />

        {/* WING VEINS */}
        <g
          fill="none"
          stroke="#fff"
          strokeOpacity="0.48"
          strokeWidth="2"
        >
          <path d="M101 79 C76 57 51 34 27 25" />
          <path d="M101 83 C70 74 43 66 17 54" />
          <path d="M100 88 C69 88 46 86 24 82" />

          <path d="M119 79 C144 57 169 34 193 25" />
          <path d="M119 83 C150 74 177 66 203 54" />
          <path d="M120 88 C151 88 174 86 196 82" />

          <path d="M99 96 C77 111 58 124 43 133" />
          <path d="M121 96 C143 111 162 124 177 133" />
        </g>

        {/* WING SPOTS */}
        <g fill="#fff" opacity="0.65">
          <circle cx="39" cy="42" r="5" />
          <circle cx="58" cy="60" r="4" />
          <circle cx="75" cy="73" r="3" />
          <circle cx="181" cy="42" r="5" />
          <circle cx="162" cy="60" r="4" />
          <circle cx="145" cy="73" r="3" />
        </g>

        <ellipse
          cx="110"
          cy="80"
          rx="8"
          ry="34"
          fill="#4d3045"
        />

        <ellipse
          cx="110"
          cy="80"
          rx="3"
          ry="29"
          fill="#1f1821"
        />

        {/* ANTENNA */}
        <path
          d="M107 52 C95 33 83 29 75 26"
          fill="none"
          stroke="#4d3045"
          strokeWidth="2"
        />

        <path
          d="M113 52 C125 33 137 29 145 26"
          fill="none"
          stroke="#4d3045"
          strokeWidth="2"
        />

        <circle cx="74" cy="25" r="3" fill="#4d3045" />
        <circle cx="146" cy="25" r="3" fill="#4d3045" />

        {/* SOFT LIGHT */}
        <ellipse
          cx="72"
          cy="48"
          rx="28"
          ry="24"
          fill="url(#wingGlow)"
        />

        <ellipse
          cx="148"
          cy="48"
          rx="28"
          ry="24"
          fill="url(#wingGlow)"
        />
      </motion.svg>
    </motion.div>
  );
}

/* =========================================================
   FLOATING BUTTERFLIES
========================================================= */

function FlyingButterflies() {
  return (
    <>
      {/* BIG LEFT */}
      <motion.div
        className="absolute left-[-10px] top-[25%] z-[6]"
        initial={{ x: -80, y: 30, opacity: 0 }}
        animate={{
          x: [-20, 45, 20, 65, 0],
          y: [20, -15, 25, -10, 20],
          opacity: [0, 1, 1, 0.9, 0],
          rotate: [-8, 5, -4, 7, -8],
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Butterfly size={92} />
      </motion.div>

      {/* RIGHT SMALL */}
      <motion.div
        className="absolute right-[-5px] top-[30%] z-[6]"
        initial={{ x: 80, opacity: 0 }}
        animate={{
          x: [35, -10, 25, -5, 35],
          y: [10, 45, 0, 35, 10],
          opacity: [0, 0.9, 1, 0.85, 0],
          rotate: [8, -5, 5, -8, 8],
        }}
        transition={{
          duration: 11,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Butterfly size={62} flip />
      </motion.div>

      {/* LEFT MIDDLE */}
      <motion.div
        className="absolute left-[2%] top-[57%] z-[6]"
        initial={{ opacity: 0 }}
        animate={{
          x: [0, 40, 10, 50, 0],
          y: [0, -30, 5, -25, 0],
          opacity: [0, 0.8, 1, 0.75, 0],
          rotate: [-5, 8, -2, 5, -5],
        }}
        transition={{
          duration: 14,
          delay: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Butterfly size={55} />
      </motion.div>

      {/* RIGHT BOTTOM */}
      <motion.div
        className="absolute right-[-8px] top-[66%] z-[6]"
        initial={{ opacity: 0 }}
        animate={{
          x: [30, -25, 10, -20, 30],
          y: [0, -45, -5, -35, 0],
          opacity: [0, 0.75, 1, 0.7, 0],
          rotate: [7, -7, 4, -5, 7],
        }}
        transition={{
          duration: 15,
          delay: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Butterfly size={72} flip />
      </motion.div>
    </>
  );
}

/* =========================================================
   BACKGROUND PARTICLES
========================================================= */

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 5,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 4,
}));

/* =========================================================
   MAIN COMPONENT
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#ffe8f2] via-[#ffddea] to-[#fff1f7]">

      {/* =====================================================
          DREAMY BACKGROUND
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-pink-300/25 blur-[100px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[35%] -left-32 w-[330px] h-[330px] rounded-full bg-purple-300/20 blur-[90px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[55%] -right-32 w-[330px] h-[330px] rounded-full bg-pink-300/25 blur-[90px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* particles */}

        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              boxShadow: "0 0 12px rgba(255,255,255,0.9)",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.85, 0.15],
              scale: [0.7, 1.2, 0.7],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* sparkle stars */}

        {[...Array(12)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute text-white/80"
            style={{
              left: `${8 + ((index * 17) % 84)}%`,
              top: `${8 + ((index * 23) % 82)}%`,
            }}
            animate={{
              scale: [0.5, 1.3, 0.5],
              rotate: [0, 90, 180],
              opacity: [0.15, 0.9, 0.15],
            }}
            transition={{
              duration: 2.5 + (index % 3),
              delay: index * 0.25,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* =====================================================
          BUTTERFLIES
      ===================================================== */}

      <FlyingButterflies />

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <motion.div
        className="relative z-20 text-center pt-8 px-4"
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
              rotate: [-5, 5, -5],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={22}
              strokeWidth={2.5}
              className="text-pink-500"
            />
          </motion.div>

          <h2 className="text-[34px] sm:text-5xl font-extrabold tracking-tight text-slate-700 drop-shadow-sm">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [5, -5, 5],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={22}
              strokeWidth={2.5}
              className="text-pink-500"
            />
          </motion.div>

        </div>

        <motion.p
          className="mt-2 text-[21px] sm:text-2xl font-hand italic text-purple-500"
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

      {/* =====================================================
          DOTS
      ===================================================== */}

      <div className="relative z-30 flex items-center justify-center gap-3 mt-5">

        {memories.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Go to memory ${index + 1}`}
            className={`rounded-full transition-all ${
              index === currentIndex
                ? "w-4 h-4 bg-pink-500 shadow-[0_0_14px_rgba(236,72,153,0.45)]"
                : "w-3 h-3 bg-pink-300/70"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.18, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
          />
        ))}

      </div>

      {/* =====================================================
          LUXURY ALBUM AREA
      ===================================================== */}

      <div className="relative z-20 w-full max-w-[470px] h-[470px] sm:h-[500px] mt-2 flex items-center justify-center">

        {/* outer glowing halo */}

        <motion.div
          className="absolute w-[330px] h-[400px] rounded-[35px] bg-pink-300/20 blur-2xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* back album sheet */}

        <motion.div
          className="absolute w-[330px] h-[395px] sm:w-[355px] sm:h-[415px] rounded-[25px] bg-[#fff8fb] border border-pink-200 shadow-[0_25px_60px_rgba(90,30,70,0.12)]"
          animate={{
            rotate: [-4, -3, -4],
            y: [2, -2, 2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* second back sheet */}

        <motion.div
          className="absolute w-[320px] h-[385px] sm:w-[345px] sm:h-[405px] rounded-[25px] bg-white/80 border border-purple-100 shadow-[0_20px_50px_rgba(90,30,70,0.12)]"
          animate={{
            rotate: [3, 2, 3],
            y: [-1, 2, -1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* decorative ribbon behind album */}

        <motion.div
          className="absolute w-[390px] h-[55px] bg-gradient-to-r from-transparent via-pink-300/55 to-transparent rounded-full blur-[1px]"
          animate={{
            rotate: [19, 18, 19],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        {/* main photo card */}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 100 : -100,
              rotate: direction > 0 ? 5 : -5,
              scale: 0.92,
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
              rotate: direction > 0 ? -5 : 5,
              scale: 0.92,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute w-[305px] h-[395px] sm:w-[330px] sm:h-[420px] bg-[#fffdfd] rounded-[22px] p-3 pb-14 shadow-[0_30px_70px_rgba(60,20,50,0.22)] border border-white cursor-pointer"
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* top tape */}

            <motion.div
              className="absolute z-30 -top-4 left-1/2 -translate-x-1/2 w-[90px] h-[30px] bg-gradient-to-r from-pink-200 via-pink-100 to-pink-200 rounded-sm shadow-sm"
              animate={{
                rotate: [-3, 2, -3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="text-center text-pink-500 text-sm pt-1">
                ♡
              </div>
            </motion.div>

            {/* photo */}

            <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-pink-50 border border-pink-100">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable="false"
              />

              {/* soft photo overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/15 via-transparent to-white/10 pointer-events-none" />

              {/* photo shine */}

              <motion.div
                className="absolute inset-y-0 -left-[70%] w-[35%] bg-white/25 skew-x-[-20deg] pointer-events-none"
                animate={{
                  left: ["-70%", "140%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />

              {/* tiny hearts */}

              <motion.div
                className="absolute top-4 left-4 text-white text-xl drop-shadow-md"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ♡
              </motion.div>

            </div>

            {/* bottom caption */}

            <div className="absolute bottom-3 left-0 right-0 text-center">

              <motion.div
                className="flex items-center justify-center gap-2"
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <span className="text-pink-300">♡</span>

                <span className="font-hand italic text-[17px] text-slate-500">
                  a little piece of us ♡
                </span>

                <span className="text-pink-300">♡</span>
              </motion.div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* flower decoration */}

        <motion.div
          className="absolute left-[22px] bottom-[36px] z-30 text-5xl"
          animate={{
            rotate: [-3, 3, -3],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🌸
        </motion.div>

        <motion.div
          className="absolute left-[5px] bottom-[18px] z-20 text-3xl"
          animate={{
            rotate: [3, -3, 3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          🌼
        </motion.div>

        {/* right flower */}

        <motion.div
          className="absolute right-[28px] top-[95px] z-30 text-3xl"
          animate={{
            rotate: [-5, 5, -5],
            y: [0, -4, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
          }}
        >
          🌸
        </motion.div>

        {/* sparkle decorations */}

        <motion.div
          className="absolute left-[35px] top-[90px] text-pink-400 z-30"
          animate={{
            scale: [0.7, 1.2, 0.7],
            rotate: [0, 90, 180],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <Sparkles size={20} />
        </motion.div>

        <motion.div
          className="absolute right-[28px] bottom-[105px] text-purple-400 z-30"
          animate={{
            scale: [0.6, 1.2, 0.6],
            rotate: [0, -90, -180],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
        >
          <Sparkles size={18} />
        </motion.div>

        {/* next arrow */}

        <motion.button
          onClick={nextPhoto}
          aria-label="Next memory"
          className="absolute right-[6px] sm:right-[18px] top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-pink-100 shadow-lg flex items-center justify-center"
          animate={{
            x: [0, 4, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          <ChevronRight
            size={19}
            className="text-pink-500"
          />
        </motion.button>

      </div>

      {/* =====================================================
          COUNTER
      ===================================================== */}

      <motion.div
        className="relative z-30 -mt-3 mb-3"
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
        <div className="flex items-center gap-4 text-slate-500">

          <span className="w-10 h-[1px] bg-pink-300" />

          <span className="tracking-[0.2em] font-medium text-sm">
            {currentIndex + 1} / {memories.length}
          </span>

          <span className="w-10 h-[1px] bg-pink-300" />

        </div>
      </motion.div>

      {/* =====================================================
          BUTTON
      ===================================================== */}

      <motion.div
        className="relative z-30 mb-7"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.6,
          duration: 0.7,
        }}
      >
        <Button
          onClick={onNext}
          text="A Letter For You"
          animateIcon={false}
          icon={<Mail size={18} />}
        />
      </motion.div>

      {/* =====================================================
          FLOATING HEARTS
      ===================================================== */}

      <motion.div
        className="absolute left-[12%] bottom-[18%] text-pink-300 z-[4]"
        animate={{
          y: [0, -15, 0],
          rotate: [-10, 10, -10],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Heart size={18} fill="currentColor" />
      </motion.div>

      <motion.div
        className="absolute right-[12%] top-[20%] text-pink-300 z-[4]"
        animate={{
          y: [0, -12, 0],
          rotate: [10, -10, 10],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
        }}
      >
        <Heart size={15} fill="currentColor" />
      </motion.div>

    </div>
  );
}

export default MemoriesScreen;
