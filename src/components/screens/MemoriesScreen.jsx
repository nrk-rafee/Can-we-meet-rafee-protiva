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

// ======================================================
// YOUR 5 MEMORIES
// ======================================================

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

// ======================================================
// BUTTERFLIES
// Using emoji with different sizes/positions.
// Later a real transparent butterfly PNG can replace
// these without changing the album structure.
// ======================================================

const butterflies = [
  {
    left: "4%",
    top: "18%",
    size: 44,
    rotate: -15,
    delay: 0,
    duration: 7,
    x: [0, 18, -8, 0],
    y: [0, -18, 8, 0],
  },
  {
    right: "5%",
    top: "28%",
    size: 28,
    rotate: 12,
    delay: 1.2,
    duration: 6,
    x: [0, -15, 10, 0],
    y: [0, 12, -10, 0],
  },
  {
    right: "8%",
    top: "51%",
    size: 48,
    rotate: 18,
    delay: 0.7,
    duration: 8,
    x: [0, -20, 8, 0],
    y: [0, -15, 18, 0],
  },
  {
    left: "2%",
    top: "67%",
    size: 32,
    rotate: -20,
    delay: 2,
    duration: 7,
    x: [0, 14, -12, 0],
    y: [0, 16, -12, 0],
  },
  {
    right: "2%",
    bottom: "12%",
    size: 40,
    rotate: 15,
    delay: 2.8,
    duration: 9,
    x: [0, -12, 16, 0],
    y: [0, -18, 10, 0],
  },
  {
    left: "14%",
    bottom: "20%",
    size: 23,
    rotate: -8,
    delay: 3,
    duration: 6.5,
    x: [0, 12, -8, 0],
    y: [0, -10, 12, 0],
  },
];

// ======================================================
// SMALL FLOATING HEARTS
// ======================================================

const hearts = [
  { left: "17%", top: "31%", delay: 0 },
  { right: "16%", top: "40%", delay: 1.3 },
  { left: "11%", top: "49%", delay: 2 },
  { right: "13%", top: "69%", delay: 0.8 },
  { left: "20%", bottom: "14%", delay: 1.7 },
];

// ======================================================
// PETALS / LIGHT PARTICLES
// ======================================================

