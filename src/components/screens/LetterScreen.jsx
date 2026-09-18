"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  Moon,
  Sun,
} from "lucide-react";
import Button from "../Button";

/* =========================================================
   ORIGINAL LETTER TEXT
========================================================= */

const letterParagraphs = [
  `My Dearest,`,

  `Every single day we spend apart only makes me realize how much you truly mean to me. The distance is hard sometimes, but it's just a test of how far our love can travel.`,

  `I count the days until I can finally hold you in my arms again. You are my home, my favorite person, and my safe place.`,

  `Even when we are miles apart, I carry you in my heart everywhere I go. I miss your smile, your laugh, and just simply being next to you.`,

  `Thank you for being the best part of my life. I promise the wait will be worth it when I finally get to see you again.`,

  `Forever Yours,\nMe :)`,
];

/* =========================================================
   FLYING BIRD
========================================================= */

function FlyingBird({
  top,
  delay = 0,
  scale = 1,
  duration = 13,
  reverse = false,
}) {
  return (
    <motion.div
      className="absolute z-[4] pointer-events-none"
      style={{
        top,
        left: reverse ? "auto" : "-100px",
        right: reverse ? "-100px" : "auto",
      }}
      initial={{
        x: reverse ? 0 : 0,
        opacity: 0,
      }}
      animate={{
        x: reverse ? [-20, -180, -360, -560, -760] : [0, 180, 360, 560, 760],
        y: [0, -18, 8, -22, 0],
        opacity: [0, 0.75, 0.9, 0.7, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{
          scale,
        }}
      >
        <svg
          width="72"
          height="42"
          viewBox="0 0 120 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_7px_rgba(71,85,105,0.22)]"
        >
          {/* body */}
          <ellipse
            cx="60"
            cy="38"
            rx="13"
            ry="6"
            fill="rgba(71,85,105,0.72)"
          />

          {/* left wing */}
          <motion.path
            d="M57 37C45 19 31 10 17 12C28 28 40 37 56 42Z"
            fill="rgba(71,85,105,0.78)"
            animate={{
              d: [
                "M57 37C45 19 31 10 17 12C28 28 40 37 56 42Z",
                "M57 38C42 31 27 29 13 35C28 41 42 44 57 43Z",
                "M57 37C45 19 31 10 17 12C28 28 40 37 56 42Z",
              ],
            }}
            transition={{
              duration: 1.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* right wing */}
          <motion.path
            d="M63 37C76 19 90 10 104 12C93 28 80 37 64 42Z"
            fill="rgba(71,85,105,0.78)"
            animate={{
              d: [
                "M63 37C76 19 90 10 104 12C93 28 80 37 64 42Z",
                "M63 38C78 31 93 29 107 35C92 41 78 44 63 43Z",
                "M63 37C76 19 90 10 104 12C93 28 80 37 64 42Z",
              ],
            }}
            transition={{
              duration: 1.15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.08,
            }}
          />

          {/* tiny head */}
          <circle
            cx="72"
            cy="36"
            r="4"
            fill="rgba(71,85,105,0.8)"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   LETTER SCREEN
========================================================= */

export default function LetterScreen({ onNext }) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden px-4 py-6">

      {/* =====================================================
          DREAMY BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* soft pink glow */}
        <motion.div
          className="absolute left-1/2 top-[32%] -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-pink-200/25 blur-[90px]"
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

        {/* second glow */}
        <motion.div
          className="absolute right-[-100px] bottom-[10%] w-[300px] h-[300px] rounded-full bg-purple-200/20 blur-[90px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            DAY SUN
        ================================================== */}

        <motion.div
          className="absolute top-[7%] right-[7%]"
          animate={{
            y: [0, -5, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute -inset-8 rounded-full bg-yellow-200/20 blur-2xl" />

          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-200 shadow-[0_0_40px_rgba(251,191,36,0.32)]">
            <Sun
              size={25}
              strokeWidth={1.6}
              className="absolute inset-0 m-auto text-yellow-600/60"
            />
          </div>
        </motion.div>

        {/* =================================================
            NIGHT MOON
        ================================================== */}

        <motion.div
          className="absolute top-[12%] left-[7%]"
          animate={{
            y: [0, 6, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute -inset-8 rounded-full bg-purple-300/10 blur-2xl" />

          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-200/50 shadow-[0_0_35px_rgba(168,85,247,0.2)] flex items-center justify-center">
            <Moon
              size={24}
              className="text-purple-500/60"
            />
          </div>
        </motion.div>

        {/* =================================================
            STARS
        ================================================== */}

        {[
          ["14%", "23%", 12],
          ["82%", "27%", 10],
          ["8%", "55%", 9],
          ["90%", "58%", 12],
          ["16%", "78%", 8],
          ["84%", "76%", 9],
        ].map(([left, top, size], index) => (
          <motion.div
            key={index}
            className="absolute text-pink-300/60"
            style={{
              left,
              top,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.7, 1.2, 0.7],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              delay: index * 0.6,
            }}
          >
            <Sparkles size={size} />
          </motion.div>
        ))}

        {/* =================================================
            FLYING BIRDS
        ================================================== */}

        <FlyingBird
          top="19%"
          delay={0}
          scale={0.55}
          duration={14}
        />

        <FlyingBird
          top="34%"
          delay={4}
          scale={0.4}
          duration={17}
          reverse
        />

        <FlyingBird
          top="66%"
          delay={7}
          scale={0.48}
          duration={15}
        />

        <FlyingBird
          top="78%"
          delay={11}
          scale={0.32}
          duration={19}
          reverse
        />

        {/* floating hearts */}
        <motion.div
          className="absolute left-[7%] top-[40%] text-pink-300/50"
          animate={{
            y: [0, -14, 0],
            rotate: [-8, 8, -8],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <Heart
            size={17}
            fill="currentColor"
          />
        </motion.div>

        <motion.div
          className="absolute right-[7%] top-[47%] text-pink-300/50"
          animate={{
            y: [0, 12, 0],
            rotate: [8, -8, 8],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            delay: 1,
          }}
        >
          <Heart
            size={15}
            fill="currentColor"
          />
        </motion.div>
      </div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <motion.div
        className="relative z-20 text-center shrink-0 mt-1"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <span className="text-rose-400 font-bold tracking-[0.25em] uppercase text-xs">
          A Message For You
        </span>

        <h2 className="text-3xl md:text-5xl font-bold text-slate-700 mt-1">
          From My Heart
        </h2>
      </motion.div>

      {/* =====================================================
          ENVELOPE / LETTER AREA
      ====================================================== */}

      <div className="relative z-20 w-full max-w-[430px] h-[440px] md:h-[500px] mt-5 flex items-center justify-center">

        <AnimatePresence mode="wait">

          {/* =================================================
              CLOSED ENVELOPE
          ================================================== */}

          {!opened && (
            <motion.div
              key="envelope"
              initial={{
                opacity: 0,
                scale: 0.82,
                y: 35,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 16,
              }}
              className="relative w-[330px] md:w-[390px] h-[225px] md:h-[255px] cursor-pointer"
              onClick={() => setOpened(true)}
            >
              {/* envelope glow */}
              <motion.div
                className="absolute -inset-5 rounded-[30px] bg-pink-300/20 blur-2xl"
                animate={{
                  opacity: [0.3, 0.65, 0.3],
                  scale: [0.98, 1.04, 0.98],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* envelope body */}
              <div className="absolute inset-0 rounded-[25px] overflow-hidden bg-gradient-to-br from-[#ffdce5] via-[#ffe9ee] to-[#ffd3df] border border-pink-200 shadow-[0_20px_55px_rgba(236,72,153,0.18)]">

                {/* diagonal folds */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath:
                      "polygon(0 0, 50% 48%, 100% 0, 100% 100%, 0 100%)",
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,.38), rgba(255,255,255,.08))",
                  }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    clipPath:
                      "polygon(0 100%, 40% 53%, 0 0)",
                    background:
                      "linear-gradient(135deg, rgba(244,114,182,.12), transparent)",
                  }}
                />

                <div
                  className="absolute inset-0"
                  style={{
                    clipPath:
                      "polygon(100% 100%, 60% 53%, 100% 0)",
                    background:
                      "linear-gradient(225deg, rgba(244,114,182,.12), transparent)",
                  }}
                />

                {/* envelope flap */}
                <div
                  className="absolute top-0 left-0 right-0 h-[125px]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 72%)",
                    background:
                      "linear-gradient(180deg, #ffc9d7 0%, #ffdce5 100%)",
                  }}
                />

                {/* heart seal */}
                <motion.div
                  className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[74px] h-[74px] rounded-full bg-pink-500 flex items-center justify-center border-[5px] border-white shadow-[0_8px_25px_rgba(236,72,153,0.3)]"
                  animate={{
                    scale: [1, 1.07, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                >
                  <Heart
                    size={35}
                    fill="white"
                    className="text-white"
                  />
                </motion.div>

                {/* tap text */}
                <motion.div
                  className="absolute bottom-7 left-0 right-0 text-center"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                >
                  <span className="text-pink-600 font-bold tracking-wide text-sm md:text-base">
                    TAP TO OPEN
                  </span>
                </motion.div>

                {/* corner sparkle */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-lg border border-dashed border-pink-300/60 flex items-center justify-center">
                  <Sparkles
                    size={19}
                    className="text-pink-400"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* =================================================
              OPEN LETTER
          ================================================== */}

          {opened && (
            <motion.div
              key="letter"
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.82,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.85,
                type: "spring",
                stiffness: 90,
                damping: 15,
              }}
              className="relative w-full max-w-[410px]"
            >
              {/* envelope underneath */}
              <motion.div
                initial={{
                  scale: 0.85,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="absolute left-1/2 top-[80%] -translate-x-1/2 w-[340px] h-[150px] rounded-[24px] bg-gradient-to-br from-pink-200 to-pink-100 shadow-[0_15px_40px_rgba(236,72,153,0.15)]"
              />

              {/* paper */}
              <motion.div
                initial={{
                  y: 75,
                  rotateX: -12,
                }}
                animate={{
                  y: 0,
                  rotateX: 0,
                }}
                transition={{
                  delay: 0.12,
                  duration: 0.75,
                  ease: "easeOut",
                }}
                className="relative rounded-[27px] bg-[#fffdfd] border border-pink-100 shadow-[0_20px_65px_rgba(236,72,153,0.17)] px-6 py-6 md:px-9 md:py-8 overflow-hidden"
              >
                {/* top corner */}
                <Sparkles
                  size={22}
                  className="absolute top-4 left-4 text-pink-300/70"
                />

                <Heart
                  size={18}
                  fill="currentColor"
                  className="absolute top-5 right-5 text-pink-300"
                />

                {/* icon */}
                <motion.div
                  className="mx-auto w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center"
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Mail
                    size={27}
                    className="text-pink-400"
                  />
                </motion.div>

                <h3 className="text-center text-[28px] md:text-[34px] font-bold text-slate-700 mt-4">
                  A Letter For You
                </h3>

                <p className="text-center text-xs md:text-sm tracking-[0.25em] uppercase text-purple-400 mt-1">
                  From My Heart ♡
                </p>

                {/* divider */}
                <div className="flex items-center justify-center gap-3 mt-4 mb-5">
                  <span className="w-14 h-[2px] rounded-full bg-pink-200" />

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                    }}
                  >
                    <Heart
                      size={14}
                      fill="currentColor"
                      className="text-pink-300"
                    />
                  </motion.div>

                  <span className="w-14 h-[2px] rounded-full bg-pink-200" />
                </div>

                {/* letter */}
                <div className="font-hand text-[17px] md:text-[19px] leading-[1.75] text-slate-600">
                  {letterParagraphs.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      className={
                        index === letterParagraphs.length - 1
                          ? "whitespace-pre-line text-right text-pink-400 text-[21px] md:text-[23px] mt-5"
                          : "mb-4"
                      }
                      initial={{
                        opacity: 0,
                        y: 8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.45 + index * 0.12,
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* bottom decoration */}
                <motion.div
                  className="absolute bottom-4 left-5 text-purple-200"
                  animate={{
                    rotate: [0, 15, 0],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles size={17} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <AnimatePresence>
        {opened && (
          <>
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1,
              }}
              className="relative z-20 text-xs md:text-sm text-slate-400 text-center mb-3"
            >
              no matter how far, still close to my heart ♡
            </motion.p>

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
                delay: 1.15,
                duration: 0.6,
              }}
              className="relative z-20"
            >
              <Button
                onClick={onNext}
                text="One Last Thing"
                animateIcon={false}
                icon={<Heart size={18} />}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
