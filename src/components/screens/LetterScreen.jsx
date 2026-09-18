"use client";

import { motion } from "framer-motion";
import { Heart, Mail, Sparkles } from "lucide-react";
import Button from "../Button";

const letterText = [
  "My favorite person,",

  "Sometimes I wish I could pause time, just so I could stay a little longer in the moments when I feel closest to you.",

  "Until we meet again, I hope you remember that somewhere in this big world, there is someone thinking about you, smiling because of you, and waiting for the next beautiful moment we get to share.",

  "Distance may keep us apart for a while, but it can never change the little place you have in my heart.",

  "So until that day comes...",
  "take care of yourself for me. ♡",
];

export default function LetterScreen({ onNext }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 py-8">

      {/* Soft background glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[15%] h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-pink-200/20 blur-[100px]"
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

      {/* Floating hearts */}
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[18%] text-pink-300/50"
        animate={{
          y: [0, -12, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart size={17} fill="currentColor" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[10%] top-[28%] text-pink-300/40"
        animate={{
          y: [0, 10, 0],
          rotate: [8, -8, 8],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart size={14} fill="currentColor" />
      </motion.div>

      {/* Header */}
      <motion.div
        className="relative z-10 mb-4 text-center"
        initial={{
          opacity: 0,
          y: -18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100/80 shadow-sm">
          <Mail
            size={27}
            className="text-pink-400"
          />
        </div>

        <h2 className="text-3xl font-bold text-slate-700 md:text-5xl">
          A Letter For You
        </h2>

        <p className="mt-1 text-sm font-medium tracking-[0.25em] text-purple-400 md:text-base">
          FROM MY HEART ♡
        </p>

        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-pink-200" />

          <Heart
            size={14}
            fill="currentColor"
            className="text-pink-300"
          />

          <span className="h-px w-16 bg-pink-200" />
        </div>
      </motion.div>

      {/* Letter */}
      <motion.div
        initial={{
          opacity: 0,
          y: 25,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-[650px]"
      >
        {/* Paper shadow */}
        <div className="absolute inset-0 translate-y-2 rounded-[26px] bg-pink-200/20 blur-xl" />

        {/* Paper */}
        <div className="relative overflow-hidden rounded-[26px] border border-pink-100/80 bg-[#fffafd]/95 px-6 py-6 shadow-[0_18px_50px_rgba(190,100,150,0.12)] md:px-10 md:py-8">

          {/* Decorative corners */}
          <Sparkles
            size={20}
            className="absolute left-5 top-5 text-pink-300/60"
          />

          <Heart
            size={17}
            fill="currentColor"
            className="absolute right-6 top-6 text-pink-300/60"
          />

          {/* Letter body */}
          <div className="relative">

            <motion.p
              className="font-hand text-lg leading-relaxed text-slate-600 md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.35,
                duration: 0.6,
              }}
            >
              {letterText[0]}
            </motion.p>

            <div className="mt-5 space-y-5">
              {letterText.slice(1).map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="font-hand text-lg leading-[1.8] text-slate-600 md:text-xl"
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
                    duration: 0.5,
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              className="mt-6 text-right"
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 1.1,
                duration: 0.6,
              }}
            >
              <p className="font-hand text-xl italic text-pink-400 md:text-2xl">
                Always yours,
              </p>

              <p className="mt-1 font-hand text-lg text-purple-400 md:text-xl">
                rafee ♡
              </p>
            </motion.div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-5 flex items-center justify-center gap-3 opacity-60">
            <span className="h-px w-12 bg-pink-200" />
            <Heart
              size={12}
              fill="currentColor"
              className="text-pink-300"
            />
            <span className="h-px w-12 bg-pink-200" />
          </div>
        </div>
      </motion.div>

      {/* Next button */}
      <motion.div
        className="relative z-10 mt-5"
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
          duration: 0.5,
        }}
      >
        <Button
          onClick={onNext}
          text="One Last Thing"
          icon={<Sparkles size={18} />}
          animateIcon={false}
        />
      </motion.div>
    </div>
  );
}
