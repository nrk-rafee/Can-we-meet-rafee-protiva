"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
  Flower2,
} from "lucide-react";
import Button from "../Button";

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

/*
  IMPORTANT:
  Put a realistic butterfly PNG inside:
  public/images/butterfly.png

  Transparent background PNG হলে সবচেয়ে সুন্দর দেখাবে।
*/

const butterflies = [
  {
    left: "-5%",
    top: "17%",
    width: 105,
    delay: 0,
    duration: 8,
    rotate: -12,
    opacity: 0.95,
  },
  {
    right: "-3%",
    top: "29%",
    width: 72,
    delay: 1.5,
    duration: 7,
    rotate: 15,
    opacity: 0.9,
  },
  {
    right: "-4%",
    top: "67%",
    width: 105,
    delay: 0.8,
    duration: 9,
    rotate: -8,
    opacity: 0.92,
  },
  {
    left: "-2%",
    top: "78%",
    width: 70,
    delay: 2.5,
    duration: 8,
    rotate: 12,
    opacity: 0.82,
  },
  {
    left: "7%",
    top: "43%",
    width: 42,
    delay: 3,
    duration: 6,
    rotate: -18,
    opacity: 0.7,
  },
  {
    right: "10%",
    top: "13%",
    width: 40,
    delay: 1,
    duration: 6.5,
    rotate: 12,
    opacity: 0.72,
  },
];

