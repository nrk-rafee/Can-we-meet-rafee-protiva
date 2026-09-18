"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  LockKeyhole,
  Sun,
  Moon,
  Stars,
} from "lucide-react";
import Button from "../Button";

const letterText = `My Dearest,

Every single day we spend apart only makes me realize how much you truly mean to me. The distance is hard sometimes, but it's just a test of how far our love can travel.

I count the days until I can finally hold you in my arms again. You are my home, my favorite person, and my safe place.

Even when we are miles apart, I carry you in my heart everywhere I go. I miss your smile, your laugh, and just simply being next to you.

Thank you for being the best part of my life. I promise the wait will be worth it when I finally get to see you again.

Forever Yours,
Me Rafee:)`;

/* =========================================================
   REALISTIC-LOOKING FLYING BIRD
   ========================================================= */

function FlyingBird({ size = 1, duration = 12, delay = 0, top = "20%" }) {
  return (
    <motion.div
      className="absolute pointer-events-none z-[5]"
      style={{
        top,
        width: `${74 * size}px`,
        height: `${50 * size}px`,
      }}
      initial={{
        x: "-20vw",
        y: 0,
        opacity: 0,
      }}
      animate={{
        x: "120vw",
        y: [0, -18 * size, 5 * size, -12 * size, 0],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut",
      }}
    >
      <motion.svg
        viewBox="0 0 160 100"
        className="w-full h-full overflow-visible"
        animate={{
          y: [0, -2, 0, 2, 0],
        }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id={`birdBody-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="55%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id={`birdWing-${size}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="65%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Main body */}
        <ellipse
          cx="82"
          cy="54"
          rx="27"
          ry="13"
          fill={`url(#birdBody-${size})`}
        />

        {/* Head */}
        <circle
          cx="108"
          cy="47"
          r="11"
          fill="#1e293b"
        />

        {/* Beak */}
        <path
          d="M118 47 L133 51 L118 55 Z"
          fill="#c08457"
        />

        {/* Tail feathers */}
        <path
          d="M58 52 C43 42, 30 37, 17 40 C30 47, 42 54, 56 59 Z"
          fill="#1e293b"
        />

        <path
          d="M57 58 C40 59, 27 66, 18 76 C35 70, 47 67, 61 64 Z"
          fill="#334155"
        />

        {/* Upper wing */}
        <motion.g
          style={{
            transformOrigin: "76px 48px",
          }}
          animate={{
            rotate: [0, 18, -5, 18, 0],
          }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M78 49 C65 20, 42 7, 18 12 C34 27, 48 42, 70 56 Z"
            fill={`url(#birdWing-${size})`}
          />

          {/* Wing feather lines */}
          <path
            d="M63 42 C50 27, 38 19, 26 16"
            stroke="#64748b"
            strokeWidth="2"
            opacity="0.65"
            fill="none"
          />

          <path
            d="M67 48 C51 37, 41 30, 31 25"
            stroke="#64748b"
            strokeWidth="1.7"
            opacity="0.5"
            fill="none"
          />

          <path
            d="M70 53 C54 46, 44 40, 35 35"
            stroke="#64748b"
            strokeWidth="1.5"
            opacity="0.4"
            fill="none"
          />
        </motion.g>

        {/* Lower wing */}
        <motion.g
          style={{
            transformOrigin: "78px 56px",
          }}
          animate={{
            rotate: [0, -22, 5, -22, 0],
          }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M77 55 C60 62, 48 76, 45 92 C62 84, 77 76, 88 62 Z"
            fill="#334155"
          />

          <path
            d="M71 65 C62 72, 56 79, 52 86"
            stroke="#64748b"
            strokeWidth="1.7"
            opacity="0.45"
            fill="none"
          />

          <path
            d="M78 62 C69 72, 65 80, 62 87"
            stroke="#64748b"
            strokeWidth="1.5"
            opacity="0.35"
            fill="none"
          />
        </motion.g>

        {/* Eye */}
        <circle
          cx="111"
          cy="44"
          r="2.2"
          fill="#f8fafc"
        />

        <circle
          cx="111.5"
          cy="44"
          r="0.9"
          fill="#020617"
        />
      </motion.svg>
    </motion.div>
  );
}

/* =========================================================
   NIGHT STARS
   ========================================================= */

function NightStars() {
  const stars = [
    { left: "8%", top: "13%", size: 3, delay: 0 },
    { left: "18%", top: "28%", size: 2, delay: 1 },
    { left: "31%", top: "9%", size: 2, delay: 1.5 },
    { left: "47%", top: "19%", size: 3, delay: 0.5 },
    { left: "61%", top: "11%", size: 2, delay: 2 },
    { left: "74%", top: "25%", size: 3, delay: 0.8 },
    { left: "88%", top: "14%", size: 2, delay: 1.2 },
    { left: "94%", top: "39%", size: 3, delay: 0.3 },
    { left: "11%", top: "63%", size: 2, delay: 1.8 },
    { left: "86%", top: "67%", size: 2, delay: 1.4 },
    { left: "6%", top: "82%", size: 3, delay: 0.9 },
    { left: "91%", top: "84%", size: 3, delay: 2.1 },
  ];

  return (
    <>
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-[2]"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 1, 0.25],
            scale: [0.7, 1.3, 0.7],
          }}
          transition={{
            duration: 2.5 + (index % 3),
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

/* =========================================================
   MAIN LETTER SCREEN
   ========================================================= */

export default function LetterScreen({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isNight, setIsNight] = useState(false);

  const openLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen h-full overflow-visible px-4">

      {/* =====================================================
          FULL SCREEN DAY / NIGHT BACKGROUND
      ===================================================== */}

      <motion.div
        className="fixed inset-0 pointer-events-none z-[-5]"
        animate={{
          background: isNight
            ? "radial-gradient(circle at 50% 15%, #29345f 0%, #11182f 38%, #080b18 100%)"
            : "radial-gradient(circle at 50% 20%, #fff9fa 0%, #fff2f5 48%, #ffe8ef 100%)",
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
      />

      {/* Soft center glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[-4]"
        animate={{
          opacity: isNight ? 0.8 : 1,
          background: isNight
            ? "radial-gradient(circle at 50% 45%, rgba(100,116,180,0.16), transparent 55%)"
            : "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.72), transparent 58%)",
        }}
        transition={{
          duration: 1,
        }}
      />

      {/* =====================================================
          DAY MODE BIRDS
      ===================================================== */}

      <AnimatePresence>
        {!isNight && (
          <>
            <FlyingBird
              size={0.72}
              duration={13}
              delay={0}
              top="18%"
            />

            <FlyingBird
              size={0.5}
              duration={16}
              delay={4}
              top="30%"
            />

            <FlyingBird
              size={0.62}
              duration={14}
              delay={7}
              top="67%"
            />

            <FlyingBird
              size={0.42}
              duration={18}
              delay={10}
              top="78%"
            />
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          NIGHT MODE
      ===================================================== */}

      <AnimatePresence>
        {isNight && (
          <>
            <NightStars />

            {/* Moon */}
            <motion.div
              className="fixed right-7 top-[12%] md:right-12 md:top-[10%] z-[3] pointer-events-none"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <div className="relative">
                <div className="absolute inset-[-18px] rounded-full bg-indigo-200/10 blur-xl" />

                <div className="w-[58px] h-[58px] md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-[#fffdf2] via-[#f8f4d8] to-[#d9d7c0] shadow-[0_0_35px_rgba(255,255,220,0.35)]" />

                {/* Moon craters */}
                <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-slate-300/25" />
                <div className="absolute top-8 right-4 w-4 h-4 rounded-full bg-slate-300/20" />
                <div className="absolute bottom-3 left-6 w-2 h-2 rounded-full bg-slate-300/25" />
              </div>
            </motion.div>

            {/* Night floating glow */}
            <motion.div
              className="fixed left-[12%] top-[42%] w-2 h-2 rounded-full bg-indigo-200 pointer-events-none z-[3]"
              animate={{
                y: [0, -25, 0],
                opacity: [0.15, 0.8, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="fixed right-[14%] top-[58%] w-1.5 h-1.5 rounded-full bg-purple-200 pointer-events-none z-[3]"
              animate={{
                y: [0, -18, 0],
                opacity: [0.1, 0.7, 0.1],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* =====================================================
          DAY/NIGHT TOGGLE
      ===================================================== */}

      <motion.button
        type="button"
        onClick={() => setIsNight((prev) => !prev)}
        className={`fixed top-4 right-4 md:top-6 md:right-7 z-[100] flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-xl border shadow-lg transition-all duration-500 ${
          isNight
            ? "bg-white/10 border-white/20 text-white shadow-indigo-900/30"
            : "bg-white/75 border-pink-200/70 text-slate-600 shadow-pink-200/40"
        }`}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.94,
        }}
        aria-label={
          isNight
            ? "Switch to day mode"
            : "Switch to night mode"
        }
      >
        <AnimatePresence mode="wait">
          {isNight ? (
            <motion.div
              key="sun"
              initial={{
                opacity: 0,
                rotate: -90,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 90,
                scale: 0.5,
              }}
            >
              <Sun size={17} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{
                opacity: 0,
                rotate: 90,
                scale: 0.5,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: -90,
                scale: 0.5,
              }}
            >
              <Moon size={17} />
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-xs font-semibold tracking-wide">
          {isNight ? "Day" : "Night"}
        </span>

        <motion.div
          className={`w-7 h-4 rounded-full relative ${
            isNight
              ? "bg-indigo-400/50"
              : "bg-pink-200"
          }`}
        >
          <motion.div
            className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm"
            animate={{
              left: isNight ? "14px" : "2px",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        </motion.div>
      </motion.button>

      {/* =====================================================
          SOFT CENTER GLOW
      ===================================================== */}

      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: isNight
            ? [0.15, 0.3, 0.15]
            : [0.3, 0.55, 0.3],
          backgroundColor: isNight
            ? "rgba(129,140,248,0.16)"
            : "rgba(244,114,182,0.13)",
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="text-center z-20 shrink-0"
        initial={{
          opacity: 0,
          y: 15,
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
        <motion.span
          className={`font-bold tracking-[0.25em] uppercase text-xs mb-2 block ${
            isNight
              ? "text-pink-300"
              : "text-rose-400"
          }`}
          animate={{
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          A Message For You
        </motion.span>

        <motion.h2
          className={`text-3xl md:text-5xl font-bold transition-colors duration-700 ${
            isNight
              ? "text-white"
              : "text-slate-700"
          }`}
        >
          From My Heart
        </motion.h2>

        {!isOpen && (
          <motion.p
            className={`mt-3 text-sm transition-colors duration-700 ${
              isNight
                ? "text-indigo-200/70"
                : "text-slate-400"
            }`}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.5,
            }}
          >
            There&apos;s something waiting inside ♡
          </motion.p>
        )}
      </motion.div>

      {/* =====================================================
          MAIN LETTER AREA
      ===================================================== */}

      <div
        className={`relative w-full max-w-md flex items-center justify-center z-10 transition-all duration-500 ${
          isOpen
            ? "my-5 min-h-[430px]"
            : "my-10 min-h-[330px]"
        }`}
      >
        <AnimatePresence mode="wait">

          {/* =================================================
              CLOSED ENVELOPE
          ================================================= */}

          {!isOpen && (
            <motion.div
              key="envelope"
              className="relative w-full max-w-[420px] h-[270px] cursor-pointer select-none"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 120,
              }}
              onClick={openLetter}
              whileHover={{
                y: -5,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.97,
              }}
            >
              {/* Envelope glow */}
              <motion.div
                className="absolute inset-5 rounded-[28px] bg-pink-300/30 blur-2xl pointer-events-none"
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.95, 1.04, 0.95],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Envelope */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#fff4f6] via-[#ffe7ec] to-[#ffdce5] border border-pink-200 shadow-[0_20px_55px_rgba(236,72,153,0.18)] overflow-hidden">

                {/* Left fold */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath:
                      "polygon(0 0, 50% 52%, 0 100%)",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(255,210,222,0.75))",
                  }}
                />

                {/* Right fold */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath:
                      "polygon(100% 0, 50% 52%, 100% 100%)",
                    background:
                      "linear-gradient(215deg, rgba(255,255,255,0.65), rgba(255,205,218,0.72))",
                  }}
                />

                {/* Bottom fold */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath:
                      "polygon(0 100%, 50% 50%, 100% 100%)",
                    background:
                      "linear-gradient(180deg, rgba(255,222,231,0.7), rgba(255,194,209,0.95))",
                  }}
                />

                {/* Decorative corner */}
                <motion.div
                  className="absolute top-4 right-4 w-11 h-11 rounded-lg border border-dashed border-pink-300/80 flex items-center justify-center bg-white/30"
                  animate={{
                    rotate: [0, 3, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles
                    size={20}
                    className="text-pink-400"
                  />
                </motion.div>

                {/* Heart seal */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{
                    y: [0, -4, 0],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-xl" />

                    <div className="relative w-[82px] h-[82px] rounded-full bg-gradient-to-br from-[#ff6b91] to-[#f43f6f] border-[5px] border-white shadow-[0_10px_25px_rgba(244,63,111,0.25)] flex items-center justify-center">
                      <Heart
                        size={38}
                        className="text-white fill-white"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Tap text */}
                <motion.div
                  className="absolute left-0 right-0 bottom-[45px] text-center z-20"
                  animate={{
                    opacity: [0.65, 1, 0.65],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <LockKeyhole
                      size={15}
                      className="text-rose-500"
                    />

                    <span className="text-rose-500 font-bold tracking-wide text-sm">
                      TAP TO OPEN
                    </span>
                  </div>
                </motion.div>

                <div className="absolute left-0 right-0 bottom-4 text-center z-20">
                  <span className="text-xs text-slate-400">
                    A little something from my heart ♡
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* =================================================
              OPEN LETTER
          ================================================= */}

          {isOpen && (
            <motion.div
              key="opened"
              className="relative w-full max-w-[430px]"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              {/* Envelope behind */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-[20px] w-[390px] h-[240px] rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg"
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.6,
                }}
              />

              {/* Letter paper */}
              <motion.div
                className={`relative z-10 w-full min-h-[400px] max-h-[58vh] rounded-2xl border overflow-hidden shadow-[0_22px_60px_rgba(0,0,0,0.12)] transition-all duration-700 ${
                  isNight
                    ? "bg-[#151b35] border-indigo-300/20 shadow-[0_25px_70px_rgba(15,23,42,0.45)]"
                    : "bg-[#fffdf8] border-pink-100"
                }`}
                initial={{
                  y: 90,
                  scale: 0.78,
                  rotate: 1,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.45,
                  type: "spring",
                  damping: 18,
                  stiffness: 100,
                }}
              >
                {/* Top decorative line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 ${
                    isNight
                      ? "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                      : "bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200"
                  }`}
                />

                {/* Top heart */}
                <motion.div
                  className="absolute top-4 right-5"
                  initial={{
                    scale: 0,
                    rotate: -30,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    delay: 1,
                    type: "spring",
                  }}
                >
                  <Heart
                    size={22}
                    className={
                      isNight
                        ? "text-pink-300 fill-pink-300/30"
                        : "text-pink-400 fill-pink-200"
                    }
                  />
                </motion.div>

                {/* Letter Header */}
                <div
                  className={`pt-7 pb-4 px-6 md:px-8 border-b transition-colors duration-700 ${
                    isNight
                      ? "border-indigo-300/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/5"
                      : "border-pink-100 bg-gradient-to-r from-pink-50/70 to-white"
                  }`}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 1.05,
                    }}
                    className="flex items-center gap-2"
                  >
                    <Heart
                      size={18}
                      className={
                        isNight
                          ? "text-pink-300 fill-pink-300/40"
                          : "text-pink-400 fill-pink-300"
                      }
                    />

                    <span
                      className={`font-bold text-sm md:text-base transition-colors duration-700 ${
                        isNight
                          ? "text-white/90"
                          : "text-slate-600"
                      }`}
                    >
                      For My Favorite Person
                    </span>
                  </motion.div>
                </div>

                {/* Letter body */}
                <div className="overflow-y-auto max-h-[45vh] p-6 md:p-8 pb-10">
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 1.2,
                      duration: 0.7,
                    }}
                    className={`font-hand text-lg md:text-2xl leading-relaxed whitespace-pre-wrap transition-colors duration-700 ${
                      isNight
                        ? "text-indigo-50/90"
                        : "text-slate-700"
                    }`}
                  >
                    {letterText}
                  </motion.div>
                </div>
              </motion.div>

              {/* =================================================
                  FLOATING HEARTS
              ================================================= */}

              {[0, 1, 2, 3].map((item) => (
                <motion.div
                  key={`heart-${item}`}
                  className="absolute z-30 pointer-events-none"
                  style={{
                    left:
                      item % 2 === 0
                        ? "12%"
                        : "82%",
                    bottom: "45%",
                  }}
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -100 - item * 15,
                    x:
                      item % 2 === 0
                        ? -20
                        : 20,
                    scale: [0.5, 1, 0.7],
                    rotate:
                      item % 2 === 0
                        ? -20
                        : 20,
                  }}
                  transition={{
                    delay: 0.7 + item * 0.18,
                    duration: 2.2,
                    ease: "easeOut",
                  }}
                >
                  <Heart
                    size={item % 2 === 0 ? 18 : 14}
                    className={
                      isNight
                        ? "text-pink-300 fill-pink-300/40"
                        : "text-pink-400 fill-pink-300"
                    }
                  />
                </motion.div>
              ))}

              {/* Sparkles */}
              {[0, 1, 2].map((item) => (
                <motion.div
                  key={`sparkle-${item}`}
                  className="absolute pointer-events-none z-30"
                  style={{
                    left:
                      item === 0
                        ? "5%"
                        : item === 1
                        ? "90%"
                        : "50%",
                    top:
                      item === 0
                        ? "25%"
                        : item === 1
                        ? "30%"
                        : "8%",
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.3, 0],
                    rotate: [0, 90, 180],
                  }}
                  transition={{
                    delay: 0.8 + item * 0.2,
                    duration: 1.8,
                  }}
                >
                  <Sparkles
                    size={18}
                    className={
                      isNight
                        ? "text-indigo-200"
                        : "text-purple-300"
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          NEXT BUTTON
      ===================================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="z-30 mb-4"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.7,
              duration: 0.6,
            }}
          >
            <Button
              onClick={onNext}
              text="One Last Thing"
              icon={<Sparkles size={18} />}
              animateIcon={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          SMALL MODE LABEL
      ===================================================== */}

      <motion.div
        className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-[10px] tracking-[0.2em] uppercase transition-colors duration-700 ${
          isNight
            ? "text-white/25"
            : "text-slate-400/50"
        }`}
        animate={{
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        {isNight
          ? "under the same moon ♡"
          : "under the same sky ♡"}
      </motion.div>
    </div>
  );
}
