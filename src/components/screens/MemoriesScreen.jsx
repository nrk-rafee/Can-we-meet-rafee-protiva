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

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

const floatingHearts = [
  {
    left: "calc(50% - 170px)",
    top: "48%",
    size: 15,
    delay: 0,
    duration: 4,
  },
  {
    left: "calc(50% + 155px)",
    top: "43%",
    size: 17,
    delay: 1,
    duration: 4.5,
  },
  {
    left: "calc(50% - 180px)",
    top: "65%",
    size: 12,
    delay: 1.8,
    duration: 3.8,
  },
  {
    left: "calc(50% + 165px)",
    top: "67%",
    size: 14,
    delay: 0.7,
    duration: 4.2,
  },
];

const sparkles = [
  {
    left: "calc(50% - 145px)",
    top: "40%",
    delay: 0,
  },
  {
    left: "calc(50% + 145px)",
    top: "54%",
    delay: 0.8,
  },
  {
    left: "calc(50% - 150px)",
    top: "72%",
    delay: 1.5,
  },
  {
    left: "calc(50% + 140px)",
    top: "72%",
    delay: 0.4,
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
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen h-full overflow-visible">

      {/* =====================================================
          SOFT BACKGROUND GLOW
      ====================================================== */}

      <motion.div
        className="absolute w-[330px] h-[330px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[230px] h-[230px] rounded-full bg-purple-200/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* =====================================================
          FLOATING HEARTS
      ====================================================== */}

      {floatingHearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: heart.left,
            top: heart.top,
          }}
          animate={{
            y: [0, -13, 0],
            x: [0, index % 2 === 0 ? 5 : -5, 0],
            opacity: [0.25, 0.75, 0.25],
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
            className="text-pink-300"
          />
        </motion.div>
      ))}

      {/* =====================================================
          SPARKLES
      ====================================================== */}

      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.65, 1.15, 0.65],
            rotate: [0, 90, 180],
            opacity: [0.2, 0.85, 0.2],
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
            className="text-purple-300"
          />
        </motion.div>
      ))}

      {/* =====================================================
          TITLE
      ====================================================== */}

      <motion.div
        className="text-center z-10 mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{
              rotate: [-5, 5, -5],
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

          <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [5, -5, 5],
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

      {/* =====================================================
          ALBUM DOTS
      ====================================================== */}

      <div className="flex items-center justify-center gap-2 mt-5 mb-1 z-20">
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
                    scale: [1, 1.25, 1],
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
      </div>

      {/* =====================================================
          ALBUM
      ====================================================== */}

      <div className="relative w-full max-w-[420px] h-[425px] md:h-[450px] my-2 flex items-center justify-center z-10">

        {/* Outer scrapbook frame */}
        <motion.div
          className="absolute w-[315px] h-[370px] md:w-[350px] md:h-[395px] rounded-[28px] border-2 border-dashed border-pink-200/70"
          animate={{
            rotate: [0, 0.7, 0, -0.7, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner glow panel */}
        <motion.div
          className="absolute w-[300px] h-[355px] md:w-[335px] md:h-[380px] rounded-[26px] bg-white/35 backdrop-blur-sm"
          animate={{
            boxShadow: [
              "0 15px 45px rgba(236,72,153,0.05)",
              "0 20px 60px rgba(168,85,247,0.12)",
              "0 15px 45px rgba(236,72,153,0.05)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Little top tape */}
        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-100/80 rounded-sm rotate-[-2deg] z-30"
          animate={{
            rotate: [-2, 1, -2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        {/* =================================================
            PHOTO
        ================================================== */}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 120 : -120,
              rotate: direction > 0 ? 5 : -5,
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
              x: direction > 0 ? -120 : 120,
              rotate: direction > 0 ? -5 : 5,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute top-7 left-1/2 -translate-x-1/2 w-[275px] h-[340px] md:w-[300px] md:h-[365px] bg-[#fffdfd] rounded-2xl p-3 pb-12 shadow-[0_18px_45px_rgba(0,0,0,0.13)] border border-pink-100 cursor-pointer"
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* Image */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              {/* soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/5 pointer-events-none" />

              {/* tiny shine */}
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
            </div>

            {/* Caption */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* =================================================
            SIDE ARROW
        ================================================== */}

        <motion.div
          className="absolute right-[22px] md:right-[25px] top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-white/85 shadow-sm border border-pink-100 flex items-center justify-center pointer-events-none"
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

        {/* Bottom hint */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 z-40"
          animate={{
            y: [0, 4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-sm shadow-sm border border-pink-100">
            <span className="text-xs text-pink-400">
              tap for next memory ♡
            </span>
          </div>
        </motion.div>

      </div>

      {/* =====================================================
          COUNTER
      ====================================================== */}

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

          <span className="w-9 h-px bg-pink-200" />

          <span className="tracking-[0.18em] font-medium">
            {String(currentIndex + 1).padStart(2, "0")}
            {" "}
            /{" "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-9 h-px bg-pink-200" />

        </div>
      </motion.div>

      {/* =====================================================
          NEXT BUTTON
      ====================================================== */}

      <motion.div
        className="shrink-0 z-20 mb-5"
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
