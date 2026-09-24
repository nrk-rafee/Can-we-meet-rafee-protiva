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

/* =========================================================
   BUTTERFLY
   Same butterfly style from ThingsToDo
========================================================= */

function Butterfly({ size = 42, delay = 0, duration = 12, path = 1 }) {
  const paths = {
    1: {
      x: [
        "-50%",
        "-20%",
        "25%",
        "65%",
        "35%",
        "-10%",
        "-45%",
        "-20%",
        "30%",
      ],
      y: [
        "0%",
        "-55%",
        "-100%",
        "-145%",
        "-190%",
        "-235%",
        "-280%",
        "-325%",
        "-370%",
      ],
      rotate: [-8, 12, -10, 14, -8, 10, -14, 8, 18],
    },

    2: {
      x: [
        "-50%",
        "10%",
        "65%",
        "25%",
        "-30%",
        "-75%",
        "-30%",
        "30%",
        "75%",
      ],
      y: [
        "0%",
        "40%",
        "85%",
        "130%",
        "175%",
        "220%",
        "265%",
        "310%",
        "355%",
      ],
      rotate: [8, -12, 10, -8, 14, -10, 12, -8, 18],
    },

    3: {
      x: [
        "-50%",
        "-85%",
        "-35%",
        "20%",
        "75%",
        "35%",
        "-20%",
        "-70%",
        "-25%",
      ],
      y: [
        "0%",
        "-30%",
        "-75%",
        "-120%",
        "-165%",
        "-210%",
        "-255%",
        "-300%",
        "-345%",
      ],
      rotate: [-12, 8, -15, 10, -8, 14, -12, 8, 18],
    },

    4: {
      x: [
        "-50%",
        "35%",
        "80%",
        "20%",
        "-50%",
        "-85%",
        "-20%",
        "50%",
        "85%",
      ],
      y: [
        "0%",
        "45%",
        "90%",
        "135%",
        "180%",
        "225%",
        "270%",
        "315%",
        "360%",
      ],
      rotate: [10, -10, 14, -12, 8, -15, 12, -8, 20],
    },
  };

  const selectedPath = paths[path] || paths[1];

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 top-1/2 z-[35] select-none"
      initial={{
        x: "-50%",
        y: "-50%",
        scale: 0.45,
        opacity: 0,
      }}
      animate={{
        x: selectedPath.x,
        y: selectedPath.y,
        rotate: selectedPath.rotate,
        scale: [
          0.45,
          0.8,
          1,
          0.9,
          1.05,
          0.85,
          0.7,
          0.55,
          0.35,
        ],
        opacity: [
          0,
          0.9,
          1,
          1,
          0.95,
          0.9,
          0.75,
          0.45,
          0,
        ],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
      style={{
        fontSize: `${size}px`,
        filter: "drop-shadow(0 5px 7px rgba(0,0,0,0.18))",
      }}
    >
      <motion.span
        animate={{
          rotateY: [
            0,
            55,
            -45,
            50,
            -40,
            45,
            0,
          ],
          scaleX: [
            1,
            0.72,
            1,
            0.7,
            1,
            0.75,
            1,
          ],
        }}
        transition={{
          duration: 0.55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          display: "inline-block",
          transformStyle: "preserve-3d",
        }}
      >
        🦋
      </motion.span>
    </motion.div>
  );
}

/* =========================================================
   FLOATING HEARTS
========================================================= */

const floatingHearts = [
  {
    left: "7%",
    top: "29%",
    size: 14,
    delay: 0,
    duration: 4,
  },
  {
    left: "88%",
    top: "31%",
    size: 17,
    delay: 1,
    duration: 4.5,
  },
  {
    left: "8%",
    top: "67%",
    size: 12,
    delay: 1.8,
    duration: 3.8,
  },
  {
    left: "89%",
    top: "69%",
    size: 14,
    delay: 0.7,
    duration: 4.2,
  },
];

/* =========================================================
   SPARKLES
========================================================= */

const sparkles = [
  {
    left: "12%",
    top: "39%",
    delay: 0,
  },
  {
    left: "87%",
    top: "47%",
    delay: 0.8,
  },
  {
    left: "14%",
    top: "76%",
    delay: 1.5,
  },
  {
    left: "84%",
    top: "75%",
    delay: 0.4,
  },
];

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
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen h-full overflow-visible">

      {/* =====================================================
          DREAMY BACKGROUND
      ===================================================== */}

      <motion.div
        className="fixed inset-0 pointer-events-none z-[-10] bg-gradient-to-b from-[#fff7fb] via-[#ffeaf5] to-[#fce0f0]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] rounded-full bg-pink-300/20 blur-[90px] pointer-events-none z-[-5]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          BUTTERFLIES — WHOLE SCREEN
      ===================================================== */}

      <Butterfly
        size={42}
        delay={0}
        duration={13}
        path={1}
      />

      <Butterfly
        size={34}
        delay={3}
        duration={15}
        path={2}
      />

      <Butterfly
        size={48}
        delay={5}
        duration={14}
        path={3}
      />

      <Butterfly
        size={30}
        delay={7}
        duration={16}
        path={4}
      />

      <Butterfly
        size={37}
        delay={10}
        duration={13}
        path={2}
      />

      {/* =====================================================
          FLOATING HEARTS
      ===================================================== */}

      {floatingHearts.map((heart, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-[5]"
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
      ===================================================== */}

      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-[4]"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.65, 1.2, 0.65],
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
          HEADER
      ===================================================== */}

      <motion.div
        className="text-center z-20 mt-4"
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
          PHOTO DOTS
      ===================================================== */}

      <div className="flex items-center justify-center gap-2 mt-5 mb-1 z-20">
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-3 h-3 bg-pink-500"
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
          LUXURY ALBUM
      ===================================================== */}

      <div className="relative w-full max-w-[440px] h-[425px] md:h-[450px] my-2 flex items-center justify-center z-10">

        {/* Outer luxury glow */}

        <motion.div
          className="absolute w-[350px] h-[405px] md:w-[385px] md:h-[420px] rounded-[32px] border border-white/80 bg-white/20 backdrop-blur-[2px]"
          animate={{
            boxShadow: [
              "0 20px 55px rgba(236,72,153,0.08)",
              "0 25px 75px rgba(168,85,247,0.18)",
              "0 20px 55px rgba(236,72,153,0.08)",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Decorative outer frame */}

        <motion.div
          className="absolute w-[335px] h-[390px] md:w-[370px] md:h-[405px] rounded-[30px] border-2 border-dashed border-pink-200/70"
          animate={{
            rotate: [0, 0.6, 0, -0.6, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Soft glass panel */}

        <motion.div
          className="absolute w-[320px] h-[375px] md:w-[355px] md:h-[390px] rounded-[28px] bg-white/40 backdrop-blur-md border border-white/80"
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

        {/* =================================================
            BACK PHOTO LAYERS
        ================================================= */}

        <motion.div
          className="absolute top-[35px] left-1/2 -translate-x-1/2 w-[285px] h-[350px] md:w-[310px] md:h-[375px] bg-[#fffafa] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.08)] border border-pink-100"
          animate={{
            rotate: [-4, -3, -4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[290px] h-[355px] md:w-[315px] md:h-[380px] bg-[#fffdfd] rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.1)] border border-pink-100"
          animate={{
            rotate: [3, 2, 3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            PINK TAPE
        ================================================= */}

        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-[82px] h-[26px] bg-pink-200/90 rounded-sm rotate-[-2deg] z-50 shadow-sm border border-pink-300/40"
          animate={{
            rotate: [-2, 1, -2],
            y: [0, -1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_1px)] bg-[size:8px_8px]" />

          <Heart
            size={15}
            fill="currentColor"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500"
          />
        </motion.div>

        {/* =================================================
            MAIN PHOTO
        ================================================= */}

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
            className="absolute top-7 left-1/2 -translate-x-1/2 w-[275px] h-[340px] md:w-[300px] md:h-[365px] bg-[#fffdfd] rounded-2xl p-3 pb-12 shadow-[0_22px_55px_rgba(0,0,0,0.15)] border border-pink-100 cursor-pointer z-40"
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* PHOTO */}

            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              {/* soft luxury overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/10 pointer-events-none" />

              {/* moving shine */}

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

            {/* POLAROID TEXT */}

            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        <motion.div
          className="absolute right-[14px] md:right-[20px] top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white/90 shadow-[0_5px_20px_rgba(236,72,153,0.15)] border border-pink-100 flex items-center justify-center pointer-events-none"
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

      </div>

      {/* =====================================================
          COUNTER
      ===================================================== */}

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
        <div className="flex items-center gap-4 text-sm text-purple-500">

          <span className="w-10 h-px bg-pink-300" />

          <span className="tracking-[0.2em] font-semibold">
            {String(currentIndex + 1).padStart(2, "0")}
            {" "}
            /
            {" "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-10 h-px bg-pink-300" />

        </div>
      </motion.div>

      {/* =====================================================
          BUTTON
      ===================================================== */}

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
