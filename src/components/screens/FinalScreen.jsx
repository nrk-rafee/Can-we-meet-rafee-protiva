"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const batteryData = [
  {
    left: "Without",
    right: "you",
    percentage: 0,
    level: 0,
  },
  {
    left: "When",
    middle: "I see",
    right: "you",
    percentage: 50,
    level: 50,
  },
  {
    left: "When",
    middle: "I'm with",
    right: "you",
    percentage: 100,
    level: 100,
  },
];

function ScratchBatteryCard({ item, index, onReveal }) {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const scratchedPoints = useRef(new Set());
  const lastPoint = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) return;

    const setupCanvas = () => {
      const rect = wrapper.getBoundingClientRect();

      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Scratch background
      ctx.fillStyle = "#f9b6c9";
      ctx.fillRect(0, 0, width, height);

      // Soft dots
      for (let y = 14; y < height; y += 22) {
        for (let x = 14; x < width; x += 22) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.34)";
          ctx.fill();
        }
      }

      // Main text
      ctx.fillStyle = "#4b3a4d";
      ctx.font =
        '600 24px "Comic Sans MS", "Trebuchet MS", cursive';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        "Scratch Me",
        width / 2,
        height / 2
      );

      // Heart
      ctx.font = "22px sans-serif";

      ctx.fillText(
        "♡",
        width / 2,
        height / 2 + 38
      );
    };

    setupCanvas();

    window.addEventListener("resize", setupCanvas);

    return () => {
      window.removeEventListener("resize", setupCanvas);
    };
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return {
        x: 0,
        y: 0,
      };
    }

    const rect = canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if (
      event.touches &&
      event.touches.length > 0
    ) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if (
      event.changedTouches &&
      event.changedTouches.length > 0
    ) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const revealCard = () => {
    if (revealed) return;

    setRevealed(true);
    setIsScratching(false);

    setTimeout(() => {
      onReveal(index);
    }, 250);
  };

  const erase = (point) => {
    const canvas = canvasRef.current;

    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");

    ctx.save();

    ctx.globalCompositeOperation =
      "destination-out";

    const radius =
      window.innerWidth < 500 ? 22 : 26;

    const drawCircle = (x, y) => {
      ctx.beginPath();

      ctx.arc(
        x,
        y,
        radius,
        0,
        Math.PI * 2
      );

      ctx.fill();
    };

    drawCircle(point.x, point.y);

    // Smooth scratching
    if (lastPoint.current) {
      const distance = Math.hypot(
        point.x - lastPoint.current.x,
        point.y - lastPoint.current.y
      );

      const steps = Math.max(
        1,
        Math.ceil(distance / 8)
      );

      for (let i = 1; i <= steps; i++) {
        const x =
          lastPoint.current.x +
          ((point.x - lastPoint.current.x) * i) /
            steps;

        const y =
          lastPoint.current.y +
          ((point.y - lastPoint.current.y) * i) /
            steps;

        drawCircle(x, y);
      }
    }

    ctx.restore();

    lastPoint.current = point;

    // Track scratch coverage
    const canvasWidth =
      canvas.clientWidth;

    const canvasHeight =
      canvas.clientHeight;

    const gridX = Math.floor(
      (point.x / canvasWidth) * 14
    );

    const gridY = Math.floor(
      (point.y / canvasHeight) * 9
    );

    scratchedPoints.current.add(
      `${gridX}-${gridY}`
    );

    const totalCells = 14 * 9;

    const scratchedPercentage =
      scratchedPoints.current.size /
      totalCells;

    if (scratchedPercentage >= 0.30) {
      revealCard();
    }
  };

  const handlePointerDown = (event) => {
    if (revealed) return;

    event.preventDefault();

    setIsScratching(true);

    const point = getPoint(event);

    lastPoint.current = point;

    erase(point);
  };

  const handlePointerMove = (event) => {
    if (!isScratching || revealed) return;

    event.preventDefault();

    const point = getPoint(event);

    erase(point);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    lastPoint.current = null;
  };

  return (
    <motion.div
      ref={wrapperRef}
      className="relative w-full h-[190px] rounded-[24px] overflow-hidden bg-white border-[3px] border-dashed border-pink-300 shadow-[0_8px_25px_rgba(244,114,182,0.10)]"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
      }}
    >
      {/* REAL CONTENT */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-white"
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <div className="flex items-center justify-center gap-3 w-full px-4">

              {/* LEFT */}
              <div className="w-[82px] text-center text-[19px] md:text-[22px] text-slate-700 font-hand font-semibold leading-tight">
                {item.left}

                {item.middle && (
                  <>
                    <br />
                    {item.middle}
                  </>
                )}
              </div>

              {/* BATTERY */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{
                    scale: 0.7,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.12,
                    duration: 0.45,
                  }}
                  className="relative"
                >
                  <div className="relative w-[150px] h-[68px] rounded-[18px] border-[5px] border-slate-700 bg-white overflow-hidden">

                    <motion.div
                      initial={{
                        width: "0%",
                      }}
                      animate={{
                        width: `${Math.max(
                          item.level,
                          5
                        )}%`,
                      }}
                      transition={{
                        delay: 0.2,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                      className={`absolute left-0 top-0 bottom-0 ${
                        item.level === 0
                          ? "bg-rose-300"
                          : item.level === 50
                          ? "bg-amber-300"
                          : "bg-emerald-400"
                      }`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      {item.level === 0 && (
                        <div className="text-slate-700 text-[28px]">
                          😟
                        </div>
                      )}

                      {item.level === 50 && (
                        <div className="text-slate-700 text-[28px]">
                          😊
                        </div>
                      )}

                      {item.level === 100 && (
                        <div className="text-slate-700 text-[28px]">
                          🥰
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Battery terminal */}
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[10px] h-[28px] rounded-r-md border-[4px] border-l-0 border-slate-700 bg-white" />

                  {/* Energy */}
                  {item.level === 0 && (
                    <>
                      <span className="absolute -top-5 left-3 text-rose-400 text-xl">
                        !
                      </span>

                      <span className="absolute -top-4 left-8 text-rose-400 text-lg">
                        !
                      </span>
                    </>
                  )}

                  {item.level === 50 && (
                    <>
                      <span className="absolute -top-5 left-3 text-amber-400 text-xl rotate-[-15deg]">
                        ✦
                      </span>

                      <span className="absolute -top-4 right-7 text-amber-400 text-lg rotate-[15deg]">
                        ✦
                      </span>
                    </>
                  )}

                  {item.level === 100 && (
                    <>
                      <span className="absolute -top-5 left-3 text-emerald-400 text-xl rotate-[-15deg]">
                        ✦
                      </span>

                      <span className="absolute -top-5 right-7 text-emerald-400 text-xl rotate-[15deg]">
                        ✦
                      </span>
                    </>
                  )}
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.55,
                  }}
                  className="mt-1 text-[22px] md:text-[24px] font-semibold text-slate-700"
                >
                  {item.percentage}%
                </motion.div>
              </div>

              {/* RIGHT */}
              <div className="w-[55px] text-center text-[19px] md:text-[22px] text-slate-700 font-hand font-semibold">
                {item.right}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCRATCH */}
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 touch-none cursor-pointer"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      )}
    </motion.div>
  );
}

