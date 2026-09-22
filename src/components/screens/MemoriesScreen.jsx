"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Camera,
  ChevronRight,
  Star,
} from "lucide-react";
import Button from "../Button";

const memories = [
  "/images/file_0000000016dc82078b236eaa37f91e05.png",
  "/images/file_000000008c448211b1c41b31f3d0250b.png",
  "/images/IMG-20260914-WA0013.jpg",
  "/images/IMG-20260909-WA0019~2.jpg",
  "/images/IMG-20260329-WA0002.jpg",
];

/* -------------------------------------------------------
   BUTTERFLIES
------------------------------------------------------- */

const butterflies = [
  {
    top: "19%",
    delay: "0s",
    duration: "17s",
    size: 42,
    direction: "left",
    opacity: 0.9,
  },
  {
    top: "34%",
    delay: "4s",
    duration: "21s",
    size: 30,
    direction: "right",
    opacity: 0.75,
  },
  {
    top: "53%",
    delay: "1s",
    duration: "19s",
    size: 36,
    direction: "left",
    opacity: 0.8,
  },
  {
    top: "68%",
    delay: "7s",
    duration: "23s",
    size: 28,
    direction: "right",
    opacity: 0.7,
  },
  {
    top: "78%",
    delay: "11s",
    duration: "18s",
    size: 46,
    direction: "left",
    opacity: 0.8,
  },
];

/* -------------------------------------------------------
   FLOATING HEARTS
------------------------------------------------------- */

const hearts = [
  { left: "7%", top: "42%", size: 18, delay: 0 },
  { left: "88%", top: "31%", size: 15, delay: 1.2 },
  { left: "9%", top: "69%", size: 12, delay: 2 },
  { left: "91%", top: "65%", size: 19, delay: 0.7 },
  { left: "16%", top: "82%", size: 13, delay: 1.6 },
  { left: "82%", top: "82%", size: 12, delay: 2.4 },
];

/* -------------------------------------------------------
   PARTICLES
------------------------------------------------------- */

