"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Heart,
  Mail,
  Sparkles,
} from "lucide-react";
import Button from "../Button";

function LetterScreen({ onNext }) {
  const [isNight, setIsNight] = useState(false);
  const [shootingStar, setShootingStar] = useState(false);

  const shootingTimerRef = useRef(null);
  const shootingHideRef = useRef(null);
  const audioContextRef = useRef(null);

  /*
   * ---------------------------------------------------------
   * DAY / NIGHT
   * ---------------------------------------------------------
   */

  const toggleDayNight = useCallback(() => {
    setIsNight((prev) => !prev);
  }, []);

  /*
   * ---------------------------------------------------------
   * SHOOTING STAR
   * Randomly appears every 3-6 seconds at night.
   * Only one shooting star exists at a time, so it stays light.
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const scheduleShootingStar = () => {
      const delay =
        Math.floor(Math.random() * (6000 - 3000 + 1)) + 3000;

      shootingTimerRef.current = setTimeout(() => {
        setShootingStar(true);

        shootingHideRef.current = setTimeout(() => {
          setShootingStar(false);
          scheduleShootingStar();
        }, 950);
      }, delay);
    };

    if (isNight) {
      scheduleShootingStar();
    } else {
      clearTimeout(shootingTimerRef.current);
      clearTimeout(shootingHideRef.current);
      setShootingStar(false);
    }

    return () => {
      clearTimeout(shootingTimerRef.current);
      clearTimeout(shootingHideRef.current);
    };
  }, [isNight]);

  /*
   * ---------------------------------------------------------
   * SOFT PIGEON COO
   *
   * Browser audio normally requires user interaction.
   * The day/night button counts as interaction, so after using
   * the toggle the soft coo can play during pigeon flights.
   * ---------------------------------------------------------
   */

  const playPigeonCoo = useCallback(() => {
    try {
      const AudioContext =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContext) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      const ctx = audioContextRef.current;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.035, now + 0.04);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
      master.connect(ctx.destination);

      const oscillator = ctx.createOscillator();

      oscillator.type = "sine";

      oscillator.frequency.setValueAtTime(420, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        250,
        now + 0.25
      );

      oscillator.frequency.exponentialRampToValueAtTime(
        340,
        now + 0.42
      );

      oscillator.connect(master);

      oscillator.start(now);
      oscillator.stop(now + 0.56);
    } catch {
      // Audio is optional. Never allow it to break the UI.
    }
  }, []);

  /*
   * ---------------------------------------------------------
   * PIGEON FLIGHT LOOP
   *
   * We use CSS animation rather than continuously updating
   * React state. This is much lighter during day/night changes.
   * ---------------------------------------------------------
   */

  const pigeons = [
    {
      id: 1,
      className: "pigeon-one",
      scale: 0.72,
      delay: "0s",
      duration: "18s",
    },
    {
      id: 2,
      className: "pigeon-two",
      scale: 0.58,
      delay: "6s",
      duration: "22s",
    },
    {
      id: 3,
      className: "pigeon-three",
      scale: 0.48,
      delay: "11s",
      duration: "25s",
    },
  ];

  /*
   * ---------------------------------------------------------
   * STARS
   * Static stars = no React animation.
   * ---------------------------------------------------------
   */

  const stars = [
    [8, 13, 2],
    [16, 24, 1],
    [25, 11, 2],
    [33, 20, 1],
    [42, 9, 1.5],
    [50, 17, 2],
    [59, 10, 1],
    [67, 25, 1.5],
    [74, 13, 2],
    [82, 21, 1],
    [91, 11, 1.5],
    [13, 36, 1],
    [22, 42, 1.5],
    [31, 33, 1],
    [45, 39, 1.5],
    [57, 34, 1],
    [69, 43, 1.5],
    [79, 36, 1],
    [88, 42, 1.5],
    [95, 31, 1],
  ];

  return (
    <div className="relative w-screen min-h-screen overflow-hidden flex items-center justify-center">

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <div className="absolute inset-0 z-0">

        {/* DAY */}
        <div
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
            isNight ? "opacity-0" : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(180deg, #dff4ff 0%, #fdf6ff 48%, #ffeef6 100%)",
          }}
        >
          {/* soft sun */}
          <div
            className="absolute top-[9%] right-[12%] w-20 h-20 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,230,151,0.9) 0%, rgba(255,226,145,0.35) 42%, rgba(255,226,145,0) 72%)",
            }}
          />

          {/* clouds */}
          <div className="absolute top-[17%] left-[5%] w-32 h-8 rounded-full bg-white/35" />
          <div className="absolute top-[21%] right-[4%] w-40 h-9 rounded-full bg-white/30" />
          <div className="absolute top-[31%] left-[12%] w-20 h-6 rounded-full bg-white/25" />
        </div>

        {/* NIGHT */}
        <div
          className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out ${
            isNight ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, #071127 0%, #101b3d 48%, #241b46 100%)",
          }}
        >
          {/* subtle night glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(102,121,201,0.12), transparent 48%)",
            }}
          />

          {/* stars */}
          {stars.map(([left, top, size], index) => (
            <span
              key={index}
              className="absolute rounded-full bg-white night-star"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${(index % 6) * 0.45}s`,
              }}
            />
          ))}

          {/* moon */}
          <div
            className="absolute top-[8%] right-[11%] w-[70px] h-[70px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 32%, #fffef2 0%, #f4f0cf 55%, #d9d5b4 100%)",
              boxShadow:
                "0 0 35px rgba(255,255,220,0.25)",
            }}
          >
            <span className="absolute w-3 h-3 rounded-full bg-[#ded9ba]/40 top-5 left-4" />
            <span className="absolute w-2 h-2 rounded-full bg-[#ded9ba]/35 top-9 right-5" />
            <span className="absolute w-2 h-2 rounded-full bg-[#ded9ba]/30 bottom-4 left-7" />
          </div>

          {/* shooting star */}
          {shootingStar && (
            <div className="shooting-star">
              <span />
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          PIGEONS
          ===================================================== */}

      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">

        {pigeons.map((pigeon) => (
          <div
            key={pigeon.id}
            className={`absolute ${pigeon.className}`}
            style={{
              animationDuration: pigeon.duration,
              animationDelay: pigeon.delay,
            }}
          >
            <motion.div
              className="pigeon-wrapper"
              style={{
                scale: pigeon.scale,
              }}
              onAnimationStart={() => {
                if (pigeon.id === 1) {
                  playPigeonCoo();
                }
              }}
            >
              {/* PIGEON SVG */}
              <svg
                width="115"
                height="75"
                viewBox="0 0 115 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_4px_5px_rgba(30,30,60,0.14)]"
              >
                {/* tail */}
                <path
                  d="M21 45L4 36L15 49L3 56L28 54Z"
                  fill="#D6D9E2"
                />

                {/* body */}
                <ellipse
                  cx="55"
                  cy="43"
                  rx="31"
                  ry="17"
                  fill="#E8EAF0"
                />

                {/* neck */}
                <path
                  d="M67 34C65 25 71 16 80 14C91 12 98 18 97 27C96 36 88 42 78 42Z"
                  fill="#D9DCE5"
                />

                {/* head */}
                <circle
                  cx="86"
                  cy="20"
                  r="12"
                  fill="#E9EBF1"
                />

                {/* neck shade */}
                <path
                  d="M70 30C77 32 86 29 91 22C88 35 78 40 69 36Z"
                  fill="#C7CBD7"
                  opacity="0.8"
                />

                {/* beak */}
                <path
                  d="M97 20L108 23L98 26Z"
                  fill="#B9A58D"
                />

                {/* eye */}
                <circle
                  cx="90"
                  cy="18"
                  r="2.4"
                  fill="#202638"
                />

                {/* wing */}
                <path
                  d="M67 40C57 25 40 22 28 29C37 43 48 54 65 57C72 55 75 48 67 40Z"
                  fill="#BFC4D0"
                />

                {/* wing feather lines */}
                <path
                  d="M35 31C44 36 51 43 58 52"
                  stroke="#9EA5B5"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <path
                  d="M31 35C41 40 47 47 53 53"
                  stroke="#A5ABB9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <path
                  d="M42 28C51 35 58 42 64 48"
                  stroke="#A5ABB9"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />

                {/* feet */}
                <path
                  d="M49 56L47 65M60 56L61 65"
                  stroke="#A9907B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* legs */}
                <path
                  d="M45 65L41 67M47 65L51 67M61 65L57 67M61 65L65 67"
                  stroke="#A9907B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                {/* little collar */}
                <path
                  d="M74 29C78 33 84 34 89 31"
                  stroke="#B8B9C5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
        ))}
      </div>

      {/* =====================================================
          MAIN LETTER
          ===================================================== */}

      <div className="relative z-20 w-full max-w-[520px] px-5 py-10 flex flex-col items-center justify-center min-h-screen">

        {/* DAY / NIGHT BUTTON */}

        <motion.button
          type="button"
          onClick={toggleDayNight}
          whileTap={{ scale: 0.92 }}
          className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center border shadow-sm backdrop-blur-md transition-all duration-500"
          style={{
            background: isNight
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.58)",
            borderColor: isNight
              ? "rgba(255,255,255,0.18)"
              : "rgba(255,255,255,0.75)",
            color: isNight ? "#f8e7a8" : "#f0a928",
          }}
          aria-label="Toggle day and night"
        >
          {isNight ? (
            <Moon size={19} />
          ) : (
            <Sun size={20} />
          )}
        </motion.button>

        {/* TOP HEART */}

        <motion.div
          className="mb-4"
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border"
            style={{
              background: isNight
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.58)",
              borderColor: isNight
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,180,205,0.5)",
            }}
          >
            <Heart
              size={25}
              fill="currentColor"
              className={
                isNight
                  ? "text-pink-300"
                  : "text-pink-400"
              }
            />
          </div>
        </motion.div>

        {/* LETTER CARD */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.65,
            ease: "easeOut",
          }}
          className="relative w-full rounded-[30px] p-[1px]"
          style={{
            background: isNight
              ? "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))"
              : "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(255,190,215,0.45))",
            boxShadow: isNight
              ? "0 20px 60px rgba(0,0,0,0.28)"
              : "0 20px 60px rgba(191,80,130,0.13)",
          }}
        >
          <div
            className="relative rounded-[29px] px-6 py-7 md:px-9 md:py-9"
            style={{
              background: isNight
                ? "rgba(18,25,55,0.84)"
                : "rgba(255,250,252,0.91)",
            }}
          >

            {/* corner decoration */}
            <div className="absolute top-4 left-5 opacity-50">
              <Sparkles
                size={17}
                className={
                  isNight
                    ? "text-purple-300"
                    : "text-pink-300"
                }
              />
            </div>

            <div className="absolute top-4 right-5 opacity-50">
              <Heart
                size={15}
                fill="currentColor"
                className={
                  isNight
                    ? "text-pink-300"
                    : "text-pink-300"
                }
              />
            </div>

            {/* title */}

            <div className="flex flex-col items-center text-center mb-6">

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{
                  background: isNight
                    ? "rgba(236,72,153,0.13)"
                    : "rgba(236,72,153,0.09)",
                }}
              >
                <Mail
                  size={22}
                  className={
                    isNight
                      ? "text-pink-300"
                      : "text-pink-400"
                  }
                />
              </div>

              <h2
                className={`text-3xl md:text-4xl font-bold ${
                  isNight
                    ? "text-white"
                    : "text-slate-700"
                }`}
              >
                A Letter For You
              </h2>

              <div
                className={`mt-2 text-sm tracking-[0.18em] uppercase ${
                  isNight
                    ? "text-purple-300"
                    : "text-purple-400"
                }`}
              >
                from my heart ♡
              </div>
            </div>

            {/* divider */}

            <div className="flex items-center justify-center gap-3 mb-6">
              <span
                className={`w-12 h-px ${
                  isNight
                    ? "bg-purple-400/30"
                    : "bg-pink-200"
                }`}
              />

              <Heart
                size={12}
                fill="currentColor"
                className={
                  isNight
                    ? "text-pink-300"
                    : "text-pink-300"
                }
              />

              <span
                className={`w-12 h-px ${
                  isNight
                    ? "bg-purple-400/30"
                    : "bg-pink-200"
                }`}
              />
            </div>

            {/* LETTER */}

            <div
              className={`font-hand text-lg md:text-xl leading-[1.9] ${
                isNight
                  ? "text-slate-200"
                  : "text-slate-600"
              }`}
            >
              <p className="mb-5">
                My favorite person,
              </p>

              <p className="mb-5">
                Sometimes I wish I could pause time,
                just so I could stay a little longer in
                the moments when I feel closest to you.
              </p>

              <p className="mb-5">
                Until we meet again, I hope you remember
                that somewhere in this big world, there is
                someone thinking about you, smiling because
                of you, and waiting for the next beautiful
                moment we get to share.
              </p>

              <p className="mb-5">
                Distance may keep us apart for a while,
                but it can never change the little place
                you have in my heart.
              </p>

              <p>
                So until that day comes...
                <br />
                take care of yourself for me. ♡
              </p>
            </div>

            {/* signature */}

            <div className="mt-7 text-right">
              <div
                className={`font-hand text-2xl ${
                  isNight
                    ? "text-pink-300"
                    : "text-pink-400"
                }`}
              >
                Always yours,
              </div>

              <div
                className={`font-hand text-xl mt-1 ${
                  isNight
                    ? "text-purple-300"
                    : "text-purple-400"
                }`}
              >
                rafee ♡
              </div>
            </div>

          </div>
        </motion.div>

        {/* small bottom text */}

        <motion.div
          className={`mt-5 text-sm ${
            isNight
              ? "text-white/45"
              : "text-slate-400"
          }`}
          animate={{
            opacity: [0.45, 0.8, 0.45],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          no matter how far, still close to my heart ♡
        </motion.div>

        {/* NEXT BUTTON */}

        <motion.div
          className="mt-5"
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 0.5,
          }}
        >
          <Button
            onClick={onNext}
            text="One Last Thing"
            animateIcon={false}
            icon={<Heart size={18} />}
          />
        </motion.div>
      </div>

      {/* =====================================================
          LIGHTWEIGHT CSS ANIMATIONS
          ===================================================== */}

      <style jsx>{`
        .night-star {
          opacity: 0.35;
          animation: twinkle 3.2s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.8);
          }

          50% {
            opacity: 0.95;
            transform: scale(1.35);
          }
        }

        /*
         * Pigeon flight paths.
         * transform-only animation = much cheaper than repeatedly
         * changing React state.
         */

        .pigeon-one {
          left: -150px;
          top: 25%;
          animation-name: pigeonFlyOne;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pigeon-two {
          left: -160px;
          top: 47%;
          animation-name: pigeonFlyTwo;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pigeon-three {
          left: -140px;
          top: 67%;
          animation-name: pigeonFlyThree;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pigeon-wrapper {
          animation: pigeonFloat 1.15s ease-in-out infinite;
          transform-origin: center center;
        }

        @keyframes pigeonFlyOne {
          0% {
            transform: translate3d(-160px, 0, 0) rotate(4deg);
          }

          25% {
            transform: translate3d(28vw, -28px, 0) rotate(-2deg);
          }

          50% {
            transform: translate3d(56vw, 22px, 0) rotate(3deg);
          }

          75% {
            transform: translate3d(82vw, -25px, 0) rotate(-3deg);
          }

          100% {
            transform: translate3d(calc(100vw + 180px), 10px, 0)
              rotate(4deg);
          }
        }

        @keyframes pigeonFlyTwo {
          0% {
            transform: translate3d(-170px, 0, 0) rotate(2deg);
          }

          30% {
            transform: translate3d(30vw, 30px, 0) rotate(-4deg);
          }

          58% {
            transform: translate3d(61vw, -18px, 0) rotate(2deg);
          }

          100% {
            transform: translate3d(calc(100vw + 190px), 20px, 0)
              rotate(-2deg);
          }
        }

        @keyframes pigeonFlyThree {
          0% {
            transform: translate3d(-150px, 0, 0) rotate(5deg);
          }

          35% {
            transform: translate3d(32vw, -18px, 0) rotate(-2deg);
          }

          70% {
            transform: translate3d(70vw, 25px, 0) rotate(4deg);
          }

          100% {
            transform: translate3d(calc(100vw + 170px), -10px, 0)
              rotate(-3deg);
          }
        }

        /*
         * Wing/body movement.
         * The SVG itself remains lightweight.
         */

        @keyframes pigeonFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          25% {
            transform: translateY(-7px) rotate(-2deg);
          }

          50% {
            transform: translateY(2px) rotate(1deg);
          }

          75% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        /*
         * Shooting star
         */

        .shooting-star {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
          top: 18%;
          left: 72%;
          box-shadow:
            0 0 7px rgba(255, 255, 255, 0.95),
            0 0 16px rgba(184, 204, 255, 0.75);
          animation: shootingStarMove 0.9s ease-out forwards;
        }

        .shooting-star span {
          position: absolute;
          right: 2px;
          top: 2px;
          width: 95px;
          height: 2px;
          transform: rotate(145deg);
          transform-origin: right center;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0)
          );
          opacity: 0.85;
        }

        @keyframes shootingStarMove {
          0% {
            opacity: 0;
            transform: translate3d(0, 0, 0) scale(0.6);
          }

          15% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate3d(-190px, 145px, 0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .night-star,
          .pigeon-wrapper,
          .shooting-star {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default LetterScreen;
