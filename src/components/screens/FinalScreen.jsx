"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Zap, Sparkles } from "lucide-react";

const batteryItems = [
  {
    id: 1,
    left: "Without",
    right: "you",
    value: 0,
    fill: "bg-slate-200",
    glow: "rgba(148,163,184,0.15)",
    face: "🥺",
    color: "text-slate-500",
  },
  {
    id: 2,
    left: "When I see",
    right: "you",
    value: 50,
    fill: "bg-amber-300",
    glow: "rgba(251,191,36,0.25)",
    face: "😊",
    color: "text-amber-500",
  },
  {
    id: 3,
    left: "When I'm with",
    right: "you",
    value: 100,
    fill: "bg-emerald-400",
    glow: "rgba(52,211,153,0.28)",
    face: "🥰",
    color: "text-emerald-500",
  },
];

function Battery({ value, fill, glow, face }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Glow */}
      <motion.div
        className="absolute w-24 h-24 rounded-full blur-2xl pointer-events-none"
        style={{ background: glow }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative flex items-center">
        {/* Battery body */}
        <div className="relative w-[155px] h-[64px] rounded-[18px] border-[4px] border-slate-700 bg-white/80 overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
          {/* Battery fill */}
          <motion.div
            className={`absolute left-1.5 top-1.5 bottom-1.5 rounded-[12px] ${fill}`}
            initial={{ width: 0 }}
            animate={{
              width:
                value === 0
                  ? "0%"
                  : `calc(${value}% - 6px)`,
            }}
            transition={{
              duration: 1.4,
              delay: 0.25,
              ease: "easeOut",
            }}
          />

          {/* Face */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-[28px] z-10"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: [0.95, 1.06, 0.95],
            }}
            transition={{
              opacity: {
                duration: 0.5,
                delay: 0.4,
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            {face}
          </motion.div>

          {/* Shine */}
          <motion.div
            className="absolute top-0 bottom-0 w-8 bg-white/30 skew-x-[-18deg] pointer-events-none"
            animate={{
              left: ["-20%", "120%"],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 1.5,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Battery terminal */}
        <div className="w-[9px] h-[27px] bg-slate-700 rounded-r-md ml-1" />
      </div>

      {/* Percentage */}
      <motion.div
        className="mt-2 text-xl font-semibold text-slate-700"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.65,
          duration: 0.5,
        }}
      >
        {value}%
      </motion.div>
    </div>
  );
}

function ChargeCard({ item, index }) {
  return (
    <motion.div
      className="relative w-full max-w-[570px] min-h-[150px] rounded-[28px] border-2 border-dashed border-pink-300/80 bg-white/75 backdrop-blur-sm shadow-[0_10px_35px_rgba(236,72,153,0.08)] overflow-hidden"
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
        delay: 0.35 + index * 0.16,
        duration: 0.6,
        ease: "easeOut",
      }}
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
    >
      {/* Soft background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,192,203,0.16), transparent 65%)",
        }}
      />

      {/* Tiny decorative dots */}
      <div className="absolute top-3 left-5 flex gap-1 opacity-50">
        <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
        <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
      </div>

      <div className="relative z-10 flex items-center justify-center gap-3 px-4 py-5">
        {/* Left text */}
        <div className="w-[95px] text-right">
          <span className="font-hand text-xl md:text-2xl leading-tight text-slate-700">
            {item.left}
          </span>
        </div>

        {/* Battery */}
        <div className="shrink-0">
          <Battery
            value={item.value}
            fill={item.fill}
            glow={item.glow}
            face={item.face}
          />
        </div>

        {/* Right text */}
        <div className="w-[75px] text-left">
          <span className="font-hand text-xl md:text-2xl leading-tight text-slate-700">
            {item.right}
          </span>
        </div>
      </div>

      {/* little energy marks */}
      {item.value > 0 && (
        <>
          <motion.div
            className={`absolute top-5 left-1/2 -translate-x-[45px] ${item.color}`}
            animate={{
              y: [-2, -7, -2],
              rotate: [-8, 8, -8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          >
            <Zap size={17} fill="currentColor" />
          </motion.div>

          <motion.div
            className={`absolute top-6 left-1/2 translate-x-[28px] ${item.color}`}
            animate={{
              y: [-3, -8, -3],
              rotate: [8, -8, 8],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.3,
            }}
          >
            <Zap size={14} fill="currentColor" />
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

function HeartFinal() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full min-h-screen relative px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Glow */}
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-rose-300/25 blur-[70px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.6, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "easeInOut",
        }}
      />

      {/* Heart */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{
          y: [-7, 7, -7],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      >
        <Heart
          className="w-28 h-28 md:w-36 md:h-36 text-rose-500 fill-rose-400 drop-shadow-[0_15px_25px_rgba(244,114,182,0.4)]"
          strokeWidth={1.5}
        />
      </motion.div>

      <motion.h1
        className="relative z-10 text-5xl md:text-6xl font-semibold text-slate-700 mb-3 text-center"
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
          duration: 0.8,
        }}
      >
        I Love You.
      </motion.h1>

      <motion.p
        className="relative z-10 text-2xl md:text-3xl text-rose-500 font-hand text-center"
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 1,
          duration: 0.8,
        }}
      >
        I can't wait to see you again.
      </motion.p>
    </motion.div>
  );
}

