"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
} from "lucide-react";
import Button from "../Button";

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

/* =========================================================
   PRELOAD ONE IMAGE
========================================================= */

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();

    img.decoding = "async";
    img.src = src;

    const done = () => resolve(img);

    if (typeof img.decode === "function") {
      img.decode().then(done).catch(done);
    } else {
      img.onload = done;
      img.onerror = done;
    }
  });
}

/* =========================================================
   SMART MEMORY PRELOADER
   First photo loads immediately.
   Remaining photos load during idle time.
========================================================= */

function useMemoryPreloader(images, currentIndex) {
  const loadedRef = useRef(new Set());

  useEffect(() => {
    let cancelled = false;

    const load = async (index) => {
      if (index < 0 || index >= images.length) return;

      const src = images[index];

      if (loadedRef.current.has(src)) return;

      await preloadImage(src);

      if (!cancelled) {
        loadedRef.current.add(src);
      }
    };

    /* Current + next image first */

    load(currentIndex);
    load((currentIndex + 1) % images.length);

    /* Previous image */

    load(
      currentIndex === 0
        ? images.length - 1
        : currentIndex - 1
    );

    /* Remaining images in idle time */

    const idle =
      window.requestIdleCallback ||
      ((callback) =>
        window.setTimeout(callback, 500));

    const idleId = idle(() => {
      if (cancelled) return;

      images.forEach((_, index) => {
        if (
          index !== currentIndex &&
          index !==
            (currentIndex + 1) %
              images.length &&
          index !==
            (currentIndex - 1 + images.length) %
              images.length
        ) {
          load(index);
        }
      });
    });

    return () => {
      cancelled = true;

      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [images, currentIndex]);
}

/* =========================================================
   REALISTIC-STYLE BUTTERFLY
   Outside album only
========================================================= */

function Butterfly({
  size = 40,
  delay = 0,
  duration = 14,
  side = "left",
}) {
  const paths = {
    left: {
      x: ["-44vw", "-39vw", "-46vw", "-40vw", "-45vw"],
      y: ["-4vh", "8vh", "22vh", "38vh", "52vh"],
      rotate: [-10, 8, -8, 10, -5],
    },

    right: {
      x: ["43vw", "47vw", "41vw", "46vw", "42vw"],
      y: ["8vh", "20vh", "34vh", "48vh", "60vh"],
      rotate: [8, -7, 10, -8, 6],
    },

    leftBottom: {
      x: ["-42vw", "-47vw", "-40vw", "-45vw", "-42vw"],
      y: ["55vh", "44vh", "31vh", "18vh", "6vh"],
      rotate: [-8, 10, -7, 8, -5],
    },

    rightBottom: {
      x: ["45vw", "40vw", "47vw", "42vw", "46vw"],
      y: ["62vh", "50vh", "38vh", "25vh", "12vh"],
      rotate: [9, -8, 7, -9, 6],
    },
  };

  const path = paths[side];

  return (
    <motion.div
      className="fixed left-1/2 top-1/2 pointer-events-none select-none z-[25]"
      initial={{
        x: path.x[0],
        y: path.y[0],
        opacity: 0,
        scale: 0.55,
      }}
      animate={{
        x: path.x,
        y: path.y,
        rotate: path.rotate,
        opacity: [0, 0.9, 1, 0.9, 0],
        scale: [0.55, 0.8, 1, 0.9, 0.55],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
      style={{
        willChange: "transform, opacity",
        filter:
          "drop-shadow(0 5px 7px rgba(100,40,80,.22))",
      }}
    >
      <motion.span
        className="block"
        style={{
          fontSize: size,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 45, -40, 48, 0],
          scaleX: [1, 0.72, 1, 0.7, 1],
        }}
        transition={{
          duration: 0.65,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🦋
      </motion.span>
    </motion.div>
  );
}

/* =========================================================
   FALLING PETALS
   Only petals. No tree.
========================================================= */

function FallingPetals({ burst }) {
  const petals = Array.from({ length: 24 });

  return (
    <AnimatePresence>
      {burst > 0 && (
        <div
          key={burst}
          className="absolute inset-0 pointer-events-none z-[120] overflow-visible"
        >
          {petals.map((_, index) => {
            const left =
              30 + ((index * 13) % 40);

            const drift =
              index % 2 === 0
                ? 25 + (index % 5) * 9
                : -(25 + (index % 5) * 9);

            const size =
              5 + (index % 4) * 2;

            return (
              <motion.span
                key={`${burst}-${index}`}
                className="absolute rounded-[70%_30%_70%_30%] bg-gradient-to-br from-white via-pink-300 to-rose-400"
                style={{
                  left: `${left}%`,
                  top: "55%",
                  width: size,
                  height: size * 1.6,
                  boxShadow:
                    "0 2px 6px rgba(236,72,153,.18)",
                  willChange:
                    "transform, opacity",
                }}
                initial={{
                  opacity: 0,
                  x: 0,
                  y: 0,
                  rotate: index * 35,
                  scale: 0.3,
                }}
                animate={{
                  opacity: [0, 1, 0.9, 0],
                  x: [
                    0,
                    drift * 0.3,
                    drift,
                    drift * 1.4,
                  ],
                  y: [0, 45, 150, 310],
                  rotate: [
                    index * 35,
                    index * 35 + 120,
                    index * 35 + 260,
                    index * 35 + 420,
                  ],
                  scale: [0.3, 1, 1.05, 0.7],
                }}
                transition={{
                  duration:
                    1.35 + (index % 5) * 0.12,
                  delay:
                    (index % 8) * 0.035,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   REALISTIC BOUQUET IMAGE
========================================================= */

function LuxuryBouquet({ position }) {
  const isTopLeft = position === "topLeft";

  return (
    <motion.div
      className={`absolute pointer-events-none z-[100]
        ${
          isTopLeft
            ? "left-[-62px] md:left-[-85px] top-[-18px] md:top-[-30px]"
            : "right-[-62px] md:right-[-85px] bottom-[-18px] md:bottom-[-30px]"
        }
      `}
      initial={{
        opacity: 0,
        scale: 0.86,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        delay: 0.15,
        ease: "easeOut",
      }}
    >
      {/* soft luxury glow */}

      <div
        className="absolute inset-[-25px] rounded-full bg-pink-300/25 blur-3xl"
      />

      {/* gold halo */}

      <div
        className="absolute inset-[-10px] rounded-full border border-amber-200/20"
      />

      <motion.img
        src="/images/luxury-bouquet.png"
        alt=""
        draggable="false"
        className="relative w-[170px] h-[170px] md:w-[205px] md:h-[205px] object-contain drop-shadow-[0_16px_20px_rgba(110,45,65,0.20)]"
        style={{
          transform:
            isTopLeft
              ? "rotate(-12deg)"
              : "rotate(168deg)",
        }}
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* tiny pearl */}

      <span
        className={`absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,.9)]
          ${
            isTopLeft
              ? "right-[18px] bottom-[25px]"
              : "left-[18px] top-[25px]"
          }
        `}
      />
    </motion.div>
  );
}

/* =========================================================
   MEMORY SCREEN
========================================================= */

function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [petalBurst, setPetalBurst] =
    useState(0);

  useMemoryPreloader(
    memories,
    currentIndex
  );

  const currentPhoto =
    memories[currentIndex];

  const nextPhoto = () => {
    setPetalBurst((prev) => prev + 1);

    setCurrentIndex((prev) =>
      prev === memories.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen overflow-visible">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none z-[-20] bg-gradient-to-b from-[#fffafd] via-[#ffeef7] to-[#fbdce9]" />

      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        w-[430px] h-[430px] rounded-full
        bg-pink-300/20 blur-[110px] pointer-events-none z-[-10]"
      />

      {/* =====================================================
          BUTTERFLIES
      ===================================================== */}

      <Butterfly
        size={42}
        delay={0}
        duration={13}
        side="left"
      />

      <Butterfly
        size={34}
        delay={3}
        duration={15}
        side="right"
      />

      <Butterfly
        size={46}
        delay={5}
        duration={14}
        side="leftBottom"
      />

      <Butterfly
        size={31}
        delay={7}
        duration={16}
        side="rightBottom"
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="text-center z-30 mt-3"
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <div className="flex items-center justify-center gap-2">

          <Camera
            size={19}
            className="text-pink-400"
          />

          <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
            Our Memories
          </h2>

          <Camera
            size={19}
            className="text-pink-400"
          />

        </div>

        <p className="text-xl md:text-2xl font-hand text-purple-400 mt-2">
          Little moments, forever ours ♡
        </p>
      </motion.div>

      {/* =====================================================
          DOTS
      ===================================================== */}

      <div className="flex items-center justify-center gap-2 mt-5 mb-1 z-30">
        {memories.map((_, index) => (
          <span
            key={index}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-3 h-3 bg-pink-500"
                : "w-2 h-2 bg-pink-200"
            }`}
          />
        ))}
      </div>

      {/* =====================================================
          ALBUM
      ===================================================== */}

      <div
        className="relative w-[calc(100vw-24px)] max-w-[470px]
        h-[480px] md:h-[520px]
        my-2 flex items-center justify-center z-20"
      >

        {/* =================================================
            REALISTIC FLOWER BOUQUETS
        ================================================= */}

        <LuxuryBouquet position="topLeft" />
        <LuxuryBouquet position="bottomRight" />

        {/* =================================================
            PETALS
        ================================================= */}

        <FallingPetals burst={petalBurst} />

        {/* =================================================
            LUXURY OUTER FRAME
        ================================================= */}

        <div
          className="absolute w-[390px] h-[455px] md:w-[425px] md:h-[490px]
          rounded-[40px]
          bg-white/25
          border border-white/90
          shadow-[0_30px_90px_rgba(180,70,120,.13)]
          backdrop-blur-[3px]"
        />

        <div
          className="absolute w-[375px] h-[440px] md:w-[410px] md:h-[475px]
          rounded-[36px]
          border border-dashed border-pink-200/80"
        />

        <div
          className="absolute w-[360px] h-[425px] md:w-[395px] md:h-[460px]
          rounded-[32px]
          bg-white/35
          border border-white/90
          shadow-[inset_0_0_30px_rgba(255,255,255,.7)]"
        />

        {/* =================================================
            BACK POLAROID
        ================================================= */}

        <div
          className="absolute top-[38px]
          w-[320px] h-[395px] md:w-[350px] md:h-[425px]
          bg-[#fffafa]
          rounded-[23px]
          shadow-[0_18px_40px_rgba(0,0,0,.08)]
          border border-pink-100
          rotate-[-3deg]"
        />

        <div
          className="absolute top-[34px]
          w-[325px] h-[400px] md:w-[355px] md:h-[430px]
          bg-[#fffdfd]
          rounded-[23px]
          shadow-[0_20px_45px_rgba(0,0,0,.09)]
          border border-pink-100
          rotate-[3deg]"
        />

        {/* =================================================
            PINK TAPE
        ================================================= */}

        <div
          className="absolute top-[5px] left-1/2 -translate-x-1/2
          w-[90px] h-[28px]
          bg-pink-200/90
          rounded-sm
          rotate-[-2deg]
          z-[110]
          shadow-sm"
        >
          <div
            className="absolute inset-0 opacity-30
            bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_1px)]
            bg-[size:8px_8px]"
          />

          <Heart
            size={15}
            fill="currentColor"
            className="absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            text-pink-500"
          />
        </div>

        {/* =================================================
            PHOTO — NO HEAVY FRAMER MOTION
        ================================================= */}

        <div
          className="absolute top-[30px] left-1/2
          -translate-x-1/2
          w-[310px] h-[385px]
          md:w-[340px] md:h-[415px]
          bg-[#fffdfd]
          rounded-[22px]
          p-3 pb-12
          shadow-[0_22px_55px_rgba(0,0,0,.14)]
          border border-pink-100
          cursor-pointer
          z-[80]"
          onClick={nextPhoto}
        >

          <div
            className="relative w-full h-full
            rounded-[15px]
            overflow-hidden
            bg-slate-100
            border border-pink-50"
          >

            {/* =================================================
                ALL PHOTOS MOUNTED BUT ONLY CURRENT VISIBLE
                This removes transition/decode lag.
            ================================================= */}

            {memories.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Memory ${index + 1}`}
                width="680"
                height="850"
                decoding="async"
                loading={
                  index === 0
                    ? "eager"
                    : "lazy"
                }
                className="absolute inset-0 w-full h-full object-cover
                pointer-events-none select-none
                transition-opacity duration-150"
                style={{
                  opacity:
                    index === currentIndex
                      ? 1
                      : 0,
                  zIndex:
                    index === currentIndex
                      ? 2
                      : 1,
                  willChange:
                    index === currentIndex
                      ? "opacity"
                      : "auto",
                }}
                draggable="false"
              />
            ))}

            <div
              className="absolute inset-0
              bg-gradient-to-t
              from-pink-500/10
              via-transparent
              to-white/5
              pointer-events-none z-[5]"
            />

          </div>

          {/* POLAROID CAPTION */}

          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="font-hand text-sm text-slate-400">
              a little piece of us ♡
            </span>
          </div>

        </div>

        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        <div
          className="absolute right-[18px] md:right-[25px]
          top-1/2 -translate-y-1/2
          z-[120]
          w-10 h-10
          rounded-full
          bg-white/90
          shadow-[0_6px_22px_rgba(236,72,153,.16)]
          border border-pink-100
          flex items-center justify-center
          pointer-events-none"
        >
          <ChevronRight
            size={19}
            className="text-pink-400"
          />
        </div>

      </div>

      {/* =====================================================
          COUNTER
      ===================================================== */}

      <div className="z-30 -mt-1 mb-3">
        <div className="flex items-center gap-4 text-sm text-purple-500">

          <span className="w-10 h-px bg-pink-300" />

          <span className="tracking-[0.2em] font-semibold">
            {String(currentIndex + 1).padStart(2, "0")}
            {" / "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-10 h-px bg-pink-300" />

        </div>
      </div>

      {/* =====================================================
          LETTER BUTTON
      ===================================================== */}

      <div className="shrink-0 z-30 mb-5">
        <Button
          onClick={onNext}
          text="A Letter For You"
          animateIcon={false}
          icon={<Mail size={18} />}
        />
      </div>

    </div>
  );
}

export default MemoriesScreen;
