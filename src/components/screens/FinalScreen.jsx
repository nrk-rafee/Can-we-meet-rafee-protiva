"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BatteryCharging, Heart } from "lucide-react";

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

    // Pink scratch layer
    ctx.fillStyle = "#f9b6c9";
    ctx.fillRect(0, 0, width, height);

    // Soft dot pattern
    for (let y = 14; y < height; y += 22) {
      for (let x = 14; x < width; x += 22) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.34)";
        ctx.fill();
      }
    }

    // Center text
    ctx.fillStyle = "#4b3a4d";
    ctx.font =
      '600 24px "Comic Sans MS", "Trebuchet MS", cursive';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Scratch Me", width / 2, height / 2);

    // Small heart
    ctx.font = "22px sans-serif";
    ctx.fillText("♡", width / 2, height / 2 + 38);
  }, []);

  const getPoint = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    let clientX;
    let clientY;

    if (event.touches && event.touches.length > 0) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else if (event.changedTouches && event.changedTouches.length > 0) {
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

  const erase = (point) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;

    const ctx = canvas.getContext("2d");

    ctx.save();

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();

    ctx.arc(
      point.x,
      point.y,
      window.innerWidth < 500 ? 22 : 26,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // Smooth line between touch points
    if (lastPoint.current) {
      const distance = Math.hypot(
        point.x - lastPoint.current.x,
        point.y - lastPoint.current.y
      );

      const steps = Math.max(1, Math.ceil(distance / 8));

      for (let i = 1; i <= steps; i++) {
        const x =
          lastPoint.current.x +
          ((point.x - lastPoint.current.x) * i) / steps;

        const y =
          lastPoint.current.y +
          ((point.y - lastPoint.current.y) * i) / steps;

        ctx.beginPath();

        ctx.arc(
          x,
          y,
          window.innerWidth < 500 ? 22 : 26,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }
    }

    ctx.restore();

    lastPoint.current = point;

    // Track scratched grid areas.
    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const gridX = Math.floor((point.x / canvasWidth) * 14);
    const gridY = Math.floor((point.y / canvasHeight) * 9);

    scratchedPoints.current.add(`${gridX}-${gridY}`);

    const totalCells = 14 * 9;
    const scratchedPercentage =
      scratchedPoints.current.size / totalCells;

    // Reveal after roughly 30% scratch coverage.
    if (scratchedPercentage >= 0.30) {
      revealCard();
    }
  };

  const revealCard = () => {
    if (revealed) return;

    setRevealed(true);
    setIsScratching(false);

    setTimeout(() => {
      onReveal(index);
    }, 250);
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.12,
        duration: 0.6,
      }}
    >
      {/* REAL BATTERY CONTENT — hidden until scratched */}
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

              {/* Left text */}
              <div className="w-[82px] text-center text-[19px] md:text-[22px] text-slate-700 font-hand font-semibold leading-tight">
                {item.left}

                {item.middle && (
                  <>
                    <br />
                    {item.middle}
                  </>
                )}
              </div>

              {/* Battery */}
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

                    {/* Battery fill */}
                    <motion.div
                      initial={{
                        width: "0%",
                      }}
                      animate={{
                        width: `${Math.max(item.level, 5)}%`,
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

                    {/* Battery face */}
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

                  {/* Little energy lines */}
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

              {/* Right text */}
              <div className="w-[55px] text-center text-[19px] md:text-[22px] text-slate-700 font-hand font-semibold">
                {item.right}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCRATCH LAYER */}
      {!revealed && (
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 z-20 touch-none cursor-pointer"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          initial={{ opacity: 1 }}
          animate={{
            opacity: revealed ? 0 : 1,
          }}
          transition={{
            duration: 0.4,
          }}
        />
      )}
    </motion.div>
  );
}

export default function FinalScreen() {
  const [revealedCards, setRevealedCards] = useState([]);

  const allRevealed =
    revealedCards.length === batteryData.length;

  const handleReveal = (index) => {
    setRevealedCards((prev) => {
      if (prev.includes(index)) return prev;

      return [...prev, index];
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center px-5 py-10">

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

      {/* Title */}
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

          {/* Tape */}
          <div className="absolute -left-8 -bottom-3 w-20 h-7 bg-amber-100/60 rotate-[-38deg] rounded-sm" />

          <div className="absolute -right-8 -top-3 w-20 h-7 bg-amber-100/60 rotate-[38deg] rounded-sm" />

          <div className="relative bg-white/85 backdrop-blur-sm border border-slate-200/70 shadow-[0_8px_25px_rgba(0,0,0,0.08)] px-8 py-3">
            <h1 className="text-[34px] md:text-5xl font-hand font-bold text-slate-700">
              You Charge My Heart
            </h1>
          </div>
        </div>
      </motion.div>

      {/* Battery cards */}
      <div className="relative z-10 w-full max-w-[570px] flex flex-col gap-5">

        {batteryData.map((item, index) => (
          <ScratchBatteryCard
            key={index}
            item={item}
            index={index}
            onReveal={handleReveal}
          />
        ))}
      </div>

      {/* Continue */}
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
          repeat: allRevealed ? Infinity : 0,
        }}
      >
        <button
          type="button"
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

      {/* Final glow */}
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
    </div>
  );
}
