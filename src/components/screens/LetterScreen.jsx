"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Mail, LockKeyhole } from "lucide-react";
import Button from "../Button";

const letterText = `My Dear wifee😘,

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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4">

      {/* Background glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-3xl"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ================= HEADER ================= */}
      <motion.div
        className="relative z-20 mb-6 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <Heart
            size={18}
            className="fill-pink-300 text-pink-400"
          />

          <h2 className="text-3xl font-bold tracking-tight text-slate-700 md:text-5xl">
            From My Heart
          </h2>

          <Heart
            size={18}
            className="fill-pink-300 text-pink-400"
          />
        </div>

        {!isOpen && (
          <motion.p
            className="mt-2 text-sm text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            A little piece of my heart ♡
          </motion.p>
        )}
      </motion.div>

      {/* ================= LETTER AREA ================= */}
      <div className="relative z-10 flex w-full max-w-[430px] items-center justify-center">

        <AnimatePresence mode="wait">

          {/* ================= CLOSED ENVELOPE ================= */}
          {!isOpen && (
            <motion.div
              key="closed-envelope"
              className="relative h-[260px] w-full max-w-[410px] cursor-pointer select-none"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
              onClick={openLetter}
              whileTap={{
                scale: 0.97,
              }}
            >

              {/* Soft glow */}
              <div className="pointer-events-none absolute inset-6 rounded-[30px] bg-pink-300/25 blur-2xl" />

              {/* Envelope */}
              <div className="absolute inset-0 overflow-hidden rounded-[24px] border border-pink-200 bg-gradient-to-br from-[#fff7f9] via-[#ffeaf0] to-[#ffdce6] shadow-[0_22px_55px_rgba(236,72,153,0.18)]">

                {/* Left fold */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    clipPath: "polygon(0 0, 50% 52%, 0 100%)",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(255,210,222,0.7))",
                  }}
                />

                {/* Right fold */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    clipPath: "polygon(100% 0, 50% 52%, 100% 100%)",
                    background:
                      "linear-gradient(215deg, rgba(255,255,255,0.75), rgba(255,205,218,0.72))",
                  }}
                />

                {/* Bottom fold */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    clipPath: "polygon(0 100%, 50% 50%, 100% 100%)",
                    background:
                      "linear-gradient(180deg, rgba(255,222,231,0.72), rgba(255,194,209,0.92))",
                  }}
                />

                {/* Small sparkle */}
                <motion.div
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-pink-300/70 bg-white/30"
                  animate={{
                    rotate: [0, 3, -3, 0],
                    opacity: [0.65, 1, 0.65],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles
                    size={18}
                    className="text-pink-400"
                  />
                </motion.div>

                {/* Heart seal */}
                <motion.div
                  className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    y: [0, -4, 0],
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative">

                    <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-xl" />

                    <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full border-[5px] border-white bg-gradient-to-br from-[#ff6b91] to-[#f43f6f] shadow-[0_10px_25px_rgba(244,63,111,0.25)]">
                      <Heart
                        size={37}
                        className="fill-white text-white"
                      />
                    </div>

                  </div>
                </motion.div>

                {/* Tap indicator */}
                <motion.div
                  className="absolute bottom-8 left-0 right-0 z-20 flex justify-center"
                  animate={{
                    opacity: [0.55, 1, 0.55],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 backdrop-blur-sm">
                    <LockKeyhole
                      size={14}
                      className="text-rose-500"
                    />

                    <span className="text-xs font-semibold tracking-wide text-rose-500">
                      TAP TO OPEN
                    </span>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}

          {/* ================= OPEN LETTER ================= */}
          {isOpen && (
            <motion.div
              key="open-letter"
              className="relative w-full max-w-[430px]"
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
              }}
            >

              {/* Paper shadow/glow */}
              <div className="pointer-events-none absolute -inset-3 rounded-[28px] bg-pink-300/20 blur-2xl" />

              {/* Letter paper */}
              <motion.div
                className="relative z-10 overflow-hidden rounded-[22px] border border-pink-100 bg-[#fffdf8] shadow-[0_25px_65px_rgba(0,0,0,0.13)]"
                initial={{
                  y: 45,
                  scale: 0.94,
                  rotate: 1,
                }}
                animate={{
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >

                {/* Top accent */}
                <div className="h-2 w-full bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200" />

                {/* Letter header */}
                <div className="border-b border-pink-100 bg-gradient-to-r from-pink-50/80 to-white px-6 py-5 md:px-8">

                  <div className="flex items-center gap-2">
                    <Heart
                      size={18}
                      className="fill-pink-300 text-pink-400"
                    />

                    <span className="text-sm font-semibold text-slate-600 md:text-base">
                      For My Favorite Person
                    </span>
                  </div>

                </div>

                {/* Letter body */}
                <div className="max-h-[52vh] overflow-y-auto px-6 py-6 md:px-8 md:py-8">

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
                      delay: 0.45,
                      duration: 0.6,
                    }}
                    className="whitespace-pre-wrap font-hand text-lg leading-relaxed text-slate-700 md:text-2xl"
                  >
                    {letterText}
                  </motion.div>

                </div>

                {/* Bottom heart */}
                <div className="flex justify-center border-t border-pink-100 bg-pink-50/30 py-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Heart
                      size={20}
                      className="fill-pink-300 text-pink-400"
                    />
                  </motion.div>
                </div>

              </motion.div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Next button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative z-30 mt-6"
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
              duration: 0.45,
            }}
          >
            <Button
              onClick={onNext}
              text="One Last Thing"
              icon={<Mail size={18} />}
              animateIcon={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