export default function FinalScreen() {
  const [revealedCards, setRevealedCards] =
    useState([]);

  const [showFinalMessage, setShowFinalMessage] =
    useState(false);

  const allRevealed =
    revealedCards.length ===
    batteryData.length;

  const handleReveal = (index) => {
    setRevealedCards((prev) => {
      if (prev.includes(index)) {
        return prev;
      }

      return [...prev, index];
    });
  };

  const handleContinue = () => {
    if (!allRevealed) return;

    setShowFinalMessage(true);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-5 py-10">

      <AnimatePresence mode="wait">

        {/* =========================
            BATTERY SECTION
        ========================== */}
        {!showFinalMessage && (
          <motion.div
            key="battery-section"
            className="w-full flex flex-col items-center"
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.03,
              y: -25,
            }}
            transition={{
              duration: 0.55,
              ease: "easeInOut",
            }}
          >

            {/* Background hearts */}
            <motion.div
              className="absolute top-12 left-8 text-pink-200 text-2xl pointer-events-none"
              animate={{
                y: [0, -10, 0],
                rotate: [-8, 8, -8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              ♥
            </motion.div>

            <motion.div
              className="absolute top-32 right-10 text-pink-200 text-xl pointer-events-none"
              animate={{
                y: [0, 12, 0],
                rotate: [8, -8, 8],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
              }}
            >
              ♥
            </motion.div>

            <motion.div
              className="absolute bottom-32 right-8 text-pink-200 text-2xl pointer-events-none"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              ♥
            </motion.div>

            {/* TITLE */}
            <motion.div
              className="relative z-10 mb-7 text-center"
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
              }}
            >
              <div className="relative inline-block">

                <div className="absolute -left-8 -bottom-3 w-20 h-7 bg-amber-100/60 rotate-[-38deg] rounded-sm" />

                <div className="absolute -right-8 -top-3 w-20 h-7 bg-amber-100/60 rotate-[38deg] rounded-sm" />

                <div className="relative bg-white/85 backdrop-blur-sm border border-slate-200/70 shadow-[0_8px_25px_rgba(0,0,0,0.08)] px-8 py-3">
                  <h1 className="text-[34px] md:text-5xl font-hand font-bold text-slate-700">
                    You Charge My Heart
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* BATTERY CARDS */}
            <div className="relative z-10 w-full max-w-[570px] flex flex-col gap-5">
              {batteryData.map(
                (item, index) => (
                  <ScratchBatteryCard
                    key={index}
                    item={item}
                    index={index}
                    onReveal={handleReveal}
                  />
                )
              )}
            </div>

            {/* CONTINUE */}
            <motion.div
              className="relative z-10 mt-9 text-center"
              animate={
                allRevealed
                  ? {
                      opacity: 1,
                      scale: [1, 1.04, 1],
                    }
                  : {
                      opacity: 0.65,
                    }
              }
              transition={{
                duration: 1.8,
                repeat: allRevealed
                  ? Infinity
                  : 0,
              }}
            >
              <button
                type="button"
                onClick={handleContinue}
                disabled={!allRevealed}
                className={`relative font-medium tracking-[0.2em] text-sm md:text-base uppercase transition-all ${
                  allRevealed
                    ? "text-pink-500 cursor-pointer"
                    : "text-slate-400 cursor-not-allowed"
                }`}
              >
                {allRevealed
                  ? "TAP HERE TO CONTINUE"
                  : "SCRATCH ALL TO CONTINUE"}

                {allRevealed && (
                  <motion.span
                    className="absolute -right-12 top-1/2 text-pink-300 text-3xl"
                    animate={{
                      x: [0, 8, 0],
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                    }}
                  >
                    ♡
                  </motion.span>
                )}
              </button>
            </motion.div>

            {/* Bottom hearts */}
            <motion.div
              className="absolute bottom-[-5px] left-[-5px] z-0"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <div className="text-6xl opacity-70">
                💕
              </div>
            </motion.div>

            {/* Glow */}
            <motion.div
              className="absolute pointer-events-none w-[300px] h-[300px] rounded-full bg-pink-200/20 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.25, 0.45, 0.25],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}

        {/* =========================
            TO MY ONE AND ONLY
        ========================== */}
        {showFinalMessage && (
          <motion.div
            key="final-message"
            className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center text-center px-6"
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >

            {/* Floating hearts */}
            {[
              {
                left: "8%",
                top: "14%",
                delay: 0,
                size: "text-2xl",
              },
              {
                left: "82%",
                top: "19%",
                delay: 1,
                size: "text-xl",
              },
              {
                left: "10%",
                top: "62%",
                delay: 1.5,
                size: "text-3xl",
              },
              {
                left: "84%",
                top: "72%",
                delay: 0.5,
                size: "text-2xl",
              },
              {
                left: "18%",
                top: "84%",
                delay: 2,
                size: "text-xl",
              },
            ].map((heart, index) => (
              <motion.div
                key={index}
                className={`absolute ${heart.size} text-pink-200 pointer-events-none`}
                style={{
                  left: heart.left,
                  top: heart.top,
                }}
                animate={{
                  y: [0, -12, 0],
                  x: [0, 5, 0],
                  rotate: [-8, 8, -8],
                  opacity: [0.35, 0.9, 0.35],
                }}
                transition={{
                  duration: 4,
                  delay: heart.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ♥
              </motion.div>
            ))}

            {/* TOP TITLE */}
            <motion.h1
              className="font-hand text-4xl md:text-6xl font-bold text-[#5b3445] mb-7"
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.7,
              }}
            >
              To my one and only
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              className="font-hand text-xl md:text-3xl leading-relaxed text-[#684552] max-w-[650px] mb-8"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.7,
              }}
            >
              Thank you for being the most beautiful part
              <br />
              of my life.
            </motion.p>

            {/* CENTER ROMANTIC ILLUSTRATION */}
            <motion.div
              className="relative w-[270px] h-[300px] md:w-[360px] md:h-[370px] flex items-center justify-center"
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: "easeOut",
              }}
            >
              {/* Pink glow */}
              <motion.div
                className="absolute w-[260px] h-[260px] md:w-[330px] md:h-[330px] rounded-full bg-pink-200/45 blur-2xl"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.55, 0.8, 0.55],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              />

              {/* Romantic circle */}
              <div className="relative w-[250px] h-[250px] md:w-[315px] md:h-[315px] rounded-full bg-gradient-to-b from-pink-200/90 to-pink-100/80 border-4 border-white/80 shadow-[0_15px_50px_rgba(236,72,153,0.15)] overflow-hidden">

                {/* Stars */}
                <motion.div
                  className="absolute top-12 left-12 text-white text-xl"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.15, 0.8],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                >
                  ✦
                </motion.div>

                <motion.div
                  className="absolute top-16 right-14 text-white text-lg"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.1, 0.8],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    delay: 0.7,
                  }}
                >
                  ✦
                </motion.div>

                {/* Couple illustration */}
                <div className="absolute inset-0 flex items-end justify-center pb-7">

                  {/* Boy */}
                  <div className="relative w-[88px] md:w-[105px] h-[155px] md:h-[175px]">
                    {/* Head */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55px] h-[55px] rounded-full bg-[#f0b58e]">
                      {/* Hair */}
                      <div className="absolute -top-2 left-0 right-0 h-[28px] bg-[#3b2423] rounded-t-[50%]" />
                    </div>

                    {/* Body */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[78px] md:w-[92px] h-[105px] bg-[#ee8d88] rounded-t-[35px]" />

                    {/* Arm */}
                    <div className="absolute bottom-[48px] right-[-8px] w-[58px] h-[16px] bg-[#f0b58e] rounded-full rotate-[12deg]" />
                  </div>

                  {/* Girl */}
                  <div className="relative w-[95px] md:w-[115px] h-[165px] md:h-[180px] -ml-5">
                    {/* Hair */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[72px] h-[78px] bg-[#3b2423] rounded-[50%_50%_45%_45%]" />

                    {/* Face */}
                    <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[53px] h-[58px] rounded-full bg-[#efb58f]" />

                    {/* Hair side */}
                    <div className="absolute top-[35px] left-[10px] w-[25px] h-[92px] bg-[#3b2423] rounded-full" />

                    <div className="absolute top-[35px] right-[10px] w-[25px] h-[92px] bg-[#3b2423] rounded-full" />

                    {/* Body */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[82px] md:w-[98px] h-[100px] bg-[#f2a09c] rounded-t-[40px]" />
                  </div>
                </div>

                {/* Little hearts */}
                {[...Array(6)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-pink-400 text-sm"
                    style={{
                      left: `${18 + index * 13}%`,
                      top: `${30 + (index % 3) * 12}%`,
                    }}
                    animate={{
                      y: [0, -7, 0],
                      opacity: [0.35, 0.9, 0.35],
                    }}
                    transition={{
                      duration: 2.5 + index * 0.2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    ♥
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* BOTTOM MESSAGE */}
            <motion.div
              className="mt-7 w-full max-w-[520px] rounded-[28px] border border-pink-200/80 bg-white/65 backdrop-blur-sm px-7 py-7 shadow-[0_15px_45px_rgba(236,72,153,0.08)]"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
                duration: 0.7,
              }}
            >
              <p className="font-hand text-xl md:text-2xl text-[#684552] leading-relaxed">
                Here's to many more beautiful memories
                <br />
                together
              </p>

              <div className="flex justify-center gap-3 mt-5">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    animate={{
                      scale: [1, 1.2, 1],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: item * 0.2,
                    }}
                  >
                    <Heart
                      size={24}
                      fill="currentColor"
                      className="text-pink-400"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bottom decorative hearts */}
            <motion.div
              className="absolute bottom-[-10px] left-[-5px] text-6xl opacity-70"
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              💕
            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
