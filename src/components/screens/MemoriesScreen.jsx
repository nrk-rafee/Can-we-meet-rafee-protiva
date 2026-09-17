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

const floatingHearts = [
  {
    left: "calc(50% - 170px)",
    top: "42%",
    size: 15,
    delay: 0,
    duration: 4,
  },
  {
    left: "calc(50% + 155px)",
    top: "40%",
    size: 17,
    delay: 1,
    duration: 4.5,
  },
  {
    left: "calc(50% - 185px)",
    top: "64%",
    size: 12,
    delay: 1.8,
    duration: 3.8,
  },
  {
    left: "calc(50% + 175px)",
    top: "66%",
    size: 14,
    delay: 0.7,
    duration: 4.2,
  },
  {
    left: "calc(50% - 215px)",
    top: "52%",
    size: 10,
    delay: 2.2,
    duration: 4.8,
  },
  {
    left: "calc(50% + 210px)",
    top: "57%",
    size: 11,
    delay: 1.4,
    duration: 4.4,
  },
];

const sparkles = [
  {
    left: "calc(50% - 145px)",
    top: "38%",
    delay: 0,
  },
  {
    left: "calc(50% + 145px)",
    top: "50%",
    delay: 0.8,
  },
  {
    left: "calc(50% - 155px)",
    top: "71%",
    delay: 1.5,
  },
  {
    left: "calc(50% + 150px)",
    top: "73%",
    delay: 0.4,
  },
  {
    left: "calc(50% - 215px)",
    top: "47%",
    delay: 1.1,
  },
  {
    left: "calc(50% + 210px)",
    top: "44%",
    delay: 2,
  },
];

function Butterfly({ x, y, id, delay = 0 }) {
  return (
    <motion.div
      key={id}
      className="absolute z-[70] pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{
        opacity: 0,
        scale: 0.4,
        x: -30,
        y: 20,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0.4, 1, 1.05, 0.8],
        x: [-30, 40, 110, 190],
        y: [20, -15, 12, -25],
        rotate: [-8, 8, -5, 10],
      }}
      transition={{
        duration: 6,
        delay,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{
          scaleX: [1, 0.68, 1, 0.7, 1],
        }}
        transition={{
          duration: 0.45,
          repeat: 12,
          ease: "easeInOut",
        }}
        className="relative w-9 h-7"
      >
        {/* left wing */}
        <div className="absolute left-0 top-0 w-5 h-6 rounded-[80%_25%_70%_35%] bg-gradient-to-br from-pink-300 via-purple-300 to-pink-400 rotate-[-28deg] shadow-sm" />

        {/* right wing */}
        <div className="absolute right-0 top-0 w-5 h-6 rounded-[25%_80%_35%_70%] bg-gradient-to-bl from-purple-300 via-pink-300 to-purple-400 rotate-[28deg] shadow-sm" />

        {/* wing dots */}
        <div className="absolute left-[5px] top-[7px] w-[4px] h-[4px] rounded-full bg-white/80" />
        <div className="absolute right-[5px] top-[7px] w-[4px] h-[4px] rounded-full bg-white/80" />

        {/* body */}
        <div className="absolute left-1/2 top-[4px] -translate-x-1/2 w-[4px] h-6 rounded-full bg-slate-500/70" />

        {/* antenna */}
        <div className="absolute left-[15px] top-[-2px] w-3 h-2 border-t border-slate-500/50 rounded-full rotate-[-18deg]" />
        <div className="absolute left-[17px] top-[-2px] w-3 h-2 border-t border-slate-500/50 rounded-full rotate-[18deg]" />
      </motion.div>
    </motion.div>
  );
}

function Bird({ x, y, id, delay = 0 }) {
  return (
    <motion.div
      key={id}
      className="absolute z-[65] pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{
        opacity: 0,
        x: -50,
        y: 15,
        scale: 0.65,
      }}
      animate={{
        opacity: [0, 0.7, 0.8, 0],
        x: [-50, 60, 170, 290],
        y: [15, -8, 8, -18],
        scale: [0.65, 0.8, 0.85, 0.65],
      }}
      transition={{
        duration: 7,
        delay,
        ease: "easeInOut",
      }}
    >
      <svg
        width="38"
        height="24"
        viewBox="0 0 38 24"
        fill="none"
      >
        <path
          d="M2 12C6 7 10 7 17 12C20 14 22 14 25 12C30 8 34 8 37 12"
          stroke="rgba(100,116,139,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M2 12C6 17 10 17 17 12"
          stroke="rgba(100,116,139,0.6)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

