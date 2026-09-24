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
   REAL BUTTERFLY ASSET
   CC0 Wikimedia Commons
========================================================= */

const butterflyImage =
  "https://upload.wikimedia.org/wikipedia/commons/e/ea/Carterocephalus_silvicola_transparent.png";

/* =========================================================
   BUTTERFLIES
========================================================= */

const butterflies = [
  {
    size: 82,
    left: "3%",
    top: "20%",
    duration: 15,
    delay: 0,
    x: [0, 70, 25, 95, 0],
    y: [0, -35, 30, -20, 0],
    rotate: [-8, 10, -5, 12, -8],
    opacity: 0.92,
    blur: 0,
    scaleX: [1, 0.72, 1, 0.7, 1],
  },
  {
    size: 55,
    left: "78%",
    top: "24%",
    duration: 13,
    delay: 2,
    x: [0, -55, -20, -75, 0],
    y: [0, 30, -25, 35, 0],
    rotate: [8, -12, 5, -10, 8],
    opacity: 0.78,
    blur: 0.2,
    scaleX: [1, 0.75, 1, 0.7, 1],
  },
  {
    size: 105,
    left: "74%",
    top: "62%",
    duration: 18,
    delay: 1,
    x: [0, -85, -30, -110, 0],
    y: [0, -40, 25, -55, 0],
    rotate: [5, -8, 7, -12, 5],
    opacity: 0.88,
    blur: 0,
    scaleX: [1, 0.7, 1, 0.72, 1],
  },
  {
    size: 48,
    left: "12%",
    top: "69%",
    duration: 12,
    delay: 4,
    x: [0, 60, 20, 75, 0],
    y: [0, -25, 30, -15, 0],
    rotate: [-6, 12, -8, 10, -6],
    opacity: 0.62,
    blur: 1.2,
    scaleX: [1, 0.78, 1, 0.72, 1],
  },
  {
    size: 68,
    left: "87%",
    top: "43%",
    duration: 16,
    delay: 5,
    x: [0, -45, -90, -40, 0],
    y: [0, -35, 10, 40, 0],
    rotate: [10, -5, 12, -8, 10],
    opacity: 0.7,
    blur: 0.8,
    scaleX: [1, 0.75, 1, 0.7, 1],
  },
  {
    size: 38,
    left: "1%",
    top: "48%",
    duration: 14,
    delay: 3,
    x: [0, 45, 75, 25, 0],
    y: [0, 20, -35, 15, 0],
    rotate: [-5, 9, -8, 6, -5],
    opacity: 0.48,
    blur: 1.8,
    scaleX: [1, 0.8, 1, 0.75, 1],
  },
];

/* =========================================================
   FLOATING PETALS
========================================================= */

const petals = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  size: 5 + (index % 4) * 2,
  delay: (index % 7) * 0.7,
  duration: 7 + (index % 5),
  rotate: index % 2 === 0 ? 35 : -35,
}));

/* =========================================================
   BACKGROUND SPARKLES
========================================================= */

const sparkles = [
  { left: "8%", top: "14%", size: 14, delay: 0 },
  { left: "91%", top: "14%", size: 11, delay: 1 },
  { left: "6%", top: "83%", size: 12, delay: 1.8 },
  { left: "93%", top: "79%", size: 15, delay: 0.6 },
  { left: "17%", top: "38%", size: 8, delay: 2 },
  { left: "84%", top: "51%", size: 9, delay: 1.2 },
];

