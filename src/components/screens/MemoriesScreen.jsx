"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  const [isFlipping, setIsFlipping] = useState(false);

  const nextIndex =
    currentIndex === memories.length - 1
      ? 0
      : currentIndex + 1;

  const previousIndex =
    currentIndex === 0
      ? null
      : currentIndex - 1;

  /* ---------------- PAGE TURN ---------------- */

  const nextMemory = () => {
    if (isFlipping) return;

    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsFlipping(false);
    }, 850);
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

      {/* ==========================================
          REAL OPEN BOOK ALBUM
      ========================================== */}

      <section className="album-area">

        {/* BACK SCRAPBOOK CARDS */}
        <div className="back-card back-card-one" />
        <div className="back-card back-card-two" />

        {/* BOOK */}
        <div className="book-scene">

          <div className="book">

            {/* LEFT PAGE */}
            <div className="book-page book-left-page">

              {previousIndex !== null ? (
                <div className="page-inner">
                  <img
                    src={memories[previousIndex]}
                    alt={`Memory ${previousIndex + 1}`}
                    draggable="false"
                  />

                  <div className="page-shine" />

                  <div className="page-caption">
                    a little piece of us ♡
                  </div>
                </div>
              ) : (
                <div className="first-left-page">

                  <Heart
                    size={42}
                    fill="currentColor"
                  />

                  <span>our little</span>
                  <strong>memories</strong>

                  <small>
                    forever kept here ♡
                  </small>

                </div>
              )}

            </div>

            {/* NEXT PHOTO UNDER THE TURNING PAGE */}
            <div className="book-page book-right-page">

              <div className="page-inner">

                <img
                  src={memories[nextIndex]}
                  alt={`Memory ${nextIndex + 1}`}
                  draggable="false"
                />

                <div className="page-shine" />

                <div className="page-caption">
                  a little piece of us ♡
                </div>

              </div>

            </div>

            {/* TURNING PAGE */}
            <motion.div
              className={`turning-page ${
                isFlipping ? "turning" : ""
              }`}
              animate={{
                rotateY: isFlipping ? -180 : 0,
              }}
              transition={{
                duration: 0.85,
                ease: [0.645, 0.045, 0.355, 1],
              }}
              onClick={nextMemory}
            >

              {/* FRONT = CURRENT PHOTO */}
              <div className="turn-face turn-front">

                <div className="page-inner">

                  <img
                    src={memories[currentIndex]}
                    alt={`Memory ${currentIndex + 1}`}
                    draggable="false"
                  />

                  <div className="page-shine" />

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

                  <div className="page-caption">
                    a little piece of us ♡
                  </div>

                </div>

              </div>

              {/* BACK OF TURNING PAGE */}
              <div className="turn-face turn-back">

                <div className="paper-back">

                  <Heart
                    size={30}
                    fill="currentColor"
                  />

                  <span>♡</span>

                </div>

              </div>

            </motion.div>

            {/* CENTER SPINE */}
            <div className="book-spine" />

            {/* BOOK SHADOW */}
            <div className="book-bottom-shadow" />

          </div>

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

          {/* NEXT BUTTON */}
          <motion.button
            className="next-button"
            onClick={nextMemory}
            disabled={isFlipping}
            whileTap={{
              scale: 0.88,
            }}
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
          tap the page for next memory ♡
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
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
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

        /* ================= BACKGROUND ================= */

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

        /* ================= PARTICLES ================= */

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

        /* ================= SPARKLES ================= */

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
            drop-shadow(
              0 0 7px rgba(255,255,255,.8)
            );
        }

        /* ================= BUTTERFLIES ================= */

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
          animation:
            flap-left .38s ease-in-out infinite;
        }

        .wing-right {
          right: 1px;
          border-radius: 30% 70% 40% 60%;
          transform-origin: left bottom;
          animation:
            flap-right .38s ease-in-out infinite;
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
            transform:
              rotateY(0deg)
              rotateZ(-4deg);
          }

          50% {
            transform:
              rotateY(58deg)
              rotateZ(5deg);
          }
        }

        @keyframes flap-right {

          0%, 100% {
            transform:
              rotateY(0deg)
              rotateZ(4deg);
          }

          50% {
            transform:
              rotateY(-58deg)
              rotateZ(-5deg);
          }
        }

        /* ================= HEARTS ================= */

        .floating-heart {
          position: fixed;
          z-index: 6;
          color: rgba(239,83,164,.42);
          pointer-events: none;
        }

        /* ================= TITLE ================= */

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

        /* ================= DOTS ================= */

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

          box-shadow:
            0 0 13px rgba(237,62,152,.35);
        }

        /* ================= ALBUM AREA ================= */

        .album-area {
          position: relative;
          width: min(96vw, 470px);
          height: 430px;
          margin-top: 17px;

          display: flex;
          justify-content: center;
          align-items: center;

          z-index: 20;
        }

        /* BACK CARDS */

        .back-card {
          position: absolute;
          width: 350px;
          height: 400px;
          border-radius: 27px;

          background:
            rgba(255,255,255,.88);

          border:
            1px solid rgba(255,255,255,.95);

          box-shadow:
            0 25px 60px rgba(160,70,125,.13);
        }

        .back-card-one {
          transform:
            rotate(-5deg)
            translate(-8px, 3px);

          background:
            linear-gradient(
              145deg,
              #fff,
              #fff1f7
            );
        }

        .back-card-two {
          transform:
            rotate(5deg)
            translate(8px, 0);

          background:
            linear-gradient(
              145deg,
              #fff,
              #ffeaf4
            );
        }

        /* ================= BOOK SCENE ================= */

        .book-scene {
          position: relative;

          width: 390px;
          height: 350px;

          perspective: 1500px;
          perspective-origin: 50% 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          z-index: 20;
        }

        .book {
          position: relative;

          width: 360px;
          height: 330px;

          transform-style: preserve-3d;

          border-radius: 18px;

          background:
            linear-gradient(
              90deg,
              #f8e8ef 0%,
              #fff 3%,
              #fff 48%,
              #f8e8ef 50%,
              #fff 52%,
              #fff 97%,
              #f8e8ef 100%
            );

          box-shadow:
            0 30px 55px rgba(150,65,120,.2),
            0 8px 18px rgba(80,40,70,.12);

          overflow: visible;
        }

        /* BOOK PAGES */

        .book-page {
          position: absolute;

          top: 0;
          width: 50%;
          height: 100%;

          background: #fff;

          overflow: hidden;

          border-top:
            1px solid #f0dce6;

          border-bottom:
            1px solid #f0dce6;

          transform-style: preserve-3d;
        }

        .book-left-page {
          left: 0;

          border-left:
            1px solid #eed9e4;

          border-radius:
            18px 0 0 18px;

          box-shadow:
            inset -10px 0 18px rgba(130,70,105,.07);

          z-index: 5;
        }

        .book-right-page {
          right: 0;

          border-right:
            1px solid #eed9e4;

          border-radius:
            0 18px 18px 0;

          box-shadow:
            inset 10px 0 18px rgba(130,70,105,.07);

          z-index: 4;
        }

        /* PAGE CONTENT */

        .page-inner {
          position: relative;

          width: 100%;
          height: 100%;

          padding: 9px;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #fff8fb
            );
        }

        .page-inner img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;

          user-select: none;
          -webkit-user-drag: none;

          border-radius: 10px;
        }

        /* LEFT PAGE PHOTO */
        .book-left-page .page-inner img {
          object-position: center;
        }

        /* RIGHT PAGE PHOTO */
        .book-right-page .page-inner img {
          object-position: center;
        }

        .page-shine {
          position: absolute;
          inset: 9px;

          border-radius: 10px;

          pointer-events: none;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,.22),
              transparent 38%,
              rgba(245,80,160,.08)
            );
        }

        .page-caption {
          position: absolute;

          left: 8px;
          right: 8px;
          bottom: 15px;

          text-align: center;

          font-family: cursive;
          font-style: italic;

          font-size: 11px;

          color: rgba(255,255,255,.9);

          text-shadow:
            0 1px 5px rgba(0,0,0,.45);

          pointer-events: none;
        }

        /* FIRST LEFT PAGE */

        .first-left-page {
          width: 100%;
          height: 100%;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 7px;

          text-align: center;

          color: #e85c9e;

          background:
            radial-gradient(
              circle at 50% 40%,
              #fff,
              #fff2f8 75%
            );

          border-radius:
            18px 0 0 18px;
        }

        .first-left-page svg {
          margin-bottom: 10px;

          filter:
            drop-shadow(
              0 4px 10px
              rgba(230,70,145,.2)
            );
        }

        .first-left-page span {
          font-family: cursive;
          font-size: 15px;
          color: #a77a9c;
        }

        .first-left-page strong {
          font-family: cursive;
          font-size: 24px;
          color: #e24e96;
        }

        .first-left-page small {
          margin-top: 8px;

          font-family: cursive;
          font-size: 11px;

          color: #b493aa;
        }

        /* ================= TURNING PAGE ================= */

        .turning-page {
          position: absolute;

          left: 50%;
          top: 0;

          width: 50%;
          height: 100%;

          transform-origin:
            left center;

          transform-style:
            preserve-3d;

          z-index: 50;

          cursor: pointer;

          will-change: transform;

          touch-action: manipulation;
        }

        .turn-face {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          overflow: hidden;

          background: #fff;

          backface-visibility:
            hidden;

          -webkit-backface-visibility:
            hidden;

          transform-style:
            preserve-3d;
        }

        /* FRONT PAGE */

        .turn-front {
          border-top:
            1px solid #eedce5;

          border-bottom:
            1px solid #eedce5;

          border-right:
            1px solid #eedce5;

          border-radius:
            0 18px 18px 0;

          box-shadow:
            -8px 0 18px
            rgba(100,40,80,.08),

            8px 10px 30px
            rgba(100,40,80,.13);
        }

        /* BACK OF PAGE */

        .turn-back {
          transform:
            rotateY(180deg);

          border-top:
            1px solid #ead6e1;

          border-bottom:
            1px solid #ead6e1;

          border-left:
            1px solid #ead6e1;

          border-radius:
            18px 0 0 18px;

          box-shadow:
            inset -12px 0 20px
            rgba(120,60,100,.08);
        }

        .paper-back {
          width: 100%;
          height: 100%;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-direction: column;

          gap: 8px;

          color: #ed6aa9;

          background:
            linear-gradient(
              145deg,
              #fff,
              #fff0f7
            );

          font-family: cursive;
        }

        .paper-back span {
          font-size: 18px;
          opacity: .5;
        }

        /* SPINE */

        .book-spine {
          position: absolute;

          left: 50%;
          top: 0;

          width: 4px;
          height: 100%;

          transform:
            translateX(-50%)
            translateZ(3px);

          background:
            linear-gradient(
              90deg,
              rgba(180,100,140,.08),
              rgba(130,60,110,.22),
              rgba(255,255,255,.5)
            );

          box-shadow:
            0 0 8px
            rgba(110,50,90,.12);

          z-index: 65;

          pointer-events: none;
        }

        /* BOOK BOTTOM SHADOW */

        .book-bottom-shadow {
          position: absolute;

          left: 7%;
          right: 7%;
          bottom: -13px;

          height: 20px;

          border-radius: 50%;

          background:
            rgba(120,50,100,.16);

          filter: blur(10px);

          z-index: -5;
        }

        /* PHOTO HEART */

        .photo-heart {
          position: absolute;

          right: 14px;
          top: 14px;

          color: white;

          z-index: 10;

          filter:
            drop-shadow(
              0 2px 6px
              rgba(0,0,0,.3)
            );
        }

        /* ================= TAPE ================= */

        .album-tape {
          position: absolute;

          top: 7px;
          left: 50%;

          transform:
            translateX(-50%);

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
            0 5px 12px
            rgba(180,60,120,.13);

          z-index: 100;

          pointer-events: none;
        }

        /* ================= RIBBON ================= */

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

          z-index: 2;
        }

        .ribbon-left {
          left: -65px;
          transform: rotate(-27deg);
        }

        .ribbon-right {
          right: -65px;
          transform: rotate(27deg);
        }

        /* ================= NEXT BUTTON ================= */

        .next-button {
          position: absolute;

          right: -17px;
          top: 50%;

          width: 48px;
          height: 48px;

          transform:
            translateY(-50%);

          border: none;
          border-radius: 50%;

          background:
            rgba(255,255,255,.97);

          color: #ed5ca7;

          display: flex;

          align-items: center;
          justify-content: center;

          box-shadow:
            0 8px 22px
            rgba(180,70,135,.2);

          z-index: 120;

          cursor: pointer;
        }

        .next-button:disabled {
          cursor: default;
        }

        /* ================= ALBUM HEART ================= */

        .album-heart {
          position: absolute;

          right: 21px;
          bottom: 13px;

          color: #f158a5;

          z-index: 110;

          pointer-events: none;
        }

        /* ================= TAP ================= */

        .tap-memory {
          position: absolute;

          bottom: -2px;
          left: 50%;

          transform:
            translateX(-50%);

          padding: 7px 23px;

          border-radius: 999px;

          white-space: nowrap;

          background:
            rgba(255,255,255,.8);

          color: #df88b5;

          font-size: 12px;

          border:
            1px solid
            rgba(240,160,205,.35);

          z-index: 100;
        }

        /* ================= COUNTER ================= */

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

        /* ================= LETTER ================= */

        .letter-button {
          position: relative;

          z-index: 100;

          margin-bottom: 22px;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 430px) {

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
            width: 100vw;
            height: 385px;
          }

          .book-scene {
            width: 350px;
            height: 320px;
          }

          .book {
            width: 330px;
            height: 310px;
          }

          .next-button {
            right: -10px;
          }

          .back-card {
            width: 320px;
            height: 365px;
          }

          .album-tape {
            top: 6px;
          }
        }

        @media (max-width: 360px) {

          .book-scene {
            width: 320px;
            height: 300px;
          }

          .book {
            width: 300px;
            height: 290px;
          }

          .next-button {
            right: -8px;

            width: 44px;
            height: 44px;
          }

          .tap-memory {
            font-size: 11px;
            padding:
              6px 16px;
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

        /* ================= REDUCED MOTION ================= */

        @media (prefers-reduced-motion: reduce) {

          .turning-page {
            transition: none !important;
          }

          .butterfly-wing {
            animation: none !important;
          }
        }

      `}</style>
    </main>
  );
}
