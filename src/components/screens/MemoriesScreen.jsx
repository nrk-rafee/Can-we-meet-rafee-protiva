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

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

/* ---------------------------------------------------------
   REALISTIC STYLE BUTTERFLY
--------------------------------------------------------- */

function Butterfly({
  size = 70,
  delay = 0,
  duration = 12,
  startX,
  startY,
  endX,
  endY,
  rotate = 0,
}) {
  return (
    <motion.div
      className="absolute z-[5] pointer-events-none"
      style={{
        left: startX,
        top: startY,
        width: size,
        height: size,
      }}
      initial={{
        opacity: 0,
        x: 0,
        y: 0,
        scale: 0.65,
        rotate,
      }}
      animate={{
        opacity: [0, 0.95, 1, 0.9, 0],
        x: [0, 35, -20, 45, endX],
        y: [0, -25, -70, -35, endY],
        scale: [0.65, 0.9, 1, 0.92, 0.7],
        rotate: [
          rotate,
          rotate + 5,
          rotate - 7,
          rotate + 4,
          rotate,
        ],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    >
      <div
        className="relative w-full h-full"
        style={{
          filter:
            "drop-shadow(0 5px 8px rgba(91,33,182,0.18))",
        }}
      >
        {/* LEFT WING */}
        <motion.div
          className="absolute left-0 top-[8%] w-[53%] h-[68%] origin-bottom-right"
          animate={{
            rotateY: [0, 55, 0, -35, 0],
            rotate: [-5, 4, -7, 3, -5],
          }}
          transition={{
            duration: 0.42,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              clipPath:
                "polygon(100% 55%, 74% 8%, 43% 0%, 15% 16%, 0% 43%, 9% 70%, 35% 88%, 67% 100%, 91% 83%)",
              background:
                "radial-gradient(circle at 70% 55%, #fff0fa 0%, #f8a8d4 22%, #ec72b7 48%, #a855a8 72%, #67366f 100%)",
              border:
                "1px solid rgba(255,255,255,0.75)",
            }}
          />

          <span
            className="absolute top-[15%] left-[18%] w-[9px] h-[9px] rounded-full bg-white/80 blur-[1px]"
          />

          <span
            className="absolute top-[42%] left-[12%] w-[6px] h-[6px] rounded-full bg-purple-100/80"
          />
        </motion.div>

        {/* RIGHT WING */}
        <motion.div
          className="absolute right-0 top-[8%] w-[53%] h-[68%] origin-bottom-left"
          animate={{
            rotateY: [0, -55, 0, 35, 0],
            rotate: [5, -4, 7, -3, 5],
          }}
          transition={{
            duration: 0.42,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              clipPath:
                "polygon(0 55%, 26% 8%, 57% 0%, 85% 16%, 100% 43%, 91% 70%, 65% 88%, 33% 100%, 9% 83%)",
              background:
                "radial-gradient(circle at 30% 55%, #fff0fa 0%, #f8a8d4 22%, #ec72b7 48%, #a855a8 72%, #67366f 100%)",
              border:
                "1px solid rgba(255,255,255,0.75)",
            }}
          />

          <span
            className="absolute top-[15%] right-[18%] w-[9px] h-[9px] rounded-full bg-white/80 blur-[1px]"
          />

          <span
            className="absolute top-[42%] right-[12%] w-[6px] h-[6px] rounded-full bg-purple-100/80"
          />
        </motion.div>

        {/* BODY */}
        <div
          className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[7%] h-[58%] rounded-full z-10"
          style={{
            background:
              "linear-gradient(to right, #29152f, #8b527d, #29152f)",
          }}
        />

        {/* ANTENNA */}
        <div
          className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[55%] h-[30%]"
        >
          <span
            className="absolute left-[40%] top-0 w-[1px] h-[20px] bg-purple-800/60 rotate-[-25deg] origin-bottom"
          />
          <span
            className="absolute right-[40%] top-0 w-[1px] h-[20px] bg-purple-800/60 rotate-[25deg] origin-bottom"
          />
          <span className="absolute left-[29%] top-[-2px] w-[4px] h-[4px] rounded-full bg-purple-700/70" />
          <span className="absolute right-[29%] top-[-2px] w-[4px] h-[4px] rounded-full bg-purple-700/70" />
        </div>

        {/* WING VEINS */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-40">
          <span className="absolute left-[15%] top-[45%] w-[35%] h-px bg-white rotate-[25deg]" />
          <span className="absolute right-[15%] top-[45%] w-[35%] h-px bg-white rotate-[-25deg]" />
          <span className="absolute left-[20%] top-[60%] w-[30%] h-px bg-white rotate-[50deg]" />
          <span className="absolute right-[20%] top-[60%] w-[30%] h-px bg-white rotate-[-50deg]" />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
   FLOATING PARTICLES
--------------------------------------------------------- */

const particles = Array.from({ length: 24 }, (_, i) => ({
  left: `${4 + ((i * 17) % 92)}%`,
  top: `${5 + ((i * 29) % 88)}%`,
  size: 2 + (i % 3),
  delay: (i % 7) * 0.45,
}));

/* ---------------------------------------------------------
   MEMORY DECORATIONS
--------------------------------------------------------- */

const floatingHearts = [
  {
    left: "calc(50% - 190px)",
    top: "39%",
    size: 16,
    delay: 0,
    duration: 4.2,
  },
  {
    left: "calc(50% + 170px)",
    top: "41%",
    size: 15,
    delay: 1,
    duration: 4.8,
  },
  {
    left: "calc(50% - 205px)",
    top: "67%",
    size: 13,
    delay: 1.7,
    duration: 4,
  },
  {
    left: "calc(50% + 190px)",
    top: "69%",
    size: 14,
    delay: 0.7,
    duration: 4.5,
  },
];

const sparkles = [
  {
    left: "calc(50% - 155px)",
    top: "35%",
    delay: 0,
  },
  {
    left: "calc(50% + 150px)",
    top: "52%",
    delay: 0.8,
  },
  {
    left: "calc(50% - 165px)",
    top: "74%",
    delay: 1.5,
  },
  {
    left: "calc(50% + 155px)",
    top: "75%",
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
    <div className="relative flex flex-col items-center w-full min-h-screen h-full overflow-visible">

      {/* =====================================================
          DREAMY BACKGROUND
      ===================================================== */}

      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,230,242,0.95) 0%, rgba(252,220,237,0.72) 32%, rgba(243,226,250,0.48) 65%, rgba(255,255,255,0.25) 100%)",
        }}
        animate={{
          opacity: [0.75, 1, 0.8],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Soft center glow */}
      <motion.div
        className="fixed left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] rounded-full bg-pink-300/20 blur-[80px] pointer-events-none z-0"
        animate={{
          scale: [0.95, 1.08, 0.95],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          BUTTERFLIES — FULL SCREEN
      ===================================================== */}

      <Butterfly
        size={72}
        startX="3%"
        startY="35%"
        endX={80}
        endY={-130}
        duration={13}
        delay={0}
        rotate={-8}
      />

      <Butterfly
        size={48}
        startX="82%"
        startY="30%"
        endX={-110}
        endY={100}
        duration={11}
        delay={2}
        rotate={8}
      />

      <Butterfly
        size={58}
        startX="86%"
        startY="67%"
        endX={-100}
        endY={-170}
        duration={14}
        delay={4}
        rotate={-5}
      />

      <Butterfly
        size={42}
        startX="8%"
        startY="72%"
        endX={130}
        endY={-120}
        duration={10}
        delay={5}
        rotate={7}
      />

      <Butterfly
        size={35}
        startX="53%"
        startY="18%"
        endX={-90}
        endY={150}
        duration={12}
        delay={3}
        rotate={-4}
      />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="fixed rounded-full bg-white/70 blur-[1px] pointer-events-none z-[2]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.8, 0.15],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{
            duration: 3 + (index % 4),
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="relative text-center z-20 mt-7"
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
              rotate: [-8, 8, -8],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={21}
              className="text-pink-500"
            />
          </motion.div>

          <h2 className="text-[30px] md:text-5xl font-bold tracking-tight text-slate-700">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [8, -8, 8],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={21}
              className="text-pink-500"
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
      </motion.div>

      {/* =====================================================
          PHOTO DOTS
      ===================================================== */}

      <div className="flex items-center justify-center gap-2 mt-5 z-20">
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
                    scale: [1, 1.35, 1],
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

      {/* =====================================================
          LUXURY ALBUM AREA
      ===================================================== */}

      <div className="relative w-full max-w-[500px] h-[455px] md:h-[475px] mt-1 flex items-center justify-center z-10">

        {/* Outer luxury halo */}
        <motion.div
          className="absolute w-[355px] h-[405px] md:w-[395px] md:h-[425px] rounded-[35px] border border-white/80 pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 25px rgba(244,114,182,0.12)",
              "0 0 55px rgba(244,114,182,0.28)",
              "0 0 25px rgba(244,114,182,0.12)",
            ],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
          }}
        />

        {/* Back album card */}
        <motion.div
          className="absolute w-[335px] h-[390px] md:w-[375px] md:h-[410px] rounded-[28px] bg-white/35 backdrop-blur-md border border-white/80"
          animate={{
            rotate: [-2, -1, -2],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            boxShadow:
              "0 25px 65px rgba(120,60,100,0.13)",
          }}
        />

        {/* Pink side ribbon */}
        <motion.div
          className="absolute -left-[3px] top-[48%] w-[65px] h-[145px] pointer-events-none z-10"
          animate={{
            rotate: [-5, -1, -5],
            x: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-l-full border-y border-pink-200/60"
            style={{
              background:
                "linear-gradient(90deg, rgba(244,114,182,0.16), rgba(244,114,182,0.04))",
            }}
          />
        </motion.div>

        {/* Right ribbon */}
        <motion.div
          className="absolute -right-[3px] top-[42%] w-[65px] h-[150px] pointer-events-none z-10"
          animate={{
            rotate: [5, 1, 5],
            x: [0, 3, 0],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-full h-full rounded-r-full border-y border-pink-200/60"
            style={{
              background:
                "linear-gradient(270deg, rgba(244,114,182,0.16), rgba(244,114,182,0.04))",
            }}
          />
        </motion.div>

        {/* Main album shadow/glow */}
        <motion.div
          className="absolute w-[330px] h-[395px] md:w-[365px] md:h-[415px] rounded-[30px] pointer-events-none"
          animate={{
            boxShadow: [
              "0 20px 55px rgba(190,80,140,0.12)",
              "0 25px 75px rgba(190,80,140,0.25)",
              "0 20px 55px rgba(190,80,140,0.12)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* =================================================
            PHOTO
        ================================================= */}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: 110,
              rotate: 5,
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
              x: -110,
              rotate: -5,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute top-[24px] left-1/2 -translate-x-1/2 w-[300px] h-[370px] md:w-[325px] md:h-[390px] bg-[#fffdfd] rounded-[20px] p-3 pb-12 shadow-[0_25px_60px_rgba(70,30,60,0.20)] border border-white cursor-pointer z-30"
            onClick={nextPhoto}
            whileHover={{
              y: -6,
              scale: 1.015,
              rotate: -0.5,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* PHOTO INNER FRAME */}
            <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-slate-100 border border-pink-100">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              {/* Soft photo glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-600/10 via-transparent to-white/10 pointer-events-none" />

              {/* Moving light reflection */}
              <motion.div
                className="absolute top-0 bottom-0 -left-[60%] w-[35%] bg-white/20 skew-x-[-18deg] pointer-events-none"
                animate={{
                  left: ["-60%", "140%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              />

            </div>

            {/* Tape on photo */}
            <motion.div
              className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-[76px] h-[25px] bg-pink-200/85 rounded-sm z-40"
              animate={{
                rotate: [-3, 1, -3],
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
                  className="text-pink-500"
                />
              </div>
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>

            {/* Corner heart */}
            <Heart
              size={18}
              fill="currentColor"
              className="absolute bottom-[13px] right-[15px] text-pink-300 rotate-12"
            />

          </motion.div>
        </AnimatePresence>

        {/* =================================================
            FLOWER DECORATION
        ================================================= */}

        <motion.div
          className="absolute bottom-[25px] left-[45px] md:left-[55px] z-40 pointer-events-none"
          animate={{
            y: [0, -3, 0],
            rotate: [-2, 1, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <Flower2
              size={42}
              className="text-pink-300"
            />
            <Flower2
              size={28}
              className="absolute -right-4 -top-3 text-purple-300"
            />
          </div>
        </motion.div>

        {/* =================================================
            SPARKLES AROUND ALBUM
        ================================================= */}

        {sparkles.map((star, index) => (
          <motion.div
            key={index}
            className="absolute pointer-events-none z-40"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              scale: [0.6, 1.25, 0.6],
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
              size={17}
              className="text-pink-300"
            />
          </motion.div>
        ))}

        {/* Floating hearts */}
        {floatingHearts.map((heart, index) => (
          <motion.div
            key={index}
            className="absolute pointer-events-none z-40"
            style={{
              left: heart.left,
              top: heart.top,
            }}
            animate={{
              y: [0, -14, 0],
              x: [0, index % 2 === 0 ? 5 : -5, 0],
              opacity: [0.25, 0.85, 0.25],
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

        {/* Next arrow */}
        <motion.div
          className="absolute right-[18px] md:right-[35px] top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-pink-100 flex items-center justify-center pointer-events-none"
          animate={{
            x: [0, 5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          <ChevronRight
            size={18}
            className="text-pink-500"
          />
        </motion.div>

      </div>

      {/* =====================================================
          COUNTER
      ===================================================== */}

      <motion.div
        className="relative z-30 -mt-1 mb-4"
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
        <div className="flex items-center gap-4">

          <span className="w-10 h-px bg-pink-300" />

          <span className="tracking-[0.22em] text-sm font-medium text-slate-500">
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
          LETTER BUTTON
      ===================================================== */}

      <motion.div
        className="relative shrink-0 z-30 mb-6"
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