const particles = [
  [7, 12, 5, 0],
  [17, 25, 3, 1],
  [27, 8, 4, 2],
  [39, 18, 3, 0.5],
  [52, 9, 5, 1.5],
  [66, 16, 3, 2.5],
  [78, 8, 4, 1],
  [92, 20, 3, 2],

  [4, 54, 3, 1],
  [14, 47, 4, 2],
  [23, 58, 3, 0],
  [77, 48, 4, 1.4],
  [89, 54, 3, 2.1],
  [95, 43, 5, 0.7],

  [5, 76, 4, 2],
  [19, 88, 3, 1],
  [31, 79, 5, 2.4],
  [69, 86, 4, 0.4],
  [82, 76, 3, 1.8],
  [94, 89, 4, 2.8],
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
    <main className="memories-page">

      {/* ==================================================
          DREAMY BACKGROUND
      ================================================== */}

      <div className="dream-bg" />

      <div className="pink-glow glow-one" />
      <div className="pink-glow glow-two" />
      <div className="pink-glow glow-three" />

      {/* ==================================================
          SOFT LIGHT PARTICLES
      ================================================== */}

      <div className="particle-layer">
        {particles.map(([left, top, size, delay], index) => (
          <motion.span
            key={index}
            className="tiny-particle"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.2],
              scale: [0.7, 1.35, 0.7],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + (index % 4),
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ==================================================
          STAR SPARKLES
      ================================================== */}

      <div className="sparkle-layer">
        {[...Array(14)].map((_, index) => {
          const positions = [
            [9, 18],
            [23, 12],
            [35, 25],
            [48, 10],
            [62, 22],
            [74, 13],
            [91, 24],
            [6, 62],
            [94, 55],
            [17, 73],
            [84, 71],
            [28, 90],
            [58, 86],
            [94, 88],
          ];

          return (
            <motion.div
              key={index}
              className="sparkle"
              style={{
                left: `${positions[index][0]}%`,
                top: `${positions[index][1]}%`,
              }}
              animate={{
                opacity: [0.15, 1, 0.15],
                scale: [0.6, 1.2, 0.6],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 2.5 + (index % 3),
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={15 + (index % 3) * 3} />
            </motion.div>
          );
        })}
      </div>

      {/* ==================================================
          FLYING BUTTERFLIES
      ================================================== */}

      <div className="butterfly-layer">
        {butterflies.map((butterfly, index) => (
          <motion.div
            key={index}
            className={`flying-butterfly ${
              butterfly.direction === "right"
                ? "fly-right"
                : "fly-left"
            }`}
            style={{
              top: butterfly.top,
              fontSize: `${butterfly.size}px`,
              opacity: butterfly.opacity,
            }}
            initial={{
              x:
                butterfly.direction === "right"
                  ? "-15vw"
                  : "115vw",
            }}
            animate={{
              x:
                butterfly.direction === "right"
                  ? "115vw"
                  : "-15vw",
            }}
            transition={{
              duration: Number(
                butterfly.duration.replace("s", "")
              ),
              delay: Number(
                butterfly.delay.replace("s", "")
              ),
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span>🦋</span>
          </motion.div>
        ))}
      </div>

      {/* ==================================================
          FLOATING HEARTS
      ================================================== */}

      {hearts.map((heart, index) => (
        <motion.div
          key={index}
          className="floating-heart"
          style={{
            left: heart.left,
            top: heart.top,
          }}
          animate={{
            y: [0, -14, 0],
            x: [0, index % 2 ? -7 : 7, 0],
            rotate: [-8, 8, -8],
            opacity: [0.25, 0.8, 0.25],
          }}
          transition={{
            duration: 4 + index * 0.3,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* ==================================================
          TOP TITLE
      ================================================== */}

      <motion.section
        className="memory-title"
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="title-row">

          <motion.div
            animate={{
              rotate: [-7, 7, -7],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera size={25} />
          </motion.div>

          <h1>Our Memories</h1>

          <motion.div
            animate={{
              rotate: [7, -7, 7],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Camera size={25} />
          </motion.div>

        </div>

        <motion.p
          animate={{
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
          }}
        >
          Little moments, forever ours ♡
        </motion.p>
      </motion.section>

      {/* ==================================================
          ALBUM DOTS
      ================================================== */}

      <div className="memory-dots">
        {memories.map((_, index) => (
          <motion.span
            key={index}
            className={
              index === currentIndex
                ? "memory-dot active"
                : "memory-dot"
            }
            animate={
              index === currentIndex
                ? {
                    scale: [1, 1.25, 1],
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

      {/* ==================================================
          ALBUM AREA
      ================================================== */}

      <div className="album-area">

        {/* Decorative back cards */}

        <motion.div
          className="album-shadow-card card-back-two"
          animate={{
            rotate: [-5, -4, -5],
            y: [0, 2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="album-shadow-card card-back-one"
          animate={{
            rotate: [4, 5, 4],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main scrapbook frame */}

        <div className="album-frame">

          {/* Tape */}

          <motion.div
            className="album-tape"
            animate={{
              rotate: [-4, -1, -4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>♡</span>
          </motion.div>

          {/* Pink ribbon */}

          <div className="ribbon ribbon-left" />
          <div className="ribbon ribbon-right" />

          {/* Photo */}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPhoto}
              custom={direction}
              className="photo-polaroid"
              initial={{
                opacity: 0,
                x: direction > 0 ? 100 : -100,
                rotate: direction > 0 ? 4 : -4,
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
                x: direction > 0 ? -100 : 100,
                rotate: direction > 0 ? -4 : 4,
                scale: 0.94,
              }}
              transition={{
                duration: 0.55,
                ease: "easeInOut",
              }}
              onClick={nextPhoto}
            >

              <div className="photo-wrap">

                <img
                  src={currentPhoto}
                  alt={`Memory ${currentIndex + 1}`}
                  draggable="false"
                />

                <div className="photo-glow" />

                <motion.div
                  className="photo-shine"
                  animate={{
                    left: ["-60%", "130%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                  }}
                />

                {/* Photo heart */}

                <motion.div
                  className="photo-heart"
                  animate={{
                    scale: [1, 1.12, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Heart
                    size={20}
                    fill="white"
                  />
                </motion.div>

              </div>

              <div className="photo-caption">
                a little piece of us ♡
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Side arrow */}

          <motion.button
            className="photo-next"
            onClick={nextPhoto}
            whileTap={{ scale: 0.9 }}
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          >
            <ChevronRight size={19} />
          </motion.button>

          {/* Small decorative heart */}

          <motion.div
            className="album-heart"
            animate={{
              scale: [1, 1.12, 1],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Heart
              size={22}
              fill="currentColor"
            />
          </motion.div>

        </div>

        {/* Tap hint */}

        <motion.div
          className="tap-hint"
          animate={{
            y: [0, 4, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          tap for next memory ♡
        </motion.div>

      </div>

      {/* ==================================================
          COUNTER
      ================================================== */}

      <motion.div
        key={currentIndex}
        className="memory-counter"
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <span />
        <b>
          {currentIndex + 1} / {memories.length}
        </b>
        <span />
      </motion.div>

      {/* ==================================================
          LETTER BUTTON
      ================================================== */}

      <motion.div
        className="letter-button-wrap"
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.6,
          duration: 0.6,
        }}
      >
        <Button
          onClick={onNext}
          text="A Letter For You"
          animateIcon={false}
          icon={<Mail size={20} />}
        />
      </motion.div>

      {/* ==================================================
          CUSTOM CSS
      ================================================== */}

      <style jsx global>{`

        .memories-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: #fff1f6;
          color: #26344d;
          isolation: isolate;
        }

        /* ---------------- BACKGROUND ---------------- */

        .dream-bg {
          position: fixed;
          inset: 0;
          z-index: -10;
          background:
            radial-gradient(
              circle at 50% 30%,
              rgba(255,255,255,0.95) 0%,
              rgba(255,235,245,0.92) 28%,
              rgba(250,205,225,0.72) 55%,
              rgba(246,190,216,0.9) 100%
            );
        }

        .pink-glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(55px);
          pointer-events: none;
          z-index: -5;
        }

        .glow-one {
          width: 240px;
          height: 240px;
          left: -80px;
          top: 18%;
          background: rgba(255,150,200,0.35);
        }

        .glow-two {
          width: 280px;
          height: 280px;
          right: -100px;
          top: 48%;
          background: rgba(255,175,215,0.38);
        }

        .glow-three {
          width: 220px;
          height: 220px;
          left: 25%;
          bottom: -100px;
          background: rgba(255,130,190,0.3);
        }

        /* ---------------- PARTICLES ---------------- */

        .particle-layer {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .tiny-particle {
          position: absolute;
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 8px rgba(255,255,255,0.95),
            0 0 18px rgba(255,180,220,0.65);
        }

        /* ---------------- SPARKLES ---------------- */

        .sparkle-layer {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          color: rgba(255,255,255,0.85);
          filter: drop-shadow(
            0 0 7px rgba(255,255,255,0.8)
          );
        }

        /* ---------------- BUTTERFLIES ---------------- */

        .butterfly-layer {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 4;
        }

        .flying-butterfly {
          position: absolute;
          will-change: transform;
          filter:
            drop-shadow(0 4px 8px rgba(120,60,100,0.15));
        }

        .flying-butterfly span {
          display: block;
          animation:
            butterfly-float 2.8s ease-in-out infinite;
        }

        .fly-left span {
          animation-delay: 0.3s;
        }

        .fly-right span {
          animation-delay: 1s;
        }

        @keyframes butterfly-float {
          0% {
            transform:
              translateY(0)
              rotate(-8deg)
              scale(1);
          }

          25% {
            transform:
              translateY(-18px)
              rotate(8deg)
              scale(1.05);
          }

          50% {
            transform:
              translateY(3px)
              rotate(-4deg)
              scale(0.97);
          }

          75% {
            transform:
              translateY(-13px)
              rotate(7deg)
              scale(1.04);
          }

          100% {
            transform:
              translateY(0)
              rotate(-8deg)
              scale(1);
          }
        }

        /* ---------------- HEARTS ---------------- */

        .floating-heart {
          position: fixed;
          z-index: 3;
          color: rgba(244,114,182,0.48);
          pointer-events: none;
          filter:
            drop-shadow(0 4px 8px rgba(244,114,182,0.15));
        }

        /* ---------------- TITLE ---------------- */

        .memory-title {
          position: relative;
          z-index: 10;
          margin-top: clamp(70px, 11vh, 105px);
          text-align: center;
          padding: 0 16px;
        }

        .title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #f03f96;
        }

        .title-row h1 {
          margin: 0;
          font-size: clamp(31px, 8vw, 48px);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -1.5px;
          color: #29384f;
          text-shadow:
            0 3px 0 rgba(255,255,255,0.8);
        }

        .memory-title p {
          margin: 15px 0 0;
          font-family: cursive;
          font-style: italic;
          font-size: clamp(18px, 4.8vw, 27px);
          color: #b26be5;
          text-shadow:
            0 1px 4px rgba(178,107,229,0.1);
        }

        /* ---------------- DOTS ---------------- */

        .memory-dots {
          position: relative;
          z-index: 15;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          margin-top: 25px;
        }

        .memory-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #f5afd3;
        }

        .memory-dot.active {
          width: 14px;
          height: 14px;
          background: #ee3d98;
          box-shadow:
            0 0 12px rgba(238,61,152,0.35);
        }

        /* ---------------- ALBUM AREA ---------------- */

        .album-area {
          position: relative;
          width: min(94vw, 420px);
          height: clamp(360px, 50vh, 430px);
          margin-top: 17px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }

        .album-shadow-card {
          position: absolute;
          width: min(76vw, 335px);
          height: min(89vw, 385px);
          border-radius: 25px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.92),
              rgba(255,245,249,0.86)
            );
          border: 1px solid rgba(255,255,255,0.95);
          box-shadow:
            0 25px 55px rgba(180,80,140,0.13);
        }

        .card-back-one {
          transform: rotate(5deg);
        }

        .card-back-two {
          transform: rotate(-5deg);
        }

        /* ---------------- MAIN FRAME ---------------- */

        .album-frame {
          position: relative;
          width: min(82vw, 350px);
          height: min(92vw, 400px);
          padding: 22px 20px 20px;
          border-radius: 28px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.97),
              rgba(255,249,252,0.95)
            );
          border: 1px solid rgba(255,255,255,0.95);

          box-shadow:
            0 28px 60px rgba(173,76,132,0.18),
            0 5px 15px rgba(255,255,255,0.9) inset;

          z-index: 10;
        }

        .album-frame::before {
          content: "";
          position: absolute;
          inset: -7px;
          border-radius: 31px;
          border: 1px solid rgba(255,150,205,0.35);
          pointer-events: none;
        }

        /* ---------------- TAPE ---------------- */

        .album-tape {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%) rotate(-3deg);
          width: 88px;
          height: 34px;
          background:
            linear-gradient(
              90deg,
              rgba(255,174,216,0.85),
              rgba(255,205,230,0.9),
              rgba(255,165,211,0.82)
            );
          box-shadow:
            0 5px 12px rgba(190,70,130,0.12);
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d84b91;
          font-size: 22px;
        }

        .album-tape::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(
              -45deg,
              transparent 0 5px,
              rgba(255,255,255,0.22) 5px 7px
            );
          opacity: 0.65;
        }

        .album-tape span {
          position: relative;
          z-index: 2;
        }

        /* ---------------- RIBBON ---------------- */

        .ribbon {
          position: absolute;
          top: 43%;
          width: 75px;
          height: 25px;
          background:
            linear-gradient(
              90deg,
              rgba(245,125,178,0),
              rgba(245,125,178,0.5)
            );
          opacity: 0.45;
          z-index: -1;
        }

        .ribbon-left {
          left: -58px;
          transform: rotate(-25deg);
        }

        .ribbon-right {
          right: -58px;
          transform: scaleX(-1) rotate(-25deg);
        }

        /* ---------------- PHOTO ---------------- */

        .photo-polaroid {
          position: absolute;
          left: 50%;
          top: 27px;
          transform: translateX(-50%);
          width: calc(100% - 30px);
          height: calc(100% - 50px);
          background: #fff;
          border-radius: 18px;
          padding: 10px 10px 42px;
          cursor: pointer;

          box-shadow:
            0 17px 38px rgba(75,45,70,0.16);

          border: 1px solid #f5dfe9;
          z-index: 20;
          overflow: hidden;
        }

        .photo-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 13px;
          overflow: hidden;
          background: #f8eaf0;
        }

        .photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
        }

        .photo-glow {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.13),
              transparent 45%,
              rgba(245,114,180,0.09)
            );
          pointer-events: none;
        }

        .photo-shine {
          position: absolute;
          top: -10%;
          left: -60%;
          width: 28%;
          height: 120%;
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255,255,255,0.35),
              transparent
            );
          transform: skewX(-20deg);
          pointer-events: none;
        }

        .photo-heart {
          position: absolute;
          right: 12px;
          top: 12px;
          color: white;
          filter:
            drop-shadow(0 2px 5px rgba(0,0,0,0.25));
        }

        .photo-caption {
          position: absolute;
          bottom: 10px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: cursive;
          font-style: italic;
          color: #8791a2;
          font-size: 15px;
        }

        /* ---------------- ARROW ---------------- */

        .photo-next {
          position: absolute;
          right: -15px;
          top: 50%;
          transform: translateY(-50%);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid rgba(240,160,205,0.35);
          background: rgba(255,255,255,0.92);
          color: #ee5aa8;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 7px 18px rgba(190,70,140,0.13);
          z-index: 50;
          cursor: pointer;
        }

        /* ---------------- ALBUM HEART ---------------- */

        .album-heart {
          position: absolute;
          right: 20px;
          bottom: 12px;
          color: #f25ca8;
          z-index: 45;
          filter:
            drop-shadow(0 4px 7px rgba(235,80,160,0.2));
        }

        /* ---------------- TAP HINT ---------------- */

        .tap-hint {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          padding: 7px 20px;
          border-radius: 999px;
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(246,177,213,0.38);
          color: #e789b8;
          font-size: 12px;
          box-shadow:
            0 8px 20px rgba(190,80,140,0.08);
          z-index: 60;
        }

        /* ---------------- COUNTER ---------------- */

        .memory-counter {
          position: relative;
          z-index: 20;
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 5px;
          margin-bottom: 17px;
          color: #967aa8;
        }

        .memory-counter span {
          display: block;
          width: 42px;
          height: 2px;
          background:
            linear-gradient(
              90deg,
              transparent,
              #f29ac7
            );
        }

        .memory-counter span:last-child {
          background:
            linear-gradient(
              90deg,
              #f29ac7,
              transparent
            );
        }

        .memory-counter b {
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 5px;
          color: #927ca3;
        }

        /* ---------------- BUTTON ---------------- */

        .letter-button-wrap {
          position: relative;
          z-index: 70;
          margin-bottom: 25px;
        }

        /* ---------------- MOBILE ---------------- */

        @media (max-height: 760px) {

          .memory-title {
            margin-top: 58px;
          }

          .memory-title p {
            margin-top: 10px;
          }

          .memory-dots {
            margin-top: 17px;
          }

          .album-area {
            height: 350px;
            margin-top: 10px;
          }

          .memory-counter {
            margin-bottom: 10px;
          }

          .letter-button-wrap {
            margin-bottom: 15px;
          }
        }

        @media (max-width: 380px) {

          .title-row {
            gap: 7px;
          }

          .title-row h1 {
            font-size: 29px;
          }

          .title-row svg {
            width: 21px;
            height: 21px;
          }

          .album-frame {
            width: 310px;
            height: 355px;
          }

          .album-shadow-card {
            width: 295px;
            height: 345px;
          }

          .photo-next {
            right: -10px;
          }

          .memory-counter {
            margin-top: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {

          .flying-butterfly span,
          .pink-glow,
          .sparkle {
            animation: none !important;
          }

        }

      `}</style>
    </main>
  );
}

export default MemoriesScreen;
