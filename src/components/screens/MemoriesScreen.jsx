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
  Gem,
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
   BUTTERFLIES
========================================================= */

const butterflies = [
  {
    left: "-4%",
    top: "23%",
    width: 72,
    duration: 17,
    delay: 0,
    rotate: -15,
    x: ["0vw", "12vw", "22vw", "10vw", "0vw"],
    y: ["0vh", "-8vh", "5vh", "-11vh", "0vh"],
    scale: [0.72, 1, 0.82, 1.04, 0.72],
    opacity: [0.45, 0.9, 0.6, 0.95, 0.45],
  },
  {
    left: "82%",
    top: "20%",
    width: 62,
    duration: 19,
    delay: 2,
    rotate: 15,
    x: ["0vw", "-12vw", "-24vw", "-10vw", "0vw"],
    y: ["0vh", "9vh", "-5vh", "10vh", "0vh"],
    scale: [0.65, 0.9, 0.74, 0.96, 0.65],
    opacity: [0.4, 0.82, 0.55, 0.88, 0.4],
  },
  {
    left: "86%",
    top: "49%",
    width: 78,
    duration: 21,
    delay: 1,
    rotate: -18,
    x: ["0vw", "-10vw", "-21vw", "-8vw", "0vw"],
    y: ["0vh", "-10vh", "7vh", "-8vh", "0vh"],
    scale: [0.65, 0.88, 0.72, 0.98, 0.65],
    opacity: [0.35, 0.78, 0.48, 0.82, 0.35],
  },
  {
    left: "0%",
    top: "58%",
    width: 50,
    duration: 16,
    delay: 4,
    rotate: 12,
    x: ["0vw", "13vw", "25vw", "15vw", "0vw"],
    y: ["0vh", "8vh", "-6vh", "6vh", "0vh"],
    scale: [0.58, 0.82, 0.64, 0.86, 0.58],
    opacity: [0.3, 0.7, 0.42, 0.72, 0.3],
  },
  {
    left: "42%",
    top: "74%",
    width: 42,
    duration: 14,
    delay: 5,
    rotate: -8,
    x: ["0vw", "-9vw", "8vw", "-4vw", "0vw"],
    y: ["0vh", "-10vh", "-18vh", "-7vh", "0vh"],
    scale: [0.5, 0.75, 0.58, 0.78, 0.5],
    opacity: [0.28, 0.58, 0.36, 0.62, 0.28],
  },
  {
    left: "68%",
    top: "34%",
    width: 38,
    duration: 13,
    delay: 3,
    rotate: 20,
    x: ["0vw", "-8vw", "-15vw", "-5vw", "0vw"],
    y: ["0vh", "-6vh", "7vh", "-5vh", "0vh"],
    scale: [0.5, 0.72, 0.56, 0.76, 0.5],
    opacity: [0.25, 0.55, 0.32, 0.6, 0.25],
  },
];

/* =========================================================
   SPARKLES
========================================================= */

const sparkles = [
  { left: "7%", top: "14%", size: 13, delay: 0 },
  { left: "91%", top: "17%", size: 11, delay: 1.2 },
  { left: "12%", top: "46%", size: 9, delay: 0.6 },
  { left: "92%", top: "67%", size: 12, delay: 2 },
  { left: "19%", top: "80%", size: 10, delay: 1.5 },
  { left: "79%", top: "83%", size: 9, delay: 2.5 },
  { left: "30%", top: "26%", size: 8, delay: 1.8 },
];

/* =========================================================
   FLOATING HEARTS
========================================================= */