export default function FinalScreen() {
  const [showFinal, setShowFinal] = useState(false);

  if (showFinal) {
    return <HeartFinal />;
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen h-full overflow-visible px-4 py-8">
      {/* Romantic background */}
      <motion.div
        className="absolute w-[420px] h-[420px] rounded-full bg-pink-200/25 blur-[90px] pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating hearts */}
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <motion.div
          key={item}
          className="absolute pointer-events-none text-pink-300/50 text-xl"
          style={{
            left: `${10 + item * 15}%`,
            top: `${16 + (item % 3) * 25}%`,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, item % 2 === 0 ? 7 : -7, 0],
            rotate: [-8, 8, -8],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: 3.5 + item * 0.25,
            repeat: Infinity,
            delay: item * 0.4,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Header */}
      <motion.div
        className="relative z-10 text-center mb-7"
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
        <div className="relative inline-block">
          <div className="absolute -inset-4 bg-pink-200/25 blur-2xl rounded-full" />

          <div className="relative bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl px-7 py-3 shadow-[0_10px_35px_rgba(236,72,153,0.08)]">
            <h1 className="font-hand text-4xl md:text-5xl font-semibold text-slate-700">
              You Charge My Heart
            </h1>
          </div>

          {/* tape */}
          <div className="absolute -left-7 top-1/2 -translate-y-1/2 w-12 h-7 bg-amber-100/60 rotate-[-35deg]" />
          <div className="absolute -right-7 top-1/2 -translate-y-1/2 w-12 h-7 bg-amber-100/60 rotate-[35deg]" />
        </div>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 w-full max-w-[570px] flex flex-col gap-4">
        {batteryItems.map((item, index) => (
          <ChargeCard
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>

      {/* Continue */}
      <motion.button
        type="button"
        onClick={() => setShowFinal(true)}
        className="relative z-20 mt-8 mb-2 px-6 py-3 rounded-full bg-white/65 backdrop-blur-sm text-rose-400 text-sm tracking-[0.22em] uppercase border border-pink-200/70 shadow-sm"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.25,
          duration: 0.6,
        }}
        whileHover={{
          scale: 1.04,
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
        whileTap={{
          scale: 0.96,
        }}
      >
        <span className="flex items-center gap-2">
          <Sparkles size={15} />
          Tap Here To Continue
          <Sparkles size={15} />
        </span>
      </motion.button>

      {/* Arrow decoration */}
      <motion.div
        className="relative z-10 text-pink-300 text-4xl mt-1"
        animate={{
          y: [0, 6, 0],
          rotate: [-8, 8, -8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        ↝
      </motion.div>
    </div>
  );
}
