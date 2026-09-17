"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  LockKeyhole,
} from "lucide-react";
import Button from "../Button";

const letterText = `My Dearest,

Every single day we spend apart only makes me realize how much you truly mean to me. The distance is hard sometimes, but it's just a test of how far our love can travel.

I count the days until I can finally hold you in my arms again. You are my home, my favorite person, and my safe place.

Even when we are miles apart, I carry you in my heart everywhere I go. I miss your smile, your laugh, and just simply being next to you.

Thank you for being the best part of my life. I promise the wait will be worth it when I finally get to see you again.

Forever Yours,
Me Rafee:)`;

export default function LetterScreen({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen h-full overflow-visible px-4">

      {/* Soft romantic background glow */}
      <motion.div
        className="absolute w-[360px] h-[360px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[220px] h-[220px] rounded-full bg-purple-200/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Header */}
      <motion.div
        className="text-center z-20 shrink-0"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.span
          className="text-rose-400 font-bold tracking-[0.25em] uppercase text-xs mb-2 block"
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

        <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
          From My Heart
        </h2>

        {!isOpen && (
          <motion.p
            className="mt-3 text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            There&apos;s something waiting inside ♡
          </motion.p>
        )}
      </motion.div>

      {/* Main Letter Area */}
      <div
        className={`relative w-full max-w-md flex items-center justify-center z-10 transition-all duration-500 ${
          isOpen
            ? "my-5 min-h-[430px]"
            : "my-10 min-h-[330px]"
        }`}
      >

        <AnimatePresence mode="wait">

          {/* ================= CLOSED ENVELOPE ================= */}
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

              {/* Glow behind envelope */}
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

              {/* Envelope body */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#fff4f6] via-[#ffe7ec] to-[#ffdce5] border border-pink-200 shadow-[0_20px_55px_rgba(236,72,153,0.18)] overflow-hidden">

                {/* Left envelope fold */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: "polygon(0 0, 50% 52%, 0 100%)",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.75), rgba(255,210,222,0.75))",
                  }}
                />

                {/* Right envelope fold */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: "polygon(100% 0, 50% 52%, 100% 100%)",
                    background:
                      "linear-gradient(215deg, rgba(255,255,255,0.65), rgba(255,205,218,0.72))",
                  }}
                />

                {/* Bottom fold */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
                    background:
                      "linear-gradient(180deg, rgba(255,222,231,0.7), rgba(255,194,209,0.95))",
                  }}
                />

                {/* Small decorative corner */}
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

                {/* Envelope label */}
                <div className="absolute left-0 right-0 bottom-4 text-center z-20">
                  <span className="text-xs text-slate-400">
                    A little something from my heart ♡
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= OPENING ANIMATION ================= */}
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
                className="relative z-10 w-full min-h-[400px] max-h-[58vh] rounded-2xl bg-[#fffdf8] border border-pink-100 shadow-[0_22px_60px_rgba(0,0,0,0.12)] overflow-hidden"
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

                {/* Paper top decoration */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200" />

                {/* Little heart decoration */}
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
                    className="text-pink-400 fill-pink-200"
                  />
                </motion.div>

                {/* Header */}
                <div className="pt-7 pb-4 px-6 md:px-8 border-b border-pink-100 bg-gradient-to-r from-pink-50/70 to-white">
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
                      className="text-pink-400 fill-pink-300"
                    />

                    <span className="font-bold text-slate-600 text-sm md:text-base">
                      For My Favorite Person
                    </span>
                  </motion.div>
                </div>

                {/* Letter Body */}
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
                    className="font-hand text-slate-700 text-lg md:text-2xl leading-relaxed whitespace-pre-wrap"
                  >
                    {letterText}
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating hearts after opening */}
              {[0, 1, 2, 3].map((item) => (
                <motion.div
                  key={item}
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
                    rotate: item % 2 === 0 ? -20 : 20,
                  }}
                  transition={{
                    delay: 0.7 + item * 0.18,
                    duration: 2.2,
                    ease: "easeOut",
                  }}
                >
                  <Heart
                    size={item % 2 === 0 ? 18 : 14}
                    className="text-pink-400 fill-pink-300"
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
                    className="text-purple-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Next button — only after opening */}
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

    </div>
  );
}