const particles = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 37) % 96}%`,
  top: `${(index * 61) % 92}%`,
  size: 3 + (index % 4),
  delay: (index % 8) * 0.45,
  duration: 3.5 + (index % 5),
}));

// ======================================================
// MAIN COMPONENT
// ======================================================

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
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#fce8f0] flex flex-col items-center">

      {/* ==================================================
          DREAMY BACKGROUND
      ================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Main pink glow */}
        <motion.div
          className="absolute left-1/2 top-[42%] -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-pink-300/25 blur-[110px]"
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

        {/* White center glow */}
        <motion.div
          className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[430px] h-[600px] rounded-full bg-white/45 blur-[90px]"
          animate={{
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Top glow */}
        <div className="absolute top-[-160px] left-[-80px] w-[330px] h-[330px] rounded-full bg-pink-200/50 blur-[100px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-180px] right-[-100px] w-[380px] h-[380px] rounded-full bg-purple-200/30 blur-[110px]" />

        {/* Tiny stars */}
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              boxShadow: "0 0 12px rgba(255,255,255,0.9)",
            }}
            animate={{
              opacity: [0.1, 0.8, 0.15],
              scale: [0.6, 1.3, 0.6],
              y: [0, -10, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Decorative sparkle crosses */}
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <motion.div
            key={item}
            className="absolute text-white/80"
            style={{
              left: `${10 + item * 16}%`,
              top: `${12 + ((item * 19) % 72)}%`,
            }}
            animate={{
              scale: [0.6, 1.2, 0.6],
              rotate: [0, 90, 180],
              opacity: [0.2, 0.9, 0.2],
            }}
            transition={{
              duration: 3 + item * 0.3,
              delay: item * 0.5,
              repeat: Infinity,
            }}
          >
            <Sparkles size={13 + (item % 3) * 3} />
          </motion.div>
        ))}
      </div>

      {/* ==================================================
          TOP DECORATIVE FLOWER BRANCHES
      ================================================== */}

      <div className="absolute -top-8 -right-14 rotate-[18deg] opacity-60 pointer-events-none">
        <div className="relative w-[180px] h-[150px]">
          <div className="absolute left-5 top-12 w-[150px] h-[2px] bg-[#8b756e]/40 rotate-[20deg]" />

          <div className="absolute left-16 top-4 text-pink-300/80">
            <Flower2 size={34} />
          </div>

          <div className="absolute left-28 top-20 text-pink-200/90">
            <Flower2 size={25} />
          </div>

          <div className="absolute left-7 top-55 text-green-300/50">
            <Heart size={25} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* ==================================================
          BOTTOM LEFT FLOWER DECORATION
      ================================================== */}

      <motion.div
        className="absolute left-[-35px] bottom-[7%] pointer-events-none opacity-55"
        animate={{
          y: [0, -5, 0],
          rotate: [-2, 1, -2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="relative w-[150px] h-[190px]">

          <div className="absolute left-[72px] top-[50px] w-[2px] h-[135px] bg-green-500/30 rotate-[-14deg]" />

          <div className="absolute left-[38px] top-[84px] w-[55px] h-[2px] bg-green-500/25 rotate-[30deg]" />

          <div className="absolute left-[76px] top-[32px] text-pink-300/80">
            <Flower2 size={42} />
          </div>

          <div className="absolute left-[25px] top-[75px] text-pink-200/80">
            <Flower2 size={27} />
          </div>

          <div className="absolute left-[92px] top-[105px] text-pink-300/60">
            <Flower2 size={25} />
          </div>
        </div>
      </motion.div>

      {/* ==================================================
          REALISTIC-STYLE FLYING BUTTERFLIES
      ================================================== */}

      {butterflies.map((butterfly, index) => (
        <motion.div
          key={index}
          className="absolute z-30 pointer-events-none select-none"
          style={{
            left: butterfly.left,
            right: butterfly.right,
            top: butterfly.top,
            bottom: butterfly.bottom,
          }}
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          animate={{
            opacity: [0, 0.9, 0.75, 0.95, 0],
            scale: [0.7, 1, 0.94, 1.04, 0.7],
            x: butterfly.x,
            y: butterfly.y,
            rotate: [
              butterfly.rotate - 4,
              butterfly.rotate + 5,
              butterfly.rotate - 2,
              butterfly.rotate + 4,
              butterfly.rotate,
            ],
          }}
          transition={{
            duration: butterfly.duration,
            delay: butterfly.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* soft butterfly glow */}
          <div className="absolute inset-0 rounded-full bg-pink-300/30 blur-xl scale-75" />

          <span
            className="relative block"
            style={{
              fontSize: butterfly.size,
              filter:
                "drop-shadow(0 5px 7px rgba(100,50,80,0.18)) saturate(1.15)",
            }}
          >
            🦋
          </span>
        </motion.div>
      ))}

      {/* ==================================================
          FLOATING HEARTS
      ================================================== */}

      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute z-10 text-pink-300/60 pointer-events-none"
          style={{
            left: heart.left,
            right: heart.right,
            top: heart.top,
            bottom: heart.bottom,
          }}
          animate={{
            y: [0, -12, 0],
            x: [0, index % 2 === 0 ? 5 : -5, 0],
            rotate: [-8, 8, -8],
            opacity: [0.25, 0.75, 0.25],
          }}
          transition={{
            duration: 4,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={index % 2 === 0 ? 15 : 12}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* ==================================================
          HEADER
      ================================================== */}

      <motion.div
        className="relative z-20 text-center pt-[7vh] px-5"
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-center gap-3">

          <motion.div
            animate={{
              rotate: [-5, 5, -5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={27}
              strokeWidth={2}
              className="text-pink-500"
            />
          </motion.div>

          <h2 className="text-[34px] sm:text-5xl font-extrabold tracking-tight text-[#263247]">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [5, -5, 5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={27}
              strokeWidth={2}
              className="text-pink-500"
            />
          </motion.div>

        </div>

        <motion.p
          className="mt-3 text-[20px] sm:text-2xl font-hand italic text-purple-400"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
        >
          Little moments, forever ours ♡
        </motion.p>
      </motion.div>

      {/* ==================================================
          PHOTO DOTS
      ================================================== */}

      <motion.div
        className="relative z-20 flex items-center justify-center gap-[12px] mt-6"
        initial={{
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.4,
          duration: 0.5,
        }}
      >
        {memories.map((_, index) => (
          <motion.div
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-[15px] h-[15px] bg-pink-500"
                : "w-[11px] h-[11px] bg-pink-300"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.22, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {/* ==================================================
          LUXURY ALBUM AREA
      ================================================== */}

      <div className="relative z-20 w-full max-w-[470px] h-[510px] mt-3 flex items-center justify-center">

        {/* Outer luxury glow */}
        <motion.div
          className="absolute w-[365px] h-[420px] rounded-[35px] bg-pink-300/20 blur-[35px]"
          animate={{
            opacity: [0.35, 0.65, 0.35],
            scale: [0.98, 1.03, 0.98],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Back album sheet */}
        <motion.div
          className="absolute w-[330px] h-[420px] rounded-[26px] bg-[#fffafa]/70 border border-white/80 shadow-[0_18px_50px_rgba(128,70,100,0.12)]"
          animate={{
            rotate: [-3, -2, -3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Second back sheet */}
        <motion.div
          className="absolute w-[330px] h-[420px] rounded-[26px] bg-pink-50/75 border border-white/80"
          animate={{
            rotate: [3, 2, 3],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ribbon behind album - left */}
        <motion.div
          className="absolute left-[38px] top-[115px] w-[105px] h-[24px] rounded-full bg-gradient-to-r from-pink-300/70 via-pink-200/70 to-pink-300/60 shadow-sm"
          animate={{
            rotate: [-18, -15, -18],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        {/* Ribbon behind album - right */}
        <motion.div
          className="absolute right-[38px] top-[145px] w-[105px] h-[24px] rounded-full bg-gradient-to-r from-pink-300/60 via-pink-200/70 to-pink-300/60 shadow-sm"
          animate={{
            rotate: [15, 18, 15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
        />

        {/* Main album shadow */}
        <motion.div
          className="absolute w-[335px] h-[425px] rounded-[27px] bg-white/80"
          animate={{
            boxShadow: [
              "0 20px 45px rgba(104,57,82,0.13)",
              "0 25px 65px rgba(216,85,145,0.22)",
              "0 20px 45px rgba(104,57,82,0.13)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main photo */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 80 : -80,
              rotate: direction > 0 ? 5 : -5,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: direction > 0 ? -80 : 80,
              rotate: direction > 0 ? -5 : 5,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute w-[305px] h-[395px] rounded-[22px] bg-[#fffdfd] p-[11px] pb-[48px] shadow-[0_22px_55px_rgba(74,42,60,0.22)] border border-pink-100/90 cursor-pointer"
            onClick={nextPhoto}
            whileTap={{
              scale: 0.975,
            }}
          >

            {/* Tape on top */}
            <motion.div
              className="absolute z-30 left-1/2 -translate-x-1/2 -top-[13px] w-[82px] h-[28px] bg-pink-200/90 shadow-sm"
              style={{
                clipPath:
                  "polygon(4% 8%, 96% 0%, 100% 92%, 4% 100%)",
              }}
              animate={{
                rotate: [-2, 1, -2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-pink-500/80">
                <Heart
                  size={16}
                  fill="currentColor"
                />
              </div>
            </motion.div>

            {/* Image frame */}
            <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable="false"
              />

              {/* Soft photo overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/10 pointer-events-none" />

              {/* Moving light */}
              <motion.div
                className="absolute top-0 bottom-0 w-[65px] bg-white/20 skew-x-[-18deg] pointer-events-none"
                animate={{
                  left: ["-80px", "360px"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut",
                }}
              />

              {/* Tiny heart */}
              <motion.div
                className="absolute right-3 top-3 text-white drop-shadow-md"
                animate={{
                  scale: [1, 1.18, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Heart
                  size={17}
                  fill="currentColor"
                />
              </motion.div>
            </div>

            {/* Polaroid caption */}
            <div className="absolute left-0 right-0 bottom-[9px] flex items-center justify-center">
              <span className="font-hand text-[17px] italic text-slate-500">
                a little piece of us ♡
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Left flower cluster */}
        <motion.div
          className="absolute z-40 left-[42px] bottom-[45px] pointer-events-none"
          animate={{
            y: [0, -3, 0],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          <div className="relative">
            <Flower2
              size={52}
              className="text-pink-300 drop-shadow-sm"
            />
            <Flower2
              size={29}
              className="absolute -left-5 top-8 text-pink-200"
            />
            <Flower2
              size={25}
              className="absolute left-9 top-7 text-white"
            />
          </div>
        </motion.div>

        {/* Right decorative heart */}
        <motion.div
          className="absolute z-40 right-[46px] bottom-[56px] text-pink-400"
          animate={{
            scale: [1, 1.12, 1],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
        >
          <Heart
            size={28}
            fill="currentColor"
          />
        </motion.div>

        {/* Next indicator */}
        <motion.div
          className="absolute z-50 right-[36px] top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-pink-100 shadow-md flex items-center justify-center pointer-events-none"
          animate={{
            x: [0, 4, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.7,
            repeat: Infinity,
          }}
        >
          <ChevronRight
            size={18}
            className="text-pink-400"
          />
        </motion.div>

      </div>

      {/* ==================================================
          COUNTER
      ================================================== */}

      <motion.div
        key={currentIndex}
        className="relative z-30 -mt-[5px]"
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="flex items-center gap-5 text-purple-400">

          <span className="w-[54px] h-[2px] bg-pink-300/80" />

          <span className="text-[22px] tracking-[0.14em] font-medium">
            {currentIndex + 1} / {memories.length}
          </span>

          <span className="w-[54px] h-[2px] bg-pink-300/80" />

        </div>
      </motion.div>

      {/* ==================================================
          LETTER BUTTON
      ================================================== */}

      <motion.div
        className="relative z-30 mt-7 mb-8"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.6,
          duration: 0.7,
        }}
      >

        {/* button glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-pink-400/35 blur-xl"
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
        />

        <div className="relative">
          <Button
            onClick={onNext}
            text="A Letter For You"
            animateIcon={false}
            icon={<Mail size={20} />}
          />
        </div>

      </motion.div>

      {/* ==================================================
          EXTRA DECORATIVE BOTTOM SPARKLES
      ================================================== */}

      <motion.div
        className="absolute z-10 bottom-[9%] left-[28%] text-white/80 pointer-events-none"
        animate={{
          scale: [0.7, 1.2, 0.7],
          rotate: [0, 90, 180],
          opacity: [0.2, 0.9, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <Sparkles size={18} />
      </motion.div>

      <motion.div
        className="absolute z-10 bottom-[15%] right-[28%] text-white/80 pointer-events-none"
        animate={{
          scale: [0.8, 1.15, 0.8],
          rotate: [180, 90, 0],
          opacity: [0.2, 0.9, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
        }}
      >
        <Sparkles size={15} />
      </motion.div>

    </div>
  );
}

export default MemoriesScreen;
