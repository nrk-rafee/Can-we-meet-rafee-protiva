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

/* =====================================================
   BUTTERFLIES
   Things We'll Do section-এর মতো illustrated butterfly
===================================================== */

const butterflies = [
  {
    top: "25%",
    startX: "-12vw",
    endX: "112vw",
    duration: 19,
    delay: 0,
    size: 0.82,
  },
  {
    top: "48%",
    startX: "112vw",
    endX: "-12vw",
    duration: 23,
    delay: 5,
    size: 0.62,
  },
  {
    top: "68%",
    startX: "-12vw",
    endX: "112vw",
    duration: 21,
    delay: 10,
    size: 0.72,
  },
  {
    top: "82%",
    startX: "112vw",
    endX: "-12vw",
    duration: 25,
    delay: 14,
    size: 0.55,
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

function FlyingButterfly({ data, index }) {
  return (
    <motion.div
      className="flying-butterfly"
      style={{
        top: data.top,
        scale: data.size,
      }}
      initial={{
        x: data.startX,
        y: 0,
        rotate: 0,
      }}
      animate={{
        x: [
          data.startX,
          index % 2 === 0 ? "22vw" : "78vw",
          index % 2 === 0 ? "72vw" : "30vw",
          data.endX,
        ],
        y: [
          0,
          -35,
          28,
          -18,
          0,
        ],
        rotate: [
          0,
          index % 2 === 0 ? 7 : -7,
          index % 2 === 0 ? -5 : 5,
          index % 2 === 0 ? 6 : -6,
          0,
        ],
      }}
      transition={{
        duration: data.duration,
        delay: data.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <img
        src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f98b.svg"
        alt=""
        draggable="false"
      />
    </motion.div>
  );
}

export default function MemoriesScreen({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTurning, setIsTurning] = useState(false);

  const nextIndex =
    currentIndex === memories.length - 1
      ? 0
      : currentIndex + 1;

  /* =====================================================
     PAGE TURN
  ===================================================== */

  const nextMemory = () => {
    if (isTurning) return;

    setIsTurning(true);

    /*
      Animation শেষ হওয়ার সাথে সাথে
      নতুন complete spread set হবে।
    */
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsTurning(false);
    }, 900);
  };

  return (
    <main className="memories-page">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="dream-background" />

      <div className="pink-glow glow-a" />
      <div className="pink-glow glow-b" />
      <div className="pink-glow glow-c" />

      {/* =================================================
          LIGHT PARTICLES
      ================================================= */}

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

      {/* =================================================
          SPARKLES
      ================================================= */}

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

      {/* =================================================
          FLYING BUTTERFLIES
      ================================================= */}

      <div className="butterflies">
        {butterflies.map((item, index) => (
          <FlyingButterfly
            key={index}
            data={item}
            index={index}
          />
        ))}
      </div>

      {/* =================================================
          FLOATING HEARTS
      ================================================= */}

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
          style={{
            left,
            top,
          }}
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
          <Heart
            size={size}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* =================================================
          TITLE
      ================================================= */}

      <motion.header
        className="memory-header"
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div className="title-row">
          <Camera />
          <h1>Our Memories</h1>
          <Camera />
        </div>

        <p>
          Little moments, forever ours ♡
        </p>
      </motion.header>

      {/* =================================================
          DOTS
      ================================================= */}

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

      {/* =================================================
          BOOK AREA
      ================================================= */}

      <section className="album-area">

        {/* Decorative cards behind the book */}
        <div className="back-card back-card-one" />
        <div className="back-card back-card-two" />

        <div className="book-scene">

          {/* =================================================
              BOOK
          ================================================= */}

          <div
            className="memory-book"
            onClick={nextMemory}
          >

            {/* =================================================
                NEXT COMPLETE PHOTO
                এটা পুরো 2-page spread-এর নিচে থাকবে
            ================================================= */}

            <div className="next-spread">
              <img
                src={memories[nextIndex]}
                alt={`Memory ${nextIndex + 1}`}
                draggable="false"
              />

              <div className="spread-light" />
            </div>

            {/* =================================================
                CURRENT LEFT PAGE
                Current photo-এর left half
            ================================================= */}

            <div className="current-left-page">

              <img
                src={memories[currentIndex]}
                alt={`Memory ${currentIndex + 1}`}
                draggable="false"
              />

              <div className="spread-light" />

            </div>

            {/* =================================================
                CURRENT RIGHT PAGE
                এটিই আসল turning page
            ================================================= */}

            <motion.div
              className="turning-page"
              animate={{
                rotateY: isTurning ? -180 : 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.645, 0.045, 0.355, 1],
              }}
            >

              {/* FRONT = current image-এর right half */}
              <div className="turn-front">

                <img
                  src={memories[currentIndex]}
                  alt={`Memory ${currentIndex + 1}`}
                  draggable="false"
                />

                <div className="page-gloss" />

                <div className="page-heart">
                  <Heart
                    size={22}
                    fill="white"
                  />
                </div>

              </div>

              {/* BACK OF TURNING PAGE */}
              <div className="turn-back">

                <div className="back-paper">

                  <Heart
                    size={32}
                    fill="currentColor"
                  />

                  <span>
                    ♡
                  </span>

                </div>

              </div>

            </motion.div>

            {/* =================================================
                CENTER SPINE
            ================================================= */}

            <div className="book-spine" />

            {/* =================================================
                PAGE EDGE / THICKNESS
            ================================================= */}

            <div className="page-edge" />

          </div>

          {/* =================================================
              TAPE
          ================================================= */}

          <motion.div
            className="album-tape"
            animate={{
              rotate: [-4, -1, -4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            ♡
          </motion.div>

          {/* =================================================
              RIBBONS
          ================================================= */}

          <div className="ribbon ribbon-left" />
          <div className="ribbon ribbon-right" />

          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          <motion.button
            className="next-button"
            onClick={(e) => {
              e.stopPropagation();
              nextMemory();
            }}
            disabled={isTurning}
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
            <ChevronRight size={21} />
          </motion.button>

          {/* =================================================
              HEART
          ================================================= */}

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

        {/* =================================================
            TAP TEXT
        ================================================= */}

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
          tap the page to turn ♡
        </motion.div>

      </section>

      {/* =================================================
          COUNTER
      ================================================= */}

      <div className="counter">
        <span />

        <b>
          {currentIndex + 1} / {memories.length}
        </b>

        <span />
      </div>

      {/* =================================================
          LETTER
      ================================================= */}

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

      {/* =================================================
          CSS
      ================================================= */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        /* =================================================
           MAIN
        ================================================= */

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

        /* =================================================
           BACKGROUND
        ================================================= */

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

          background:
            rgba(255,120,190,.25);
        }

        .glow-b {
          width: 300px;
          height: 300px;

          right: -130px;
          top: 48%;

          background:
            rgba(255,160,210,.3);
        }

        .glow-c {
          width: 250px;
          height: 250px;

          left: 25%;
          bottom: -130px;

          background:
            rgba(255,110,185,.24);
        }

        /* =================================================
           PARTICLES
        ================================================= */

        .particles {
          position: fixed;
          inset: 0;

          z-index: 2;

          pointer-events: none;
        }

        .particle {
          position: absolute;

          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: white;

          box-shadow:
            0 0 8px white,
            0 0 15px rgba(255,150,210,.7);
        }

        /* =================================================
           SPARKLES
        ================================================= */

        .sparkles {
          position: fixed;
          inset: 0;

          z-index: 3;

          pointer-events: none;
        }

        .sparkle {
          position: absolute;

          color:
            rgba(255,255,255,.85);

          filter:
            drop-shadow(
              0 0 7px
              rgba(255,255,255,.8)
            );
        }

        /* =================================================
           BUTTERFLIES
        ================================================= */

        .butterflies {
          position: fixed;

          inset: 0;

          overflow: hidden;

          pointer-events: none;

          z-index: 8;
        }

        .flying-butterfly {
          position: absolute;

          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          will-change: transform;

          filter:
            drop-shadow(
              0 4px 7px
              rgba(80,40,60,.18)
            );
        }

        .flying-butterfly img {
          width: 46px;
          height: 46px;

          display: block;

          user-select: none;

          -webkit-user-drag: none;
        }

        /* =================================================
           FLOATING HEARTS
        ================================================= */

        .floating-heart {
          position: fixed;

          z-index: 6;

          color:
            rgba(239,83,164,.42);

          pointer-events: none;
        }

        /* =================================================
           HEADER
        ================================================= */

        .memory-header {
          position: relative;

          z-index: 20;

          text-align: center;

          margin-top:
            clamp(68px, 10vh, 100px);

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

          font-size:
            clamp(31px, 8vw, 48px);

          font-weight: 800;

          line-height: 1;

          color: #27374e;

          letter-spacing: -1.5px;
        }

        .memory-header p {
          margin: 16px 0 0;

          font-family: cursive;

          font-size:
            clamp(18px, 5vw, 27px);

          font-style: italic;

          color: #a965dc;
        }

        /* =================================================
           DOTS
        ================================================= */

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

          transition:
            .25s ease;
        }

        .memory-dot.active {
          width: 14px;
          height: 14px;

          margin-top: -2px;

          background: #ed3e98;

          box-shadow:
            0 0 13px
            rgba(237,62,152,.35);
        }

        /* =================================================
           ALBUM AREA
        ================================================= */

        .album-area {
          position: relative;

          width:
            min(96vw, 470px);

          height: 430px;

          margin-top: 17px;

          display: flex;

          justify-content: center;
          align-items: center;

          z-index: 20;
        }

        /* =================================================
           BACK CARDS
        ================================================= */

        .back-card {
          position: absolute;

          width: 350px;
          height: 400px;

          border-radius: 27px;

          background:
            rgba(255,255,255,.88);

          border:
            1px solid
            rgba(255,255,255,.95);

          box-shadow:
            0 25px 60px
            rgba(160,70,125,.13);
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

        /* =================================================
           BOOK SCENE
        ================================================= */

        .book-scene {
          position: relative;

          width: 390px;
          height: 350px;

          display: flex;

          align-items: center;
          justify-content: center;

          perspective: 1800px;

          perspective-origin:
            50% 50%;

          z-index: 20;
        }

        /* =================================================
           BOOK
        ================================================= */

        .memory-book {
          position: relative;

          width: 360px;
          height: 330px;

          transform-style:
            preserve-3d;

          cursor: pointer;

          border-radius: 18px;

          box-shadow:
            0 30px 65px
            rgba(150,65,120,.24),

            0 8px 18px
            rgba(70,35,65,.12);

          background:
            #fff;

          isolation: isolate;
        }

        /* =================================================
           NEXT COMPLETE SPREAD
        ================================================= */

        .next-spread {
          position: absolute;

          inset: 0;

          overflow: hidden;

          border-radius: 18px;

          background: #fff;

          z-index: 1;
        }

        .next-spread img {
          position: absolute;

          inset: 0;

          width: 100%;
          height: 100%;

          object-fit: cover;

          object-position: center;

          display: block;

          user-select: none;

          -webkit-user-drag: none;
        }

        /* =================================================
           CURRENT LEFT PAGE
           শুধু left half থাকবে
        ================================================= */

        .current-left-page {
          position: absolute;

          left: 0;
          top: 0;

          width: 50%;
          height: 100%;

          overflow: hidden;

          border-radius:
            18px 0 0 18px;

          z-index: 10;

          background: #fff;

          box-shadow:
            inset -12px 0 22px
            rgba(70,30,60,.08);
        }

        .current-left-page img {
          position: absolute;

          top: 0;
          left: 0;

          width: 200%;
          height: 100%;

          max-width: none;

          object-fit: cover;

          object-position: left center;

          display: block;

          user-select: none;

          -webkit-user-drag: none;
        }

        /* =================================================
           TURNING PAGE
        ================================================= */

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

          z-index: 30;

          will-change:
            transform;

          cursor: pointer;
        }

        /* =================================================
           FRONT OF TURNING PAGE
        ================================================= */

        .turn-front {
          position: absolute;

          inset: 0;

          overflow: hidden;

          border-radius:
            0 18px 18px 0;

          border-top:
            1px solid
            rgba(255,255,255,.8);

          border-right:
            1px solid
            rgba(220,190,205,.55);

          border-bottom:
            1px solid
            rgba(220,190,205,.55);

          background: #fff;

          backface-visibility:
            hidden;

          -webkit-backface-visibility:
            hidden;

          transform-style:
            preserve-3d;

          box-shadow:
            -8px 0 18px
            rgba(70,30,60,.07),

            12px 10px 30px
            rgba(80,30,70,.14);
        }

        /*
          Important:
          Image width 200% কারণ page হলো book-এর
          অর্ধেক, কিন্তু image পুরো spread-এর।
        */

        .turn-front img {
          position: absolute;

          top: 0;
          right: 0;

          width: 200%;
          height: 100%;

          max-width: none;

          object-fit: cover;

          object-position: right center;

          display: block;

          user-select: none;

          -webkit-user-drag: none;
        }

        /* =================================================
           PAGE GLOSS
        ================================================= */

        .page-gloss {
          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              105deg,
              rgba(255,255,255,.22),
              transparent 25%,
              transparent 72%,
              rgba(255,255,255,.14)
            );

          z-index: 3;
        }

        /* =================================================
           HEART ON PHOTO
        ================================================= */

        .page-heart {
          position: absolute;

          right: 13px;
          top: 13px;

          color: white;

          z-index: 5;

          filter:
            drop-shadow(
              0 2px 6px
              rgba(0,0,0,.35)
            );
        }

        /* =================================================
           BACK OF PAGE
        ================================================= */

        .turn-back {
          position: absolute;

          inset: 0;

          overflow: hidden;

          border-radius:
            18px 0 0 18px;

          background:
            linear-gradient(
              145deg,
              #fff,
              #fff0f7
            );

          backface-visibility:
            hidden;

          -webkit-backface-visibility:
            hidden;

          transform:
            rotateY(180deg);

          transform-style:
            preserve-3d;

          box-shadow:
            inset -12px 0 20px
            rgba(100,40,80,.08);
        }

        .back-paper {
          width: 100%;
          height: 100%;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-direction: column;

          gap: 7px;

          color: #ed69aa;

          font-family: cursive;
        }

        .back-paper span {
          opacity: .55;

          font-size: 18px;
        }

        /* =================================================
           BOOK SPINE
        ================================================= */

        .book-spine {
          position: absolute;

          left: 50%;
          top: 0;

          width: 4px;
          height: 100%;

          transform:
            translateX(-50%)
            translateZ(5px);

          background:
            linear-gradient(
              90deg,
              rgba(130,70,105,.05),
              rgba(100,45,85,.25),
              rgba(255,255,255,.6)
            );

          box-shadow:
            0 0 9px
            rgba(80,40,70,.16);

          z-index: 50;

          pointer-events: none;
        }

        /* =================================================
           PAGE EDGE
        ================================================= */

        .page-edge {
          position: absolute;

          right: -4px;
          top: 7px;

          width: 5px;
          height: calc(100% - 14px);

          border-radius:
            0 8px 8px 0;

          background:
            repeating-linear-gradient(
              to bottom,
              #f6e6ed 0 5px,
              #fff 5px 8px
            );

          opacity: .8;

          z-index: 55;

          pointer-events: none;
        }

        /* =================================================
           BOOK BOTTOM SHADOW
        ================================================= */

        .memory-book::after {
          content: "";

          position: absolute;

          left: 7%;
          right: 7%;

          bottom: -15px;

          height: 20px;

          border-radius: 50%;

          background:
            rgba(110,45,90,.18);

          filter: blur(10px);

          z-index: -5;
        }

        /* =================================================
           TAPE
        ================================================= */

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

        /* =================================================
           RIBBONS
        ================================================= */

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

          pointer-events: none;
        }

        .ribbon-left {
          left: -65px;

          transform:
            rotate(-27deg);
        }

        .ribbon-right {
          right: -65px;

          transform:
            rotate(27deg);
        }

        /* =================================================
           NEXT BUTTON
        ================================================= */

        .next-button {
          position: absolute;

          right: -18px;
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

          opacity: .8;
        }

        /* =================================================
           ALBUM HEART
        ================================================= */

        .album-heart {
          position: absolute;

          right: 22px;
          bottom: 12px;

          color: #f158a5;

          z-index: 110;

          pointer-events: none;
        }

        /* =================================================
           TAP TEXT
        ================================================= */

        .tap-memory {
          position: absolute;

          bottom: -2px;
          left: 50%;

          transform:
            translateX(-50%);

          padding:
            7px 23px;

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

        /* =================================================
           COUNTER
        ================================================= */

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

        /* =================================================
           LETTER
        ================================================= */

        .letter-button {
          position: relative;

          z-index: 100;

          margin-bottom: 22px;
        }

        /* =================================================
           MOBILE
        ================================================= */

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

          .memory-book {
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

          .flying-butterfly {
            width: 43px;
            height: 43px;
          }

          .flying-butterfly img {
            width: 42px;
            height: 42px;
          }
        }

        /* =================================================
           SMALL PHONES
        ================================================= */

        @media (max-width: 360px) {

          .book-scene {
            width: 320px;
            height: 300px;
          }

          .memory-book {
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

        /* =================================================
           SHORT HEIGHT
        ================================================= */

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
