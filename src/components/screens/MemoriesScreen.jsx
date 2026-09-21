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

const butterflies = [
  {
    left: "-8%",
    top: "16%",
    width: 82,
    duration: 15,
    delay: 0,
    rotate: -12,
    x: ["0vw", "13vw", "5vw", "18vw", "0vw"],
    y: ["0vh", "-5vh", "8vh", "-8vh", "0vh"],
    scale: [0.9, 1, 0.88, 1.04, 0.9],
    opacity: [0.72, 0.95, 0.78, 0.96, 0.72],
  },
  {
    left: "76%",
    top: "22%",
    width: 62,
    duration: 18,
    delay: 2,
    rotate: 18,
    x: ["0vw", "-12vw", "-4vw", "-18vw", "0vw"],
    y: ["0vh", "8vh", "-6vh", "7vh", "0vh"],
    scale: [0.8, 0.92, 0.82, 0.96, 0.8],
    opacity: [0.55, 0.85, 0.58, 0.9, 0.55],
  },
  {
    left: "82%",
    top: "52%",
    width: 95,
    duration: 20,
    delay: 1,
    rotate: -20,
    x: ["0vw", "-10vw", "-20vw", "-7vw", "0vw"],
    y: ["0vh", "-9vh", "6vh", "-7vh", "0vh"],
    scale: [0.78, 0.92, 0.8, 1, 0.78],
    opacity: [0.5, 0.78, 0.55, 0.82, 0.5],
  },
  {
    left: "4%",
    top: "62%",
    width: 54,
    duration: 17,
    delay: 4,
    rotate: 15,
    x: ["0vw", "15vw", "7vw", "20vw", "0vw"],
    y: ["0vh", "7vh", "-8vh", "5vh", "0vh"],
    scale: [0.7, 0.86, 0.72, 0.9, 0.7],
    opacity: [0.45, 0.72, 0.5, 0.75, 0.45],
  },
  {
    left: "47%",
    top: "72%",
    width: 45,
    duration: 13,
    delay: 5,
    rotate: -8,
    x: ["0vw", "-8vw", "8vw", "-4vw", "0vw"],
    y: ["0vh", "-10vh", "-18vh", "-8vh", "0vh"],
    scale: [0.65, 0.8, 0.68, 0.86, 0.65],
    opacity: [0.38, 0.62, 0.42, 0.65, 0.38],
  },
];

const sparkles = [
  { left: "8%", top: "12%", size: 13, delay: 0 },
  { left: "89%", top: "16%", size: 11, delay: 1.4 },
  { left: "14%", top: "44%", size: 10, delay: 0.8 },
  { left: "91%", top: "70%", size: 13, delay: 2 },
  { left: "18%", top: "82%", size: 9, delay: 1.2 },
  { left: "76%", top: "84%", size: 10, delay: 2.5 },
];