function SnowfallBurst({ burst }) {
  const flakes = Array.from({ length: 34 }, (_, index) => {
    const spread = (Math.random() - 0.5) * 90;
    const startX = burst.x + spread;

    return {
      id: `${burst.id}-${index}`,
      left: startX,
      size: 3 + Math.random() * 7,
      delay: Math.random() * 0.7,
      duration: 3.2 + Math.random() * 3.5,
      drift: (Math.random() - 0.5) * 130,
      opacity: 0.45 + Math.random() * 0.5,
      blur: Math.random() > 0.75 ? 1 : 0,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute top-[-18px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            filter: `blur(${flake.blur}px)`,
          }}
          initial={{
            y: -20,
            x: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: flake.drift,
            rotate: 360,
            opacity: [0, flake.opacity, flake.opacity, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* soft snowfall mist */}
      <motion.div
        className="absolute rounded-full bg-white/40 blur-2xl"
        style={{
          left: `${burst.x}%`,
          top: `${burst.y}%`,
          width: 90,
          height: 90,
          transform: "translate(-50%, -50%)",
        }}
        initial={{
          scale: 0.2,
          opacity: 0,
        }}
        animate={{
          scale: [0.2, 1.5, 2],
          opacity: [0, 0.35, 0],
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const [snowBursts, setSnowBursts] = useState([]);
  const [butterflies, setButterflies] = useState([]);
  const [birds, setBirds] = useState([]);

  const screenRef = useRef(null);
  const burstCounter = useRef(0);

  const currentPhoto = memories[currentIndex];

  const nextPhoto = () => {
    setDirection(1);

    setCurrentIndex((prev) =>
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const screen = screenRef.current;

    if (!screen) return;

    const handlePointerDown = (event) => {
      const rect = screen.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      const safeX = Math.max(4, Math.min(96, x));
      const safeY = Math.max(4, Math.min(88, y));

      const id = ++burstCounter.current;

      // Every single touch creates snowfall.
      setSnowBursts((prev) => [
        ...prev,
        {
          id,
          x: safeX,
          y: safeY,
        },
      ]);

      // Sometimes butterfly appears.
      const butterflyChance = Math.random();

      if (butterflyChance < 0.48) {
        const butterflyId = `${id}-butterfly`;

        setButterflies((prev) => [
          ...prev,
          {
            id: butterflyId,
            x: Math.max(5, safeX - 10),
            y: Math.max(12, safeY - 5),
            delay: 0.15,
          },
        ]);

        setTimeout(() => {
          setButterflies((prev) =>
            prev.filter((item) => item.id !== butterflyId)
          );
        }, 7000);
      }

      // Sometimes a little bird also flies through the sky.
      if (Math.random() < 0.3) {
        const birdId = `${id}-bird`;

        setBirds((prev) => [
          ...prev,
          {
            id: birdId,
            x: Math.max(2, safeX - 25),
            y: Math.max(8, safeY - 18),
            delay: 0.5,
          },
        ]);

        setTimeout(() => {
          setBirds((prev) =>
            prev.filter((item) => item.id !== birdId)
          );
        }, 8000);
      }

      // Remove old snowfall after animation finishes.
      setTimeout(() => {
        setSnowBursts((prev) =>
          prev.filter((item) => item.id !== id)
        );
      }, 8500);
    };

    screen.addEventListener("pointerdown", handlePointerDown);

    return () => {
      screen.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div
      ref={screenRef}
      className="relative flex flex-col justify-center items-center w-full min-h-screen h-full overflow-visible select-none"
    >
      {/* =========================================================
          INTERACTIVE WEATHER LAYER
         ========================================================= */}

      <AnimatePresence>
        {snowBursts.map((burst) => (
          <SnowfallBurst
            key={burst.id}
            burst={burst}
          />
        ))}
      </AnimatePresence>

      {butterflies.map((butterfly) => (
        <Butterfly
          key={butterfly.id}
          id={butterfly.id}
          x={butterfly.x}
          y={butterfly.y}
          delay={butterfly.delay}
        />
      ))}

      {birds.map((bird) => (
        <Bird
          key={bird.id}
          id={bird.id}
          x={bird.x}
          y={bird.y}
          delay={bird.delay}
        />
      ))}

      {/* =========================================================
          SOFT BACKGROUND
         ========================================================= */}

      <motion.div
        className="absolute w-[360px] h-[360px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute w-[250px] h-[250px] rounded-full bg-purple-200/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* =========================================================
          DECORATIVE HEARTS
         ========================================================= */}

      {floatingHearts.map((heart, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: heart.left,
            top: heart.top,
          }}
          animate={{
            y: [0, -13, 0],
            x: [0, index % 2 === 0 ? 5 : -5, 0],
            opacity: [0.2, 0.65, 0.2],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: heart.duration,
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

      {/* =========================================================
          DECORATIVE SPARKLES
         ========================================================= */}

      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none z-0"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.65, 1.15, 0.65],
            rotate: [0, 90, 180],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={15}
            className="text-purple-300"
          />
        </motion.div>
      ))}

      {/* =========================================================
          HEADER
         ========================================================= */}

      <motion.div
        className="text-center z-10 mt-4"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={19}
              className="text-pink-400"
            />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
            Our Memories
          </h2>

          <motion.div
            animate={{
              rotate: [5, -5, 5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Camera
              size={19}
              className="text-pink-400"
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

        <motion.p
          className="text-[11px] text-slate-400 mt-1 tracking-wide"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          touch anywhere for a little magic ✨
        </motion.p>
      </motion.div>

      {/* =========================================================
          PHOTO DOTS
         ========================================================= */}

      <div className="flex items-center justify-center gap-2 mt-4 mb-1 z-20">
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-3 h-3 bg-pink-400"
                : "w-2 h-2 bg-pink-200"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.25, 1],
                  }
                : {
                    scale: 1,
                  }
            }
            transition={{
              duration: 1.4,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          ALBUM
         ========================================================= */}

      <div className="relative w-full max-w-[420px] h-[425px] md:h-[450px] my-2 flex items-center justify-center z-10">

        {/* outer album frame */}
        <motion.div
          className="absolute w-[315px] h-[370px] md:w-[350px] md:h-[395px] rounded-[28px] border-2 border-dashed border-pink-200/70"
          animate={{
            rotate: [0, 0.7, 0, -0.7, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* soft glass layer */}
        <motion.div
          className="absolute w-[300px] h-[355px] md:w-[335px] md:h-[380px] rounded-[26px] bg-white/35 backdrop-blur-sm"
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

        {/* tape */}
        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-5 bg-pink-100/80 rounded-sm rotate-[-2deg] z-30"
          animate={{
            rotate: [-2, 1, -2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        {/* photo */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhoto}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction > 0 ? 120 : -120,
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
              x: direction > 0 ? -120 : 120,
              rotate: direction > 0 ? -5 : 5,
              scale: 0.94,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
            className="absolute top-7 left-1/2 -translate-x-1/2 w-[275px] h-[340px] md:w-[300px] md:h-[365px] bg-[#fffdfd] rounded-2xl p-3 pb-12 shadow-[0_18px_45px_rgba(0,0,0,0.13)] border border-pink-100 cursor-pointer"
            onClick={nextPhoto}
            whileHover={{
              y: -5,
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.975,
            }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-100 border border-pink-50">
              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/5 pointer-events-none" />

              <motion.div
                className="absolute inset-y-0 -left-1/2 w-1/3 bg-white/20 skew-x-[-20deg] pointer-events-none"
                animate={{
                  left: ["-50%", "130%"],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* next arrow */}
        <motion.div
          className="absolute right-[22px] md:right-[25px] top-1/2 -translate-y-1/2 z-40 w-8 h-8 rounded-full bg-white/85 shadow-sm border border-pink-100 flex items-center justify-center pointer-events-none"
          animate={{
            x: [0, 4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          <ChevronRight
            size={17}
            className="text-pink-400"
          />
        </motion.div>

        {/* hint */}
        <motion.div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 z-40"
          animate={{
            y: [0, 4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <div className="px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-sm shadow-sm border border-pink-100">
            <span className="text-xs text-pink-400">
              tap for next memory ♡
            </span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          COUNTER
         ========================================================= */}

      <motion.div
        className="z-20 -mt-1 mb-3"
        key={currentIndex}
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <span className="w-9 h-px bg-pink-200" />

          <span className="tracking-[0.18em] font-medium">
            {String(currentIndex + 1).padStart(2, "0")}
            {" "}
            /
            {" "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-9 h-px bg-pink-200" />
        </div>
      </motion.div>

      {/* =========================================================
          BUTTON
         ========================================================= */}

      <motion.div
        className="shrink-0 z-20 mb-5"
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