const floatingHearts = [
  {
    left: "7%",
    top: "35%",
    size: 14,
    delay: 0,
    duration: 4.5,
  },
  {
    left: "91%",
    top: "39%",
    size: 13,
    delay: 1,
    duration: 4,
  },
  {
    left: "12%",
    top: "72%",
    size: 11,
    delay: 1.8,
    duration: 4.8,
  },
  {
    left: "87%",
    top: "78%",
    size: 12,
    delay: 0.6,
    duration: 4.2,
  },
];

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
    <div className="relative flex flex-col items-center w-full min-h-screen h-full overflow-visible bg-[#fff7f8]">

      {/* =========================================================
          DREAMY LUXURY BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

        {/* Main creamy pink background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,255,255,1)_0%,rgba(255,239,245,0.95)_28%,rgba(255,225,237,0.72)_58%,rgba(247,210,227,0.5)_100%)]" />

        {/* Large center glow */}
        <motion.div
          className="absolute left-1/2 top-[40%] -translate-x-1/2 w-[470px] h-[470px] rounded-full bg-pink-200/20 blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top white glow */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[560px] h-[320px] rounded-full bg-white/80 blur-3xl" />

        {/* Bottom purple glow */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[260px] rounded-full bg-purple-200/20 blur-3xl" />

        {/* Left pink glow */}
        <div className="absolute -left-32 top-[35%] w-72 h-72 rounded-full bg-pink-300/15 blur-3xl" />

        {/* Right purple glow */}
        <div className="absolute -right-32 top-[52%] w-72 h-72 rounded-full bg-purple-300/15 blur-3xl" />

        {/* Tiny luxury light spots */}
        <motion.div
          className="absolute left-[18%] top-[39%] w-3 h-3 rounded-full bg-white blur-[1px]"
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 0.9, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute right-[18%] top-[48%] w-2 h-2 rounded-full bg-white"
          animate={{
            scale: [0.5, 1.8, 0.5],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>

      {/* =========================================================
          BUTTERFLIES
      ========================================================= */}

      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">

        {butterflies.map((butterfly, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: butterfly.left,
              top: butterfly.top,
              width: butterfly.width,
              willChange: "transform, opacity",
              filter:
                "drop-shadow(0 5px 8px rgba(180,100,180,0.18))",
            }}
            initial={{
              x: 0,
              y: 0,
              rotate: butterfly.rotate,
              scale: butterfly.scale[0],
              opacity: butterfly.opacity[0],
            }}
            animate={{
              x: butterfly.x,
              y: butterfly.y,
              rotate: [
                butterfly.rotate,
                butterfly.rotate + 8,
                butterfly.rotate - 6,
                butterfly.rotate + 5,
                butterfly.rotate,
              ],
              scale: butterfly.scale,
              opacity: butterfly.opacity,
            }}
            transition={{
              duration: butterfly.duration,
              delay: butterfly.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.img
              src="/images/butterfly-2.webp"
              alt=""
              aria-hidden="true"
              draggable="false"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain select-none"
              animate={{
                rotateY: [0, 25, -18, 22, 0],
                rotateZ: [0, 2, -2, 1, 0],
              }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          SPARKLES + HEARTS
      ========================================================= */}

      <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">

        {sparkles.map((star, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              scale: [0.6, 1.2, 0.6],
              rotate: [0, 90, 180],
              opacity: [0.12, 0.85, 0.12],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          >
            <Sparkles
              size={star.size}
              className="text-white drop-shadow-[0_0_7px_rgba(255,255,255,1)]"
            />
          </motion.div>
        ))}

        {floatingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: heart.left,
              top: heart.top,
            }}
            animate={{
              y: [0, -12, 0],
              x: [0, index % 2 === 0 ? 4 : -4, 0],
              opacity: [0.2, 0.75, 0.2],
              rotate: [-8, 8, -8],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "easeInOut",
            }}
          >
            <Heart
              size={heart.size}
              fill="currentColor"
              className="text-pink-300/70"
            />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          HEADER
      ========================================================= */}

      <motion.div
        className="text-center z-20 mt-3 md:mt-5"
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
          ease: "easeOut",
        }}
      >

        <div className="flex items-center justify-center gap-3">

          <motion.div
            animate={{
              rotate: [-8, 8, -8],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera
              size={18}
              className="text-pink-400"
            />
          </motion.div>

          <h2 className="text-[31px] md:text-5xl font-bold tracking-tight text-slate-700">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [8, -8, 8],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera
              size={18}
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
            duration: 2.8,
            repeat: Infinity,
          }}
        >
          Little moments, forever ours ♡
        </motion.p>

        {/* Luxury divider */}
        <div className="flex items-center justify-center gap-2 mt-3">

          <Flower2
            size={12}
            className="text-pink-300"
          />

          <div className="w-14 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

          <Gem
            size={11}
            className="text-amber-300"
          />

          <div className="w-14 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

          <Flower2
            size={12}
            className="text-pink-300"
          />

        </div>
      </motion.div>

      {/* =========================================================
          DOT INDICATOR
      ========================================================= */}

      <motion.div
        className="flex items-center justify-center gap-3 mt-4 z-20"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.35,
        }}
      >
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-3.5 h-3.5 bg-pink-500 shadow-[0_0_14px_rgba(236,72,153,0.45)]"
                : "w-2.5 h-2.5 bg-pink-200"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.2, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* =========================================================
          LUXURY ALBUM AREA
      ========================================================= */}

      <div className="relative w-full max-w-[460px] h-[455px] md:h-[485px] mt-1 z-20 flex items-center justify-center">

        {/* =====================================================
            GLOW BEHIND ALBUM
        ===================================================== */}

        <motion.div
          className="absolute w-[350px] h-[390px] rounded-[40px] bg-pink-300/20 blur-3xl"
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.45, 0.65, 0.45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =====================================================
            GOLDEN OUTER FRAME
        ===================================================== */}

        <motion.div
          className="absolute w-[352px] h-[404px] md:w-[380px] md:h-[430px] rounded-[34px] border border-amber-300/50 bg-gradient-to-br from-white/45 via-pink-100/10 to-amber-100/20 backdrop-blur-[3px] shadow-[0_30px_80px_rgba(120,60,80,0.15)]"
          animate={{
            rotate: [0, 0.4, 0, -0.4, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner golden frame */}
        <div className="absolute w-[340px] h-[392px] md:w-[368px] md:h-[418px] rounded-[30px] border border-white/80 pointer-events-none" />

        {/* Pink luxury glass frame */}
        <motion.div
          className="absolute w-[328px] h-[380px] md:w-[356px] md:h-[404px] rounded-[28px] bg-white/20 border border-pink-200/60 shadow-inner"
          animate={{
            rotate: [-1.5, -1, -1.5, -2, -1.5],
            y: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =====================================================
            LIGHT TRAILS
        ===================================================== */}

        <motion.div
          className="absolute w-[355px] h-[110px] rounded-[50%] border-t border-white/80 rotate-[-16deg] pointer-events-none z-30"
          style={{
            boxShadow:
              "0 -3px 14px rgba(255,255,255,0.5)",
          }}
          animate={{
            opacity: [0.25, 0.8, 0.25],
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute w-[350px] h-[100px] rounded-[50%] border-b border-pink-200/60 rotate-[17deg] pointer-events-none z-30"
          animate={{
            opacity: [0.2, 0.65, 0.2],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        />

        {/* =====================================================
            BACK POLAROIDS
        ===================================================== */}

        <motion.div
          className="absolute w-[292px] h-[355px] md:w-[315px] md:h-[380px] bg-[#fffafa] rounded-[18px] shadow-[0_24px_55px_rgba(90,40,70,0.12)] border border-pink-100"
          animate={{
            rotate: [-5, -4, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* gold edge */}
          <div className="absolute inset-[5px] rounded-[14px] border border-amber-100/60" />
        </motion.div>

        <motion.div
          className="absolute w-[296px] h-[360px] md:w-[320px] md:h-[385px] bg-[#fffdfc] rounded-[18px] shadow-[0_24px_55px_rgba(90,40,70,0.14)] border border-white"
          animate={{
            rotate: [4, 3, 4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-[5px] rounded-[14px] border border-pink-100/60" />
        </motion.div>

        {/* =====================================================
            MAIN POLAROID
        ===================================================== */}

        <AnimatePresence mode="wait" custom={direction}>

          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 90 : -90,
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
              x: direction > 0 ? -90 : 90,
              rotate: direction > 0 ? -4 : 4,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute top-[29px] w-[290px] h-[354px] md:w-[312px] md:h-[380px] bg-gradient-to-br from-white via-[#fffafa] to-pink-50 rounded-[19px] p-3 pb-12 shadow-[0_30px_70px_rgba(70,30,60,0.22)] border border-white cursor-pointer z-20"
            onClick={nextPhoto}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* Gold inner frame */}
            <div className="absolute inset-[6px] rounded-[15px] border border-amber-100/60 pointer-events-none" />

            {/* Photo */}
            <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
                loading="eager"
                decoding="async"
              />

              {/* warm photo overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-transparent to-amber-100/15 pointer-events-none" />

              {/* Luxury shine */}
              <motion.div
                className="absolute inset-y-0 -left-1/2 w-1/4 bg-white/25 skew-x-[-20deg] pointer-events-none"
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

              {/* Tiny shine dot */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_white]"
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.7, 1.2, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Caption */}
            <div className="absolute bottom-2 left-0 right-0 text-center">

              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>

            </div>

            {/* Heart */}
            <motion.div
              className="absolute right-3 bottom-2"
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Heart
                size={17}
                fill="currentColor"
                className="text-pink-300"
              />
            </motion.div>

          </motion.div>

        </AnimatePresence>

        {/* =====================================================
            GOLD HEART CLIP
        ===================================================== */}

        <motion.div
          className="absolute top-[10px] right-[69px] md:right-[76px] z-50"
          animate={{
            rotate: [-5, 3, -5],
            y: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-pink-200 shadow-[0_4px_12px_rgba(180,120,70,0.2)] border border-white/80 flex items-center justify-center">
            <Heart
              size={20}
              fill="currentColor"
              className="text-amber-500"
            />
          </div>
        </motion.div>

        {/* =====================================================
            TOP PINK RIBBON
        ===================================================== */}

        <motion.div
          className="absolute top-[13px] left-1/2 -translate-x-1/2 z-40"
          animate={{
            rotate: [-2, 1, -2],
            y: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-[88px] h-[27px] bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 shadow-sm rotate-[-1deg] flex items-center justify-center">

            <div className="absolute left-[-7px] top-0 border-t-[14px] border-t-transparent border-r-[8px] border-r-pink-200 border-b-[13px] border-b-transparent" />

            <div className="absolute right-[-7px] top-0 border-t-[14px] border-t-transparent border-l-[8px] border-l-pink-200 border-b-[13px] border-b-transparent" />

            <Heart
              size={16}
              fill="currentColor"
              className="text-pink-500"
            />

          </div>
        </motion.div>

        {/* =====================================================
            LEFT FLOWER
        ===================================================== */}

        <motion.div
          className="absolute left-[13px] md:left-[23px] bottom-[50px] z-40"
          animate={{
            rotate: [-4, 3, -4],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-14 h-14">

            <div className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-amber-300 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_7px_rgba(245,190,70,0.6)]" />

            <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-pink-100 to-pink-300 rotate-[-20deg]" />

            <div className="absolute right-1 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-pink-50 to-pink-200 rotate-[20deg]" />

            <div className="absolute left-1 bottom-1 w-6 h-6 rounded-full bg-gradient-to-br from-pink-50 to-pink-200 rotate-[20deg]" />

            <div className="absolute right-1 bottom-1 w-6 h-6 rounded-full bg-gradient-to-br from-pink-100 to-pink-300 rotate-[-20deg]" />

            {/* Stem */}
            <div className="absolute left-[27px] top-[30px] w-[2px] h-9 bg-green-300/70 rotate-[-15deg]" />

            {/* leaf */}
            <div className="absolute left-[30px] top-[39px] w-4 h-2 rounded-full bg-green-300/50 rotate-[20deg]" />

          </div>
        </motion.div>

        {/* =====================================================
            RIGHT FLOWER
        ===================================================== */}

        <motion.div
          className="absolute right-[13px] md:right-[23px] bottom-[48px] z-40"
          animate={{
            rotate: [4, -3, 4],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-12 h-12">

            <div className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-amber-300 -translate-x-1/2 -translate-y-1/2" />

            <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-pink-200 rotate-[-20deg]" />

            <div className="absolute right-1 top-1 w-5 h-5 rounded-full bg-pink-100 rotate-[20deg]" />

            <div className="absolute left-1 bottom-1 w-5 h-5 rounded-full bg-pink-100 rotate-[20deg]" />

            <div className="absolute right-1 bottom-1 w-5 h-5 rounded-full bg-pink-200 rotate-[-20deg]" />

            <div className="absolute left-[24px] top-[28px] w-px h-8 bg-green-300/70 rotate-[15deg]" />

          </div>
        </motion.div>

        {/* =====================================================
            RIGHT SPARKLE
        ===================================================== */}

        <motion.div
          className="absolute right-[20px] bottom-[80px] z-40"
          animate={{
            scale: [0.8, 1.15, 0.8],
            rotate: [0, 20, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={25}
            className="text-amber-300"
          />
        </motion.div>

        {/* =====================================================
            RIGHT ARROW
        ===================================================== */}

        <motion.div
          className="absolute right-[20px] md:right-[30px] top-1/2 -translate-y-1/2 z-50 w-8 h-8 rounded-full bg-white/90 shadow-[0_5px_15px_rgba(100,50,80,0.12)] border border-pink-100 flex items-center justify-center pointer-events-none"
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
            size={17}
            className="text-pink-400"
          />
        </motion.div>

        {/* =====================================================
            TAP HINT
        ===================================================== */}

        <motion.div
          className="absolute bottom-[5px] left-1/2 -translate-x-1/2 z-50"
          animate={{
            y: [0, 3, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
          }}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-pink-100">

            <span className="text-xs text-pink-400">
              tap for next memory ♡
            </span>

          </div>
        </motion.div>

      </div>

      {/* =========================================================
          COUNTER
      ========================================================= */}

      <motion.div
        className="z-20 -mt-1 mb-3"
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

          <span className="tracking-[0.18em] font-medium text-purple-400">
            {currentIndex + 1} / {memories.length}
          </span>

          <span className="w-10 h-px bg-gradient-to-l from-transparent to-pink-300" />

        </div>
      </motion.div>

      {/* =========================================================
          LETTER BUTTON
      ========================================================= */}

      <motion.div
        className="shrink-0 z-20 mb-4"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.65,
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
