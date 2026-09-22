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

/* -----------------------------
   REALISTIC CSS BUTTERFLIES
------------------------------ */

const butterflies = [
  {
    id: 1,
    left: "-18px",
    top: "15%",
    scale: 0.95,
    duration: 13,
    delay: 0,
    blur: 0,
  },
  {
    id: 2,
    left: "82%",
    top: "25%",
    scale: 0.62,
    duration: 16,
    delay: 2,
    blur: 0.3,
  },
  {
    id: 3,
    left: "88%",
    top: "62%",
    scale: 0.85,
    duration: 14,
    delay: 1,
    blur: 0,
  },
  {
    id: 4,
    left: "-8px",
    top: "72%",
    scale: 0.55,
    duration: 17,
    delay: 4,
    blur: 0.8,
  },
  {
    id: 5,
    left: "92%",
    top: "84%",
    scale: 0.48,
    duration: 19,
    delay: 3,
    blur: 1,
  },
  {
    id: 6,
    left: "8%",
    top: "39%",
    scale: 0.38,
    duration: 20,
    delay: 6,
    blur: 1.2,
  },
];

function Butterfly({ butterfly }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[5]"
      style={{
        left: butterfly.left,
        top: butterfly.top,
        filter: `blur(${butterfly.blur}px)`,
      }}
      animate={{
        x: [
          0,
          45,
          90,
          45,
          -15,
          0,
        ],
        y: [
          0,
          -35,
          8,
          42,
          -18,
          0,
        ],
        rotate: [
          -8,
          7,
          -3,
          9,
          -7,
          -8,
        ],
      }}
      transition={{
        duration: butterfly.duration,
        delay: butterfly.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        style={{
          transform: `scale(${butterfly.scale})`,
        }}
        animate={{
          scaleX: [1, 0.72, 1, 0.72, 1],
          scaleY: [1, 1.04, 1, 1.04, 1],
        }}
        transition={{
          duration: 0.55,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-[58px] h-[48px]">

          {/* Left upper wing */}
          <div
            className="
              absolute
              left-[2px]
              top-[1px]
              w-[27px]
              h-[31px]
              rounded-[90%_15%_70%_20%]
              rotate-[-27deg]
              bg-gradient-to-br
              from-pink-200
              via-fuchsia-300
              to-purple-400
              border border-white/60
              shadow-[0_3px_12px_rgba(236,72,153,0.35)]
            "
          >
            <div className="absolute inset-[5px] rounded-[80%_20%_70%_25%] border border-white/35" />
            <div className="absolute left-[8px] top-[9px] w-2 h-2 rounded-full bg-white/60" />
          </div>

          {/* Right upper wing */}
          <div
            className="
              absolute
              right-[2px]
              top-[1px]
              w-[27px]
              h-[31px]
              rounded-[15%_90%_20%_70%]
              rotate-[27deg]
              bg-gradient-to-bl
              from-pink-200
              via-fuchsia-300
              to-purple-400
              border border-white/60
              shadow-[0_3px_12px_rgba(236,72,153,0.35)]
            "
          >
            <div className="absolute inset-[5px] rounded-[20%_80%_25%_70%] border border-white/35" />
            <div className="absolute right-[8px] top-[9px] w-2 h-2 rounded-full bg-white/60" />
          </div>

          {/* Left lower wing */}
          <div
            className="
              absolute
              left-[8px]
              top-[24px]
              w-[22px]
              h-[20px]
              rounded-[20%_60%_80%_70%]
              rotate-[8deg]
              bg-gradient-to-br
              from-pink-300
              to-purple-400
              border border-white/50
            "
          />

          {/* Right lower wing */}
          <div
            className="
              absolute
              right-[8px]
              top-[24px]
              w-[22px]
              h-[20px]
              rounded-[60%_20%_70%_80%]
              rotate-[-8deg]
              bg-gradient-to-bl
              from-pink-300
              to-purple-400
              border border-white/50
            "
          />

          {/* Body */}
          <div
            className="
              absolute
              left-1/2
              top-[8px]
              -translate-x-1/2
              w-[5px]
              h-[32px]
              rounded-full
              bg-gradient-to-b
              from-slate-700
              via-slate-500
              to-slate-800
              shadow-sm
            "
          />

          {/* Antennae */}
          <div className="absolute left-1/2 top-[4px] -translate-x-1/2">
            <div className="absolute w-[17px] h-[9px] border-t border-slate-500 rounded-full rotate-[-25deg] -left-[15px]" />
            <div className="absolute w-[17px] h-[9px] border-t border-slate-500 rounded-full rotate-[25deg] left-[3px]" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -----------------------------
   FLOATING DECORATIONS
------------------------------ */

const sparkles = [
  { left: "9%", top: "13%", delay: 0 },
  { left: "88%", top: "17%", delay: 1 },
  { left: "6%", top: "53%", delay: 1.8 },
  { left: "92%", top: "48%", delay: 0.6 },
  { left: "11%", top: "86%", delay: 2.2 },
  { left: "87%", top: "88%", delay: 1.2 },
];

const hearts = [
  { left: "15%", top: "29%", delay: 0 },
  { left: "84%", top: "37%", delay: 1 },
  { left: "12%", top: "68%", delay: 2 },
  { left: "89%", top: "71%", delay: 0.8 },
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
    <div className="relative flex flex-col items-center w-full min-h-screen h-full overflow-hidden bg-gradient-to-b from-pink-50/30 via-white/20 to-purple-50/30">

      {/* --------------------------------
          DREAMY BACKGROUND GLOW
      --------------------------------- */}

      <motion.div
        className="
          absolute
          top-[7%]
          left-1/2
          -translate-x-1/2
          w-[390px]
          h-[390px]
          rounded-full
          bg-pink-200/30
          blur-[90px]
          pointer-events-none
        "
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
        className="
          absolute
          bottom-[10%]
          left-[50%]
          -translate-x-1/2
          w-[300px]
          h-[300px]
          rounded-full
          bg-purple-200/20
          blur-[100px]
          pointer-events-none
        "
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
      />

      {/* --------------------------------
          SOFT LIGHT PARTICLES
      --------------------------------- */}

      {[...Array(18)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white/70 pointer-events-none z-[1]"
          style={{
            width: index % 3 === 0 ? 6 : 3,
            height: index % 3 === 0 ? 6 : 3,
            left: `${5 + ((index * 17) % 90)}%`,
            top: `${5 + ((index * 23) % 88)}%`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.8, 0.15],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{
            duration: 3 + (index % 4),
            delay: index * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* --------------------------------
          BUTTERFLIES
      --------------------------------- */}

      {butterflies.map((butterfly) => (
        <Butterfly
          key={butterfly.id}
          butterfly={butterfly}
        />
      ))}

      {/* --------------------------------
          SPARKLES
      --------------------------------- */}

      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-[4]"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.6, 1.2, 0.6],
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
            size={16}
            className="text-pink-300"
          />
        </motion.div>
      ))}

      {/* --------------------------------
          FLOATING HEARTS
      --------------------------------- */}

      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-[3]"
          style={{
            left: heart.left,
            top: heart.top,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, index % 2 ? -5 : 5, 0],
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
            size={15}
            fill="currentColor"
            className="text-pink-300"
          />
        </motion.div>
      ))}

      {/* --------------------------------
          HEADER
      --------------------------------- */}

      <motion.div
        className="text-center z-20 mt-7"
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
              rotate: [-5, 5, -5],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={21}
              className="text-pink-400"
            />
          </motion.div>

          <h2 className="
            text-[32px]
            md:text-5xl
            font-bold
            tracking-tight
            text-slate-700
          ">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [5, -5, 5],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={21}
              className="text-pink-400"
            />
          </motion.div>
        </div>

        <motion.p
          className="
            text-lg
            md:text-2xl
            font-hand
            text-purple-400
            mt-2
          "
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

      {/* --------------------------------
          PHOTO DOTS
      --------------------------------- */}

      <div className="flex items-center justify-center gap-2 mt-5 z-20">
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`
              rounded-full
              ${
                index === currentIndex
                  ? "w-3 h-3 bg-pink-500"
                  : "w-2 h-2 bg-pink-200"
              }
            `}
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
              duration: 1.4,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* --------------------------------
          LUXURY ALBUM AREA
      --------------------------------- */}

      <div
        className="
          relative
          w-full
          max-w-[450px]
          h-[475px]
          md:h-[500px]
          mt-1
          flex
          items-center
          justify-center
          z-20
        "
      >

        {/* Outer glow */}
        <motion.div
          className="
            absolute
            w-[350px]
            h-[405px]
            rounded-[40px]
            bg-pink-300/15
            blur-2xl
          "
          animate={{
            opacity: [0.35, 0.7, 0.35],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Decorative outer frame */}
        <motion.div
          className="
            absolute
            w-[345px]
            h-[420px]
            rounded-[32px]
            border
            border-pink-200/70
            bg-white/10
            backdrop-blur-[2px]
          "
          animate={{
            rotate: [0, 0.6, 0, -0.6, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        {/* Back album card */}
        <motion.div
          className="
            absolute
            w-[315px]
            h-[395px]
            rounded-[25px]
            bg-gradient-to-br
            from-pink-100/80
            via-white/80
            to-purple-100/70
            shadow-[0_20px_50px_rgba(236,72,153,0.12)]
            rotate-[-4deg]
            border
            border-white
          "
        />

        {/* Second album card */}
        <motion.div
          className="
            absolute
            w-[315px]
            h-[395px]
            rounded-[25px]
            bg-white/90
            shadow-[0_20px_50px_rgba(0,0,0,0.08)]
            rotate-[4deg]
            border
            border-pink-100
          "
        />

        {/* Ribbon behind album */}
        <div className="
          absolute
          left-[35px]
          top-[185px]
          w-[380px]
          h-[18px]
          bg-gradient-to-r
          from-transparent
          via-pink-300/70
          to-transparent
          rotate-[-8deg]
          blur-[0.2px]
        " />

        {/* Main Polaroid */}
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
            className="
              absolute
              top-[23px]
              left-1/2
              -translate-x-1/2
              w-[292px]
              h-[385px]
              md:w-[305px]
              md:h-[395px]
              bg-[#fffdfd]
              rounded-[20px]
              p-3
              pb-12
              shadow-[0_25px_65px_rgba(0,0,0,0.18)]
              border
              border-white
              cursor-pointer
              z-20
            "
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* Tape */}
            <motion.div
              className="
                absolute
                -top-[12px]
                left-1/2
                -translate-x-1/2
                w-[88px]
                h-[27px]
                bg-pink-200/90
                rounded-sm
                rotate-[-3deg]
                z-30
                shadow-sm
              "
              animate={{
                rotate: [-3, 1, -3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <Heart
                size={14}
                fill="currentColor"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500"
              />
            </motion.div>

            {/* Photo */}
            <div className="
              relative
              w-full
              h-full
              rounded-[14px]
              overflow-hidden
              bg-slate-100
              border
              border-pink-50
            ">
              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="
                  w-full
                  h-full
                  object-cover
                  pointer-events-none
                  select-none
                "
                draggable="false"
              />

              {/* soft photo glow */}
              <div className="
                absolute
                inset-0
                bg-gradient-to-t
                from-pink-500/10
                via-transparent
                to-white/10
                pointer-events-none
              " />

              {/* moving light */}
              <motion.div
                className="
                  absolute
                  top-0
                  -left-[70%]
                  w-[40%]
                  h-full
                  bg-white/20
                  skew-x-[-20deg]
                  pointer-events-none
                "
                animate={{
                  left: ["-70%", "140%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Caption */}
            <div className="
              absolute
              bottom-2
              left-0
              right-0
              text-center
            ">
              <span className="
                font-hand
                text-sm
                text-slate-400
              ">
                a little piece of us ♡
              </span>
            </div>

            {/* tiny corner heart */}
            <Heart
              size={16}
              fill="currentColor"
              className="
                absolute
                right-4
                bottom-3
                text-pink-300
              "
            />
          </motion.div>
        </AnimatePresence>

        {/* Flower decoration */}
        <motion.div
          className="
            absolute
            left-[25px]
            bottom-[42px]
            z-30
          "
          animate={{
            y: [0, -3, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <div className="relative">
            <Flower2
              size={48}
              strokeWidth={1.3}
              className="text-pink-300"
            />

            <div className="
              absolute
              top-[18px]
              left-[19px]
              w-3
              h-3
              rounded-full
              bg-yellow-200
            " />
          </div>
        </motion.div>

        {/* Right decorative sparkle */}
        <motion.div
          className="
            absolute
            right-[27px]
            top-[135px]
            z-30
          "
          animate={{
            rotate: [0, 90, 180],
            scale: [0.8, 1.15, 0.8],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <Sparkles
            size={25}
            className="text-pink-300"
          />
        </motion.div>

        {/* Next arrow */}
        <motion.div
          className="
            absolute
            right-[12px]
            md:right-[18px]
            top-1/2
            -translate-y-1/2
            z-40
            w-9
            h-9
            rounded-full
            bg-white/90
            backdrop-blur-md
            shadow-[0_5px_20px_rgba(236,72,153,0.15)]
            border
            border-pink-100
            flex
            items-center
            justify-center
            pointer-events-none
          "
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

        {/* Tap hint */}
        <motion.div
          className="
            absolute
            bottom-[5px]
            left-1/2
            -translate-x-1/2
            z-40
            pointer-events-none
          "
          animate={{
            y: [0, 4, 0],
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="
            px-4
            py-1.5
            rounded-full
            bg-white/85
            backdrop-blur-md
            shadow-sm
            border
            border-pink-100
          ">
            <span className="text-xs text-pink-400">
              tap for next memory ♡
            </span>
          </div>
        </motion.div>
      </div>

      {/* --------------------------------
          COUNTER
      --------------------------------- */}

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
        <div className="
          flex
          items-center
          gap-4
          text-sm
          text-slate-400
        ">
          <span className="w-10 h-px bg-pink-300" />

          <span className="
            tracking-[0.2em]
            font-medium
            text-purple-400
          ">
            {String(currentIndex + 1).padStart(2, "0")}
            {" / "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-10 h-px bg-pink-300" />
        </div>
      </motion.div>

      {/* --------------------------------
          LETTER BUTTON
      --------------------------------- */}

      <motion.div
        className="shrink-0 z-30 mb-5"
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
        <div className="relative">

          {/* button glow */}
          <motion.div
            className="
              absolute
              inset-0
              rounded-full
              bg-pink-400/25
              blur-xl
            "
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.95, 1.08, 0.95],
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
            icon={<Mail size={18} />}
          />
        </div>
      </motion.div>

    </div>
  );
}

export default MemoriesScreen;