/* =========================================================
   COMPONENT
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
    <div
      className="
        relative
        flex flex-col
        justify-center
        items-center
        w-screen
        min-h-screen
        left-1/2
        -translate-x-1/2
        overflow-hidden
        bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.96)_0%,rgba(255,235,245,0.92)_34%,rgba(250,218,235,0.9)_68%,rgba(246,207,230,0.95)_100%)]
      "
    >

      {/* =====================================================
          DREAMY BACKGROUND GLOW
      ===================================================== */}

      <motion.div
        className="
          absolute
          -top-32
          left-1/2
          -translate-x-1/2
          w-[520px]
          h-[520px]
          rounded-full
          bg-pink-200/30
          blur-[100px]
          pointer-events-none
        "
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          bottom-[-160px]
          right-[-120px]
          w-[430px]
          h-[430px]
          rounded-full
          bg-purple-200/25
          blur-[100px]
          pointer-events-none
        "
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          SOFT BOKEH
      ===================================================== */}

      {[...Array(12)].map((_, index) => (
        <motion.div
          key={index}
          className="
            absolute
            rounded-full
            bg-white/45
            blur-sm
            pointer-events-none
          "
          style={{
            width: `${8 + (index % 4) * 5}px`,
            height: `${8 + (index % 4) * 5}px`,
            left: `${(index * 31) % 100}%`,
            top: `${(index * 47) % 100}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: 4 + (index % 4),
            repeat: Infinity,
            delay: index * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =====================================================
          REAL BUTTERFLIES
      ===================================================== */}

      {butterflies.map((butterfly, index) => (
        <motion.div
          key={index}
          className="
            absolute
            pointer-events-none
            z-[4]
          "
          style={{
            left: butterfly.left,
            top: butterfly.top,
          }}
          animate={{
            x: butterfly.x,
            y: butterfly.y,
            rotate: butterfly.rotate,
            scaleX: butterfly.scaleX,
          }}
          transition={{
            duration: butterfly.duration,
            delay: butterfly.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.img
            src={butterflyImage}
            alt=""
            draggable="false"
            className="select-none"
            style={{
              width: butterfly.size,
              height: "auto",
              opacity: butterfly.opacity,
              filter: `blur(${butterfly.blur}px) drop-shadow(0 7px 12px rgba(95,55,75,0.18))`,
            }}
            animate={{
              y: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: butterfly.delay,
            }}
          />
        </motion.div>
      ))}

      {/* =====================================================
          FLOATING PETALS
      ===================================================== */}

      {petals.map((petal, index) => (
        <motion.div
          key={index}
          className="
            absolute
            pointer-events-none
            z-[2]
            rounded-full
            bg-pink-300/45
          "
          style={{
            left: petal.left,
            top: petal.top,
            width: petal.size,
            height: petal.size * 1.6,
            borderRadius: "70% 30% 70% 30%",
          }}
          animate={{
            y: [0, -30, 10, -15, 0],
            x: [0, 12, -10, 8, 0],
            rotate: [
              petal.rotate,
              petal.rotate + 80,
              petal.rotate - 20,
              petal.rotate + 110,
              petal.rotate,
            ],
            opacity: [0.15, 0.55, 0.25, 0.5, 0.15],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =====================================================
          SPARKLES
      ===================================================== */}

      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-[3]"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.6, 1.25, 0.6],
            opacity: [0.2, 0.9, 0.2],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={star.size}
            className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
          />
        </motion.div>
      ))}

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="
          relative
          z-20
          text-center
          mt-2
          px-5
        "
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
        <div className="flex items-center justify-center gap-3">

          <motion.div
            animate={{
              rotate: [-6, 6, -6],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={20}
              className="text-pink-500"
            />
          </motion.div>

          <h2
            className="
              text-[32px]
              md:text-5xl
              font-black
              tracking-tight
              text-slate-700
              drop-shadow-[0_3px_0_rgba(255,255,255,0.7)]
            "
          >
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [6, -6, 6],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={20}
              className="text-pink-500"
            />
          </motion.div>
        </div>

        <motion.p
          className="
            text-xl
            md:text-2xl
            font-hand
            text-purple-500
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

      {/* =====================================================
          PHOTO DOTS
      ===================================================== */}

      <motion.div
        className="
          relative
          z-20
          flex
          items-center
          justify-center
          gap-3
          mt-4
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`
              rounded-full
              ${
                index === currentIndex
                  ? "w-3.5 h-3.5 bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.55)]"
                  : "w-2.5 h-2.5 bg-pink-200"
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
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* =====================================================
          LUXURY ALBUM AREA
      ===================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[480px]
          h-[440px]
          md:h-[465px]
          mt-1
          flex
          items-center
          justify-center
        "
      >

        {/* Golden outer halo */}

        <motion.div
          className="
            absolute
            w-[345px]
            h-[390px]
            md:w-[370px]
            md:h-[410px]
            rounded-[30px]
            border
            border-amber-200/50
            pointer-events-none
          "
          animate={{
            boxShadow: [
              "0 0 20px rgba(244,190,70,0.08)",
              "0 0 45px rgba(244,190,70,0.2)",
              "0 0 20px rgba(244,190,70,0.08)",
            ],
            rotate: [0, 0.5, 0, -0.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Back album layer */}

        <motion.div
          className="
            absolute
            w-[335px]
            h-[390px]
            md:w-[360px]
            md:h-[410px]
            rounded-[28px]
            bg-white/40
            backdrop-blur-md
            border
            border-white/70
            shadow-[0_25px_60px_rgba(126,74,110,0.12)]
          "
          animate={{
            rotate: [-2, -1, -2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Decorative pink layer */}

        <motion.div
          className="
            absolute
            w-[325px]
            h-[385px]
            md:w-[350px]
            md:h-[405px]
            rounded-[27px]
            border
            border-pink-200/70
            bg-pink-50/25
          "
          animate={{
            rotate: [2, 1, 2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ribbon behind album */}

        <motion.div
          className="
            absolute
            left-[48px]
            right-[48px]
            top-[48%]
            h-[24px]
            rounded-full
            bg-gradient-to-r
            from-pink-300/70
            via-pink-200/90
            to-pink-300/70
            shadow-[0_5px_12px_rgba(236,72,153,0.16)]
            -rotate-6
          "
          animate={{
            rotate: [-6, -5, -6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        {/* =================================================
            ACTUAL PHOTO CARD
        ================================================= */}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 100 : -100,
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
              x: direction > 0 ? -100 : 100,
              rotate: direction > 0 ? -5 : 5,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="
              absolute
              top-[18px]
              left-1/2
              -translate-x-1/2
              w-[295px]
              h-[370px]
              md:w-[315px]
              md:h-[390px]
              bg-[#fffdfb]
              rounded-[22px]
              p-3
              pb-12
              cursor-pointer
              shadow-[0_25px_55px_rgba(83,45,72,0.22)]
              border
              border-white
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

            {/* PHOTO */}

            <div
              className="
                relative
                w-full
                h-full
                rounded-[15px]
                overflow-hidden
                bg-slate-100
                border
                border-pink-100
              "
            >
              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                draggable="false"
                className="
                  w-full
                  h-full
                  object-cover
                  pointer-events-none
                  select-none
                "
              />

              {/* photo soft overlay */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-pink-500/10
                  via-transparent
                  to-white/10
                  pointer-events-none
                "
              />

              {/* moving shine */}

              <motion.div
                className="
                  absolute
                  inset-y-0
                  -left-1/2
                  w-1/3
                  bg-white/25
                  skew-x-[-20deg]
                  pointer-events-none
                "
                animate={{
                  left: ["-50%", "140%"],
                }}
                transition={{
                  duration: 3.8,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* PHOTO CAPTION */}

            <div
              className="
                absolute
                bottom-2
                left-0
                right-0
                text-center
              "
            >
              <span
                className="
                  font-hand
                  text-[15px]
                  text-slate-500
                "
              >
                a little piece of us ♡
              </span>
            </div>

            {/* small heart */}

            <motion.div
              className="
                absolute
                right-4
                bottom-3
              "
              animate={{
                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <Heart
                size={15}
                fill="currentColor"
                className="text-pink-400"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* =================================================
            TOP LUXURY TAPE
        ================================================= */}

        <motion.div
          className="
            absolute
            top-[2px]
            left-1/2
            -translate-x-1/2
            w-[92px]
            h-[25px]
            rounded-sm
            bg-gradient-to-r
            from-pink-200
            via-pink-100
            to-pink-200
            shadow-sm
            z-30
          "
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
              size={13}
              fill="currentColor"
              className="text-pink-500"
            />
          </div>
        </motion.div>

        {/* =================================================
            FLOWER DECORATION
        ================================================= */}

        <motion.div
          className="
            absolute
            left-[34px]
            bottom-[42px]
            z-30
          "
          animate={{
            rotate: [-3, 2, -3],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <Flower2
              size={48}
              strokeWidth={1.3}
              className="text-pink-300"
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Sparkles
                size={13}
                className="text-amber-300"
              />
            </div>
          </div>
        </motion.div>

        {/* =================================================
            SIDE ARROW
        ================================================= */}

        <motion.div
          className="
            absolute
            right-[18px]
            top-1/2
            -translate-y-1/2
            z-40
            w-9
            h-9
            rounded-full
            bg-white/85
            backdrop-blur-sm
            shadow-[0_5px_18px_rgba(236,72,153,0.12)]
            border
            border-pink-100
            flex
            items-center
            justify-center
          "
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
            size={18}
            className="text-pink-400"
          />
        </motion.div>
      </div>

      {/* =====================================================
          COUNTER
      ===================================================== */}

      <motion.div
        className="
          relative
          z-20
          -mt-1
          mb-3
        "
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
        <div className="flex items-center gap-4">

          <span
            className="
              w-10
              h-px
              bg-gradient-to-r
              from-transparent
              to-pink-300
            "
          />

          <span
            className="
              tracking-[0.22em]
              text-sm
              font-semibold
              text-purple-500
            "
          >
            {currentIndex + 1} / {memories.length}
          </span>

          <span
            className="
              w-10
              h-px
              bg-gradient-to-l
              from-transparent
              to-pink-300
            "
          />

        </div>
      </motion.div>

      {/* =====================================================
          NEXT BUTTON
      ===================================================== */}

      <motion.div
        className="
          relative
          z-30
          mb-4
        "
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
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

      {/* =====================================================
          BOTTOM LITTLE DECORATION
      ===================================================== */}

      <motion.div
        className="
          absolute
          bottom-1
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          text-pink-300/70
          z-10
        "
        animate={{
          opacity: [0.35, 0.8, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <Heart size={10} fill="currentColor" />
        <span className="text-[10px] tracking-[0.25em]">
          FOREVER & ALWAYS
        </span>
        <Heart size={10} fill="currentColor" />
      </motion.div>

    </div>
  );
}

export default MemoriesScreen;
