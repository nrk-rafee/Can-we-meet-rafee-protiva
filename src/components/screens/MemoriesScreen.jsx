"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Heart, Sparkles, Camera } from "lucide-react";
import Button from "../Button";

const memories = [
  "/images/IMG-20260329-WA0002.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260914-WA0013.jpg",
];

const floatingHearts = [
  { x: "-145px", y: "-95px", delay: 0, size: 18, rotate: -15 },
  { x: "145px", y: "-70px", delay: 0.8, size: 15, rotate: 18 },
  { x: "-165px", y: "55px", delay: 1.4, size: 13, rotate: -25 },
  { x: "155px", y: "85px", delay: 0.5, size: 17, rotate: 20 },
];

const sparkles = [
  { x: "-125px", y: "-150px", delay: 0 },
  { x: "125px", y: "-135px", delay: 1 },
  { x: "-155px", y: "135px", delay: 0.6 },
  { x: "150px", y: "145px", delay: 1.4 },
];

function MemoriesScreen({ onNext }) {
  const [cards, setCards] = useState(memories);

  const swipeCard = () => {
    if (cards.length > 1) {
      setCards((prev) => [...prev.slice(1), prev[0]]);
    }
  };

  const currentPhoto = memories.indexOf(cards[0]) + 1;

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-full min-h-screen overflow-visible">

      {/* ================= BACKGROUND DECORATIONS ================= */}

      {/* Soft glowing circles */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.65, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-52 h-52 rounded-full bg-purple-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating Hearts */}
      {floatingHearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: `calc(50% + ${heart.x})`,
            top: `calc(50% + ${heart.y})`,
          }}
          animate={{
            y: [0, -14, 0],
            rotate: [
              heart.rotate - 5,
              heart.rotate + 5,
              heart.rotate - 5,
            ],
            opacity: [0.35, 0.8, 0.35],
          }}
          transition={{
            duration: 3.5,
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

      {/* Sparkles */}
      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: `calc(50% + ${star.x})`,
            top: `calc(50% + ${star.y})`,
          }}
          animate={{
            scale: [0.7, 1.25, 0.7],
            rotate: [0, 90, 180],
            opacity: [0.25, 0.9, 0.25],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={16}
            className="text-purple-300"
          />
        </motion.div>
      ))}

      {/* ================= TITLE ================= */}

      <motion.div
        className="text-center z-10 mt-5"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Camera
            size={20}
            className="text-pink-400"
          />

          <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
            Our Memories
          </h2>

          <Camera
            size={20}
            className="text-pink-400 scale-x-[-1]"
          />
        </div>

        <motion.p
          className="text-xl md:text-2xl font-hand text-purple-400"
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

      {/* ================= ALBUM AREA ================= */}

      <div className="relative w-full max-w-[420px] h-[430px] md:h-[460px] my-3 flex items-center justify-center z-10">

        {/* Animated album frame */}
        <motion.div
          className="absolute w-[320px] h-[380px] md:w-[350px] md:h-[405px] rounded-[28px] border-2 border-dashed border-pink-200/70"
          animate={{
            rotate: [0, 1, 0, -1, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner album glow */}
        <motion.div
          className="absolute w-[300px] h-[360px] md:w-[330px] md:h-[385px] rounded-[25px] bg-white/40 backdrop-blur-sm shadow-[0_20px_60px_rgba(236,72,153,0.08)]"
          animate={{
            boxShadow: [
              "0 20px 60px rgba(236,72,153,0.06)",
              "0 25px 70px rgba(168,85,247,0.12)",
              "0 20px 60px rgba(236,72,153,0.06)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Small decorative dots */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {[0, 1, 2, 3, 4].map((dot) => (
            <motion.span
              key={dot}
              className={`w-1.5 h-1.5 rounded-full ${
                dot === currentPhoto - 1
                  ? "bg-pink-400"
                  : "bg-pink-200"
              }`}
              animate={
                dot === currentPhoto - 1
                  ? { scale: [1, 1.5, 1] }
                  : {}
              }
              transition={{
                duration: 1.3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* Photo Stack */}
        <AnimatePresence initial={false}>
          {cards.map((photo, index) => {
            if (index > 2) return null;

            const isTop = index === 0;

            return (
              <motion.div
                key={photo}
                initial={{
                  opacity: 0,
                  scale: 0.75,
                  y: 60,
                  rotate: index % 2 === 0 ? -8 : 8,
                }}
                animate={{
                  opacity: 1 - index * 0.12,
                  scale: 1 - index * 0.045,
                  y: index * 14,
                  rotate: isTop
                    ? 0
                    : index === 1
                    ? 4
                    : -4,
                  zIndex: 30 - index,
                }}
                exit={{
                  opacity: 0,
                  x: -180,
                  y: -30,
                  rotate: -15,
                  scale: 0.85,
                  transition: {
                    duration: 0.55,
                    ease: "easeOut",
                  },
                }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                }}
                className={`
                  absolute
                  top-8
                  left-1/2
                  -translate-x-1/2
                  w-[270px]
                  h-[335px]
                  md:w-[295px]
                  md:h-[360px]
                  bg-[#fffdfd]
                  rounded-2xl
                  p-3
                  pb-12
                  shadow-[0_18px_40px_rgba(0,0,0,0.12)]
                  border
                  border-pink-100
                  ${isTop ? "cursor-pointer" : ""}
                `}
                onClick={isTop ? swipeCard : undefined}
                whileHover={
                  isTop
                    ? {
                        y: -6,
                        scale: 1.015,
                      }
                    : {}
                }
                whileTap={
                  isTop
                    ? {
                        scale: 0.97,
                      }
                    : {}
                }
              >
                {/* Photo */}
                <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-pink-50 relative">

                  <img
                    src={photo}
                    alt={`Memory ${currentPhoto}`}
                    className="w-full h-full object-cover pointer-events-none select-none"
                    draggable="false"
                  />

                  {/* Soft photo overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/5 pointer-events-none" />

                </div>

                {/* Polaroid caption */}
                <div className="absolute bottom-2 left-0 right-0 text-center">
                  <span className="font-hand text-sm text-slate-400">
                    a little piece of us ♡
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Swipe hint */}
        {cards.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40"
            animate={{
              y: [0, 5, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-pink-100">
              <span className="text-xs text-pink-400">
                tap the photo ♡
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ================= PHOTO COUNTER ================= */}

      <motion.div
        className="z-10 -mt-1 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <span className="w-8 h-px bg-pink-200" />

          <span>
            {currentPhoto} / {memories.length}
          </span>

          <span className="w-8 h-px bg-pink-200" />
        </div>
      </motion.div>

      {/* ================= NEXT BUTTON ================= */}

      <motion.div
        className="shrink-0 z-10 mb-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
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
