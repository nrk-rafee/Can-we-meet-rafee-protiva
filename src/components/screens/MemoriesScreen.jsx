"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import Button from "../Button";

const memories = [
  "/images/IMG-20260329-WA0002.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260914-WA0013.jpg",

  // 👇 এখানে তোর ৪ নম্বর ছবির EXACT filename বসা
  "/images/PUT-YOUR-4TH-FILENAME-HERE.jpg",

  // 👇 এখানে তোর ৫ নম্বর ছবির EXACT filename বসা
  "/images/PUT-YOUR-5TH-FILENAME-HERE.jpg",
];

const floatingItems = [
  { type: "heart", x: "-155px", y: "-90px", delay: 0 },
  { type: "heart", x: "155px", y: "-55px", delay: 0.8 },
  { type: "heart", x: "-165px", y: "85px", delay: 1.4 },
  { type: "heart", x: "165px", y: "105px", delay: 0.5 },
];

const stars = [
  { x: "-130px", y: "-145px", delay: 0 },
  { x: "135px", y: "-125px", delay: 1 },
  { x: "-145px", y: "145px", delay: 0.7 },
  { x: "145px", y: "150px", delay: 1.5 },
];

function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentPhoto = memories[currentIndex];

  const nextPhoto = () => {
    setDirection(1);

    setCurrentIndex((prev) =>
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  const previousPhoto = () => {
    setDirection(-1);

    setCurrentIndex((prev) =>
      prev === 0 ? memories.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <motion.div
        className="absolute w-[330px] h-[330px] rounded-full bg-pink-200/20 blur-[80px] pointer-events-none"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[260px] h-[260px] rounded-full bg-purple-200/15 blur-[70px] pointer-events-none"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ================================================= */}
      {/* FLOATING HEARTS */}
      {/* ================================================= */}

      {floatingItems.map((item, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: `calc(50% + ${item.x})`,
            top: `calc(50% + ${item.y})`,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [-5, 7, -5],
            opacity: [0.25, 0.75, 0.25],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={17}
            fill="currentColor"
            className="text-pink-300"
          />
        </motion.div>
      ))}

      {/* ================================================= */}
      {/* SPARKLES */}
      {/* ================================================= */}

      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: `calc(50% + ${star.x})`,
            top: `calc(50% + ${star.y})`,
          }}
          animate={{
            scale: [0.6, 1.2, 0.6],
            rotate: [0, 90, 180],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
          }}
        >
          <Sparkles
            size={16}
            className="text-purple-300"
          />
        </motion.div>
      ))}

      {/* ================================================= */}
      {/* TITLE */}
      {/* ================================================= */}

      <motion.div
        className="relative z-10 text-center mt-4"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2">
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
          className="text-xl md:text-2xl font-hand text-purple-400 mt-2"
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

      {/* ================================================= */}
      {/* ALBUM */}
      {/* ================================================= */}

      <div className="relative z-10 w-full max-w-[430px] h-[430px] md:h-[455px] mt-3 flex items-center justify-center">

        {/* Decorative album frame */}
        <motion.div
          className="absolute w-[325px] h-[380px] md:w-[350px] md:h-[400px] rounded-[30px] border-2 border-dashed border-pink-200/80"
          animate={{
            rotate: [0, 0.8, 0, -0.8, 0],
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Inner glass */}
        <motion.div
          className="absolute w-[305px] h-[360px] md:w-[330px] md:h-[385px] rounded-[28px] bg-white/35 backdrop-blur-sm"
          animate={{
            boxShadow: [
              "0 15px 45px rgba(236,72,153,0.05)",
              "0 20px 60px rgba(168,85,247,0.12)",
              "0 15px 45px rgba(236,72,153,0.05)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* ================================================= */}
        {/* TOP DECORATION */}
        {/* ================================================= */}

        <div className="absolute top-0 z-30 flex items-center gap-2">
          {[...Array(memories.length)].map((_, index) => (
            <motion.span
              key={index}
              className={`rounded-full ${
                index === currentIndex
                  ? "bg-pink-400"
                  : "bg-pink-200"
              }`}
              animate={
                index === currentIndex
                  ? {
                      width: [7, 11, 7],
                      height: [7, 11, 7],
                    }
                  : {
                      width: 7,
                      height: 7,
                    }
              }
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* ================================================= */}
        {/* PHOTO */}
        {/* ================================================= */}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 150 : -150,
              rotate: direction > 0 ? 8 : -8,
              scale: 0.88,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -150 : 150,
              rotate: direction > 0 ? -8 : 8,
              scale: 0.88,
            }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute z-20 w-[278px] h-[350px] md:w-[300px] md:h-[370px] bg-[#fffdfd] rounded-[20px] p-3 pb-12 shadow-[0_20px_45px_rgba(0,0,0,0.13)] border border-pink-100"
          >

            {/* Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 bg-pink-100/70 rotate-[-2deg] rounded-sm shadow-sm z-30" />

            {/* Image */}
            <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-100 border border-pink-50 relative">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable="false"
              />

              {/* subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/5 pointer-events-none" />

              {/* little heart */}
              <motion.div
                className="absolute right-3 bottom-3"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Heart
                  size={17}
                  fill="white"
                  className="text-white drop-shadow-md"
                />
              </motion.div>
            </div>

            {/* Caption */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================================================= */}
        {/* LEFT ARROW */}
        {/* ================================================= */}

        <motion.button
          onClick={previousPhoto}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute z-40 left-[20px] md:left-[28px] w-10 h-10 rounded-full bg-white/85 backdrop-blur-md shadow-md border border-pink-100 flex items-center justify-center text-pink-400"
        >
          <ChevronRight
            size={19}
            className="rotate-180"
          />
        </motion.button>

        {/* ================================================= */}
        {/* RIGHT ARROW */}
        {/* ================================================= */}

        <motion.button
          onClick={nextPhoto}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute z-40 right-[20px] md:right-[28px] w-10 h-10 rounded-full bg-white/85 backdrop-blur-md shadow-md border border-pink-100 flex items-center justify-center text-pink-400"
        >
          <ChevronRight size={19} />
        </motion.button>

        {/* ================================================= */}
        {/* SWIPE HINT */}
        {/* ================================================= */}

        <motion.div
          className="absolute bottom-0 z-40"
          animate={{
            y: [0, 5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-pink-100 shadow-sm">
            <span className="text-xs text-pink-400">
              tap or use arrows ♡
            </span>
          </div>
        </motion.div>
      </div>

      {/* ================================================= */}
      {/* COUNTER */}
      {/* ================================================= */}

      <motion.div
        className="relative z-10 flex items-center gap-3 -mt-1 mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="w-9 h-px bg-pink-200" />

        <div className="flex items-center gap-1.5 text-sm text-slate-400">
          <ImageIcon size={14} className="text-pink-300" />

          <span>
            {currentIndex + 1}
          </span>

          <span>/</span>

          <span>
            {memories.length}
          </span>
        </div>

        <span className="w-9 h-px bg-pink-200" />
      </motion.div>

      {/* ================================================= */}
      {/* NEXT */}
      {/* ================================================= */}

      <motion.div
        className="relative z-10 mb-5"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
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
