"use client";

import { useEffect, useState } from "react";
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

const floatingHearts = [
  {
    left: "calc(50% - 190px)",
    top: "40%",
    size: 15,
    delay: 0,
    duration: 4,
  },
  {
    left: "calc(50% + 185px)",
    top: "44%",
    size: 17,
    delay: 1,
    duration: 4.5,
  },
  {
    left: "calc(50% - 205px)",
    top: "67%",
    size: 12,
    delay: 1.8,
    duration: 3.8,
  },
  {
    left: "calc(50% + 200px)",
    top: "70%",
    size: 14,
    delay: 0.7,
    duration: 4.2,
  },
];

const sparkles = [
  {
    left: "calc(50% - 170px)",
    top: "34%",
    delay: 0,
  },
  {
    left: "calc(50% + 170px)",
    top: "53%",
    delay: 0.8,
  },
  {
    left: "calc(50% - 175px)",
    top: "75%",
    delay: 1.5,
  },
  {
    left: "calc(50% + 165px)",
    top: "78%",
    delay: 0.4,
  },
];

function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const [fallingHearts, setFallingHearts] = useState([]);
  const [collected, setCollected] = useState(0);

  const currentPhoto = memories[currentIndex];

  /*
   * Create a falling heart.
   */
  const createHeart = (x = Math.random() * 90 + 5) => {
    const id =
      Date.now() +
      Math.random().toString(36).substring(2, 9);

    const heart = {
      id,
      x,
      size: Math.floor(Math.random() * 16) + 38,
      duration: Math.random() * 2.2 + 4.5,
      rotate: Math.random() * 50 - 25,
      drift: Math.random() * 100 - 50,
      delay: Math.random() * 0.15,
    };

    setFallingHearts((prev) => {
      const next = [...prev, heart];

      // Keep the screen light even if someone taps very fast.
      return next.slice(-28);
    });
  };

  /*
   * Naturally keep hearts falling from the sky.
   */
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      for (let i = 0; i < 7; i++) {
        setTimeout(() => {
          createHeart(Math.random() * 90 + 5);
        }, i * 180);
      }
    }, 500);

    const interval = setInterval(() => {
      createHeart(Math.random() * 90 + 5);
    }, 950);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  /*
   * Tap anywhere:
   * create a little heart shower around that area.
   */
  const handleScreenTap = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const tapX =
      ((event.clientX - rect.left) / rect.width) * 100;

    const safeX = Math.max(8, Math.min(92, tapX));

    // Create several hearts around the tapped position.
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        const spread = Math.random() * 18 - 9;
        createHeart(
          Math.max(
            5,
            Math.min(95, safeX + spread)
          )
        );
      }, i * 110);
    }
  };

  /*
   * Collect heart.
   */
  const collectHeart = (id) => {
    setFallingHearts((prev) =>
      prev.filter((heart) => heart.id !== id)
    );

    setCollected((prev) => prev + 1);
  };

  /*
   * Remove heart after it reaches the bottom.
   */
  const removeHeart = (id) => {
    setFallingHearts((prev) =>
      prev.filter((heart) => heart.id !== id)
    );
  };

  const nextPhoto = () => {
    setDirection(1);

    setCurrentIndex((prev) =>
      prev === memories.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center w-full min-h-screen h-full overflow-visible select-none touch-manipulation"
      onPointerDownCapture={handleScreenTap}
    >

      {/* =====================================================
          SOFT BACKGROUND GLOW
      ====================================================== */}

      <motion.div
        className="absolute w-[390px] h-[390px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[280px] h-[280px] rounded-full bg-purple-200/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* =====================================================
          FALLING HEART GAME
      ====================================================== */}

      <div className="absolute inset-0 z-[60] pointer-events-none overflow-hidden">

        <AnimatePresence>
          {fallingHearts.map((heart) => (
            <motion.button
              key={heart.id}
              type="button"
              aria-label="Collect heart"
              className="absolute pointer-events-auto flex items-center justify-center rounded-full cursor-pointer outline-none"
              style={{
                left: `${heart.x}%`,
                top: "-75px",
                width: `${heart.size + 28}px`,
                height: `${heart.size + 28}px`,
                marginLeft: `-${(heart.size + 28) / 2}px`,
                zIndex: 70,
              }}
              initial={{
                y: -20,
                x: 0,
                rotate: heart.rotate,
                scale: 0.5,
                opacity: 0,
              }}
              animate={{
                y: "115vh",
                x: heart.drift,
                rotate: [
                  heart.rotate,
                  heart.rotate + 15,
                  heart.rotate - 15,
                  heart.rotate + 10,
                ],
                scale: [0.5, 1, 1.05, 0.95],
                opacity: [0, 1, 1, 1, 0.8],
              }}
              exit={{
                scale: 1.8,
                opacity: 0,
                rotate: 25,
              }}
              transition={{
                duration: heart.duration,
                delay: heart.delay,
                ease: "linear",
              }}
              onPointerDown={(event) => {
                // Do NOT trigger screen tap.
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
                collectHeart(heart.id);
              }}
              onAnimationComplete={() => {
                removeHeart(heart.id);
              }}
              whileHover={{
                scale: 1.25,
              }}
              whileTap={{
                scale: 0.72,
              }}
            >
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-pink-300/20 blur-xl"
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />

              {/* Heart */}
              <Heart
                size={heart.size}
                strokeWidth={1.7}
                fill="#f9a8d4"
                className="relative z-10 text-pink-400 drop-shadow-[0_4px_8px_rgba(236,72,153,0.28)]"
              />

              {/* tiny shine */}
              <span className="absolute top-[7px] left-[9px] w-[5px] h-[5px] rounded-full bg-white/80 z-20" />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* =====================================================
          COLLECT COUNTER
      ====================================================== */}

      <motion.div
        className="absolute top-4 right-4 z-[80] pointer-events-none"
        initial={{
          opacity: 0,
          scale: 0.8,
          y: -10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          delay: 0.8,
          duration: 0.5,
        }}
      >
        <motion.div
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-100 shadow-[0_8px_25px_rgba(236,72,153,0.12)]"
          animate={{
            scale:
              collected > 0
                ? [1, 1.06, 1]
                : 1,
          }}
          key={collected}
        >
          <Heart
            size={16}
            fill="currentColor"
            className="text-pink-400"
          />

          <span className="text-xs font-medium text-slate-500">
            {collected} collected
          </span>
        </motion.div>
      </motion.div>

      {/* =====================================================
          SMALL INSTRUCTION
      ====================================================== */}

      <motion.div
        className="absolute top-[68px] left-1/2 -translate-x-1/2 z-[55] pointer-events-none"
        initial={{
          opacity: 0,
          y: -5,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          y: [5, 0, 0, -5],
        }}
        transition={{
          duration: 5,
          delay: 1,
          times: [0, 0.15, 0.75, 1],
        }}
      >
        <div className="px-4 py-2 rounded-full bg-white/65 backdrop-blur-sm border border-pink-100/70 shadow-sm">
          <span className="text-xs text-pink-400 whitespace-nowrap">
            catch the falling hearts ♡
          </span>
        </div>
      </motion.div>

      {/* =====================================================
          SIDE FLOATING HEARTS
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
            x: [
              0,
              index % 2 === 0 ? 5 : -5,
              0,
            ],
            opacity: [0.2, 0.7, 0.2],
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
            opacity: [0.15, 0.8, 0.15],
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

      <div className="relative w-full max-w-[420px] h-[425px] md:h-[450px] my-2 flex items-center justify-center z-20">

        {/* Album dashed frame */}
        <motion.div
          className="absolute w-[315px] h-[370px] md:w-[350px] md:h-[395px] rounded-[28px] border-2 border-dashed border-pink-200/70 pointer-events-none"
          animate={{
            rotate: [0, 0.7, 0, -0.7, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Album soft glass */}
        <motion.div
          className="absolute w-[300px] h-[355px] md:w-[335px] md:h-[380px] rounded-[26px] bg-white/35 backdrop-blur-sm pointer-events-none"
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

        {/* Tape */}
        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-100/80 rounded-sm rotate-[-2deg] z-30 pointer-events-none"
          animate={{
            rotate: [-2, 1, -2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        {/* Photo */}
        <AnimatePresence
          mode="wait"
          custom={direction}
        >
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x:
                direction > 0
                  ? 120
                  : -120,
              rotate:
                direction > 0
                  ? 5
                  : -5,
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
              x:
                direction > 0
                  ? -120
                  : 120,
              rotate:
                direction > 0
                  ? -5
                  : 5,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute top-7 left-1/2 -translate-x-1/2 w-[275px] h-[340px] md:w-[300px] md:h-[365px] bg-[#fffdfd] rounded-2xl p-3 pb-12 shadow-[0_18px_45px_rgba(0,0,0,0.13)] border border-pink-100 cursor-pointer"
            onPointerDown={(event) => {
              // Photo tap shouldn't create falling hearts.
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
              nextPhoto();
            }}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${
                  currentIndex + 1
                }`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/5 pointer-events-none" />

              <motion.div
                className="absolute inset-y-0 -left-1/2 w-1/3 bg-white/20 skew-x-[-20deg] pointer-events-none"
                animate={{
                  left: [
                    "-50%",
                    "130%",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Next arrow */}
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

        {/* Tap hint */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
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
          PHOTO COUNTER
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
            {String(
              currentIndex + 1
            ).padStart(2, "0")}{" "}
            /{" "}
            {String(
              memories.length
            ).padStart(2, "0")}
          </span>

          <span className="w-9 h-px bg-pink-200" />
        </div>
      </motion.div>

      {/* =====================================================
          BUTTON
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
        onPointerDown={(event) => {
          event.stopPropagation();
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
          TINY DECORATIONS
      ====================================================== */}

      <motion.div
        className="absolute left-[8%] top-[25%] pointer-events-none z-0"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <Star
          size={13}
          className="text-pink-200"
          fill="currentColor"
        />
      </motion.div>

      <motion.div
        className="absolute right-[8%] top-[31%] pointer-events-none z-0"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <Sparkles
          size={16}
          className="text-purple-200"
        />
      </motion.div>

    </div>
  );
}

export default MemoriesScreen;