const floatingHearts = [
  {
    left: "8%",
    top: "35%",
    size: 14,
    delay: 0,
    duration: 4.5,
  },
  {
    left: "90%",
    top: "39%",
    size: 13,
    delay: 1,
    duration: 4,
  },
  {
    left: "13%",
    top: "73%",
    size: 11,
    delay: 1.8,
    duration: 4.8,
  },
  {
    left: "86%",
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
    <div className="relative flex flex-col items-center w-full min-h-screen h-full overflow-visible">

      {/* =========================================================
          DREAMY BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

        {/* soft pink atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.96)_0%,rgba(255,228,239,0.72)_35%,rgba(249,214,229,0.48)_65%,rgba(244,205,224,0.3)_100%)]" />

        {/* center glow */}
        <motion.div
          className="absolute left-1/2 top-[43%] -translate-x-1/2 w-[430px] h-[430px] rounded-full bg-pink-200/20"
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.35, 0.52, 0.35],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* top glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full bg-white/55 blur-3xl" />

        {/* subtle bottom glow */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[420px] h-[220px] rounded-full bg-purple-200/15 blur-3xl" />

        {/* soft decorative corner blobs */}
        <div className="absolute -left-24 top-[25%] w-52 h-52 rounded-full bg-pink-300/10 blur-3xl" />
        <div className="absolute -right-24 top-[58%] w-56 h-56 rounded-full bg-purple-300/10 blur-3xl" />
      </div>

      {/* =========================================================
          REALISTIC BUTTERFLIES
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
                butterfly.rotate + 7,
                butterfly.rotate - 5,
                butterfly.rotate + 4,
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
              src="/images/butterfly.png"
              alt=""
              aria-hidden="true"
              draggable="false"
              loading="eager"
              decoding="async"
              className="w-full h-auto object-contain select-none"
              animate={{
                rotateY: [0, 18, -12, 15, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* =========================================================
          SPARKLES
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
              scale: [0.6, 1.15, 0.6],
              rotate: [0, 90, 180],
              opacity: [0.15, 0.8, 0.15],
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
              className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
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
        <div className="flex items-center justify-center gap-2">

          <motion.div
            animate={{
              rotate: [-6, 6, -6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera
              size={19}
              className="text-pink-500"
            />
          </motion.div>

          <h2 className="text-[31px] md:text-5xl font-bold tracking-tight text-slate-700">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [6, -6, 6],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera
              size={19}
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

        <div className="flex items-center justify-center gap-2 mt-3">
          <Flower2
            size={12}
            className="text-pink-300"
          />

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />

          <Heart
            size={11}
            fill="currentColor"
            className="text-pink-400"
          />

          <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent" />

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
                ? "w-3.5 h-3.5 bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.4)]"
                : "w-2.5 h-2.5 bg-pink-200"
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
              duration: 1.4,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* =========================================================
          LUXURY ALBUM
      ========================================================= */}

      <div className="relative w-full max-w-[450px] h-[455px] md:h-[485px] mt-1 z-20 flex items-center justify-center">

        {/* outer luxury frame */}
        <motion.div
          className="absolute w-[342px] h-[390px] md:w-[375px] md:h-[420px] rounded-[30px] border border-white/75 bg-white/15 backdrop-blur-[2px]"
          animate={{
            rotate: [0, 0.5, 0, -0.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* pink shadow frame */}
        <motion.div
          className="absolute w-[330px] h-[378px] md:w-[362px] md:h-[408px] rounded-[28px] bg-pink-300/10 border border-pink-200/60"
          animate={{
            rotate: [-2, -1, -2, -3, -2],
            y: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* golden thin frame */}
        <div className="absolute w-[318px] h-[366px] md:w-[350px] md:h-[396px] rounded-[26px] border border-amber-200/45 pointer-events-none" />

        {/* back polaroid 1 */}
        <motion.div
          className="absolute w-[288px] h-[350px] md:w-[310px] md:h-[375px] bg-[#fffafa] rounded-2xl shadow-[0_20px_45px_rgba(90,40,70,0.10)]"
          animate={{
            rotate: [-5, -4, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* back polaroid 2 */}
        <motion.div
          className="absolute w-[292px] h-[355px] md:w-[315px] md:h-[380px] bg-[#fffdfc] rounded-2xl shadow-[0_20px_45px_rgba(90,40,70,0.12)]"
          animate={{
            rotate: [4, 3, 4],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* main photo */}
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
            className="absolute top-[29px] w-[286px] h-[350px] md:w-[308px] md:h-[375px] bg-[#fffdfd] rounded-[18px] p-3 pb-11 shadow-[0_24px_55px_rgba(70,30,60,0.20)] border border-white cursor-pointer"
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* photo inner */}
            <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
                loading="eager"
                decoding="async"
              />

              {/* soft photo overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/10 pointer-events-none" />

              {/* subtle light sweep */}
              <motion.div
                className="absolute inset-y-0 -left-1/2 w-1/4 bg-white/20 skew-x-[-20deg] pointer-events-none"
                animate={{
                  left: ["-50%", "135%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* caption */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>

            {/* tiny heart */}
            <Heart
              size={17}
              fill="currentColor"
              className="absolute right-3 bottom-2 text-pink-300"
            />
          </motion.div>
        </AnimatePresence>

        {/* =====================================================
            TOP RIBBON
        ===================================================== */}

        <motion.div
          className="absolute top-[12px] left-1/2 -translate-x-1/2 z-40"
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
          <div className="relative w-[88px] h-[29px] bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200 shadow-sm rotate-[-1deg] flex items-center justify-center">
            <div className="absolute left-[-7px] top-0 border-t-[15px] border-t-transparent border-r-[8px] border-r-pink-200 border-b-[14px] border-b-transparent" />

            <div className="absolute right-[-7px] top-0 border-t-[15px] border-t-transparent border-l-[8px] border-l-pink-200 border-b-[14px] border-b-transparent" />

            <Heart
              size={17}
              fill="currentColor"
              className="text-pink-500"
            />
          </div>
        </motion.div>

        {/* left floral decoration */}
        <motion.div
          className="absolute left-[20px] bottom-[58px] z-40"
          animate={{
            rotate: [-3, 2, -3],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-12 h-12">

            <div className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full bg-amber-200 -translate-x-1/2 -translate-y-1/2" />

            <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-pink-200 rotate-[-20deg]" />
            <div className="absolute right-1 top-1 w-5 h-5 rounded-full bg-pink-100 rotate-[20deg]" />
            <div className="absolute left-1 bottom-1 w-5 h-5 rounded-full bg-pink-100 rotate-[20deg]" />
            <div className="absolute right-1 bottom-1 w-5 h-5 rounded-full bg-pink-200 rotate-[-20deg]" />

            <div className="absolute left-[24px] top-[29px] w-px h-8 bg-green-300/70 rotate-[-15deg]" />
          </div>
        </motion.div>

        {/* right sparkle decoration */}
        <motion.div
          className="absolute right-[20px] bottom-[80px] z-40"
          animate={{
            scale: [0.9, 1.1, 0.9],
            rotate: [0, 20, 0],
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={25}
            className="text-pink-300"
          />
        </motion.div>

        {/* right arrow */}
        <motion.div
          className="absolute right-[28px] md:right-[35px] top-1/2 -translate-y-1/2 z-50 w-8 h-8 rounded-full bg-white/90 shadow-md border border-pink-100 flex items-center justify-center pointer-events-none"
          animate={{
            x: [0, 4, 0],
            opacity: [0.55, 1, 0.55],
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

        {/* tap hint */}
        <motion.div
          className="absolute bottom-[5px] left-1/2 -translate-x-1/2 z-50"
          animate={{
            y: [0, 3, 0],
            opacity: [0.45, 0.9, 0.45],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
          }}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-pink-100">
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
