"use client";

import { useEffect, useState } from "react";
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
   PRELOAD ALL MEMORY PHOTOS
   ========================================================= */

function usePreloadImages(images) {
  useEffect(() => {
    const imageObjects = [];

    images.forEach((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      imageObjects.push(img);

      if (typeof img.decode === "function") {
        img.decode().catch(() => {});
      }
    });

    return () => {
      imageObjects.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images]);
}

/* =========================================================
   BUTTERFLY
   OUTSIDE THE ALBUM
========================================================= */

function Butterfly({
  size = 42,
  delay = 0,
  duration = 12,
  side = "left",
}) {
  const edgePaths = {
    left: {
      x: [
        "-46vw",
        "-42vw",
        "-47vw",
        "-40vw",
        "-45vw",
        "-38vw",
        "-44vw",
        "-41vw",
      ],
      y: [
        "18vh",
        "10vh",
        "2vh",
        "-8vh",
        "-18vh",
        "-28vh",
        "-38vh",
        "-48vh",
      ],
      rotate: [-12, 8, -8, 12, -10, 7, -12, 10],
    },

    right: {
      x: [
        "42vw",
        "46vw",
        "40vw",
        "47vw",
        "42vw",
        "46vw",
        "39vw",
        "44vw",
      ],
      y: [
        "-20vh",
        "-10vh",
        "0vh",
        "10vh",
        "20vh",
        "30vh",
        "40vh",
        "50vh",
      ],
      rotate: [10, -8, 12, -10, 8, -12, 10, -8],
    },

    leftBottom: {
      x: [
        "-43vw",
        "-47vw",
        "-40vw",
        "-46vw",
        "-41vw",
        "-47vw",
        "-42vw",
        "-45vw",
      ],
      y: [
        "34vh",
        "25vh",
        "16vh",
        "7vh",
        "-2vh",
        "-11vh",
        "-20vh",
        "-29vh",
      ],
      rotate: [-8, 12, -10, 8, -12, 10, -8, 12],
    },

    rightBottom: {
      x: [
        "43vw",
        "47vw",
        "41vw",
        "46vw",
        "40vw",
        "47vw",
        "42vw",
        "46vw",
      ],
      y: [
        "38vh",
        "28vh",
        "18vh",
        "8vh",
        "-2vh",
        "-12vh",
        "-22vh",
        "-32vh",
      ],
      rotate: [12, -10, 8, -12, 10, -8, 12, -10],
    },
  };

  const selectedPath =
    edgePaths[side] || edgePaths.left;

  return (
    <motion.div
      className="pointer-events-none fixed left-1/2 top-1/2 z-[12] select-none"
      initial={{
        x: selectedPath.x[0],
        y: selectedPath.y[0],
        scale: 0.35,
        opacity: 0,
      }}
      animate={{
        x: selectedPath.x,
        y: selectedPath.y,
        rotate: selectedPath.rotate,
        scale: [
          0.35,
          0.75,
          1,
          0.9,
          1.05,
          0.85,
          0.65,
          0.35,
        ],
        opacity: [
          0,
          0.9,
          1,
          1,
          0.95,
          0.85,
          0.55,
          0,
        ],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeInOut",
      }}
      style={{
        fontSize: `${size}px`,
        filter:
          "drop-shadow(0 5px 8px rgba(120,50,90,0.22))",
        willChange: "transform, opacity",
      }}
    >
      <motion.span
        animate={{
          rotateY: [
            0,
            55,
            -45,
            50,
            -40,
            45,
            0,
          ],
          scaleX: [
            1,
            0.68,
            1,
            0.72,
            1,
            0.7,
            1,
          ],
        }}
        transition={{
          duration: 0.52,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          display: "inline-block",
          transformStyle: "preserve-3d",
        }}
      >
        🦋
      </motion.span>
    </motion.div>
  );
}

/* =========================================================
   FALLING PETALS
   ONLY PETALS — NO FLOWER TREE
========================================================= */

function FallingPetals({ burst }) {
  const petals = Array.from({ length: 30 });

  return (
    <AnimatePresence>
      {burst > 0 && (
        <motion.div
          key={burst}
          className="absolute inset-0 pointer-events-none z-[100] overflow-visible"
        >
          {petals.map((_, index) => {
            const startX =
              25 + ((index * 9) % 50);

            const drift =
              index % 2 === 0
                ? 18 + (index % 7) * 8
                : -(18 + (index % 7) * 8);

            const delay =
              (index % 10) * 0.035;

            const size =
              5 + (index % 4) * 2;

            return (
              <motion.span
                key={`${burst}-${index}`}
                className="absolute rounded-[75%_25%_75%_25%] bg-gradient-to-br from-pink-100 via-pink-400 to-rose-300 shadow-[0_2px_7px_rgba(236,72,153,0.18)]"
                style={{
                  left: `${startX}%`,
                  top: "61%",
                  width: `${size}px`,
                  height: `${size * 1.65}px`,
                  willChange:
                    "transform, opacity",
                }}
                initial={{
                  opacity: 0,
                  y: 0,
                  x: 0,
                  rotate: index * 24,
                  scale: 0.3,
                }}
                animate={{
                  opacity: [
                    0,
                    1,
                    0.9,
                    0.65,
                    0,
                  ],
                  y: [
                    0,
                    35,
                    105,
                    200,
                    330,
                  ],
                  x: [
                    0,
                    drift * 0.18,
                    drift * 0.55,
                    drift,
                    drift * 1.45,
                  ],
                  rotate: [
                    index * 24,
                    index * 24 + 110,
                    index * 24 + 220,
                    index * 24 + 380,
                  ],
                  scale: [
                    0.3,
                    1,
                    1.08,
                    0.85,
                  ],
                }}
                transition={{
                  duration:
                    1.7 + (index % 6) * 0.13,
                  delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   CSS ROSE
========================================================= */

function Rose({ size = 76 }) {
  return (
    <motion.div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
      animate={{
        rotate: [-2, 2, -2],
        y: [0, -1.5, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* outer petals */}

      <span
        className="absolute rounded-full bg-gradient-to-br from-pink-100 via-pink-300 to-rose-500 shadow-[0_4px_12px_rgba(190,24,93,0.2)]"
        style={{
          width: size * 0.46,
          height: size * 0.62,
          left: size * 0.27,
          top: 0,
          transform: "rotate(18deg)",
        }}
      />

      <span
        className="absolute rounded-full bg-gradient-to-br from-pink-50 via-pink-300 to-rose-400"
        style={{
          width: size * 0.56,
          height: size * 0.46,
          left: 0,
          top: size * 0.24,
          transform: "rotate(-24deg)",
        }}
      />

      <span
        className="absolute rounded-full bg-gradient-to-br from-pink-100 via-pink-300 to-rose-500"
        style={{
          width: size * 0.56,
          height: size * 0.46,
          right: 0,
          top: size * 0.24,
          transform: "rotate(24deg)",
        }}
      />

      <span
        className="absolute rounded-full bg-gradient-to-br from-pink-100 via-pink-400 to-rose-600"
        style={{
          width: size * 0.44,
          height: size * 0.56,
          left: size * 0.28,
          bottom: 0,
          transform: "rotate(-15deg)",
        }}
      />

      {/* inner rose */}

      <span
        className="absolute rounded-full bg-gradient-to-br from-rose-300 via-pink-400 to-rose-600 shadow-inner"
        style={{
          width: size * 0.46,
          height: size * 0.46,
          left: size * 0.27,
          top: size * 0.27,
        }}
      />

      <span
        className="absolute rounded-full bg-gradient-to-br from-pink-200 to-rose-500"
        style={{
          width: size * 0.25,
          height: size * 0.32,
          left: size * 0.37,
          top: size * 0.32,
          transform: "rotate(28deg)",
        }}
      />

      <span
        className="absolute rounded-full bg-pink-100/80"
        style={{
          width: size * 0.12,
          height: size * 0.18,
          left: size * 0.43,
          top: size * 0.38,
          transform: "rotate(-20deg)",
        }}
      />

      {/* tiny highlight */}

      <span
        className="absolute rounded-full bg-white/80"
        style={{
          width: size * 0.08,
          height: size * 0.08,
          left: size * 0.31,
          top: size * 0.25,
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   SMALL DAISY
========================================================= */

function Daisy({ size = 36 }) {
  return (
    <motion.div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
      }}
      animate={{
        rotate: [0, 4, 0, -4, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
    >
      {[
        "top-0 left-1/2 -translate-x-1/2",
        "left-0 top-1/2 -translate-y-1/2",
        "right-0 top-1/2 -translate-y-1/2",
        "bottom-0 left-1/2 -translate-x-1/2",
      ].map((position, index) => (
        <span
          key={index}
          className={`absolute ${position} rounded-full bg-gradient-to-br from-white via-pink-50 to-pink-200`}
          style={{
            width: size * 0.34,
            height: size * 0.48,
          }}
        />
      ))}

      <span
        className="absolute rounded-full bg-gradient-to-br from-yellow-100 to-amber-300 shadow-[0_2px_7px_rgba(245,158,11,0.25)]"
        style={{
          width: size * 0.28,
          height: size * 0.28,
          left: size * 0.36,
          top: size * 0.36,
        }}
      />
    </motion.div>
  );
}

/* =========================================================
   LEAF
========================================================= */

function Leaf({
  className = "",
  rotate = 0,
}) {
  return (
    <span
      className={`absolute w-[34px] h-[14px] rounded-[100%_0_100%_0] bg-gradient-to-br from-green-100 via-emerald-300 to-green-500 shadow-[0_2px_6px_rgba(34,197,94,0.15)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    />
  );
}

/* =========================================================
   LUXURY BOUQUET
========================================================= */

function LuxuryBouquet({ position = "topLeft" }) {
  const topLeft = position === "topLeft";

  return (
    <motion.div
      className={`absolute pointer-events-none z-[70] ${
        topLeft
          ? "left-[-48px] md:left-[-68px] top-[-20px] md:top-[-28px]"
          : "right-[-48px] md:right-[-68px] bottom-[-22px] md:bottom-[-30px]"
      } w-[175px] h-[155px]`}
      initial={{
        opacity: 0,
        scale: 0.82,
        rotate: topLeft ? -7 : 7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: topLeft
          ? [-7, -4, -7]
          : [7, 4, 7],
      }}
      transition={{
        opacity: {
          duration: 0.7,
          delay: 0.2,
        },
        scale: {
          duration: 0.7,
          delay: 0.2,
        },
        rotate: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {/* luxury glow */}

      <div className="absolute inset-0 rounded-full bg-pink-300/20 blur-3xl" />

      {/* trailing leaves */}

      <Leaf
        className={
          topLeft
            ? "left-[18px] top-[70px]"
            : "right-[18px] bottom-[70px]"
        }
        rotate={topLeft ? -35 : 35}
      />

      <Leaf
        className={
          topLeft
            ? "left-[50px] top-[96px]"
            : "right-[50px] bottom-[96px]"
        }
        rotate={topLeft ? 25 : -25}
      />

      <Leaf
        className={
          topLeft
            ? "left-[96px] top-[62px]"
            : "right-[96px] bottom-[62px]"
        }
        rotate={topLeft ? -55 : 55}
      />

      <Leaf
        className={
          topLeft
            ? "left-[112px] top-[88px]"
            : "right-[112px] bottom-[88px]"
        }
        rotate={topLeft ? 40 : -40}
      />

      {/* thin golden stems */}

      <span
        className={`absolute w-[2px] h-[82px] bg-gradient-to-b from-amber-200 to-transparent ${
          topLeft
            ? "left-[88px] top-[45px] rotate-[28deg]"
            : "right-[88px] bottom-[45px] rotate-[-28deg]"
        }`}
      />

      <span
        className={`absolute w-[2px] h-[70px] bg-gradient-to-b from-green-300 to-transparent ${
          topLeft
            ? "left-[66px] top-[54px] rotate-[-24deg]"
            : "right-[66px] bottom-[54px] rotate-[24deg]"
        }`}
      />

      {/* main rose */}

      <div
        className={`absolute ${
          topLeft
            ? "left-[16px] top-[6px]"
            : "right-[16px] bottom-[6px]"
        }`}
      >
        <Rose size={82} />
      </div>

      {/* second rose */}

      <div
        className={`absolute ${
          topLeft
            ? "left-[83px] top-[42px]"
            : "right-[83px] bottom-[42px]"
        }`}
      >
        <Rose size={57} />
      </div>

      {/* daisies */}

      <div
        className={`absolute ${
          topLeft
            ? "left-[80px] top-[2px]"
            : "right-[80px] bottom-[2px]"
        }`}
      >
        <Daisy size={38} />
      </div>

      <div
        className={`absolute ${
          topLeft
            ? "left-[113px] top-[70px]"
            : "right-[113px] bottom-[70px]"
        }`}
      >
        <Daisy size={31} />
      </div>

      {/* tiny white flowers */}

      <div
        className={`absolute ${
          topLeft
            ? "left-[48px] top-[18px]"
            : "right-[48px] bottom-[18px]"
        }`}
      >
        <Daisy size={24} />
      </div>

      {/* pearl drops */}

      <span
        className={`absolute w-[7px] h-[7px] rounded-full bg-gradient-to-br from-white to-pink-200 shadow-[0_2px_7px_rgba(255,255,255,0.8)] ${
          topLeft
            ? "left-[129px] top-[41px]"
            : "right-[129px] bottom-[41px]"
        }`}
      />

      <span
        className={`absolute w-[5px] h-[5px] rounded-full bg-gradient-to-br from-white to-pink-200 ${
          topLeft
            ? "left-[142px] top-[58px]"
            : "right-[142px] bottom-[58px]"
        }`}
      />

      {/* satin ribbon */}

      <div
        className={`absolute ${
          topLeft
            ? "left-[38px] top-[103px]"
            : "right-[38px] bottom-[103px]"
        }`}
      >
        <span
          className="absolute w-[35px] h-[58px] rounded-b-[70%] bg-gradient-to-br from-pink-100 via-pink-300 to-pink-500 opacity-80 shadow-sm"
          style={{
            transform: "rotate(23deg)",
          }}
        />

        <span
          className="absolute w-[35px] h-[58px] rounded-b-[70%] bg-gradient-to-br from-pink-100 via-pink-300 to-pink-500 opacity-75"
          style={{
            transform: "rotate(-23deg)",
          }}
        />

        <span className="absolute w-[15px] h-[15px] rounded-full bg-pink-300 border border-pink-100 shadow-sm left-[10px] top-[10px]" />
      </div>

      {/* little berries */}

      {[0, 1, 2, 3].map((item) => (
        <motion.span
          key={item}
          className={`absolute w-[6px] h-[6px] rounded-full bg-gradient-to-br from-pink-200 to-rose-500 ${
            topLeft
              ? [
                  "left-[27px] top-[97px]",
                  "left-[116px] top-[24px]",
                  "left-[134px] top-[86px]",
                  "left-[71px] top-[118px]",
                ][item]
              : [
                  "right-[27px] bottom-[97px]",
                  "right-[116px] bottom-[24px]",
                  "right-[134px] bottom-[86px]",
                  "right-[71px] bottom-[118px]",
                ][item]
          }`}
          animate={{
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 2.5,
            delay: item * 0.3,
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  );
}

/* =========================================================
   FLOATING HEARTS
========================================================= */

const floatingHearts = [
  {
    left: "6%",
    top: "28%",
    size: 14,
    delay: 0,
    duration: 4,
  },
  {
    left: "90%",
    top: "30%",
    size: 17,
    delay: 1,
    duration: 4.5,
  },
  {
    left: "7%",
    top: "69%",
    size: 12,
    delay: 1.8,
    duration: 3.8,
  },
  {
    left: "91%",
    top: "70%",
    size: 14,
    delay: 0.7,
    duration: 4.2,
  },
];

/* =========================================================
   SPARKLES
========================================================= */

const sparkles = [
  {
    left: "11%",
    top: "38%",
    delay: 0,
  },
  {
    left: "89%",
    top: "46%",
    delay: 0.8,
  },
  {
    left: "13%",
    top: "77%",
    delay: 1.5,
  },
  {
    left: "86%",
    top: "76%",
    delay: 0.4,
  },
];

/* =========================================================
   MEMORIES SCREEN
========================================================= */

function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [petalBurst, setPetalBurst] = useState(0);

  usePreloadImages(memories);

  const currentPhoto = memories[currentIndex];

  const nextPhoto = () => {
    setDirection(1);

    setPetalBurst((prev) => prev + 1);

    setCurrentIndex((prev) =>
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full min-h-screen h-full overflow-visible">

      {/* =====================================================
          DREAMY BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none z-[-20] bg-gradient-to-b from-[#fff8fc] via-[#ffeaf5] to-[#fbddec]" />

      <motion.div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-pink-300/20 blur-[100px] pointer-events-none z-[-10]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.42, 0.25],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =====================================================
          BUTTERFLIES — OUTSIDE ALBUM
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
        size={48}
        delay={5}
        duration={14}
        side="leftBottom"
      />

      <Butterfly
        size={30}
        delay={7}
        duration={16}
        side="rightBottom"
      />

      <Butterfly
        size={37}
        delay={10}
        duration={13}
        side="right"
      />

      {/* =====================================================
          FLOATING HEARTS
      ===================================================== */}

      {floatingHearts.map((heart, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-[5]"
          style={{
            left: heart.left,
            top: heart.top,
          }}
          animate={{
            y: [0, -13, 0],
            x: [
              0,
              index % 2 === 0 ? 5 : -5,
              0,
            ],
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

      {/* =====================================================
          SPARKLES
      ===================================================== */}

      {sparkles.map((star, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-[4]"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.65, 1.15, 0.65],
            rotate: [0, 90, 180],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: 3.2,
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

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        className="text-center z-20 mt-3"
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
          ease: "easeOut",
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
          PHOTO DOTS
      ===================================================== */}

      <div className="flex items-center justify-center gap-2 mt-5 mb-1 z-20">
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={`rounded-full ${
              index === currentIndex
                ? "w-3 h-3 bg-pink-500"
                : "w-2 h-2 bg-pink-200"
            }`}
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.2, 1],
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

      {/* =====================================================
          BIGGER ALBUM AREA
      ===================================================== */}

      <div className="relative w-[calc(100vw-30px)] max-w-[470px] h-[480px] md:h-[520px] my-2 flex items-center justify-center z-10">

        {/* =================================================
            LUXURY BOUQUETS
        ================================================= */}

        <LuxuryBouquet position="topLeft" />
        <LuxuryBouquet position="bottomRight" />

        {/* =================================================
            FALLING PETALS
        ================================================= */}

        <FallingPetals burst={petalBurst} />

        {/* =================================================
            OUTER LUXURY FRAME
        ================================================= */}

        <motion.div
          className="absolute w-[390px] h-[455px] md:w-[425px] md:h-[490px] rounded-[38px] border border-white/90 bg-white/20 backdrop-blur-[2px]"
          animate={{
            boxShadow: [
              "0 22px 65px rgba(236,72,153,0.08)",
              "0 28px 85px rgba(168,85,247,0.14)",
              "0 22px 65px rgba(236,72,153,0.08)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            DECORATIVE FRAME
        ================================================= */}

        <motion.div
          className="absolute w-[375px] h-[440px] md:w-[410px] md:h-[475px] rounded-[36px] border-2 border-dashed border-pink-200/75"
          animate={{
            rotate: [0, 0.35, 0, -0.35, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            INNER GLASS
        ================================================= */}

        <motion.div
          className="absolute w-[360px] h-[425px] md:w-[395px] md:h-[460px] rounded-[32px] bg-white/35 backdrop-blur-sm border border-white/80"
          animate={{
            boxShadow: [
              "0 18px 50px rgba(236,72,153,0.05)",
              "0 24px 65px rgba(168,85,247,0.10)",
              "0 18px 50px rgba(236,72,153,0.05)",
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        {/* =================================================
            BACK PHOTO LAYERS
        ================================================= */}

        <motion.div
          className="absolute top-[38px] left-1/2 -translate-x-1/2 w-[315px] h-[390px] md:w-[345px] md:h-[420px] bg-[#fffafa] rounded-[22px] shadow-[0_16px_40px_rgba(0,0,0,0.08)] border border-pink-100"
          animate={{
            rotate: [-3.5, -2.8, -3.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[33px] left-1/2 -translate-x-1/2 w-[320px] h-[395px] md:w-[350px] md:h-[425px] bg-[#fffdfd] rounded-[22px] shadow-[0_18px_45px_rgba(0,0,0,0.10)] border border-pink-100"
          animate={{
            rotate: [3, 2.4, 3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* =================================================
            PINK TAPE
        ================================================= */}

        <motion.div
          className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[88px] h-[27px] bg-pink-200/90 rounded-sm rotate-[-2deg] z-[90] shadow-sm border border-pink-300/40"
          animate={{
            rotate: [-2, 1, -2],
            y: [0, -1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_1px)] bg-[size:8px_8px]" />

          <Heart
            size={15}
            fill="currentColor"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500"
          />
        </motion.div>

        {/* =================================================
            MAIN PHOTO
            FAST TRANSITION
        ================================================= */}

        <AnimatePresence
          mode="sync"
          initial={false}
        >
          <motion.div
            key={currentPhoto}
            initial={{
              opacity: 0,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.985,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[310px] h-[385px] md:w-[340px] md:h-[415px] bg-[#fffdfd] rounded-[22px] p-3 pb-12 shadow-[0_22px_55px_rgba(0,0,0,0.14)] border border-pink-100 cursor-pointer z-[80]"
            onClick={nextPhoto}
            whileTap={{
              scale: 0.985,
            }}
            style={{
              willChange: "transform, opacity",
            }}
          >

            {/* PHOTO */}

            <div className="relative w-full h-full rounded-[15px] overflow-hidden bg-slate-100 border border-pink-50">

              <img
                src={currentPhoto}
                alt={`Memory ${currentIndex + 1}`}
                width="680"
                height="850"
                decoding="async"
                loading="eager"
                fetchPriority={
                  currentIndex === 0
                    ? "high"
                    : "auto"
                }
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable="false"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 via-transparent to-white/5 pointer-events-none" />

            </div>

            {/* POLAROID TEXT */}

            <div className="absolute bottom-2 left-0 right-0 text-center">
              <span className="font-hand text-sm text-slate-400">
                a little piece of us ♡
              </span>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* =================================================
            NEXT BUTTON
        ================================================= */}

        <motion.div
          className="absolute right-[18px] md:right-[25px] top-1/2 -translate-y-1/2 z-[95] w-10 h-10 rounded-full bg-white/90 shadow-[0_6px_22px_rgba(236,72,153,0.16)] border border-pink-100 flex items-center justify-center pointer-events-none"
          animate={{
            x: [0, 3, 0],
            opacity: [0.55, 1, 0.55],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
        >
          <ChevronRight
            size={19}
            className="text-pink-400"
          />
        </motion.div>

      </div>

      {/* =====================================================
          COUNTER
      ===================================================== */}

      <motion.div
        className="z-20 -mt-1 mb-3"
        key={currentIndex}
        initial={{
          opacity: 0,
          y: 4,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="flex items-center gap-4 text-sm text-purple-500">

          <span className="w-10 h-px bg-pink-300" />

          <span className="tracking-[0.2em] font-semibold">
            {String(currentIndex + 1).padStart(2, "0")}
            {" "}
            /
            {" "}
            {String(memories.length).padStart(2, "0")}
          </span>

          <span className="w-10 h-px bg-pink-300" />

        </div>
      </motion.div>

      {/* =====================================================
          LETTER BUTTON
      ===================================================== */}

      <motion.div
        className="shrink-0 z-20 mb-5"
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.55,
          duration: 0.5,
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
