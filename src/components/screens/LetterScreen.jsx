"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  LockKeyhole,
  Feather,
} from "lucide-react";
import Button from "../Button";

const letterParagraphs = [
  "My favorite person,",

  "Sometimes I wish I could pause time, just so I could stay a little longer in the moments when I feel closest to you.",

  "Until we meet again, I hope you remember that somewhere in this big world, there’s someone thinking about you, smiling because of you, and waiting for the next beautiful moment we get to share.",

  "Distance may keep us apart for a while, but it can never change the little place you have in my heart.",

  "I miss your smile, your laugh, and simply being next to you. Every little memory of us is something I keep close to my heart.",

  "No matter how many miles are between us, a part of me is always right there with you.",
];

/* =========================================================
   LITTLE BUTTERFLY
   Pure CSS/SVG — no external image required
========================================================= */

function Butterfly({ className = "", delay = 0, duration = 7, size = 30 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-30 ${className}`}
      initial={{
        opacity: 0,
        scale: 0.45,
      }}
      animate={{
        opacity: [0, 0.9, 0.75, 0],
        x: [0, 28, -15, 35],
        y: [15, -35, -70, -105],
        rotate: [-8, 8, -5, 10],
        scale: [0.45, 0.8, 0.7, 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 2.5,
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
      }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        animate={{
          rotateY: [0, 65, 0, -65, 0],
        }}
        transition={{
          duration: 0.65,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <defs>
          <linearGradient id="butterflyPink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="45%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="butterflyPurple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="butterflyGlow">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* soft glow */}
        <ellipse
          cx="50"
          cy="50"
          rx="30"
          ry="35"
          fill="#f9a8d4"
          opacity="0.18"
          filter="url(#butterflyGlow)"
        />

        {/* left upper wing */}
        <path
          d="M47 48 C29 8, 2 15, 9 43 C13 60, 30 65, 47 53 Z"
          fill="url(#butterflyPink)"
          stroke="#f9a8d4"
          strokeWidth="2"
        />

        {/* left lower wing */}
        <path
          d="M47 55 C27 52, 10 63, 18 79 C25 91, 40 79, 49 61 Z"
          fill="url(#butterflyPurple)"
          stroke="#e9a8d4"
          strokeWidth="2"
        />

        {/* right upper wing */}
        <path
          d="M53 48 C71 8, 98 15, 91 43 C87 60, 70 65, 53 53 Z"
          fill="url(#butterflyPink)"
          stroke="#f9a8d4"
          strokeWidth="2"
        />

        {/* right lower wing */}
        <path
          d="M53 55 C73 52, 90 63, 82 79 C75 91, 60 79, 51 61 Z"
          fill="url(#butterflyPurple)"
          stroke="#e9a8d4"
          strokeWidth="2"
        />

        {/* wing details */}
        <circle cx="27" cy="36" r="5" fill="#fff" opacity="0.45" />
        <circle cx="73" cy="36" r="5" fill="#fff" opacity="0.45" />

        <circle cx="31" cy="66" r="3" fill="#fff" opacity="0.4" />
        <circle cx="69" cy="66" r="3" fill="#fff" opacity="0.4" />

        {/* body */}
        <ellipse
          cx="50"
          cy="55"
          rx="4"
          ry="19"
          fill="#6b365c"
        />

        {/* antenna */}
        <path
          d="M48 39 C42 28, 37 28, 34 25"
          stroke="#6b365c"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <path
          d="M52 39 C58 28, 63 28, 66 25"
          stroke="#6b365c"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        <circle cx="34" cy="25" r="2" fill="#6b365c" />
        <circle cx="66" cy="25" r="2" fill="#6b365c" />
      </motion.svg>
    </motion.div>
  );
}

export default function LetterScreen({ onNext }) {
  const [opening, setOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (opening || isOpen) return;

    setOpening(true);

    setTimeout(() => {
      setIsOpen(true);
      setOpening(false);
    }, 1150);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen h-full overflow-visible px-4 py-5">

      {/* =========================================================
          BACKGROUND GLOW
      ========================================================== */}

      <motion.div
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-purple-200/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.2, 0.38, 0.2],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          HEADER
      ========================================================== */}

      <motion.div
        className="relative z-20 text-center shrink-0"
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
          <span className="text-rose-400 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs">
            {isOpen ? "FROM MY HEART ♡" : "A MESSAGE FOR YOU"}
          </span>
        </motion.div>

        <h2 className="text-2xl md:text-5xl font-bold text-slate-700">
          {isOpen ? "A Letter For You" : "From My Heart"}
        </h2>

        {!isOpen && (
          <motion.p
            className="mt-2 text-xs md:text-sm text-slate-400"
            animate={{
              opacity: [0.55, 1, 0.55],
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

      {/* =========================================================
          MAIN AREA
      ========================================================== */}

      <div className="relative z-20 w-full max-w-[440px] flex items-center justify-center my-4 md:my-6">

        <AnimatePresence mode="wait">

          {/* =====================================================
              CLOSED ENVELOPE
          ====================================================== */}

          {!isOpen && (
            <motion.div
              key="closed-envelope"
              className="relative w-full max-w-[420px] h-[255px] md:h-[275px] cursor-pointer select-none"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.88,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 120,
              }}
              onClick={handleOpen}
              whileHover={{
                y: -5,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.975,
              }}
            >

              {/* Envelope glow */}

              <motion.div
                className="absolute inset-4 rounded-[28px] bg-pink-300/35 blur-2xl"
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.96, 1.04, 0.96],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Envelope */}

              <div className="absolute inset-0 rounded-[25px] overflow-visible">

                <div className="absolute inset-0 rounded-[25px] bg-gradient-to-br from-[#fff8fa] via-[#ffeaf0] to-[#ffdce7] border border-pink-200 shadow-[0_22px_55px_rgba(236,72,153,0.18)] overflow-hidden">

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(0 0, 50% 54%, 0 100%)",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,210,223,0.8))",
                    }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(100% 0, 50% 54%, 100% 100%)",
                      background:
                        "linear-gradient(215deg, rgba(255,255,255,0.8), rgba(255,205,218,0.78))",
                    }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(0 100%, 50% 52%, 100% 100%)",
                      background:
                        "linear-gradient(180deg, rgba(255,224,233,0.75), rgba(255,194,210,0.98))",
                    }}
                  />

                  <div className="absolute left-8 right-8 bottom-[62px] h-px bg-white/70" />

                  <motion.div
                    className="absolute top-4 right-4 w-11 h-11 rounded-lg border border-dashed border-pink-300/80 flex items-center justify-center bg-white/30 z-10"
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
                </div>

                {/* Letter preview */}

                <motion.div
                  className="absolute left-[7%] right-[7%] bottom-[15px] h-[195px] rounded-xl bg-[#fffdf9] border border-pink-100 shadow-[0_8px_25px_rgba(0,0,0,0.08)] z-[2]"
                  animate={
                    opening
                      ? {
                          y: -95,
                          scale: 1.04,
                        }
                      : {
                          y: 0,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200" />

                  <div className="p-5 text-center">
                    <Feather
                      size={18}
                      className="mx-auto text-pink-300 mb-3"
                    />

                    <p className="font-hand text-slate-400 text-sm leading-relaxed">
                      A little piece of my heart,
                      <br />
                      waiting just for you ♡
                    </p>
                  </div>
                </motion.div>

                {/* Flap */}

                <motion.div
                  className="absolute top-0 left-0 right-0 h-[150px] z-30 origin-top"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateX: opening ? -175 : 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-t-[25px]"
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(180deg, #ffdce7 0%, #ffcbd9 100%)",
                      boxShadow:
                        "0 8px 18px rgba(236,72,153,0.12)",
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

                {/* Heart seal */}

                <motion.div
                  className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 z-40"
                  animate={
                    opening
                      ? {
                          scale: 0.7,
                          opacity: 0,
                          y: 15,
                        }
                      : {
                          scale: [1, 1.04, 1],
                          opacity: 1,
                          y: [0, -3, 0],
                        }
                  }
                  transition={
                    opening
                      ? {
                          duration: 0.35,
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

                    <div className="relative w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#ff6b91] to-[#f43f6f] border-[5px] border-white shadow-[0_10px_25px_rgba(244,63,111,0.28)] flex items-center justify-center">
                      <Heart
                        size={36}
                        className="text-white fill-white"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Tap */}

                <motion.div
                  className="absolute left-0 right-0 bottom-[43px] text-center z-40"
                  animate={{
                    opacity: opening
                      ? 0
                      : [0.65, 1, 0.65],
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
                      {opening
                        ? "OPENING..."
                        : "TAP TO OPEN"}
                    </span>
                  </div>
                </motion.div>

                <div className="absolute left-0 right-0 bottom-4 text-center z-40">
                  <span className="text-xs text-slate-400">
                    A little something from my heart ♡
                  </span>
                </div>

              </div>
            </motion.div>
          )}

          {/* =====================================================
              OPEN LETTER
          ====================================================== */}

          {isOpen && (
            <motion.div
              key="open-letter"
              className="relative w-full max-w-[430px]"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* =================================================
                  DECORATIVE BACK CARD
              ================================================== */}

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-2 w-[92%] h-[72%] rounded-2xl bg-gradient-to-br from-pink-100/70 to-purple-100/70 shadow-lg"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                }}
              />

              {/* =================================================
                  MAIN LETTER BOX
              ================================================== */}

              <motion.div
                className="relative z-10 w-full h-[62vh] max-h-[690px] min-h-[510px] rounded-[28px] bg-[#fffdfc] border border-pink-100 shadow-[0_25px_70px_rgba(236,72,153,0.16)] overflow-hidden"
                initial={{
                  y: 80,
                  scale: 0.82,
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

                {/* Top gradient */}

                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200 z-40" />

                {/* =================================================
                    BUTTERFLIES
                ================================================== */}

                <Butterfly
                  className="left-[8%] top-[34%]"
                  delay={0.8}
                  duration={7}
                  size={27}
                />

                <Butterfly
                  className="right-[9%] top-[48%]"
                  delay={3.2}
                  duration={8}
                  size={24}
                />

                <Butterfly
                  className="left-[48%] top-[67%]"
                  delay={5.5}
                  duration={7.5}
                  size={22}
                />

                {/* =================================================
                    TOP ICONS
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
                    className="text-pink-300"
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
                    className="text-pink-400 fill-pink-300"
                  />
                </motion.div>

                {/* =================================================
                    FIXED LETTER HEADER
                ================================================== */}

                <div className="relative z-20 pt-8 pb-3 px-5 text-center border-b border-pink-100 bg-gradient-to-b from-pink-50/80 to-white">

                  <Mail
                    size={25}
                    className="mx-auto text-pink-400 mb-2"
                  />

                  <h3 className="text-xl md:text-3xl font-bold text-slate-700">
                    A Letter For You
                  </h3>

                  <p className="mt-1 text-[10px] md:text-sm tracking-[0.28em] text-purple-400 font-medium">
                    FROM MY HEART ♡
                  </p>

                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span className="w-12 md:w-20 h-px bg-pink-200" />

                    <Heart
                      size={13}
                      className="text-pink-400 fill-pink-400"
                    />

                    <span className="w-12 md:w-20 h-px bg-pink-200" />
                  </div>
                </div>

                {/* =================================================
                    SCROLLABLE LETTER BODY

                    IMPORTANT:
                    Only this section scrolls.
                ================================================== */}

                <div
                  className="relative z-10 px-5 md:px-8 py-4 md:py-5 h-[calc(100%-155px)] overflow-y-auto overscroll-contain"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "#f9a8d4 transparent",
                  }}
                >

                  {/* subtle inner glow */}

                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-pink-50/20" />

                  <div className="relative font-hand text-slate-700 text-[15px] md:text-xl leading-[1.75]">

                    {letterParagraphs.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        className="mb-5 last:mb-3"
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 1 + index * 0.25,
                          duration: 0.55,
                          ease: "easeOut",
                        }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}

                    {/* Signature */}

                    <motion.div
                      className="text-right pt-1 pb-3"
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 2.7,
                        duration: 0.7,
                      }}
                    >
                      <p className="font-hand text-pink-400 text-xl md:text-3xl italic">
                        Always yours,
                      </p>

                      <p className="font-hand text-purple-400 text-lg md:text-2xl mt-1">
                        rafee ♡
                      </p>
                    </motion.div>

                    <div className="text-center pb-2">
                      <span className="text-[10px] md:text-xs text-slate-400">
                        no matter how far, still close to my heart ♡
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
                    className="text-purple-300"
                  />
                </motion.div>

                {/* scroll hint */}

                <motion.div
                  className="absolute bottom-3 right-4 z-40 pointer-events-none"
                  animate={{
                    opacity: [0.35, 0.8, 0.35],
                    y: [0, 3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-[9px] text-pink-300">
                    scroll ↓
                  </span>
                </motion.div>

              </motion.div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* =========================================================
          NEXT BUTTON
      ========================================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative z-30 mt-2 mb-2"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
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

    </div>
  );
}
