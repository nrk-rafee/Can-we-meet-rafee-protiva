"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  LockKeyhole,
  Feather,
  Sun,
  Moon,
  Star,
} from "lucide-react";
import Button from "../Button";

/* =========================================================
   LETTER CONTENT
========================================================= */

const letterParagraphs = [
  "My favorite person,",

  "Sometimes I wish I could pause time, just so I could stay a little longer in the moments when I feel closest to you.",

  "Until we meet again, I hope you remember that somewhere in this big world, there’s someone thinking about you, smiling because of you, and waiting for the next beautiful moment we get to share.",

  "Distance may keep us apart for a while, but it can never change the little place you have in my heart.",

  "I miss your smile, your laugh, and simply being next to you. Every little memory of us is something I keep close to my heart.",

  "No matter how many miles are between us, a part of me is always right there with you.",
];

/* =========================================================
   REALISTIC-STYLE BUTTERFLY
   Pure SVG — no external asset needed
========================================================= */

function Butterfly({
  className = "",
  delay = 0,
  duration = 8,
  size = 34,
  direction = 1,
}) {
  const unique = `butterfly-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <motion.div
      className={`absolute pointer-events-none z-30 ${className}`}
      initial={{
        opacity: 0,
        scale: 0.65,
        x: 0,
        y: 20,
      }}
      animate={{
        opacity: [0, 0.9, 1, 0.75, 0],
        x: [0, 18 * direction, -12 * direction, 25 * direction, 45 * direction],
        y: [20, -5, -48, -90, -130],
        rotate: [0, 5 * direction, -4 * direction, 7 * direction, 12 * direction],
        scale: [0.65, 0.9, 1, 0.9, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 3 + delay,
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
        transformOrigin: "center",
      }}
    >
      <motion.svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        style={{
          overflow: "visible",
          filter:
            "drop-shadow(0 3px 5px rgba(190,70,130,0.18))",
        }}
        animate={{
          rotateY: [0, 55, 0, -55, 0],
          rotateZ: [0, 2, -2, 2, 0],
        }}
        transition={{
          rotateY: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateZ: {
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <defs>
          {/* Left wing */}
          <linearGradient
            id={`${unique}-left`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#fff1f8" />
            <stop offset="28%" stopColor="#f9a8d4" />
            <stop offset="65%" stopColor="#ec6cae" />
            <stop offset="100%" stopColor="#b35ac4" />
          </linearGradient>

          {/* Right wing */}
          <linearGradient
            id={`${unique}-right`}
            x1="1"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#fff1f8" />
            <stop offset="28%" stopColor="#f9a8d4" />
            <stop offset="65%" stopColor="#e879b4" />
            <stop offset="100%" stopColor="#9f63c8" />
          </linearGradient>

          <radialGradient
            id={`${unique}-shine`}
            cx="50%"
            cy="35%"
            r="70%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <filter id={`${unique}-soft`}>
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* soft shadow */}
        <ellipse
          cx="80"
          cy="83"
          rx="44"
          ry="48"
          fill="#d94691"
          opacity="0.1"
          filter={`url(#${unique}-soft)`}
        />

        {/* LEFT UPPER WING */}
        <path
          d="
            M76 73
            C63 45 43 15 18 21
            C-2 26 5 59 20 76
            C34 91 54 90 75 80
            Z
          "
          fill={`url(#${unique}-left)`}
          stroke="#d765a7"
          strokeWidth="2"
        />

        {/* LEFT LOWER WING */}
        <path
          d="
            M76 82
            C55 80 28 88 25 108
            C23 126 43 133 57 120
            C68 110 74 96 79 85
            Z
          "
          fill={`url(#${unique}-left)`}
          stroke="#c96aa8"
          strokeWidth="2"
        />

        {/* RIGHT UPPER WING */}
        <path
          d="
            M84 73
            C97 45 117 15 142 21
            C162 26 155 59 140 76
            C126 91 106 90 85 80
            Z
          "
          fill={`url(#${unique}-right)`}
          stroke="#d765a7"
          strokeWidth="2"
        />

        {/* RIGHT LOWER WING */}
        <path
          d="
            M84 82
            C105 80 132 88 135 108
            C137 126 117 133 103 120
            C92 110 86 96 81 85
            Z
          "
          fill={`url(#${unique}-right)`}
          stroke="#c96aa8"
          strokeWidth="2"
        />

        {/* Wing shine */}
        <ellipse
          cx="42"
          cy="48"
          rx="23"
          ry="28"
          fill={`url(#${unique}-shine)`}
        />

        <ellipse
          cx="118"
          cy="48"
          rx="23"
          ry="28"
          fill={`url(#${unique}-shine)`}
        />

        {/* Wing veins */}
        <g
          fill="none"
          stroke="#b65391"
          strokeWidth="1.5"
          opacity="0.42"
          strokeLinecap="round"
        >
          <path d="M74 73 C54 59 37 43 19 32" />
          <path d="M72 77 C52 71 35 61 16 55" />
          <path d="M70 81 C51 82 37 80 22 75" />

          <path d="M86 73 C106 59 123 43 141 32" />
          <path d="M88 77 C108 71 125 61 144 55" />
          <path d="M90 81 C109 82 123 80 138 75" />
        </g>

        {/* Wing dots */}
        <g fill="#fff" opacity="0.68">
          <circle cx="30" cy="39" r="5" />
          <circle cx="45" cy="55" r="3.5" />
          <circle cx="29" cy="70" r="3" />

          <circle cx="130" cy="39" r="5" />
          <circle cx="115" cy="55" r="3.5" />
          <circle cx="131" cy="70" r="3" />
        </g>

        {/* BODY */}
        <ellipse
          cx="80"
          cy="81"
          rx="5.2"
          ry="29"
          fill="#5b3854"
        />

        <ellipse
          cx="80"
          cy="56"
          rx="5"
          ry="6"
          fill="#493044"
        />

        {/* Body highlights */}
        <path
          d="M78 63 C76 75 76 91 78 105"
          stroke="#b985a8"
          strokeWidth="1.4"
          opacity="0.7"
          fill="none"
          strokeLinecap="round"
        />

        {/* Antennae */}
        <path
          d="M77 58 C70 44 60 39 53 37"
          stroke="#54354e"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M83 58 C90 44 100 39 107 37"
          stroke="#54354e"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <circle cx="53" cy="37" r="2.4" fill="#54354e" />
        <circle cx="107" cy="37" r="2.4" fill="#54354e" />
      </motion.svg>
    </motion.div>
  );
}

