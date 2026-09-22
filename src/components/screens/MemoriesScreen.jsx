"use client";

import { useState } from "react";
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

/* ---------------- BUTTERFLIES ---------------- */

const butterflies = [
  {
    top: "18%",
    startX: "-12vw",
    endX: "110vw",
    duration: 18,
    delay: 0,
    size: 1,
  },
  {
    top: "32%",
    startX: "110vw",
    endX: "-12vw",
    duration: 21,
    delay: 4,
    size: 0.72,
  },
  {
    top: "48%",
    startX: "-12vw",
    endX: "110vw",
    duration: 23,
    delay: 2,
    size: 0.58,
  },
  {
    top: "65%",
    startX: "110vw",
    endX: "-12vw",
    duration: 20,
    delay: 8,
    size: 0.8,
  },
  {
    top: "78%",
    startX: "-12vw",
    endX: "110vw",
    duration: 25,
    delay: 12,
    size: 0.62,
  },
];

const particles = [
  [6, 13],
  [15, 27],
  [25, 9],
  [37, 20],
  [50, 11],
  [64, 18],
  [78, 10],
  [91, 22],
  [8, 57],
  [19, 71],
  [31, 83],
  [69, 79],
  [83, 57],
  [94, 73],
  [54, 91],
];

function Butterfly({ data, index }) {
  return (
    <motion.div
      className="real-butterfly"
      style={{
        top: data.top,
        scale: data.size,
      }}
      initial={{ x: data.startX }}
      animate={{
        x: [
          data.startX,
          index % 2 === 0 ? "25vw" : "75vw",
          index % 2 === 0 ? "72vw" : "30vw",
          data.endX,
        ],
        y: [0, -45, 35, -20, 0],
        rotate: [0, 8, -7, 6, 0],
      }}
      transition={{
        duration: data.duration,
        delay: data.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="butterfly-wing wing-left" />
      <div className="butterfly-wing wing-right" />
      <div className="butterfly-body" />
      <div className="antenna antenna-left" />
      <div className="antenna antenna-right" />
    </motion.div>
  );
}

export default function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextMemory = () => {
    setDirection(1);
    setCurrentIndex((prev) =>
      prev === memories.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <main className="memories-page">

      {/* BACKGROUND */}
      <div className="dream-background" />

      <div className="pink-glow glow-a" />
      <div className="pink-glow glow-b" />
      <div className="pink-glow glow-c" />

      {/* LIGHT PARTICLES */}
      <div className="particles">
        {particles.map(([left, top], i) => (
          <motion.span
            key={i}
            className="particle"
            style={{
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.6, 1.25, 0.6],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              delay: i * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* SPARKLES */}
      <div className="sparkles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            style={{
              left: `${5 + ((i * 17) % 90)}%`,
              top: `${8 + ((i * 23) % 82)}%`,
            }}
            animate={{
              opacity: [0.15, 1, 0.15],
              scale: [0.7, 1.2, 0.7],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 2.5 + (i % 3),
              delay: i * 0.25,
              repeat: Infinity,
            }}
          >
            <Sparkles size={15 + (i % 2) * 5} />
          </motion.div>
        ))}
      </div>

      {/* BUTTERFLIES */}
      <div className="butterflies">
        {butterflies.map((item, index) => (
          <Butterfly
            key={index}
            data={item}
            index={index}
          />
        ))}
      </div>

      {/* FLOATING HEARTS */}
      {[
        ["7%", "42%", 18],
        ["90%", "34%", 14],
        ["10%", "70%", 12],
        ["88%", "67%", 18],
        ["17%", "84%", 12],
        ["82%", "82%", 13],
      ].map(([left, top, size], i) => (
        <motion.div
          key={i}
          className="floating-heart"
          style={{ left, top }}
          animate={{
            y: [0, -13, 0],
            x: [0, i % 2 ? -6 : 6, 0],
            opacity: [0.2, 0.75, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.3,
            delay: i * 0.4,
            repeat: Infinity,
          }}
        >
          <Heart size={size} fill="currentColor" />
        </motion.div>
      ))}

      {/* TITLE */}
      <motion.header
        className="memory-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="title-row">
          <Camera />
          <h1>Our Memories</h1>
          <Camera />
        </div>

        <p>Little moments, forever ours ♡</p>
      </motion.header>

      {/* DOTS */}
      <div className="memory-dots">
        {memories.map((_, i) => (
          <span
            key={i}
            className={
              i === currentIndex
                ? "memory-dot active"
                : "memory-dot"
            }
          />
        ))}
      </div>

      {/* ALBUM */}
      <section className="album-area">

        {/* BACK SCRAPBOOK CARDS */}
        <div className="back-card back-card-one" />
        <div className="back-card back-card-two" />

        {/* MAIN ALBUM */}
        <div className="album">

          {/* TAPE */}
          <motion.div
            className="album-tape"
            animate={{ rotate: [-4, -1, -4] }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            ♡
          </motion.div>

          {/* RIBBON */}
          <div className="ribbon ribbon-left" />
          <div className="ribbon ribbon-right" />

          {/* PHOTO */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="photo-card"
              initial={{
                opacity: 0,
                x: direction > 0 ? 70 : -70,
                rotate: direction > 0 ? 3 : -3,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -70 : 70,
                rotate: direction > 0 ? -3 : 3,
                scale: 0.96,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              onClick={nextMemory}
            >
              <div className="photo-box">

                <img
                  src={memories[currentIndex]}
                  alt={`Memory ${currentIndex + 1}`}
                  draggable="false"
                />

                <div className="photo-overlay" />

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

              <div className="caption">
                a little piece of us ♡
              </div>
            </motion.div>
          </AnimatePresence>

          {/* NEXT BUTTON */}
          <motion.button
            className="next-button"
            onClick={nextMemory}
            whileTap={{ scale: 0.88 }}
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              duration: 1.7,
              repeat: Infinity,
            }}
          >
            <ChevronRight size={20} />
          </motion.button>

          {/* ALBUM HEART */}
          <motion.div
            className="album-heart"
            animate={{
              scale: [1, 1.13, 1],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <Heart fill="currentColor" />
          </motion.div>
        </div>

        {/* TAP TEXT */}
        <motion.div
          className="tap-memory"
          animate={{
            y: [0, 4, 0],
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          tap for next memory ♡
        </motion.div>
      </section>

      {/* COUNTER */}
      <div className="counter">
        <span />
        <b>
          {currentIndex + 1} / {memories.length}
        </b>
        <span />
      </div>

      {/* LETTER */}
      <motion.div
        className="letter-button"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={onNext}
          text="A Letter For You"
          animateIcon={false}
          icon={<Mail size={20} />}
        />
      </motion.div>

      {/* ================= CSS ================= */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        .memories-page {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff1f7;
          color: #27364e;
          isolation: isolate;
        }

        /* BACKGROUND */

        .dream-background {
          position: fixed;
          inset: 0;
          z-index: -20;
          background:
            radial-gradient(
              circle at 50% 28%,
              #fffdfd 0%,
              #fff0f7 27%,
              #fbdcec 58%,
              #f5c5df 100%
            );
        }

        .pink-glow {
          position: fixed;
          border-radius: 50%;
          filter: blur(65px);
          pointer-events: none;
          z-index: -10;
        }

        .glow-a {
          width: 280px;
          height: 280px;
          left: -120px;
          top: 20%;
          background: rgba(255,120,190,.25);
        }

        .glow-b {
          width: 300px;
          height: 300px;
          right: -130px;
          top: 48%;
          background: rgba(255,160,210,.3);
        }

        .glow-c {
          width: 250px;
          height: 250px;
          left: 25%;
          bottom: -130px;
          background: rgba(255,110,185,.24);
        }

        /* PARTICLES */

        .particles {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          width: 4px;
          height: 4px;
          background: white;
          box-shadow:
            0 0 8px white,
            0 0 15px rgba(255,150,210,.7);
        }

        /* SPARKLES */

        .sparkles {
          position: fixed;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          color: rgba(255,255,255,.85);
          filter:
            drop-shadow(0 0 7px rgba(255,255,255,.8));
        }

        /* ==========================================
           REAL CSS BUTTERFLY
        ========================================== */

        .butterflies {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 8;
        }

        .real-butterfly {
          position: absolute;
          width: 48px;
          height: 44px;
          transform-origin: center;
          will-change: transform;
        }

        .butterfly-wing {
          position: absolute;
          width: 24px;
          height: 31px;
          top: 5px;
          background:
            radial-gradient(
              circle at 65% 35%,
              #fff 0 4%,
              transparent 5%
            ),
            linear-gradient(
              145deg,
              #ffb5d7,
              #ec65a8 48%,
              #a95fc4
            );
          border: 2px solid rgba(130,61,115,.65);
          box-shadow:
            inset 0 0 7px rgba(255,255,255,.65),
            0 3px 8px rgba(100,40,90,.15);
        }

        .wing-left {
          left: 1px;
          border-radius: 70% 30% 60% 40%;
          transform-origin: right bottom;
          animation: flap-left .38s ease-in-out infinite;
        }

        .wing-right {
          right: 1px;
          border-radius: 30% 70% 40% 60%;
          transform-origin: left bottom;
          animation: flap-right .38s ease-in-out infinite;
        }

        .butterfly-body {
          position: absolute;
          width: 6px;
          height: 34px;
          left: 21px;
          top: 5px;
          border-radius: 50%;
          background:
            linear-gradient(
              90deg,
              #40263d,
              #171525,
              #56324c
            );
          z-index: 5;
        }

        .antenna {
          position: absolute;
          width: 14px;
          height: 8px;
          top: 0;
          border-top: 1px solid #40263d;
          z-index: 6;
        }

        .antenna-left {
          left: 17px;
          transform: rotate(-28deg);
        }

        .antenna-right {
          left: 23px;
          transform: rotate(28deg);
        }

        @keyframes flap-left {
          0%, 100% {
            transform: rotateY(0deg) rotateZ(-4deg);
          }

          50% {
            transform: rotateY(58deg) rotateZ(5deg);
          }
        }

        @keyframes flap-right {
          0%, 100% {
            transform: rotateY(0deg) rotateZ(4deg);
          }

          50% {
            transform: rotateY(-58deg) rotateZ(-5deg);
          }
        }

        /* HEARTS */

        .floating-heart {
          position: fixed;
          z-index: 6;
          color: rgba(239,83,164,.42);
          pointer-events: none;
        }

        /* TITLE */

        .memory-header {
          position: relative;
          z-index: 20;
          text-align: center;
          margin-top: clamp(68px, 10vh, 100px);
          padding: 0 15px;
        }

        .title-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #ef3d98;
        }

        .title-row svg {
          width: 27px;
          height: 27px;
        }

        .title-row h1 {
          margin: 0;
          font-size: clamp(31px, 8vw, 48px);
          font-weight: 800;
          line-height: 1;
          color: #27374e;
          letter-spacing: -1.5px;
        }

        .memory-header p {
          margin: 16px 0 0;
          font-family: cursive;
          font-size: clamp(18px, 5vw, 27px);
          font-style: italic;
          color: #a965dc;
        }

        /* DOTS */

        .memory-dots {
          position: relative;
          z-index: 25;
          display: flex;
          gap: 11px;
          margin-top: 25px;
        }

        .memory-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #f4acd0;
        }

        .memory-dot.active {
          width: 14px;
          height: 14px;
          margin-top: -2px;
          background: #ed3e98;
          box-shadow: 0 0 13px rgba(237,62,152,.35);
        }

        /* ==========================================
           ALBUM
        ========================================== */

        .album-area {
          position: relative;
          width: min(94vw, 430px);
          height: 430px;
          margin-top: 17px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 20;
        }

        .back-card {
          position: absolute;
          width: 350px;
          height: 400px;
          border-radius: 27px;
          background: rgba(255,255,255,.88);
          border: 1px solid rgba(255,255,255,.95);
          box-shadow:
            0 25px 60px rgba(160,70,125,.13);
        }

        .back-card-one {
          transform: rotate(-5deg) translate(-8px, 3px);
          background:
            linear-gradient(
              145deg,
              #fff,
              #fff1f7
            );
        }

        .back-card-two {
          transform: rotate(5deg) translate(8px, 0);
          background:
            linear-gradient(
              145deg,
              #fff,
              #ffeaf4
            );
        }

        .album {
          position: relative;
          width: 350px;
          height: 400px;
          border-radius: 28px;
          padding: 20px;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.98),
              rgba(255,249,252,.97)
            );
          border: 1px solid white;
          box-shadow:
            0 30px 65px rgba(170,70,130,.2),
            inset 0 0 25px rgba(255,255,255,.8);
          z-index: 10;
        }

        .album::after {
          content: "";
          position: absolute;
          inset: -7px;
          border-radius: 32px;
          border: 1px solid rgba(247,145,200,.35);
          pointer-events: none;
        }

        /* TAPE */

        .album-tape {
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
          width: 88px;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #d84e91;
          font-size: 23px;
          background:
            repeating-linear-gradient(
              -45deg,
              #ffc2df 0 6px,
              #ffd3e8 6px 12px
            );
          box-shadow:
            0 5px 12px rgba(180,60,120,.13);
          z-index: 50;
        }

        /* RIBBON */

        .ribbon {
          position: absolute;
          width: 85px;
          height: 24px;
          top: 48%;
          opacity: .42;
          background:
            linear-gradient(
              90deg,
              transparent,
              #ef91bd,
              transparent
            );
          z-index: -1;
        }

        .ribbon-left {
          left: -65px;
          transform: rotate(-27deg);
        }

        .ribbon-right {
          right: -65px;
          transform: rotate(27deg);
        }

        /* PHOTO */

        .photo-card {
          position: absolute;

          /*
             IMPORTANT:
             এখানে আর translateX(-50%) নেই।
             Framer Motion-এর x animation-এর সাথে conflict হবে না।
          */

          left: 20px;
          top: 20px;

          width: 310px;
          height: 360px;

          padding: 10px 10px 43px;

          background: white;
          border-radius: 20px;

          border: 1px solid #f2dce7;

          box-shadow:
            0 18px 42px rgba(65,35,60,.18);

          cursor: pointer;
          z-index: 30;
        }

        .photo-box {
          position: relative;
          width: 100%;
          height: 295px;
          overflow: hidden;
          border-radius: 14px;
          background: #f7eaf0;
        }

        .photo-box img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          user-select: none;
          -webkit-user-drag: none;
        }

        .photo-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.18),
              transparent 40%,
              rgba(245,80,160,.08)
            );
        }

        .photo-heart {
          position: absolute;
          right: 12px;
          top: 12px;
          color: white;
          filter:
            drop-shadow(0 2px 6px rgba(0,0,0,.3));
        }

        .caption {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 11px;
          text-align: center;
          font-family: cursive;
          font-style: italic;
          font-size: 15px;
          color: #7f899c;
        }

        /* ARROW */

        .next-button {
          position: absolute;
          right: -18px;
          top: 50%;
          width: 48px;
          height: 48px;
          transform: translateY(-50%);
          border: none;
          border-radius: 50%;
          background: rgba(255,255,255,.95);
          color: #ed5ca7;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 8px 22px rgba(180,70,135,.2);
          z-index: 70;
          cursor: pointer;
        }

        /* HEART ON ALBUM */

        .album-heart {
          position: absolute;
          right: 25px;
          bottom: 13px;
          color: #f158a5;
          z-index: 80;
        }

        /* TAP */

        .tap-memory {
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          padding: 7px 23px;
          border-radius: 999px;
          white-space: nowrap;
          background: rgba(255,255,255,.8);
          color: #df88b5;
          font-size: 12px;
          border: 1px solid rgba(240,160,205,.35);
          z-index: 100;
        }

        /* COUNTER */

        .counter {
          position: relative;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 2px;
          margin-bottom: 17px;
        }

        .counter span {
          width: 43px;
          height: 2px;
          background: #eea2c8;
        }

        .counter b {
          color: #8d79a0;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: 4px;
        }

        /* LETTER */

        .letter-button {
          position: relative;
          z-index: 100;
          margin-bottom: 22px;
        }

        /* MOBILE */

        @media (max-width: 390px) {

          .memory-header {
            margin-top: 60px;
          }

          .title-row {
            gap: 7px;
          }

          .title-row h1 {
            font-size: 29px;
          }

          .title-row svg {
            width: 22px;
            height: 22px;
          }

          .album-area {
            height: 385px;
          }

          .album {
            width: 320px;
            height: 365px;
          }

          .back-card {
            width: 320px;
            height: 365px;
          }

          .photo-card {
            width: 280px;
            height: 325px;
          }

          .photo-box {
            height: 262px;
          }

          .next-button {
            right: -12px;
          }
        }

        @media (max-height: 760px) {

          .memory-header {
            margin-top: 55px;
          }

          .memory-dots {
            margin-top: 17px;
          }

          .album-area {
            height: 370px;
            margin-top: 8px;
          }

          .counter {
            margin-bottom: 9px;
          }
        }

      `}</style>
    </main>
  );
}