const petals = [
  { left: "8%", top: "30%", delay: 0 },
  { left: "85%", top: "40%", delay: 1.5 },
  { left: "14%", top: "65%", delay: 2 },
  { left: "77%", top: "75%", delay: 0.8 },
  { left: "91%", top: "55%", delay: 2.8 },
  { left: "5%", top: "55%", delay: 1.2 },
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

  return (
    <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-b from-[#ffe9f1] via-[#ffdce9] to-[#fff0f5] flex flex-col items-center">

      {/* =====================================================
          DREAMY BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Main pink glow */}
        <motion.div
          className="absolute left-1/2 top-[38%] -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-pink-300/25 blur-[100px]"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.45, 0.65, 0.45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute left-[5%] top-[5%] w-[300px] h-[300px] rounded-full bg-white/70 blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute right-[-80px] bottom-[5%] w-[350px] h-[350px] rounded-full bg-purple-200/25 blur-[90px]"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        {/* Soft bokeh */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/60 blur-[2px]"
            style={{
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.25, 0.9, 0.25],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute text-white"
            style={{
              left: `${(i * 41) % 96}%`,
              top: `${(i * 29) % 92}%`,
            }}
            animate={{
              scale: [0.4, 1.2, 0.4],
              opacity: [0.15, 0.9, 0.15],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Sparkles size={14 + (i % 3) * 4} />
          </motion.div>
        ))}

        {/* Falling petals */}
        {petals.map((petal, index) => (
          <motion.div
            key={index}
            className="absolute w-3 h-5 rounded-full bg-pink-300/50"
            style={{
              left: petal.left,
              top: petal.top,
            }}
            animate={{
              y: [0, 80, 160],
              x: [0, 20, -10],
              rotate: [0, 90, 180],
              opacity: [0, 0.65, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              delay: petal.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* =====================================================
          REALISTIC BUTTERFLIES
      ====================================================== */}

      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">

        {butterflies.map((butterfly, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: butterfly.left,
              right: butterfly.right,
              top: butterfly.top,
              width: butterfly.width,
              opacity: butterfly.opacity,
              rotate: butterfly.rotate,
            }}
            animate={{
              x: [0, 35, -20, 25, 0],
              y: [0, -35, 15, -25, 0],
              rotate: [
                butterfly.rotate,
                butterfly.rotate + 8,
                butterfly.rotate - 8,
                butterfly.rotate + 5,
                butterfly.rotate,
              ],
              scale: [1, 1.03, 0.97, 1.04, 1],
            }}
            transition={{
              duration: butterfly.duration,
              repeat: Infinity,
              delay: butterfly.delay,
              ease: "easeInOut",
            }}
          >
            <motion.img
              src="/images/butterfly.png"
              alt=""
              className="w-full h-auto object-contain drop-shadow-[0_8px_12px_rgba(120,50,90,0.25)]"
              animate={{
                rotateY: [0, 35, -25, 25, 0],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}

      </div>

      {/* =====================================================
          TOP DECORATION
      ====================================================== */}

      <motion.div
        className="absolute top-5 left-5 text-pink-300/70"
        animate={{
          rotate: [-5, 5, -5],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Flower2 size={32} />
      </motion.div>

      <motion.div
        className="absolute top-8 right-6 text-pink-300/70"
        animate={{
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Heart size={25} fill="currentColor" />
      </motion.div>

      {/* =====================================================
          HEADER
      ====================================================== */}

      <motion.div
        className="relative z-40 text-center mt-12"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-3">

          <motion.div
            animate={{
              rotate: [-5, 5, -5],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={25}
              strokeWidth={2.2}
              className="text-pink-500"
            />
          </motion.div>

          <h2 className="text-[34px] md:text-5xl font-extrabold tracking-tight text-slate-700">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [5, -5, 5],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={25}
              strokeWidth={2.2}
              className="text-pink-500"
            />
          </motion.div>

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

      {/* =====================================================
          DOTS
      ====================================================== */}

      <div className="relative z-40 flex items-center gap-3 mt-6">

        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-4 h-4 bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.55)]"
                : "w-3 h-3 bg-pink-300/70"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.25, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
          />
        ))}

      </div>

      {/* =====================================================
          LUXURY ALBUM AREA
      ====================================================== */}

      <div className="relative z-40 w-full max-w-[500px] h-[470px] mt-5 flex items-center justify-center">

        {/* glowing ring */}
        <motion.div
          className="absolute w-[365px] h-[400px] rounded-[40px] border border-white/80"
          animate={{
            rotate: [0, 1, 0, -1, 0],
            boxShadow: [
              "0 0 25px rgba(255,255,255,0.35)",
              "0 0 55px rgba(236,72,153,0.22)",
              "0 0 25px rgba(255,255,255,0.35)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        {/* luxury glass layer */}
        <motion.div
          className="absolute w-[350px] h-[390px] rounded-[35px] bg-white/20 backdrop-blur-[2px] border border-white/70"
          animate={{
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />

        {/* back album */}
        <motion.div
          className="absolute w-[320px] h-[385px] rounded-[25px] bg-[#fcecf2] border border-white shadow-[0_20px_50px_rgba(130,70,100,0.12)]"
          style={{
            rotate: -7,
          }}
        />

        <motion.div
          className="absolute w-[325px] h-[385px] rounded-[25px] bg-[#fff5f8] border border-white shadow-[0_20px_50px_rgba(130,70,100,0.12)]"
          style={{
            rotate: 6,
          }}
        />

        {/* ribbon */}
        <motion.div
          className="absolute z-50 left-[70px] top-[110px] w-[80px] h-[22px] rounded-full bg-pink-300/80 blur-[0.2px]"
          style={{
            rotate: -28,
          }}
          animate={{
            x: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.div
          className="absolute z-50 right-[65px] top-[175px] w-[75px] h-[20px] rounded-full bg-pink-300/70"
          style={{
            rotate: 30,
          }}
          animate={{
            x: [2, -2, 2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* MAIN POLAROID */}
        <AnimatePresence mode="wait" custom={direction}>

          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 100 : -100,
              rotate: direction > 0 ? 5 : -5,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -100 : 100,
              rotate: direction > 0 ? -5 : 5,
              scale: 0.92,
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            onClick={nextPhoto}
            className="absolute z-40 w-[305px] h-[385px] bg-[#fffdfd] rounded-[22px] p-3 pb-14 shadow-[0_25px_55px_rgba(90,40,70,0.25)] border border-white cursor-pointer"
          >

            {/* washi tape */}
            <motion.div
              className="absolute -top-5 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-pink-200/90 z-50 shadow-sm"
              style={{
                rotate: -3,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Heart
                  size={18}
                  fill="currentColor"
                  className="text-pink-500"
                />
              </div>
            </motion.div>

            {/* photo */}
            <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-slate-100 border border-pink-100">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable="false"
              />

              {/* soft photo glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/10 pointer-events-none" />

              {/* moving light */}
              <motion.div
                className="absolute top-0 bottom-0 w-[70px] bg-white/20 skew-x-[-20deg]"
                animate={{
                  left: ["-30%", "130%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />

            </div>

            {/* bottom caption */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center">

              <span className="font-hand text-[17px] text-slate-500">
                a little piece of us ♡
              </span>

            </div>

            {/* tiny heart */}
            <Heart
              size={19}
              fill="currentColor"
              className="absolute bottom-3 right-5 text-pink-400"
            />

          </motion.div>

        </AnimatePresence>

        {/* floating side heart */}
        <motion.div
          className="absolute left-[42px] top-[210px] z-50"
          animate={{
            y: [0, -8, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <Heart
            size={19}
            fill="currentColor"
            className="text-pink-400"
          />
        </motion.div>

        <motion.div
          className="absolute right-[45px] top-[115px] z-50"
          animate={{
            y: [0, 7, 0],
            rotate: [8, -8, 8],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
          }}
        >
          <Sparkles
            size={20}
            className="text-pink-300"
          />
        </motion.div>

      </div>

      {/* =====================================================
          COUNTER
      ====================================================== */}

      <motion.div
        className="relative z-50 -mt-1 flex items-center gap-4"
        key={currentIndex}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >

        <span className="w-10 h-px bg-pink-300" />

        <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-pink-200 bg-white/40 backdrop-blur-sm shadow-sm">

          <Heart
            size={13}
            fill="currentColor"
            className="text-pink-400"
          />

          <span className="text-[17px] tracking-[0.2em] font-medium text-slate-500">
            {String(currentIndex + 1).padStart(2, "0")}
            {" / "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <Heart
            size={13}
            fill="currentColor"
            className="text-pink-400"
          />

        </div>

        <span className="w-10 h-px bg-pink-300" />

      </motion.div>

      {/* =====================================================
          NEXT HINT
      ====================================================== */}

      <motion.div
        className="relative z-50 mt-2"
        animate={{
          opacity: [0.45, 1, 0.45],
          y: [0, 3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="flex items-center gap-2 text-xs text-pink-400">
          <span>tap photo for next</span>
          <ChevronRight size={13} />
        </div>
      </motion.div>

      {/* =====================================================
          LETTER BUTTON
      ====================================================== */}

      <motion.div
        className="relative z-50 mt-5 mb-8"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.7,
          duration: 0.6,
        }}
      >

        <motion.div
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          <Button
            onClick={onNext}
            text="A Letter For You"
            animateIcon={false}
            icon={<Mail size={19} />}
          />
        </motion.div>

      </motion.div>

      {/* watermark */}
      <motion.div
        className="fixed bottom-3 right-4 z-[100] text-xs text-slate-500/40 tracking-wide pointer-events-none"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
      >
        rafee🫶protiva
      </motion.div>

    </div>
  );
}

export default MemoriesScreen;
