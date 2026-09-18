"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Sun,
  Bird,
} from "lucide-react";
import Button from "../Button";

function FlyingDove({ className = "", delay = 0, scale = 1 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0, x: -40 }}
      animate={{
        opacity: [0, 0.85, 0.9, 0],
        x: [0, 70, 145, 220],
        y: [0, -18, 8, -25],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
      }}
      style={{
        scale,
      }}
    >
      <svg
        width="95"
        height="65"
        viewBox="0 0 120 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_5px_8px_rgba(100,116,139,0.18)]"
      >
        {/* Body */}
        <ellipse
          cx="61"
          cy="43"
          rx="27"
          ry="12"
          fill="rgba(255,255,255,0.95)"
        />

        {/* Head */}
        <circle
          cx="87"
          cy="37"
          r="9"
          fill="rgba(255,255,255,0.98)"
        />

        {/* Beak */}
        <path
          d="M95 37L105 40L95 43Z"
          fill="#f3a6b8"
        />

        {/* Tail */}
        <path
          d="M37 42L14 31L25 44L13 53L39 49Z"
          fill="rgba(255,255,255,0.9)"
        />

        {/* Back wing */}
        <motion.path
          d="M58 38C47 18 39 10 28 7C35 23 43 35 55 45C60 49 64 45 58 38Z"
          fill="rgba(255,255,255,0.92)"
          animate={{
            d: [
              "M58 38C47 18 39 10 28 7C35 23 43 35 55 45C60 49 64 45 58 38Z",
              "M58 39C46 30 38 28 26 29C38 40 47 46 56 48C61 49 63 44 58 39Z",
              "M58 38C47 18 39 10 28 7C35 23 43 35 55 45C60 49 64 45 58 38Z",
            ],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Front wing */}
        <motion.path
          d="M65 39C75 17 84 10 95 10C89 25 82 37 70 46C65 49 61 45 65 39Z"
          fill="rgba(255,255,255,0.98)"
          animate={{
            d: [
              "M65 39C75 17 84 10 95 10C89 25 82 37 70 46C65 49 61 45 65 39Z",
              "M65 40C77 28 86 25 99 28C89 40 80 46 70 48C65 49 62 45 65 40Z",
              "M65 39C75 17 84 10 95 10C89 25 82 37 70 46C65 49 61 45 65 39Z",
            ],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.08,
          }}
        />

        {/* Eye */}
        <circle
          cx="89"
          cy="35"
          r="1.5"
          fill="#64748b"
        />

        {/* Feather details */}
        <path
          d="M43 30C49 34 53 38 57 43"
          stroke="rgba(203,213,225,0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <path
          d="M75 31C71 36 68 40 65 44"
          stroke="rgba(203,213,225,0.8)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

function LetterScreen({ onNext }) {
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden px-4">

      {/* =====================================================
          DAY VIEW — SOFT REALISTIC SUN
          dark mode এ automatically hide হবে
      ====================================================== */}
      <motion.div
        className="absolute top-[28px] right-[28px] md:top-[55px] md:right-[70px] z-0 dark:hidden pointer-events-none"
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* outer sunlight */}
        <div className="absolute -inset-14 rounded-full bg-yellow-200/20 blur-3xl" />

        <div className="absolute -inset-7 rounded-full bg-orange-100/35 blur-2xl" />

        {/* rays */}
        <motion.div
          className="absolute -inset-5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <span
              key={angle}
              className="absolute left-1/2 top-1/2 w-1 h-7 rounded-full bg-yellow-300/35 origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* sun */}
        <div className="relative w-[72px] h-[72px] rounded-full bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-200 shadow-[0_0_45px_rgba(251,191,36,0.45)] border border-yellow-100/70">
          <div className="absolute inset-[9px] rounded-full bg-gradient-to-br from-yellow-100/70 to-transparent" />

          <Sun
            size={31}
            strokeWidth={1.5}
            className="absolute inset-0 m-auto text-yellow-500/70"
          />
        </div>
      </motion.div>

      {/* =====================================================
          FLYING DOVES
      ====================================================== */}

      <FlyingDove
        className="left-[-90px] top-[22%]"
        delay={0}
        scale={0.72}
      />

      <FlyingDove
        className="left-[-120px] top-[47%]"
        delay={4}
        scale={0.58}
      />

      <FlyingDove
        className="left-[-100px] top-[68%]"
        delay={7}
        scale={0.48}
      />

      {/* small distant bird */}
      <motion.div
        className="absolute right-[8%] top-[30%] pointer-events-none z-0"
        animate={{
          x: [-10, 15, -10],
          y: [0, -8, 0],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="55"
          height="35"
          viewBox="0 0 120 80"
          fill="none"
        >
          <path
            d="M15 43C31 27 43 29 57 43C43 22 50 11 61 7C61 25 67 35 79 43C64 37 53 43 45 54C37 43 26 37 15 43Z"
            fill="rgba(255,255,255,0.8)"
          />
        </svg>
      </motion.div>

      {/* =====================================================
          DECORATIVE FLOATING HEARTS
      ====================================================== */}

      <motion.div
        className="absolute left-[7%] top-[28%] text-pink-300/60 pointer-events-none"
        animate={{
          y: [0, -12, 0],
          rotate: [-8, 8, -8],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Heart size={18} fill="currentColor" />
      </motion.div>

      <motion.div
        className="absolute right-[7%] bottom-[28%] text-pink-300/50 pointer-events-none"
        animate={{
          y: [0, 10, 0],
          rotate: [8, -8, 8],
          opacity: [0.25, 0.7, 0.25],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay: 1,
        }}
      >
        <Heart size={14} fill="currentColor" />
      </motion.div>

      {/* =====================================================
          LETTER CARD
          একটু ছোট + একটু নিচে
      ====================================================== */}

      <motion.div
        className="relative z-10 w-full max-w-[590px] mt-12 mb-3"
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 12,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >

        {/* glow behind card */}
        <div className="absolute -inset-5 rounded-[38px] bg-pink-200/20 blur-2xl pointer-events-none" />

        <div className="relative rounded-[32px] bg-white/80 backdrop-blur-xl border border-white/80 shadow-[0_20px_70px_rgba(236,72,153,0.13)] px-7 py-7 md:px-11 md:py-9 overflow-hidden">

          {/* corner decorations */}
          <Sparkles
            size={25}
            className="absolute top-5 left-5 text-pink-300/70"
          />

          <Heart
            size={19}
            fill="currentColor"
            className="absolute top-6 right-6 text-pink-300/80"
          />

          <motion.div
            className="absolute bottom-6 left-6 text-purple-200"
            animate={{
              rotate: [0, 20, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Sparkles size={17} />
          </motion.div>

          {/* top icon */}
          <motion.div
            className="mx-auto w-14 h-14 rounded-2xl bg-pink-100/80 flex items-center justify-center"
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

          {/* title */}
          <motion.h2
            className="text-center text-[30px] md:text-[38px] font-bold text-slate-700 mt-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A Letter For You
          </motion.h2>

          <motion.p
            className="text-center text-sm md:text-base tracking-[0.28em] text-purple-400 mt-2 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            From My Heart ♡
          </motion.p>

          {/* divider */}
          <div className="flex items-center justify-center gap-3 mt-5 mb-6">
            <span className="w-16 h-[2px] bg-pink-200 rounded-full" />

            <motion.div
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
            >
              <Heart
                size={14}
                fill="currentColor"
                className="text-pink-300"
              />
            </motion.div>

            <span className="w-16 h-[2px] bg-pink-200 rounded-full" />
          </div>

          {/* letter */}
          <div className="font-hand text-[17px] md:text-[19px] leading-[1.9] text-slate-600">

            <p className="mb-5">
              My favorite person,
            </p>

            <p className="mb-5">
              Sometimes I wish I could pause time, just so I could stay a little
              longer in the moments when I feel closest to you.
            </p>

            <p className="mb-5">
              Until we meet again, I hope you remember that somewhere in this
              big world, there is someone thinking about you, smiling because of
              you, and waiting for the next beautiful moment we get to share.
            </p>

            <p>
              Distance may keep us apart for a while, but it can never change
              the little place you have in my heart.
            </p>

          </div>

          {/* signature */}
          <div className="flex flex-col items-end mt-5 pr-2">
            <motion.span
              className="font-hand text-[24px] md:text-[27px] text-pink-400"
              animate={{
                rotate: [-1, 1, -1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              Always yours,
            </motion.span>

            <span className="font-hand text-[20px] md:text-[22px] text-purple-400 mt-1">
              rafee ♡
            </span>
          </div>

        </div>
      </motion.div>

      {/* =====================================================
          BOTTOM TEXT + BUTTON
      ====================================================== */}

      <motion.p
        className="relative z-10 text-xs md:text-sm text-slate-400 -mt-1 mb-3"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
      >
        no matter how far, still close to my heart ♡
      </motion.p>

      <motion.div
        className="relative z-10 mb-5"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.6,
        }}
      >
        <Button
          onClick={onNext}
          text="One Last Thing"
          animateIcon={false}
          icon={<Heart size={18} />}
        />
      </motion.div>

    </div>
  );
}

export default LetterScreen;
