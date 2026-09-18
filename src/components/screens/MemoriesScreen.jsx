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
  Stars,
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

function RealisticButterfly({
  size = 100,
  tint = "pink",
  delay = 0,
  duration = 12,
  className = "",
  style = {},
}) {
  const colors =
    tint === "purple"
      ? {
          light: "#d8b4fe",
          mid: "#a855f7",
          dark: "#6b21a8",
          glow: "#e9d5ff",
        }
      : tint === "blue"
      ? {
          light: "#bfdbfe",
          mid: "#60a5fa",
          dark: "#1d4ed8",
          glow: "#dbeafe",
        }
      : {
          light: "#fbcfe8",
          mid: "#ec4899",
          dark: "#9d174d",
          glow: "#fce7f3",
        };

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size * 0.86,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: [0.72, 1, 0.78],
        scale: [0.96, 1.04, 0.98],
        y: [0, -12, 5, -8, 0],
        rotate: [-4, 4, -2, 3, -4],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.svg
        viewBox="0 0 240 205"
        width="100%"
        height="100%"
        viewBox="0 0 240 205"
        animate={{
          scaleX: [1, 0.82, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: `drop-shadow(0 8px 12px ${colors.glow})`,
          transformOrigin: "50% 50%",
        }}
      >
        <defs>
          <linearGradient
            id={`wing-${tint}-${delay}-left`}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor={colors.dark} />
            <stop offset="35%" stopColor={colors.mid} />
            <stop offset="72%" stopColor={colors.light} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <linearGradient
            id={`wing-${tint}-${delay}-right`}
            x1="100%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor={colors.dark} />
            <stop offset="35%" stopColor={colors.mid} />
            <stop offset="72%" stopColor={colors.light} />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <radialGradient id={`shine-${tint}-${delay}`}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* LEFT UPPER WING */}
        <path
          d="M115 92
             C91 69 61 24 28 30
             C4 35 5 73 24 91
             C43 109 76 111 113 103 Z"
          fill={`url(#wing-${tint}-${delay}-left)`}
          stroke={colors.dark}
          strokeWidth="3"
          strokeOpacity="0.72"
        />

        {/* LEFT LOWER WING */}
        <path
          d="M113 102
             C83 104 39 103 28 125
             C18 146 42 167 67 166
             C87 165 105 139 117 113 Z"
          fill={`url(#wing-${tint}-${delay}-left)`}
          stroke={colors.dark}
          strokeWidth="3"
          strokeOpacity="0.72"
        />

        {/* RIGHT UPPER WING */}
        <path
          d="M125 92
             C149 69 179 24 212 30
             C236 35 235 73 216 91
             C197 109 164 111 127 103 Z"
          fill={`url(#wing-${tint}-${delay}-right)`}
          stroke={colors.dark}
          strokeWidth="3"
          strokeOpacity="0.72"
        />

        {/* RIGHT LOWER WING */}
        <path
          d="M127 102
             C157 104 201 103 212 125
             C222 146 198 167 173 166
             C153 165 135 139 123 113 Z"
          fill={`url(#wing-${tint}-${delay}-right)`}
          stroke={colors.dark}
          strokeWidth="3"
          strokeOpacity="0.72"
        />

        {/* WING VEINS */}
        <g
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M112 97 C81 76 53 55 28 43" />
          <path d="M110 100 C76 92 48 82 23 67" />
          <path d="M109 104 C77 106 51 106 27 94" />
          <path d="M116 108 C91 124 73 142 60 158" />

          <path d="M128 97 C159 76 187 55 212 43" />
          <path d="M130 100 C164 92 192 82 217 67" />
          <path d="M131 104 C163 106 189 106 213 94" />
          <path d="M124 108 C149 124 167 142 180 158" />
        </g>

        {/* WING DETAILS */}
        <g fill="#ffffff" opacity="0.7">
          <circle cx="48" cy="54" r="4" />
          <circle cx="63" cy="72" r="2.8" />
          <circle cx="43" cy="88" r="3" />
          <circle cx="192" cy="54" r="4" />
          <circle cx="177" cy="72" r="2.8" />
          <circle cx="197" cy="88" r="3" />
        </g>

        {/* SOFT LIGHT */}
        <ellipse
          cx="72"
          cy="60"
          rx="34"
          ry="28"
          fill={`url(#shine-${tint}-${delay})`}
        />

        <ellipse
          cx="168"
          cy="60"
          rx="34"
          ry="28"
          fill={`url(#shine-${tint}-${delay})`}
        />

        {/* BODY */}
        <ellipse
          cx="120"
          cy="105"
          rx="8"
          ry="39"
          fill="#4b2437"
        />

        <ellipse
          cx="120"
          cy="101"
          rx="4"
          ry="28"
          fill="#8b5b6d"
        />

        {/* HEAD */}
        <circle
          cx="120"
          cy="67"
          r="8"
          fill="#3f2632"
        />

        {/* ANTENNAE */}
        <path
          d="M116 70 C102 52 91 48 83 48"
          fill="none"
          stroke="#4b2437"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M124 70 C138 52 149 48 157 48"
          fill="none"
          stroke="#4b2437"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="82" cy="48" r="2.2" fill="#4b2437" />
        <circle cx="158" cy="48" r="2.2" fill="#4b2437" />
      </motion.svg>
    </motion.div>
  );
}