/* =========================================================
   SMALL STARS
========================================================= */

function FloatingStars({ night }) {
  const stars = [
    { left: "8%", top: "13%", size: 8, delay: 0 },
    { left: "88%", top: "18%", size: 6, delay: 1.2 },
    { left: "12%", top: "72%", size: 5, delay: 2 },
    { left: "90%", top: "70%", size: 7, delay: 0.6 },
    { left: "18%", top: "42%", size: 4, delay: 1.7 },
    { left: "82%", top: "47%", size: 5, delay: 2.4 },
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
            opacity: night
              ? [0.15, 0.9, 0.15]
              : [0.1, 0.5, 0.1],
            scale: [0.7, 1.2, 0.7],
          }}
          transition={{
            duration: 2.8,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star
            size={star.size}
            className={
              night
                ? "text-white fill-white"
                : "text-pink-200 fill-pink-100"
            }
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
  const [opening, setOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  const handleOpen = () => {
    if (opening || isOpen) return;

    setOpening(true);

    /*
      Full opening sequence:
      0.00s  -> seal reacts
      0.15s  -> flap starts opening
      0.70s  -> letter rises
      1.45s  -> envelope disappears
      1.65s  -> open letter appears
    */

    setTimeout(() => {
      setIsOpen(true);
      setOpening(false);
    }, 1650);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full min-h-screen h-full overflow-hidden px-4 py-5 transition-colors duration-700 ${
        nightMode
          ? "text-white"
          : "text-slate-700"
      }`}
    >
      {/* =====================================================
          DAY / NIGHT BACKGROUND
      ====================================================== */}

      <motion.div
        className={`fixed inset-0 z-0 transition-all duration-700 ${
          nightMode
            ? "bg-[#090d24]"
            : "bg-[#fff7fa]"
        }`}
        animate={{
          opacity: [0.96, 1, 0.96],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Day pink glow */}
      <motion.div
        className={`fixed left-1/2 top-[38%] -translate-x-1/2 w-[470px] h-[470px] rounded-full blur-[100px] pointer-events-none z-[1] ${
          nightMode
            ? "bg-indigo-500/10"
            : "bg-pink-300/20"
        }`}
        animate={{
          scale: [1, 1.08, 1],
          opacity: nightMode
            ? [0.18, 0.3, 0.18]
            : [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple / night glow */}
      <motion.div
        className={`fixed bottom-[5%] left-1/2 -translate-x-1/2 w-[330px] h-[330px] rounded-full blur-[100px] pointer-events-none z-[1] ${
          nightMode
            ? "bg-purple-700/20"
            : "bg-purple-200/15"
        }`}
        animate={{
          scale: [1.05, 1, 1.05],
          opacity: nightMode
            ? [0.18, 0.34, 0.18]
            : [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          MOON — NIGHT
      ====================================================== */}

      <AnimatePresence>
        {nightMode && (
          <motion.div
            className="fixed right-[7%] top-[13%] z-[3] pointer-events-none"
            initial={{
              opacity: 0,
              scale: 0.5,
              y: -20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              y: -20,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="relative w-[62px] h-[62px] rounded-full bg-gradient-to-br from-[#fffde7] via-[#fff9c4] to-[#e6e4b8] shadow-[0_0_35px_rgba(255,255,210,0.55)]">
              <div className="absolute w-3 h-3 rounded-full bg-[#e4e2ba]/60 top-4 left-4" />
              <div className="absolute w-4 h-4 rounded-full bg-[#deddb5]/50 bottom-4 right-3" />
              <div className="absolute w-2 h-2 rounded-full bg-[#deddb5]/50 top-7 right-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stars */}
      <FloatingStars night={nightMode} />

      {/* =====================================================
          DAY / NIGHT TOGGLE
      ====================================================== */}

      <motion.button
        type="button"
        onClick={() => setNightMode((prev) => !prev)}
        className={`fixed top-5 right-5 z-[100] flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-xl shadow-lg transition-all duration-500 ${
          nightMode
            ? "bg-white/10 border-white/20 text-white"
            : "bg-white/75 border-pink-200 text-slate-700"
        }`}
        whileTap={{
          scale: 0.94,
        }}
        aria-label="Toggle day and night mode"
      >
        <motion.div
          animate={{
            rotate: nightMode ? 180 : 0,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {nightMode ? (
            <Moon size={17} />
          ) : (
            <Sun size={17} />
          )}
        </motion.div>

        <span className="text-xs font-semibold tracking-wide">
          {nightMode ? "Night" : "Day"}
        </span>

        <div
          className={`relative w-10 h-5 rounded-full transition-colors duration-500 ${
            nightMode
              ? "bg-purple-500/70"
              : "bg-pink-300"
          }`}
        >
          <motion.div
            className="absolute top-[3px] w-3.5 h-3.5 rounded-full bg-white shadow-md"
            animate={{
              left: nightMode ? "22px" : "3px",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        </div>
      </motion.button>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <motion.div
        className="relative z-20 text-center shrink-0 mt-8"
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
        <motion.div
          className="flex items-center justify-center gap-2 mb-1"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          <span
            className={`font-bold tracking-[0.22em] uppercase text-[10px] md:text-xs ${
              nightMode
                ? "text-pink-300"
                : "text-rose-400"
            }`}
          >
            {isOpen
              ? "FROM MY HEART ♡"
              : "A MESSAGE FOR YOU"}
          </span>
        </motion.div>

        <h2
          className={`text-3xl md:text-5xl font-bold transition-colors duration-700 ${
            nightMode
              ? "text-white"
              : "text-slate-700"
          }`}
        >
          {isOpen
            ? "A Letter For You"
            : "From My Heart"}
        </h2>

        {!isOpen && (
          <motion.p
            className={`mt-2 text-xs md:text-sm transition-colors duration-700 ${
              nightMode
                ? "text-white/55"
                : "text-slate-400"
            }`}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            There&apos;s something waiting inside ♡
          </motion.p>
        )}
      </motion.div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-20 w-full max-w-[440px] flex items-center justify-center my-5 md:my-7">
        <AnimatePresence mode="wait">

          {/* ===================================================
              CLOSED ENVELOPE
          ==================================================== */}

          {!isOpen && (
            <motion.div
              key="closed-envelope"
              className="relative w-full max-w-[420px] h-[285px] md:h-[300px] cursor-pointer select-none"
              initial={{
                opacity: 0,
                y: 45,
                scale: 0.84,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.82,
                y: 40,
                rotate: -2,
              }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 115,
              }}
              onClick={handleOpen}
            >

              {/* Envelope shadow / glow */}
              <motion.div
                className="absolute inset-3 rounded-[30px] bg-pink-300/30 blur-2xl"
                animate={{
                  opacity: opening
                    ? [0.45, 0.9, 0]
                    : [0.3, 0.55, 0.3],
                  scale: opening
                    ? [1, 1.08, 1.15]
                    : [0.96, 1.04, 0.96],
                }}
                transition={{
                  duration: opening ? 1.4 : 2.8,
                  repeat: opening ? 0 : Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* =================================================
                  ENVELOPE BODY
              ================================================== */}

              <motion.div
                className="absolute inset-0 rounded-[28px] overflow-visible"
                animate={
                  opening
                    ? {
                        scale: [1, 1.02, 0.96],
                        y: [0, -5, 15],
                      }
                    : {
                        y: [0, -3, 0],
                      }
                }
                transition={
                  opening
                    ? {
                        duration: 1.55,
                        ease: [0.22, 1, 0.36, 1],
                      }
                    : {
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >

                {/* Envelope outer */}
                <div
                  className={`absolute inset-0 rounded-[28px] border shadow-[0_25px_60px_rgba(236,72,153,0.2)] overflow-hidden transition-all duration-700 ${
                    nightMode
                      ? "bg-[#211b42] border-purple-400/30"
                      : "bg-gradient-to-br from-[#fff9fb] via-[#ffeaf1] to-[#ffd5e2] border-pink-200"
                  }`}
                >

                  {/* Left fold */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(0 0, 50% 54%, 0 100%)",
                      background: nightMode
                        ? "linear-gradient(145deg, rgba(120,100,190,0.35), rgba(70,50,120,0.55))"
                        : "linear-gradient(145deg, rgba(255,255,255,0.92), rgba(255,210,223,0.82))",
                    }}
                  />

                  {/* Right fold */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(100% 0, 50% 54%, 100% 100%)",
                      background: nightMode
                        ? "linear-gradient(215deg, rgba(130,105,200,0.35), rgba(65,45,120,0.55))"
                        : "linear-gradient(215deg, rgba(255,255,255,0.8), rgba(255,205,218,0.78))",
                    }}
                  />

                  {/* Bottom fold */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(0 100%, 50% 52%, 100% 100%)",
                      background: nightMode
                        ? "linear-gradient(180deg, rgba(90,65,150,0.55), rgba(50,35,95,0.9))"
                        : "linear-gradient(180deg, rgba(255,224,233,0.78), rgba(255,194,210,0.98))",
                    }}
                  />

                  {/* Decorative line */}
                  <div
                    className={`absolute left-8 right-8 bottom-[65px] h-px ${
                      nightMode
                        ? "bg-white/10"
                        : "bg-white/80"
                    }`}
                  />

                  {/* Small corner decoration */}
                  <motion.div
                    className={`absolute top-4 right-4 w-11 h-11 rounded-xl border border-dashed flex items-center justify-center z-10 ${
                      nightMode
                        ? "border-purple-300/40 bg-white/5"
                        : "border-pink-300/80 bg-white/30"
                    }`}
                    animate={{
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles
                      size={19}
                      className={
                        nightMode
                          ? "text-purple-300"
                          : "text-pink-400"
                      }
                    />
                  </motion.div>
                </div>

                {/* =================================================
                    LETTER PREVIEW
                ================================================== */}

                <motion.div
                  className={`absolute left-[7%] right-[7%] bottom-[18px] h-[205px] rounded-2xl border shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-[3] ${
                    nightMode
                      ? "bg-[#faf8ff] border-purple-200"
                      : "bg-[#fffefa] border-pink-100"
                  }`}
                  animate={
                    opening
                      ? {
                          y: -115,
                          scale: 1.055,
                          rotate: -1,
                        }
                      : {
                          y: 0,
                          scale: 1,
                          rotate: 0,
                        }
                  }
                  transition={{
                    duration: 1.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 via-rose-400 to-purple-300" />

                  <div className="p-5 text-center">
                    <Feather
                      size={19}
                      className="mx-auto text-pink-300 mb-3"
                    />

                    <p className="font-hand text-slate-400 text-sm leading-relaxed">
                      A little piece of my heart,
                      <br />
                      waiting just for you ♡
                    </p>

                    <div className="mt-5 flex justify-center gap-2">
                      <Heart
                        size={12}
                        className="text-pink-300 fill-pink-200"
                      />
                      <Heart
                        size={9}
                        className="text-purple-300 fill-purple-200"
                      />
                      <Heart
                        size={12}
                        className="text-pink-300 fill-pink-200"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* =================================================
                    ENVELOPE FLAP
                ================================================== */}

                <motion.div
                  className="absolute top-0 left-0 right-0 h-[160px] z-30 origin-top"
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                  animate={{
                    rotateX: opening ? -178 : 0,
                    y: opening ? -4 : 0,
                  }}
                  transition={{
                    duration: 1.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-t-[28px]"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 50% 100%)",
                      background: nightMode
                        ? "linear-gradient(180deg, #4a397c 0%, #302653 100%)"
                        : "linear-gradient(180deg, #ffe0ea 0%, #ffcbd9 100%)",
                      boxShadow:
                        "0 10px 22px rgba(236,72,153,0.16)",
                      backfaceVisibility: "hidden",
                    }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.65), rgba(255,255,255,0))",
                    }}
                  />
                </motion.div>

                {/* =================================================
                    HEART SEAL
                ================================================== */}

                <motion.div
                  className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-50"
                  animate={
                    opening
                      ? {
                          scale: [1, 1.18, 0.7],
                          opacity: [1, 1, 0],
                          y: [0, -3, 18],
                        }
                      : {
                          scale: [1, 1.05, 1],
                          opacity: 1,
                          y: [0, -3, 0],
                        }
                  }
                  transition={
                    opening
                      ? {
                          duration: 0.65,
                          ease: "easeOut",
                        }
                      : {
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <div className="relative">

                    <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-xl" />

                    <div
                      className={`relative w-[78px] h-[78px] rounded-full border-[5px] shadow-[0_12px_28px_rgba(244,63,111,0.3)] flex items-center justify-center ${
                        nightMode
                          ? "bg-gradient-to-br from-purple-500 to-pink-500 border-white/80"
                          : "bg-gradient-to-br from-[#ff7096] to-[#f43f6f] border-white"
                      }`}
                    >
                      <Heart
                        size={36}
                        className="text-white fill-white"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* =================================================
                    TAP TO OPEN
                ================================================== */}

                <motion.div
                  className="absolute left-0 right-0 bottom-[45px] text-center z-50"
                  animate={{
                    opacity: opening
                      ? 0
                      : [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <LockKeyhole
                      size={15}
                      className={
                        nightMode
                          ? "text-pink-300"
                          : "text-rose-500"
                      }
                    />

                    <span
                      className={`font-bold tracking-wide text-sm ${
                        nightMode
                          ? "text-pink-300"
                          : "text-rose-500"
                      }`}
                    >
                      {opening
                        ? "OPENING..."
                        : "TAP TO OPEN"}
                    </span>
                  </div>
                </motion.div>

                <div className="absolute left-0 right-0 bottom-4 text-center z-50">
                  <span
                    className={`text-xs ${
                      nightMode
                        ? "text-white/35"
                        : "text-slate-400"
                    }`}
                  >
                    A little something from my heart ♡
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ===================================================
              OPEN LETTER
          ==================================================== */}

          {isOpen && (
            <motion.div
              key="open-letter"
              className="relative w-full max-w-[430px]"
              initial={{
                opacity: 0,
                scale: 0.84,
                y: 70,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Back luxury card */}
              <motion.div
                className={`absolute left-1/2 -translate-x-1/2 bottom-2 w-[94%] h-[74%] rounded-[28px] shadow-2xl ${
                  nightMode
                    ? "bg-gradient-to-br from-purple-700/50 to-pink-700/30"
                    : "bg-gradient-to-br from-pink-100/80 to-purple-100/70"
                }`}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.6,
                }}
              />

              {/* Ribbon-like side glow */}
              <motion.div
                className="absolute -left-2 top-[18%] w-2 h-[55%] rounded-full bg-gradient-to-b from-pink-300 via-purple-300 to-pink-300 blur-[2px]"
                animate={{
                  opacity: [0.35, 0.8, 0.35],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="absolute -right-2 top-[18%] w-2 h-[55%] rounded-full bg-gradient-to-b from-pink-300 via-purple-300 to-pink-300 blur-[2px]"
                animate={{
                  opacity: [0.35, 0.8, 0.35],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />

              {/* =================================================
                  MAIN LETTER BOX
              ================================================== */}

              <motion.div
                className={`relative z-10 w-full h-[63vh] max-h-[700px] min-h-[520px] rounded-[30px] border overflow-hidden ${
                  nightMode
                    ? "bg-[#141934]/95 border-purple-300/20 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                    : "bg-[#fffdfc]/95 border-pink-100 shadow-[0_30px_80px_rgba(236,72,153,0.18)]"
                }`}
                initial={{
                  y: 60,
                  scale: 0.86,
                  rotate: 1.5,
                }}
                animate={{
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.18,
                  type: "spring",
                  damping: 18,
                  stiffness: 100,
                }}
              >

                {/* Luxury top line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-300 via-rose-400 to-purple-400 z-50" />

                {/* =================================================
                    BUTTERFLIES INSIDE LETTER
                ================================================== */}

                <Butterfly
                  className="left-[6%] top-[31%]"
                  delay={1}
                  duration={8}
                  size={30}
                  direction={1}
                />

                <Butterfly
                  className="right-[7%] top-[44%]"
                  delay={3.7}
                  duration={9}
                  size={28}
                  direction={-1}
                />

                <Butterfly
                  className="left-[40%] top-[68%]"
                  delay={6.2}
                  duration={8.5}
                  size={24}
                  direction={1}
                />

                {/* Tiny fourth butterfly */}
                <Butterfly
                  className="right-[28%] top-[76%]"
                  delay={9}
                  duration={7.5}
                  size={20}
                  direction={-1}
                />

                {/* =================================================
                    TOP DECORATION
                ================================================== */}

                <motion.div
                  className="absolute top-4 left-4 z-40"
                  animate={{
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles
                    size={19}
                    className={
                      nightMode
                        ? "text-purple-300"
                        : "text-pink-300"
                    }
                  />
                </motion.div>

                <motion.div
                  className="absolute top-4 right-4 z-40"
                  animate={{
                    scale: [1, 1.12, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Heart
                    size={20}
                    className={
                      nightMode
                        ? "text-pink-300 fill-pink-400/50"
                        : "text-pink-400 fill-pink-300"
                    }
                  />
                </motion.div>

                {/* =================================================
                    LETTER HEADER
                ================================================== */}

                <div
                  className={`relative z-20 pt-8 pb-3 px-5 text-center border-b ${
                    nightMode
                      ? "border-purple-300/15 bg-gradient-to-b from-purple-500/15 to-transparent"
                      : "border-pink-100 bg-gradient-to-b from-pink-50/80 to-white"
                  }`}
                >
                  <Mail
                    size={25}
                    className="mx-auto text-pink-400 mb-2"
                  />

                  <h3
                    className={`text-xl md:text-3xl font-bold ${
                      nightMode
                        ? "text-white"
                        : "text-slate-700"
                    }`}
                  >
                    A Letter For You
                  </h3>

                  <p
                    className={`mt-1 text-[10px] md:text-sm tracking-[0.28em] font-medium ${
                      nightMode
                        ? "text-purple-300"
                        : "text-purple-400"
                    }`}
                  >
                    FROM MY HEART ♡
                  </p>

                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span
                      className={`w-12 md:w-20 h-px ${
                        nightMode
                          ? "bg-purple-300/30"
                          : "bg-pink-200"
                      }`}
                    />

                    <Heart
                      size={13}
                      className="text-pink-400 fill-pink-400"
                    />

                    <span
                      className={`w-12 md:w-20 h-px ${
                        nightMode
                          ? "bg-purple-300/30"
                          : "bg-pink-200"
                      }`}
                    />
                  </div>
                </div>

                {/* =================================================
                    SCROLLABLE LETTER
                ================================================== */}

                <div
                  className="relative z-10 px-5 md:px-8 py-5 h-[calc(100%-155px)] overflow-y-auto overscroll-contain"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: nightMode
                      ? "#a78bfa transparent"
                      : "#f9a8d4 transparent",
                  }}
                >
                  {/* soft inner light */}
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      nightMode
                        ? "bg-gradient-to-b from-purple-400/5 via-transparent to-pink-400/5"
                        : "bg-gradient-to-b from-white/10 via-transparent to-pink-50/20"
                    }`}
                  />

                  <div
                    className={`relative font-hand text-[15px] md:text-xl leading-[1.8] ${
                      nightMode
                        ? "text-white/80"
                        : "text-slate-700"
                    }`}
                  >
                    {letterParagraphs.map(
                      (paragraph, index) => (
                        <motion.p
                          key={index}
                          className="mb-5 last:mb-3"
                          initial={{
                            opacity: 0,
                            y: 14,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              0.9 + index * 0.25,
                            duration: 0.55,
                            ease: "easeOut",
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      )
                    )}

                    {/* Signature */}
                    <motion.div
                      className="text-right pt-2 pb-5"
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 2.5,
                        duration: 0.7,
                      }}
                    >
                      <p
                        className={`font-hand text-xl md:text-3xl italic ${
                          nightMode
                            ? "text-pink-300"
                            : "text-pink-400"
                        }`}
                      >
                        Always yours,
                      </p>

                      <p
                        className={`font-hand text-lg md:text-2xl mt-1 ${
                          nightMode
                            ? "text-purple-300"
                            : "text-purple-400"
                        }`}
                      >
                        rafee ♡
                      </p>
                    </motion.div>

                    <div className="text-center pb-3">
                      <span
                        className={`text-[10px] md:text-xs ${
                          nightMode
                            ? "text-white/30"
                            : "text-slate-400"
                        }`}
                      >
                        no matter how far, still close to my
                        heart ♡
                      </span>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    BOTTOM DECORATION
                ================================================== */}

                <motion.div
                  className="absolute bottom-4 left-4 z-40"
                  animate={{
                    rotate: [0, 8, -8, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles
                    size={17}
                    className={
                      nightMode
                        ? "text-purple-300"
                        : "text-purple-300"
                    }
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-3 right-4 z-40 pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span
                    className={`text-[9px] ${
                      nightMode
                        ? "text-pink-300/50"
                        : "text-pink-300"
                    }`}
                  >
                    scroll ↓
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* =====================================================
          NEXT BUTTON
      ====================================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative z-30 mt-2 mb-2"
            initial={{
              opacity: 0,
              y: 25,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              delay: 1.5,
              duration: 0.7,
            }}
          >
            <Button
              onClick={onNext}
              text="One Last Thing"
              icon={<Heart size={18} />}
              animateIcon={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          WATERMARK
      ====================================================== */}

      <div
        className={`fixed bottom-3 right-4 z-50 text-xs pointer-events-none transition-colors duration-700 ${
          nightMode
            ? "text-white/25"
            : "text-slate-400/70"
        }`}
      >
        rafee🫶protiva
      </div>
    </div>
  );
}
