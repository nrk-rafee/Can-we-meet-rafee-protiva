"use client";

import { useEffect, useRef, useState } from "react";
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

const floatingHearts = [
  {
    left: "calc(50% - 190px)",
    top: "43%",
    size: 15,
    delay: 0,
    duration: 4,
  },
  {
    left: "calc(50% + 180px)",
    top: "40%",
    size: 17,
    delay: 1,
    duration: 4.5,
  },
  {
    left: "calc(50% - 205px)",
    top: "66%",
    size: 12,
    delay: 1.8,
    duration: 3.8,
  },
  {
    left: "calc(50% + 195px)",
    top: "68%",
    size: 14,
    delay: 0.7,
    duration: 4.2,
  },
];

const sparkles = [
  {
    left: "calc(50% - 165px)",
    top: "38%",
    delay: 0,
  },
  {
    left: "calc(50% + 165px)",
    top: "52%",
    delay: 0.8,
  },
  {
    left: "calc(50% - 170px)",
    top: "73%",
    delay: 1.5,
  },
  {
    left: "calc(50% + 160px)",
    top: "74%",
    delay: 0.4,
  },
];

function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const [collectedHearts, setCollectedHearts] = useState(0);
  const [collectible, setCollectible] = useState(null);

  const [touchEffects, setTouchEffects] = useState([]);

  const effectIdRef = useRef(0);
  const collectibleTimerRef = useRef(null);

  const currentPhoto = memories[currentIndex];

  /*
   * -----------------------------
   * NEXT MEMORY
   * -----------------------------
   */

  const nextPhoto = () => {
    setDirection(1);

    setCurrentIndex((prev) =>
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  /*
   * -----------------------------
   * CREATE TOUCH LOVE EFFECT
   * -----------------------------
   */

  const createTouchEffect = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    const id = effectIdRef.current++;

    const items = [
      "❤️",
      "💗",
      "💕",
      "🌸",
      "✨",
    ];

    const selected =
      items[Math.floor(Math.random() * items.length)];

    const effect = {
      id,
      x,
      y,
      emoji: selected,
      drift:
        Math.random() > 0.5
          ? Math.random() * 60 - 30
          : Math.random() * 40 - 20,
      rotate: Math.random() * 50 - 25,
    };

    setTouchEffects((prev) => [...prev, effect]);

    setTimeout(() => {
      setTouchEffects((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }, 1700);
  };

  /*
   * -----------------------------
   * COLLECTIBLE HEART
   * -----------------------------
   */

  const createCollectible = () => {
    /*
     * Keep collectible mostly around the
     * left/right empty areas so the album
     * remains the main focus.
     */

    const side = Math.random() > 0.5 ? "left" : "right";

    const x =
      side === "left"
        ? Math.random() * 25 + 5
        : Math.random() * 25 + 70;

    setCollectible({
      id: Date.now(),
      x,
      duration: Math.random() * 2 + 4,
      rotate:
        Math.random() > 0.5
          ? Math.random() * 25
          : -Math.random() * 25,
    });
  };

  const collectHeart = (event) => {
    event.stopPropagation();

    setCollectedHearts((prev) => prev + 1);

    setCollectible(null);

    /*
     * Create a small celebration burst
     */

    const rect =
      event.currentTarget.parentElement.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) / rect.width) * 100;

    const y =
      ((event.clientY - rect.top) / rect.height) * 100;

    const newEffects = [];

    for (let i = 0; i < 5; i++) {
      newEffects.push({
        id: effectIdRef.current++,
        x,
        y,
        emoji:
          i % 2 === 0
            ? "💗"
            : "✨",
        drift:
          Math.random() * 100 - 50,
        rotate:
          Math.random() * 60 - 30,
      });
    }

    setTouchEffects((prev) => [
      ...prev,
      ...newEffects,
    ]);

    setTimeout(() => {
      const ids = newEffects.map((item) => item.id);

      setTouchEffects((prev) =>
        prev.filter(
          (item) => !ids.includes(item.id)
        )
      );
    }, 1500);

    /*
     * Spawn next collectible
     */

    collectibleTimerRef.current = setTimeout(() => {
      createCollectible();
    }, 650);
  };

  /*
   * First collectible
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      createCollectible();
    }, 1800);

    return () => {
      clearTimeout(timer);

      if (collectibleTimerRef.current) {
        clearTimeout(collectibleTimerRef.current);
      }
    };
  }, []);

  /*
   * If a heart survives too long,
   * send another one.
   */

  useEffect(() => {
    if (!collectible) return;

    const timer = setTimeout(() => {
      setCollectible(null);

      collectibleTimerRef.current = setTimeout(() => {
        createCollectible();
      }, 500);
    }, collectible.duration * 1000 + 500);

    return () => clearTimeout(timer);
  }, [collectible]);

  return (
    <div
      className="relative flex flex-col justify-center items-center w-full min-h-screen h-full overflow-visible touch-manipulation select-none"
      onPointerDown={createTouchEffect}
    >

      {/* =====================================
          SOFT BACKGROUND LIGHT
      ====================================== */}

      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
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
        className="absolute w-[250px] h-[250px] rounded-full bg-purple-200/15 blur-3xl pointer-events-none"
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

      {/* =====================================
          FLOATING DECORATION
      ====================================== */}

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

      {/* =====================================
          TOUCH EFFECTS
      ====================================== */}

      <AnimatePresence>
        {touchEffects.map((effect) => (
          <motion.div
            key={effect.id}
            className="absolute pointer-events-none z-[80] text-xl"
            style={{
              left: `${effect.x}%`,
              top: `${effect.y}%`,
            }}
            initial={{
              opacity: 0,
              scale: 0.4,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1.15, 1, 0.7],
              x: [
                "-50%",
                `calc(-50% + ${effect.drift}px)`,
                `calc(-50% + ${effect.drift * 1.4}px)`,
              ],
              y: [
                "-50%",
                "-100%",
                "-210%",
              ],
              rotate: effect.rotate,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1.55,
              ease: "easeOut",
            }}
          >
            {effect.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* =====================================
          COLLECTIBLE HEART
      ====================================== */}

      <AnimatePresence>
        {collectible && (
          <motion.button
            type="button"
            aria-label="Collect the heart"
            onPointerDown={collectHeart}
            className="absolute z-[100] w-12 h-12 flex items-center justify-center rounded-full cursor-pointer bg-white/60 backdrop-blur-sm border border-pink-100 shadow-lg"
            style={{
              left: `${collectible.x}%`,
              top: "-20px",
              transform: "translateX(-50%)",
            }}
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: [0, 1, 1, 1],
              scale: [0.4, 1.1, 1, 1.05],
              y: "105vh",
              rotate: [
                0,
                collectible.rotate,
                -collectible.rotate,
                0,
              ],
            }}
            exit={{
              opacity: 0,
              scale: 1.8,
            }}
            transition={{
              duration: collectible.duration,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
            >
              <Heart
                size={25}
                fill="currentColor"
                className="text-pink-400 drop-shadow-sm"
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* =====================================
          HEADER
      ====================================== */}

      <motion.div
        className="text-center z-10 mt-4 pointer-events-none"
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

      {/* =====================================
          GAME INFO
      ====================================== */}

      <motion.div
        className="z-30 mt-3 flex items-center gap-2"
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-sm border border-pink-100 shadow-sm flex items-center gap-1.5">

          <Heart
            size={14}
            fill="currentColor"
            className="text-pink-400"
          />

          <span className="text-xs font-medium text-slate-500">
            Hearts Collected:
          </span>

          <motion.span
            key={collectedHearts}
            initial={{
              scale: 1.5,
              color: "#ec4899",
            }}
            animate={{
              scale: 1,
              color: "#64748b",
            }}
            className="text-xs font-bold"
          >
            {collectedHearts}
          </motion.span>

        </div>
      </motion.div>

      {/* =====================================
          PHOTO DOTS
      ====================================== */}

      <div className="flex items-center justify-center gap-2 mt-4 mb-1 z-20 pointer-events-none">
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

      {/* =====================================
          ALBUM
      ====================================== */}

      <div className="relative w-full max-w-[420px] h-[425px] md:h-[450px] my-2 flex items-center justify-center z-10">

        {/* Album frame */}

        <motion.div
          className="absolute w-[315px] h-[370px] md:w-[350px] md:h-[395px] rounded-[28px] border-2 border-dashed border-pink-200/70 pointer-events-none"
          animate={{
            rotate: [
              0,
              0.7,
              0,
              -0.7,
              0,
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

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
            className="absolute top-7 left-1/2 -translate-x-1/2 w-[275px] h-[340px] md:w-[300px] md:h-[365px] bg-[#fffdfd] rounded-2xl p-3 pb-12 shadow-[0_18px_45px_rgba(0,0,0,0.13)] border border-pink-100 cursor-pointer z-20"
            onClick={nextPhoto}
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
                alt={`Memory ${currentIndex + 1}`}
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

            <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Next indicator */}

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

      {/* =====================================
          PHOTO COUNTER
      ====================================== */}

      <motion.div
        className="z-20 -mt-1 mb-2 pointer-events-none"
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
            {" / "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-9 h-px bg-pink-200" />

        </div>
      </motion.div>

      {/* =====================================
          TOUCH INSTRUCTION
      ====================================== */}

      <motion.div
        className="z-20 mb-3 pointer-events-none flex items-center gap-2"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: [0.55, 1, 0.55],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
      >
        <Flower2
          size={14}
          className="text-pink-300"
        />

        <span className="text-xs text-slate-400">
          touch anywhere for a little love ♡
        </span>

        <Flower2
          size={14}
          className="text-pink-300"
        />
      </motion.div>

      {/* =====================================
          LETTER BUTTON
      ====================================== */}

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