/* -------------------------------------------------------
   MEMORY SCREEN
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
    <div
      className="relative left-1/2 -translate-x-1/2 -my-8 w-screen min-h-[100svh] overflow-hidden flex flex-col items-center"
      style={{
        background: `
          radial-gradient(circle at 50% 28%, rgba(255,255,255,0.98) 0%, rgba(255,246,251,0.96) 22%, rgba(253,228,241,0.98) 53%, rgba(247,210,231,1) 100%)
        `,
      }}
    >
      {/* -------------------------------------------------
          BACKGROUND GLOW
      ------------------------------------------------- */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[24%] -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,190,220,0.2), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 8% 18%, white 0 2px, transparent 3px),
              radial-gradient(circle at 84% 15%, white 0 2px, transparent 3px),
              radial-gradient(circle at 22% 67%, white 0 1.5px, transparent 3px),
              radial-gradient(circle at 90% 71%, white 0 2px, transparent 3px),
              radial-gradient(circle at 50% 82%, white 0 1.5px, transparent 3px)
            `,
            backgroundSize: "190px 220px",
          }}
        />
      </div>

      {/* -------------------------------------------------
          FLOATING SPARKLES
      ------------------------------------------------- */}

      {[
        ["left-[8%]", "top-[18%]", 14, 0],
        ["left-[86%]", "top-[24%]", 18, 1],
        ["left-[12%]", "top-[65%]", 13, 1.4],
        ["left-[88%]", "top-[67%]", 15, 0.8],
        ["left-[6%]", "top-[84%]", 11, 1.9],
        ["left-[91%]", "top-[86%]", 12, 0.5],
      ].map(([left, top, size, delay], index) => (
        <motion.div
          key={index}
          className={`absolute ${left} ${top} pointer-events-none z-10`}
          animate={{
            scale: [0.6, 1.15, 0.6],
            rotate: [0, 90, 180],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={size}
            className="text-white"
            strokeWidth={1.5}
          />
        </motion.div>
      ))}

      {/* -------------------------------------------------
          BUTTERFLIES — FULL SCREEN
      ------------------------------------------------- */}

      {/* Big left butterfly */}
      <RealisticButterfly
        size={150}
        duration={10}
        delay={0}
        tint="pink"
        className="z-10"
        style={{
          left: "-8px",
          top: "22%",
        }}
      />

      {/* Upper right */}
      <RealisticButterfly
        size={78}
        duration={11}
        delay={1}
        tint="purple"
        className="z-10"
        style={{
          right: "6%",
          top: "24%",
        }}
      />

      {/* Right middle */}
      <RealisticButterfly
        size={105}
        duration={13}
        delay={2}
        tint="pink"
        className="z-40"
        style={{
          right: "-10px",
          top: "48%",
        }}
      />

      {/* Bottom right big */}
      <RealisticButterfly
        size={130}
        duration={14}
        delay={0.8}
        tint="purple"
        className="z-10"
        style={{
          right: "-24px",
          top: "72%",
        }}
      />

      {/* Bottom left small */}
      <RealisticButterfly
        size={65}
        duration={9}
        delay={2.5}
        tint="pink"
        className="z-10"
        style={{
          left: "7%",
          top: "72%",
        }}
      />

      {/* Tiny top butterfly */}
      <RealisticButterfly
        size={48}
        duration={8}
        delay={1.8}
        tint="blue"
        className="z-10"
        style={{
          right: "18%",
          top: "12%",
        }}
      />

      {/* -------------------------------------------------
          DECORATIVE FLOWER BRANCHES
      ------------------------------------------------- */}

      <motion.div
        className="absolute -left-5 bottom-[13%] rotate-[-12deg] opacity-70 pointer-events-none z-10"
        animate={{
          rotate: [-12, -8, -12],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-28 h-40">
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-pink-300/70 rotate-[12deg]" />

          <Flower2
            className="absolute left-1 top-7 text-pink-300"
            size={32}
          />

          <Flower2
            className="absolute left-12 top-20 text-pink-200"
            size={25}
          />

          <Flower2
            className="absolute left-0 top-28 text-pink-300"
            size={21}
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-5 top-[68%] rotate-[18deg] opacity-50 pointer-events-none z-10"
        animate={{
          rotate: [18, 14, 18],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Flower2 size={62} className="text-pink-300" />
      </motion.div>

      {/* -------------------------------------------------
          HEADER
      ------------------------------------------------- */}

      <motion.div
        className="relative z-30 text-center pt-16 md:pt-20"
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
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            animate={{
              rotate: [-4, 4, -4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={25}
              strokeWidth={2.5}
              className="text-pink-500"
            />
          </motion.div>

          <h2
            className="text-[34px] sm:text-[42px] md:text-5xl font-extrabold tracking-tight"
            style={{
              color: "#25304a",
              textShadow:
                "0 3px 0 rgba(255,255,255,0.7), 0 8px 25px rgba(236,72,153,0.12)",
            }}
          >
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [4, -4, 4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={25}
              strokeWidth={2.5}
              className="text-pink-500"
            />
          </motion.div>
        </div>

        <motion.p
          className="font-hand text-[21px] sm:text-2xl md:text-3xl mt-2"
          style={{
            color: "#a855f7",
            textShadow: "0 2px 15px rgba(168,85,247,0.15)",
          }}
          animate={{
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          Little moments, forever ours ♡
        </motion.p>
      </motion.div>

      {/* -------------------------------------------------
          DOTS
      ------------------------------------------------- */}

      <motion.div
        className="relative z-30 flex items-center justify-center gap-4 mt-7"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
          duration: 0.6,
        }}
      >
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className="rounded-full"
            style={{
              width: index === currentIndex ? 18 : 13,
              height: index === currentIndex ? 18 : 13,
              background:
                index === currentIndex
                  ? "#ec4899"
                  : "#f9a8d4",
              boxShadow:
                index === currentIndex
                  ? "0 0 18px rgba(236,72,153,0.45)"
                  : "none",
            }}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.12, 1],
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
      </motion.div>

      {/* -------------------------------------------------
          LUXURY ALBUM
      ------------------------------------------------- */}

      <div className="relative z-30 flex items-center justify-center mt-8 sm:mt-9">
        <div
          className="
            relative
            w-[min(84vw,520px)]
            h-[clamp(500px,46vh,650px)]
          "
        >
          {/* Pink aura */}
          <motion.div
            className="absolute -inset-10 rounded-[55px] blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(236,72,153,0.22), rgba(244,114,182,0.1), transparent 70%)",
            }}
            animate={{
              opacity: [0.55, 0.9, 0.55],
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* BACK PAPER */}
          <motion.div
            className="absolute inset-[8px] rounded-[32px] border border-white/80"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,.8), rgba(251,207,232,.75))",
              boxShadow:
                "0 25px 70px rgba(190,90,145,.18)",
            }}
            animate={{
              rotate: [-3, -2, -3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* SECOND PAPER */}
          <motion.div
            className="absolute inset-[2px] rounded-[32px] border border-white/90"
            style={{
              background:
                "linear-gradient(150deg, rgba(255,255,255,.95), rgba(255,240,247,.9))",
              boxShadow:
                "0 22px 60px rgba(168,85,247,.10)",
            }}
            animate={{
              rotate: [2, 1, 2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* RIBBON LEFT */}
          <motion.div
            className="absolute left-[-45px] top-[45%] w-[105px] h-[28px] rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(244,114,182,.7), rgba(251,207,232,.9))",
              boxShadow:
                "0 8px 20px rgba(236,72,153,.15)",
              transform: "rotate(-25deg)",
            }}
            animate={{
              x: [-2, 3, -2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* RIBBON RIGHT */}
          <motion.div
            className="absolute right-[-45px] top-[48%] w-[110px] h-[28px] rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(251,207,232,.9), rgba(244,114,182,.7), transparent)",
              boxShadow:
                "0 8px 20px rgba(236,72,153,.15)",
              transform: "rotate(25deg)",
            }}
            animate={{
              x: [2, -3, 2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          {/* MAIN POLAROID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto}
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
              onClick={nextPhoto}
              className="
                absolute
                inset-0
                cursor-pointer
                rounded-[32px]
                bg-[#fffdfd]
                border border-white
                p-[17px]
                pb-[72px]
              "
              style={{
                boxShadow:
                  "0 25px 65px rgba(70,45,70,.20), 0 5px 20px rgba(236,72,153,.10), inset 0 0 0 1px rgba(236,72,153,.08)",
              }}
              whileHover={{
                y: -5,
                scale: 1.008,
              }}
              whileTap={{
                scale: 0.985,
              }}
            >
              {/* TOP TAPE */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 -top-[1px] z-40 w-[112px] h-[38px] rounded-sm flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(249,168,212,.96), rgba(244,114,182,.82))",
                  boxShadow:
                    "0 5px 15px rgba(236,72,153,.15)",
                }}
                animate={{
                  rotate: [-2, 1, -2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
              >
                <Heart
                  size={20}
                  fill="currentColor"
                  className="text-pink-500"
                />
              </motion.div>

              {/* PHOTO */}
              <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-100">
                <img
                  src={currentPhoto}
                  alt={`Memory ${currentIndex + 1}`}
                  draggable="false"
                  className="
                    w-full
                    h-full
                    object-cover
                    select-none
                    pointer-events-none
                  "
                />

                {/* soft photo overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,.10), transparent 40%, rgba(236,72,153,.08))",
                  }}
                />

                {/* photo shine */}
                <motion.div
                  className="absolute top-0 bottom-0 -left-[40%] w-[30%] skew-x-[-18deg] bg-white/20 pointer-events-none"
                  animate={{
                    left: ["-40%", "140%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />

                {/* HEART ON PHOTO */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Heart
                    size={24}
                    fill="white"
                    strokeWidth={0}
                    className="text-white drop-shadow-md"
                  />
                </motion.div>
              </div>

              {/* POLAROID CAPTION */}
              <div className="absolute bottom-[19px] left-0 right-0 flex justify-center">
                <span
                  className="font-hand text-[18px]"
                  style={{
                    color: "#64748b",
                  }}
                >
                  a little piece of us ♡
                </span>
              </div>

              {/* HEART STICKER */}
              <motion.div
                className="absolute right-4 bottom-4"
                animate={{
                  y: [0, -4, 0],
                  rotate: [-4, 4, -4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <Heart
                  size={30}
                  fill="#ec4899"
                  className="text-pink-500 drop-shadow-sm"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* FLOWERS ON ALBUM */}
          <div className="absolute left-[-12px] bottom-[18px] z-50 pointer-events-none">
            <motion.div
              animate={{
                rotate: [-3, 3, -3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Flower2
                size={55}
                strokeWidth={1.4}
                className="text-pink-400 drop-shadow-md"
              />
            </motion.div>

            <Flower2
              size={32}
              strokeWidth={1.5}
              className="absolute left-9 top-8 text-pink-300"
            />

            <Flower2
              size={25}
              strokeWidth={1.5}
              className="absolute left-[-10px] top-10 text-purple-300"
            />
          </div>

          {/* RIGHT SPARKLE */}
          <motion.div
            className="absolute right-[-17px] top-[34%] z-50 pointer-events-none"
            animate={{
              rotate: [0, 90, 180],
              scale: [0.8, 1.15, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <Stars
              size={30}
              className="text-white drop-shadow-md"
            />
          </motion.div>

          {/* NEXT ARROW */}
          <motion.button
            type="button"
            onClick={nextPhoto}
            className="
              absolute
              right-[-23px]
              top-1/2
              -translate-y-1/2
              z-[60]
              w-12
              h-12
              rounded-full
              bg-white/95
              backdrop-blur-md
              border
              border-pink-100
              shadow-[0_10px_30px_rgba(236,72,153,.16)]
              flex
              items-center
              justify-center
            "
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          >
            <ChevronRight
              size={23}
              className="text-pink-500"
            />
          </motion.button>
        </div>
      </div>

      {/* -------------------------------------------------
          COUNTER
      ------------------------------------------------- */}

      <motion.div
        className="relative z-40 flex items-center gap-6 mt-5"
        key={currentIndex}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <span className="w-14 h-[2px] bg-pink-300 rounded-full" />

        <span
          className="font-hand text-2xl sm:text-3xl tracking-[0.18em] font-semibold"
          style={{
            color: "#a855f7",
          }}
        >
          {currentIndex + 1} / {memories.length}
        </span>

        <span className="w-14 h-[2px] bg-pink-300 rounded-full" />
      </motion.div>

      {/* -------------------------------------------------
          BUTTON
      ------------------------------------------------- */}

      <motion.div
        className="relative z-50 mt-6 mb-8"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.7,
          duration: 0.7,
        }}
      >
        <div className="relative">
          {/* button glow */}
          <motion.div
            className="absolute inset-0 rounded-full blur-xl bg-pink-400/30"
            animate={{
              scale: [0.92, 1.08, 0.92],
              opacity: [0.4, 0.75, 0.4],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
            }}
          />

          <Button
            onClick={onNext}
            text="A Letter For You"
            animateIcon={false}
            icon={<Mail size={19} />}
          />
        </div>
      </motion.div>

      {/* -------------------------------------------------
          WATERMARK
      ------------------------------------------------- */}

      <motion.div
        className="fixed bottom-3 right-4 z-[80] text-sm font-thin text-slate-500/55 tracking-wide pointer-events-none"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
      >
        rafee🫶protiva
      </motion.div>
    </div>
  );
}

export default MemoriesScreen;
