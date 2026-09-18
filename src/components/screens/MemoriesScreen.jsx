"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../Button";

/*
|--------------------------------------------------------------------------
| Butterfly SVG
|--------------------------------------------------------------------------
| Pure SVG butterfly — no external butterfly image required.
| This keeps the butterflies sharp, lightweight and reliable on mobile.
*/
function Butterfly({
  size = 58,
  flip = false,
  opacity = 1,
  blur = 0,
}) {
  return (
    <svg
      width={size}
      height={size * 0.78}
      viewBox="0 0 160 125"
      className="overflow-visible"
      style={{
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <defs>
        <linearGradient id="wingPink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd6ee" />
          <stop offset="38%" stopColor="#f7a8d4" />
          <stop offset="72%" stopColor="#d77ac1" />
          <stop offset="100%" stopColor="#9d5bb0" />
        </linearGradient>

        <linearGradient id="wingBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9f2ff" />
          <stop offset="45%" stopColor="#a9cfff" />
          <stop offset="80%" stopColor="#9b83d8" />
          <stop offset="100%" stopColor="#7058aa" />
        </linearGradient>

        <radialGradient id="wingGlow">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <filter id="butterflyShadow">
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="#8b4d8d"
            floodOpacity="0.22"
          />
        </filter>
      </defs>

      <g filter="url(#butterflyShadow)">
        {/* Left upper wing */}
        <path
          d="M78 55 C50 4 8 5 9 35 C10 60 35 76 70 70 Z"
          fill="url(#wingPink)"
          stroke="#9d5b9f"
          strokeWidth="2"
        />

        {/* Left lower wing */}
        <path
          d="M73 67 C43 69 18 81 25 104 C32 120 59 100 78 76 Z"
          fill="url(#wingBlue)"
          stroke="#8667b3"
          strokeWidth="2"
        />

        {/* Right upper wing */}
        <path
          d="M82 55 C110 4 152 5 151 35 C150 60 125 76 90 70 Z"
          fill="url(#wingPink)"
          stroke="#9d5b9f"
          strokeWidth="2"
        />

        {/* Right lower wing */}
        <path
          d="M87 67 C117 69 142 81 135 104 C128 120 101 100 82 76 Z"
          fill="url(#wingBlue)"
          stroke="#8667b3"
          strokeWidth="2"
        />

        {/* Wing glow */}
        <ellipse
          cx="42"
          cy="37"
          rx="27"
          ry="18"
          fill="url(#wingGlow)"
        />

        <ellipse
          cx="118"
          cy="37"
          rx="27"
          ry="18"
          fill="url(#wingGlow)"
        />

        {/* Wing dots */}
        <circle cx="29" cy="30" r="4" fill="#fff" opacity="0.85" />
        <circle cx="43" cy="22" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="58" cy="39" r="3" fill="#fff" opacity="0.7" />

        <circle cx="131" cy="30" r="4" fill="#fff" opacity="0.85" />
        <circle cx="117" cy="22" r="2.5" fill="#fff" opacity="0.8" />
        <circle cx="102" cy="39" r="3" fill="#fff" opacity="0.7" />

        {/* Body */}
        <ellipse
          cx="80"
          cy="68"
          rx="6"
          ry="27"
          fill="#4b354e"
        />

        <circle cx="80" cy="39" r="6" fill="#3b293d" />

        {/* Antennae */}
        <path
          d="M77 38 C67 22 58 23 55 16"
          fill="none"
          stroke="#4b354e"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path
          d="M83 38 C93 22 102 23 105 16"
          fill="none"
          stroke="#4b354e"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/*
|--------------------------------------------------------------------------
| Floating Butterfly
|--------------------------------------------------------------------------
*/
function FlyingButterfly({
  className = "",
  size,
  delay = 0,
  duration = 10,
  startX = 0,
  startY = 0,
  endX = 0,
  endY = -100,
  flip = false,
  blur = 0,
  opacity = 1,
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none z-20 ${className}`}
      initial={{
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0.72,
      }}
      animate={{
        x: [startX, startX + 35, endX - 25, endX],
        y: [startY, startY - 35, endY + 25, endY],
        opacity: [0, opacity, opacity, 0],
        scale: [0.72, 0.95, 1.03, 0.78],
        rotate: [-8, 7, -5, 6],
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
          scaleY: [1, 0.78, 1],
        }}
        transition={{
          duration: 0.32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Butterfly
          size={size}
          flip={flip}
          blur={blur}
          opacity={opacity}
        />
      </motion.div>
    </motion.div>
  );
}

function MemoriesScreen({ onNext }) {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Automatically read every image from public/images
  |--------------------------------------------------------------------------
  | This avoids depending on the long filenames visible in GitHub.
  */
  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/nrk-rafee/Can-we-meet-rafee-protiva/contents/public/images?ref=main"
        );

        if (!response.ok) {
          throw new Error("Could not load image list");
        }

        const data = await response.json();

        const imageFiles = data
          .filter((item) => {
            if (item.type !== "file") return false;

            const name = item.name.toLowerCase();

            return (
              name.endsWith(".jpg") ||
              name.endsWith(".jpeg") ||
              name.endsWith(".png") ||
              name.endsWith(".webp") ||
              name.endsWith(".avif")
            );
          })
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(0, 5)
          .map((item) => `/images/${encodeURIComponent(item.name)}`);

        if (!cancelled) {
          setPhotos(imageFiles);
          setLoading(false);
        }
      } catch (error) {
        console.error("Memory images could not be loaded:", error);

        /*
        | Fallback for the first 3 known files.
        */
        if (!cancelled) {
          setPhotos([
            "/images/IMG-20260329-WA0002.jpg",
            "/images/IMG-20260909-WA0019~2.jpg",
            "/images/IMG-20260914-WA0013.jpg",
          ]);

          setLoading(false);
        }
      }
    }

    loadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Make sure we always show a maximum of 5 memories.
  |--------------------------------------------------------------------------
  */
  const memories = useMemo(() => photos.slice(0, 5), [photos]);

  const currentPhoto =
    memories.length > 0 ? memories[currentIndex] : null;

  const goNext = () => {
    if (!memories.length) return;

    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const goPrevious = () => {
    if (!memories.length) return;

    setCurrentIndex(
      (prev) => (prev - 1 + memories.length) % memories.length
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-hidden bg-[#fff7fb]">

      {/* ============================================================
          LUXURY BACKGROUND
      ============================================================ */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Large pink glow */}
        <motion.div
          className="absolute left-1/2 top-[35%] -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-pink-200/25 blur-[100px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.45, 0.7, 0.45],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Purple glow */}
        <motion.div
          className="absolute -left-32 top-[40%] w-80 h-80 rounded-full bg-purple-200/20 blur-[90px]"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Right glow */}
        <motion.div
          className="absolute -right-32 bottom-[15%] w-80 h-80 rounded-full bg-pink-300/15 blur-[90px]"
          animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Tiny stars */}
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-pink-200"
            style={{
              left: `${5 + ((i * 17) % 90)}%`,
              top: `${8 + ((i * 23) % 82)}%`,
              fontSize: `${8 + (i % 3) * 4}px`,
            }}
            animate={{
              opacity: [0.15, 0.8, 0.15],
              scale: [0.7, 1.2, 0.7],
              rotate: [0, 45, 90],
            }}
            transition={{
              duration: 2.5 + (i % 3),
              delay: i * 0.25,
              repeat: Infinity,
            }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* ============================================================
          REALISTIC-STYLE BUTTERFLY FLOCK
      ============================================================ */}

      {/* Far/background butterflies */}
      <FlyingButterfly
        size={38}
        delay={0}
        duration={15}
        startX={-40}
        startY={110}
        endX={120}
        endY={-250}
        opacity={0.38}
        blur={1.2}
        flip
      />

      <FlyingButterfly
        size={34}
        delay={3}
        duration={17}
        startX={120}
        startY={220}
        endX={-120}
        endY={-230}
        opacity={0.34}
        blur={1.4}
      />

      <FlyingButterfly
        size={42}
        delay={5}
        duration={14}
        startX={-160}
        startY={-120}
        endX={170}
        endY={100}
        opacity={0.42}
        blur={0.8}
        flip
      />

      {/* Main focused butterflies */}
      <FlyingButterfly
        size={67}
        delay={1}
        duration={12}
        startX={-30}
        startY={180}
        endX={-145}
        endY={-170}
        opacity={0.95}
        flip
      />

      <FlyingButterfly
        size={61}
        delay={4}
        duration={13}
        startX={170}
        startY={-40}
        endX={-80}
        endY={180}
        opacity={0.92}
      />

      <FlyingButterfly
        size={52}
        delay={7}
        duration={11}
        startX={-130}
        startY={-30}
        endX={140}
        endY={230}
        opacity={0.88}
        flip
      />

      {/* ============================================================
          TITLE
      ============================================================ */}

      <motion.div
        className="relative z-30 text-center mt-5 mb-2"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={23}
              className="text-pink-400"
            />
          </motion.div>

          <h2 className="text-[34px] md:text-5xl font-bold text-slate-700 tracking-tight">
            Our Memories
          </h2>

          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 0.4,
            }}
          >
            <Camera
              size={23}
              className="text-pink-400 scale-x-[-1]"
            />
          </motion.div>
        </div>

        <motion.p
          className="mt-2 text-xl md:text-2xl font-hand text-purple-400"
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

      {/* ============================================================
          DOT INDICATOR
      ============================================================ */}

      <div className="relative z-30 flex items-center justify-center gap-2 mt-3 mb-1">
        {memories.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Memory ${index + 1}`}
            className={`rounded-full transition-all ${
              index === currentIndex
                ? "w-3.5 h-3.5 bg-pink-500"
                : "w-2.5 h-2.5 bg-pink-200"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.3, 1],
                  }
                : {}
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* ============================================================
          LUXURY ALBUM
      ============================================================ */}

      <div className="relative z-30 w-full max-w-[430px] h-[455px] md:h-[475px] flex items-center justify-center">

        {/* Outer decorative frame */}
        <motion.div
          className="absolute w-[340px] h-[390px] md:w-[365px] md:h-[410px] rounded-[34px] border border-pink-200/80"
          animate={{
            rotate: [-0.5, 0.5, -0.5],
            scale: [1, 1.012, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Gold-ish inner frame */}
        <div className="absolute w-[325px] h-[375px] md:w-[350px] md:h-[395px] rounded-[30px] border border-white/90 shadow-[inset_0_0_35px_rgba(255,255,255,0.8)]" />

        {/* Album glow */}
        <motion.div
          className="absolute w-[315px] h-[370px] md:w-[340px] md:h-[390px] rounded-[30px] bg-white/45 backdrop-blur-[2px]"
          animate={{
            boxShadow: [
              "0 20px 55px rgba(236,72,153,0.10)",
              "0 25px 75px rgba(168,85,247,0.18)",
              "0 20px 55px rgba(236,72,153,0.10)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        {/* Decorative heart behind album */}
        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 z-10 text-pink-300"
          animate={{
            y: [0, -4, 0],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <Heart
            size={29}
            fill="currentColor"
          />
        </motion.div>

        {/* ========================================================
            PHOTO
        ======================================================== */}

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              className="relative z-20 w-[280px] h-[350px] md:w-[300px] md:h-[370px] rounded-[18px] bg-white/90 shadow-[0_25px_55px_rgba(0,0,0,0.14)] flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  className="mx-auto mb-3 w-9 h-9 rounded-full border-2 border-pink-200 border-t-pink-500"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <p className="text-sm text-pink-400">
                  Opening our memories...
                </p>
              </div>
            </motion.div>
          ) : currentPhoto ? (
            <motion.div
              key={currentPhoto}
              initial={{
                opacity: 0,
                scale: 0.88,
                rotate: -4,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.88,
                rotate: 5,
                y: -25,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="relative z-20 w-[280px] h-[350px] md:w-[300px] md:h-[370px] bg-[#fffdfc] rounded-[20px] p-3 pb-12 shadow-[0_25px_55px_rgba(0,0,0,0.16)] border border-white"
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 bg-pink-200/80 rotate-[-3deg] shadow-sm z-30">
                <Heart
                  size={15}
                  className="mx-auto mt-1 text-pink-500"
                  fill="currentColor"
                />
              </div>

              {/* Image */}
              <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-100 border border-pink-100 relative">

                <img
                  src={currentPhoto}
                  alt={`Memory ${currentIndex + 1}`}
                  className="w-full h-full object-cover select-none"
                  draggable="false"
                />

                {/* soft luxury overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/5 pointer-events-none" />

                {/* small shine */}
                <motion.div
                  className="absolute inset-y-0 w-16 bg-white/15 blur-xl -skew-x-12 pointer-events-none"
                  animate={{
                    x: ["-100px", "340px"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Caption */}
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="font-hand text-base text-slate-500">
                  a little piece of us ♡
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="relative z-20 w-[280px] h-[350px] rounded-[20px] bg-white shadow-xl flex items-center justify-center text-center p-8"
            >
              <p className="text-pink-400">
                Our memories are waiting...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left arrow */}
        {memories.length > 1 && (
          <motion.button
            onClick={goPrevious}
            className="absolute z-40 left-[16px] md:left-[18px] w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm shadow-lg border border-pink-100 flex items-center justify-center text-pink-400"
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.08,
              x: -2,
            }}
          >
            <ChevronLeft size={21} />
          </motion.button>
        )}

        {/* Right arrow */}
        {memories.length > 1 && (
          <motion.button
            onClick={goNext}
            className="absolute z-40 right-[16px] md:right-[18px] w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm shadow-lg border border-pink-100 flex items-center justify-center text-pink-400"
            whileTap={{ scale: 0.9 }}
            whileHover={{
              scale: 1.08,
              x: 2,
            }}
          >
            <ChevronRight size={21} />
          </motion.button>
        )}

        {/* Floating little hearts around album */}
        <motion.div
          className="absolute left-[38px] bottom-[85px] text-pink-300"
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
            size={20}
            fill="currentColor"
          />
        </motion.div>

        <motion.div
          className="absolute right-[35px] top-[105px] text-pink-300"
          animate={{
            y: [0, -10, 0],
            rotate: [8, -8, 8],
          }}
          transition={{
            duration: 3.4,
            repeat: Infinity,
            delay: 0.7,
          }}
        >
          <Heart
            size={17}
            fill="currentColor"
          />
        </motion.div>

        <motion.div
          className="absolute right-[48px] bottom-[105px] text-purple-300"
          animate={{
            rotate: [0, 90, 180],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <Sparkles size={19} />
        </motion.div>
      </div>

      {/* ============================================================
          COUNTER
      ============================================================ */}

      <motion.div
        className="relative z-30 -mt-3 mb-3 flex items-center gap-4 text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="w-10 h-px bg-pink-300" />

        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg tracking-widest"
        >
          {memories.length
            ? `${currentIndex + 1} / ${memories.length}`
            : "0 / 5"}
        </motion.span>

        <span className="w-10 h-px bg-pink-300" />
      </motion.div>

      {/* ============================================================
          NEXT BUTTON
      ============================================================ */}

      <motion.div
        className="relative z-30 shrink-0 mb-5"
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
