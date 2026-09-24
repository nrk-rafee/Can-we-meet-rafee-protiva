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
  size = 90,
  flip = false,
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-20 ${className}`}
      style={{
        width: size,
        height: size,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      animate={{
        y: [0, -16, -4, -20, 0],
        x: [0, 10, -5, 12, 0],
        rotate: [-3, 4, -2, 5, -3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.svg
        viewBox="0 0 180 160"
        className="w-full h-full overflow-visible"
        animate={{
          scaleY: [1, 0.82, 1, 0.78, 1],
        }}
        transition={{
          duration: 0.75,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="wingPink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffd7ee" />
            <stop offset="35%" stopColor="#f59ac8" />
            <stop offset="70%" stopColor="#d85c9b" />
            <stop offset="100%" stopColor="#7d356e" />
          </linearGradient>

          <linearGradient id="wingLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff4fb" />
            <stop offset="50%" stopColor="#f7afd6" />
            <stop offset="100%" stopColor="#c65a9c" />
          </linearGradient>

          <radialGradient id="wingGlow">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <filter id="butterflyShadow">
            <feDropShadow
              dx="0"
              dy="5"
              stdDeviation="4"
              floodColor="#8f4b83"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* left upper wing */}
        <path
          d="M86 72
             C67 31 36 10 15 27
             C-2 42 12 73 35 85
             C52 94 71 88 86 78 Z"
          fill="url(#wingPink)"
          stroke="#9b4c86"
          strokeWidth="2"
          filter="url(#butterflyShadow)"
        />

        {/* right upper wing */}
        <path
          d="M94 72
             C113 31 144 10 165 27
             C182 42 168 73 145 85
             C128 94 109 88 94 78 Z"
          fill="url(#wingPink)"
          stroke="#9b4c86"
          strokeWidth="2"
          filter="url(#butterflyShadow)"
        />

        {/* left lower wing */}
        <path
          d="M84 82
             C59 88 34 103 38 126
             C41 145 63 137 78 119
             C87 108 91 94 84 82 Z"
          fill="url(#wingLight)"
          stroke="#a24e88"
          strokeWidth="2"
        />

        {/* right lower wing */}
        <path
          d="M96 82
             C121 88 146 103 142 126
             C139 145 117 137 102 119
             C93 108 89 94 96 82 Z"
          fill="url(#wingLight)"
          stroke="#a24e88"
          strokeWidth="2"
        />

        {/* wing veins */}
        <g
          fill="none"
          stroke="#a64b89"
          strokeWidth="1.5"
          opacity="0.65"
        >
          <path d="M82 72 C60 58 42 42 20 35" />
          <path d="M82 75 C57 69 38 61 16 55" />
          <path d="M80 79 C58 79 39 76 25 72" />

          <path d="M98 72 C120 58 138 42 160 35" />
          <path d="M98 75 C123 69 142 61 164 55" />
          <path d="M100 79 C122 79 141 76 155 72" />

          <path d="M82 88 C66 100 57 112 51 128" />
          <path d="M98 88 C114 100 123 112 129 128" />
        </g>

        {/* wing spots */}
        <g fill="#fff" opacity="0.72">
          <circle cx="32" cy="45" r="4" />
          <circle cx="47" cy="54" r="3" />
          <circle cx="61" cy="65" r="2.5" />
          <circle cx="148" cy="45" r="4" />
          <circle cx="133" cy="54" r="3" />
          <circle cx="119" cy="65" r="2.5" />
        </g>

        {/* glow */}
        <ellipse
          cx="90"
          cy="75"
          rx="38"
          ry="45"
          fill="url(#wingGlow)"
          opacity="0.5"
        />

        {/* body */}
        <ellipse
          cx="90"
          cy="82"
          rx="5"
          ry="25"
          fill="#513348"
        />

        <circle cx="90" cy="55" r="6" fill="#432b3d" />

        {/* antenna */}
        <path
          d="M88 57 C80 43 72 39 65 35"
          fill="none"
          stroke="#513348"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M92 57 C100 43 108 39 115 35"
          fill="none"
          stroke="#513348"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="65" cy="35" r="2" fill="#513348" />
        <circle cx="115" cy="35" r="2" fill="#513348" />
      </motion.svg>
    </motion.div>
  );
}

/* -------------------------------------------------------
   FLOWER DECORATION
------------------------------------------------------- */

function FlowerCluster({ className = "" }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-10 ${className}`}
      animate={{
        rotate: [-1, 1, -1],
        y: [0, -3, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative w-32 h-32">
        <div className="absolute left-12 top-5 w-10 h-10 rounded-full bg-pink-300/80 blur-[1px]">
          <div className="absolute inset-0">
            <span className="absolute w-7 h-7 rounded-full bg-pink-200 -top-3 left-1" />
            <span className="absolute w-7 h-7 rounded-full bg-pink-300 top-1 -left-4" />
            <span className="absolute w-7 h-7 rounded-full bg-pink-200 top-1 right-[-14px]" />
            <span className="absolute w-7 h-7 rounded-full bg-pink-300 bottom-[-13px] left-1" />
            <span className="absolute w-7 h-7 rounded-full bg-pink-100 top-[-12px] right-[-2px]" />
            <span className="absolute w-5 h-5 rounded-full bg-yellow-300 top-2 left-2" />
          </div>
        </div>

        <div className="absolute left-2 top-11 w-6 h-12 bg-green-400/70 rounded-full rotate-[-35deg]" />
        <div className="absolute left-24 top-12 w-5 h-12 bg-green-500/60 rounded-full rotate-[40deg]" />

        <div className="absolute left-16 top-0 w-[2px] h-28 bg-green-500/60 rotate-[8deg]" />

        <div className="absolute left-2 top-20 w-7 h-7 rounded-full bg-white shadow-sm">
          <div className="absolute inset-1 rounded-full bg-pink-200" />
        </div>

        <div className="absolute left-24 top-20 w-5 h-5 rounded-full bg-white shadow-sm">
          <div className="absolute inset-1 rounded-full bg-pink-200" />
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   FLOATING PETALS
------------------------------------------------------- */

const petals = [
  { left: "5%", top: "20%", size: 9, delay: 0, duration: 8 },
  { left: "13%", top: "65%", size: 7, delay: 2, duration: 9 },
  { left: "87%", top: "19%", size: 8, delay: 1, duration: 7 },
  { left: "92%", top: "58%", size: 10, delay: 3, duration: 10 },
  { left: "18%", top: "38%", size: 6, delay: 4, duration: 8 },
  { left: "82%", top: "38%", size: 6, delay: 2, duration: 9 },
  { left: "8%", top: "82%", size: 8, delay: 1, duration: 8 },
  { left: "91%", top: "83%", size: 7, delay: 4, duration: 9 },
];

function Petal({ left, top, size, delay, duration }) {
  return (
    <motion.span
      className="absolute rounded-[100%_0_100%_0] bg-pink-300/45 blur-[0.2px] pointer-events-none z-0"
      style={{
        left,
        top,
        width: size,
        height: size * 1.6,
      }}
      animate={{
        y: [0, 30, 5, 45, 0],
        x: [0, 12, -10, 8, 0],
        rotate: [0, 80, 170, 260, 360],
        opacity: [0.25, 0.65, 0.3, 0.55, 0.25],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

/* -------------------------------------------------------
   MAIN SCREEN
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
    <div className="relative left-1/2 -translate-x-1/2 w-screen h-[100dvh] min-h-[680px] overflow-hidden bg-[#fce5ef]">

      {/* =================================================
          DREAMY BACKGROUND
      ================================================= */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#fff7fb_0%,#fbddea_42%,#f6d1e2_72%,#efc4d9_100%)]" />

      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at 20% 25%, rgba(255,255,255,.8), transparent 25%), radial-gradient(circle at 85% 60%, rgba(255,255,255,.65), transparent 28%)",
        }}
      />

      {/* soft center glow */}
      <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2 w-[430px] h-[500px] rounded-full bg-white/30 blur-3xl pointer-events-none" />

      {/* =================================================
          BOKEH LIGHTS
      ================================================= */}

      {[
        ["8%", "12%", 18],
        ["20%", "10%", 10],
        ["76%", "13%", 14],
        ["91%", "29%", 9],
        ["7%", "52%", 11],
        ["93%", "49%", 17],
        ["12%", "88%", 13],
        ["84%", "88%", 12],
      ].map(([left, top, size], i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/65 blur-sm pointer-events-none"
          style={{
            left,
            top,
            width: size,
            height: size,
          }}
          animate={{
            scale: [0.7, 1.35, 0.7],
            opacity: [0.25, 0.8, 0.25],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* =================================================
          PETALS
      ================================================= */}

      {petals.map((petal, index) => (
        <Petal key={index} {...petal} />
      ))}

      {/* =================================================
          BUTTERFLIES
      ================================================= */}

      <Butterfly
        className="left-[1%] top-[13%]"
        size={105}
      />

      <Butterfly
        className="right-[1%] top-[22%]"
        size={88}
        flip
      />

      <Butterfly
        className="left-[2%] bottom-[22%]"
        size={82}
        flip
      />

      <Butterfly
        className="right-[-1%] bottom-[17%]"
        size={112}
      />

      {/* small distant butterfly */}
      <Butterfly
        className="right-[24%] top-[15%] opacity-70"
        size={48}
        flip
      />

      {/* =================================================
          DECORATIVE FLOWERS
      ================================================= */}

      <FlowerCluster className="left-[-18px] bottom-[-5px] scale-[0.95]" />

      <FlowerCluster className="right-[-20px] bottom-[-5px] scale-[0.85] rotate-[12deg]" />

      <FlowerCluster className="left-[-30px] top-[37%] scale-[0.6] opacity-70" />

      {/* =================================================
          HEADER
      ================================================= */}

      <motion.div
        className="absolute top-[7%] left-1/2 -translate-x-1/2 w-full px-5 text-center z-30"
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
              rotate: [-7, 7, -7],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={25}
              strokeWidth={2.2}
              className="text-pink-500"
            />
          </motion.div>

          <h2 className="text-[34px] sm:text-5xl font-black tracking-[-0.04em] text-slate-700 drop-shadow-sm">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [7, -7, 7],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={25}
              strokeWidth={2.2}
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
            duration: 3,
            repeat: Infinity,
          }}
        >
          Little moments, forever ours ♡
        </motion.p>
      </motion.div>

      {/* =================================================
          PHOTO DOTS
      ================================================= */}

      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {memories.map((_, index) => (
          <motion.div
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-[15px] h-[15px] bg-pink-500"
                : "w-[11px] h-[11px] bg-pink-300"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.18, 1],
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

      {/* =================================================
          LUXURY ALBUM
      ================================================= */}

      <div className="absolute left-1/2 top-[25%] -translate-x-1/2 w-[370px] max-w-[91vw] h-[500px] z-20">

        {/* outer glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[445px] rounded-[32px] bg-pink-300/35 blur-2xl"
          animate={{
            scale: [0.98, 1.04, 0.98],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* back album */}
        <motion.div
          className="absolute left-1/2 top-[25px] -translate-x-1/2 w-[335px] h-[435px] rounded-[25px] bg-[#fff9fc] border border-pink-200 shadow-[0_20px_50px_rgba(120,55,100,0.12)]"
          animate={{
            rotate: [-2, -1, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        {/* second back album */}
        <motion.div
          className="absolute left-1/2 top-[17px] -translate-x-1/2 w-[345px] h-[440px] rounded-[25px] bg-[#fffdfd] border border-pink-100 shadow-[0_20px_50px_rgba(120,55,100,0.1)]"
          animate={{
            rotate: [1, 2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
        />

        {/* ribbon behind */}
        <div className="absolute left-[-10px] top-[115px] w-[70px] h-[260px] border-l-[9px] border-pink-300/60 rounded-l-full rotate-[5deg] opacity-70" />

        <div className="absolute right-[-10px] top-[145px] w-[70px] h-[230px] border-r-[9px] border-pink-300/60 rounded-r-full rotate-[-4deg] opacity-70" />

        {/* Main polaroid */}
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
            className="absolute left-1/2 top-[10px] -translate-x-1/2 w-[325px] h-[425px] bg-[#fffdfd] rounded-[22px] p-[10px] pb-[48px] border border-pink-100 shadow-[0_25px_60px_rgba(95,42,78,0.22)] cursor-pointer"
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >

            {/* luxury inner border */}
            <div className="absolute inset-[6px] rounded-[18px] border border-pink-100 pointer-events-none z-20" />

            {/* photo */}
            <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-slate-100">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable="false"
              />

              {/* soft photo overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 via-transparent to-white/10 pointer-events-none" />

              {/* glossy shine */}
              <motion.div
                className="absolute top-0 -left-[50%] w-[35%] h-full bg-white/20 skew-x-[-20deg] pointer-events-none"
                animate={{
                  left: ["-50%", "135%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* tape */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -top-[11px] w-[82px] h-[28px] bg-pink-200/90 rotate-[-2deg] shadow-sm z-30"
              animate={{
                rotate: [-2, 1, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_6px,#fff_7px,transparent_8px)]" />
              <Heart
                size={14}
                fill="currentColor"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500"
              />
            </motion.div>

            {/* polaroid caption */}
            <div className="absolute bottom-[9px] left-0 right-0 text-center">
              <span className="font-hand italic text-[17px] text-slate-500">
                a little piece of us ♡
              </span>
            </div>

            {/* corner heart */}
            <motion.div
              className="absolute right-5 bottom-3 text-pink-400"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              <Heart
                size={16}
                fill="currentColor"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* flower decoration over album */}
        <FlowerCluster className="left-[-22px] top-[20px] scale-[0.78]" />

        <FlowerCluster className="right-[-25px] bottom-[42px] scale-[0.68] rotate-[15deg]" />

        {/* sparkle around album */}
        <motion.div
          className="absolute left-[2px] top-[180px]"
          animate={{
            scale: [0.6, 1.2, 0.6],
            rotate: [0, 90, 180],
            opacity: [0.25, 1, 0.25],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          <Sparkles
            size={22}
            className="text-white"
          />
        </motion.div>

        <motion.div
          className="absolute right-[0px] top-[100px]"
          animate={{
            scale: [0.6, 1.2, 0.6],
            rotate: [0, -90, -180],
            opacity: [0.25, 1, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <Star
            size={18}
            className="text-white"
            fill="currentColor"
          />
        </motion.div>
      </div>

      {/* =================================================
          COUNTER
      ================================================= */}

      <motion.div
        className="absolute top-[79%] left-1/2 -translate-x-1/2 z-30 flex items-center gap-4"
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
        <span className="w-12 h-[2px] bg-pink-300 rounded-full" />

        <span className="text-[19px] tracking-[0.18em] font-semibold text-purple-500">
          {String(currentIndex + 1).padStart(2, "0")}
          {" "}
          /
          {" "}
          {String(memories.length).padStart(2, "0")}
        </span>

        <span className="w-12 h-[2px] bg-pink-300 rounded-full" />
      </motion.div>

      {/* =================================================
          NEXT INDICATOR
      ================================================= */}

      <motion.div
        className="absolute right-[7%] top-[54%] z-30 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm border border-pink-100 shadow-md flex items-center justify-center"
        animate={{
          x: [0, 4, 0],
          opacity: [0.45, 1, 0.45],
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
      </motion.div>

      {/* =================================================
          LETTER BUTTON
      ================================================= */}

      <motion.div
        className="absolute bottom-[7%] left-1/2 -translate-x-1/2 z-40"
        initial={{
          opacity: 0,
          y: 20,
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
        {/* glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-pink-400/35 blur-xl"
          animate={{
            scale: [0.9, 1.12, 0.9],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        />

        <Button
          onClick={onNext}
          text="A Letter For You"
          animateIcon={false}
          icon={<Mail size={19} />}
        />
      </motion.div>

      {/* little hearts around button */}
      <motion.div
        className="absolute bottom-[8.3%] left-[27%] z-30 text-pink-400"
        animate={{
          y: [0, -7, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
      >
        <Heart
          size={21}
          fill="currentColor"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[8.3%] right-[27%] z-30 text-pink-400"
        animate={{
          y: [0, -7, 0],
          rotate: [8, -8, 8],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
        }}
      >
        <Heart
          size={17}
          fill="currentColor"
        />
      </motion.div>

    </div>
  );
}

export default MemoriesScreen;
