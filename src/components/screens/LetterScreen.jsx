"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Sun,
  Moon,
  Heart,
  Mail,
  Sparkles,
  LockKeyhole,
  Feather,
} from "lucide-react";
import Button from "../Button";

function LetterScreen({ onNext }) {
  const [isNight, setIsNight] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [soundUnlocked, setSoundUnlocked] = useState(false);
  const [shootingStar, setShootingStar] = useState(false);

  const audioContextRef = useRef(null);
  const shootingTimerRef = useRef(null);
  const shootingHideRef = useRef(null);
  const pigeonSoundTimerRef = useRef(null);

  /*
   * =========================================================
   * DAY / NIGHT
   * =========================================================
   */

  const toggleDayNight = useCallback(() => {
    setIsNight((prev) => !prev);
  }, []);

  /*
   * =========================================================
   * PIGEON SOUND
   *
   * Soft layered "coo" using Web Audio.
   * Audio is unlocked by the envelope click / user interaction.
   * =========================================================
   */

  const unlockAudio = useCallback(() => {
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

      setSoundUnlocked(true);
    } catch {
      // Audio is optional.
    }
  }, []);

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

      /*
       * Main coo
       */
      const master = ctx.createGain();

      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(
        0.055,
        now + 0.08
      );
      master.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.95
      );

      master.connect(ctx.destination);

      const osc1 = ctx.createOscillator();

      osc1.type = "sine";

      osc1.frequency.setValueAtTime(390, now);
      osc1.frequency.exponentialRampToValueAtTime(
        275,
        now + 0.34
      );
      osc1.frequency.exponentialRampToValueAtTime(
        315,
        now + 0.62
      );
      osc1.frequency.exponentialRampToValueAtTime(
        235,
        now + 0.88
      );

      osc1.connect(master);

      osc1.start(now);
      osc1.stop(now + 0.95);

      /*
       * Second softer harmonic.
       * This makes it feel less like a plain oscillator beep.
       */
      const harmonicGain = ctx.createGain();

      harmonicGain.gain.setValueAtTime(0.0001, now);
      harmonicGain.gain.exponentialRampToValueAtTime(
        0.018,
        now + 0.12
      );
      harmonicGain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + 0.78
      );

      harmonicGain.connect(ctx.destination);

      const osc2 = ctx.createOscillator();

      osc2.type = "triangle";

      osc2.frequency.setValueAtTime(195, now);
      osc2.frequency.exponentialRampToValueAtTime(
        150,
        now + 0.35
      );
      osc2.frequency.exponentialRampToValueAtTime(
        175,
        now + 0.68
      );

      osc2.connect(harmonicGain);

      osc2.start(now);
      osc2.stop(now + 0.8);
    } catch {
      // Never allow audio to break the page.
    }
  }, []);

  /*
   * =========================================================
   * PIGEON SOUND LOOP
   *
   * Only during daytime.
   * Starts after the user has interacted with the page.
   * =========================================================
   */

  useEffect(() => {
    clearTimeout(pigeonSoundTimerRef.current);

    if (!soundUnlocked || isNight) {
      return;
    }

    const scheduleNextCoo = () => {
      const delay =
        Math.floor(Math.random() * 5000) + 7500;

      pigeonSoundTimerRef.current = setTimeout(() => {
        if (!isNight && soundUnlocked) {
          playPigeonCoo();
        }

        scheduleNextCoo();
      }, delay);
    };

    /*
     * Small first delay so the sound does not happen
     * immediately after the envelope opens.
     */
    pigeonSoundTimerRef.current = setTimeout(() => {
      if (!isNight && soundUnlocked) {
        playPigeonCoo();
      }

      scheduleNextCoo();
    }, 3500);

    return () => {
      clearTimeout(pigeonSoundTimerRef.current);
    };
  }, [
    soundUnlocked,
    isNight,
    playPigeonCoo,
  ]);

  /*
   * =========================================================
   * OPEN LETTER
   * =========================================================
   */

  const openLetter = useCallback(() => {
    unlockAudio();

    /*
     * A tiny soft sound when the envelope is opened.
     * The pigeon loop starts afterwards.
     */
    try {
      const ctx = audioContextRef.current;

      if (ctx) {
        const now = ctx.currentTime;

        const gain = ctx.createGain();

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(
          0.025,
          now + 0.035
        );
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + 0.42
        );

        gain.connect(ctx.destination);

        const osc = ctx.createOscillator();

        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(
          760,
          now + 0.18
        );

        osc.connect(gain);

        osc.start(now);
        osc.stop(now + 0.42);
      }
    } catch {
      // Optional.
    }

    setIsOpened(true);
  }, [unlockAudio]);

  /*
   * =========================================================
   * SHOOTING STAR
   * =========================================================
   */

  useEffect(() => {
    const scheduleShootingStar = () => {
      const delay =
        Math.floor(Math.random() * 3000) + 4000;

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
   * =========================================================
   * PIGEONS
   * =========================================================
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
   * =========================================================
   * STARS
   * =========================================================
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
          className={`absolute inset-0 transition-opacity duration-[900ms] ${
            isNight
              ? "opacity-0"
              : "opacity-100"
          }`}
          style={{
            background:
              "linear-gradient(180deg, #dff4ff 0%, #fdf7ff 47%, #ffeef6 100%)",
          }}
        >

          {/* Sun */}
          <motion.div
            className="absolute top-[8%] right-[10%] w-24 h-24 rounded-full"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 0.95, 0.7],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(255,228,145,0.95) 0%, rgba(255,226,145,0.35) 42%, rgba(255,226,145,0) 72%)",
            }}
          />

          {/* Clouds */}
          <div className="absolute top-[16%] left-[4%] w-36 h-9 rounded-full bg-white/40 blur-[1px]" />
          <div className="absolute top-[20%] right-[2%] w-44 h-10 rounded-full bg-white/35 blur-[1px]" />
          <div className="absolute top-[34%] left-[10%] w-24 h-7 rounded-full bg-white/25" />
          <div className="absolute top-[43%] right-[7%] w-28 h-7 rounded-full bg-white/20" />

          {/* soft light */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.32), transparent 48%)",
            }}
          />
        </div>

        {/* NIGHT */}
        <div
          className={`absolute inset-0 transition-opacity duration-[900ms] ${
            isNight
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(180deg, #071127 0%, #101b3d 48%, #241b46 100%)",
          }}
        >

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 35%, rgba(102,121,201,0.14), transparent 48%)",
            }}
          />

          {stars.map(
            ([left, top, size], index) => (
              <span
                key={index}
                className="absolute rounded-full bg-white night-star"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${
                    (index % 6) * 0.45
                  }s`,
                }}
              />
            )
          )}

          {/* Moon */}
          <div
            className="absolute top-[8%] right-[10%] w-[70px] h-[70px] rounded-full"
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
              animationDuration:
                pigeon.duration,
              animationDelay:
                pigeon.delay,
            }}
          >
            <motion.div
              className="pigeon-wrapper"
              style={{
                scale: pigeon.scale,
              }}
            >
              <svg
                width="115"
                height="75"
                viewBox="0 0 115 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_4px_5px_rgba(30,30,60,0.14)]"
              >
                <path
                  d="M21 45L4 36L15 49L3 56L28 54Z"
                  fill="#D6D9E2"
                />

                <ellipse
                  cx="55"
                  cy="43"
                  rx="31"
                  ry="17"
                  fill="#E8EAF0"
                />

                <path
                  d="M67 34C65 25 71 16 80 14C91 12 98 18 97 27C96 36 88 42 78 42Z"
                  fill="#D9DCE5"
                />

                <circle
                  cx="86"
                  cy="20"
                  r="12"
                  fill="#E9EBF1"
                />

                <path
                  d="M70 30C77 32 86 29 91 22C88 35 78 40 69 36Z"
                  fill="#C7CBD7"
                  opacity="0.8"
                />

                <path
                  d="M97 20L108 23L98 26Z"
                  fill="#B9A58D"
                />

                <circle
                  cx="90"
                  cy="18"
                  r="2.4"
                  fill="#202638"
                />

                <path
                  d="M67 40C57 25 40 22 28 29C37 43 48 54 65 57C72 55 75 48 67 40Z"
                  fill="#BFC4D0"
                />

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

                <path
                  d="M49 56L47 65M60 56L61 65"
                  stroke="#A9907B"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M45 65L41 67M47 65L51 67M61 65L57 67M61 65L65 67"
                  stroke="#A9907B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

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
          DAY / NIGHT BUTTON
          ===================================================== */}

      <motion.button
        type="button"
        onClick={toggleDayNight}
        whileTap={{
          scale: 0.9,
        }}
        className="absolute top-5 right-5 z-[80] w-11 h-11 rounded-full flex items-center justify-center border shadow-sm backdrop-blur-md"
        style={{
          background: isNight
            ? "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.58)",
          borderColor: isNight
            ? "rgba(255,255,255,0.18)"
            : "rgba(255,255,255,0.75)",
          color: isNight
            ? "#f8e7a8"
            : "#f0a928",
        }}
        aria-label="Toggle day and night"
      >
        {isNight ? (
          <Moon size={19} />
        ) : (
          <Sun size={20} />
        )}
      </motion.button>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="relative z-20 w-full min-h-screen px-5 flex flex-col items-center justify-center">

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
            className="w-14 h-14 rounded-full flex items-center justify-center border backdrop-blur-sm"
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

        {/* =====================================================
            ENVELOPE BEFORE OPEN
            ===================================================== */}

        <AnimatePresence mode="wait">

          {!isOpened && (
            <motion.div
              key="envelope"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -35,
                scale: 0.75,
                rotate: -3,
              }}
              transition={{
                duration: 0.55,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center"
            >

              <motion.button
                type="button"
                onClick={openLetter}
                whileHover={{
                  y: -7,
                  scale: 1.025,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="relative w-[300px] max-w-[82vw] h-[205px] rounded-[24px] outline-none"
                aria-label="Open your letter"
              >

                {/* Envelope shadow */}
                <div className="absolute inset-x-5 bottom-[-12px] h-7 rounded-full bg-pink-400/20 blur-xl" />

                {/* Envelope body */}
                <div
                  className="absolute inset-0 rounded-[24px] overflow-hidden border border-white/80"
                  style={{
                    background:
                      "linear-gradient(145deg, #fffdfd 0%, #fff1f7 100%)",
                    boxShadow:
                      "0 24px 55px rgba(179,91,133,0.20), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >

                  {/* Envelope flap */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[115px] origin-top"
                    animate={{
                      rotateX: [0, 3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 50% 72%)",
                      background:
                        "linear-gradient(135deg, #ffdbe9, #fff3f8)",
                      borderBottom:
                        "1px solid rgba(239,145,181,0.25)",
                    }}
                  />

                  {/* Letter peek */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[55px] w-[215px] h-[75px] rounded-t-xl"
                    style={{
                      background:
                        "linear-gradient(180deg, #fffefa, #fff8fb)",
                      boxShadow:
                        "0 -4px 12px rgba(220,130,160,0.10)",
                    }}
                  >
                    <div className="pt-4 text-[10px] tracking-[0.22em] uppercase text-purple-300">
                      A little letter
                    </div>
                    <div className="mt-1 text-sm font-hand text-slate-400">
                      just for you ♡
                    </div>
                  </div>

                  {/* Envelope front */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[112px]"
                    style={{
                      clipPath:
                        "polygon(0 0, 50% 48%, 100% 0, 100% 100%, 0 100%)",
                      background:
                        "linear-gradient(160deg, #fff0f6, #ffddea)",
                    }}
                  />

                  {/* Heart seal */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[5px] w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                    animate={{
                      scale: [1, 1.07, 1],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                    }}
                    style={{
                      background:
                        "linear-gradient(145deg, #f472b6, #ec4899)",
                    }}
                  >
                    <Heart
                      size={21}
                      fill="white"
                      className="text-white"
                    />
                  </motion.div>

                </div>
              </motion.button>

              <motion.div
                className="mt-6 text-center"
                animate={{
                  opacity: [0.65, 1, 0.65],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <div
                  className={`text-xl font-semibold ${
                    isNight
                      ? "text-white/85"
                      : "text-slate-700"
                  }`}
                >
                  A little letter for you
                </div>

                <div
                  className={`mt-2 text-sm ${
                    isNight
                      ? "text-purple-200/70"
                      : "text-purple-400"
                  }`}
                >
                  tap the envelope to open ♡
                </div>
              </motion.div>

              <motion.div
                className="mt-4 flex items-center gap-2 text-xs text-pink-300"
                animate={{
                  y: [0, 3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <LockKeyhole size={13} />
                <span>sealed with love</span>
              </motion.div>
            </motion.div>
          )}

          {/* ===================================================
              OPEN LETTER
              =================================================== */}

          {isOpened && (
            <motion.div
              key="letter"
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.82,
                rotateX: -12,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full max-w-[430px]"
            >

              {/* Letter card */}

              <div
                className="relative w-full rounded-[28px] p-[1px]"
                style={{
                  background: isNight
                    ? "linear-gradient(145deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))"
                    : "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,190,215,0.50))",
                  boxShadow: isNight
                    ? "0 25px 65px rgba(0,0,0,0.30)"
                    : "0 22px 55px rgba(191,80,130,0.17)",
                }}
              >

                <div
                  className="relative rounded-[27px] overflow-hidden"
                  style={{
                    background: isNight
                      ? "rgba(18,25,55,0.90)"
                      : "rgba(255,250,252,0.94)",
                  }}
                >

                  {/* Corner decorations */}

                  <div className="absolute top-4 left-5 opacity-60">
                    <Sparkles
                      size={17}
                      className={
                        isNight
                          ? "text-purple-300"
                          : "text-pink-300"
                      }
                    />
                  </div>

                  <motion.div
                    className="absolute top-4 right-5"
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    <Heart
                      size={15}
                      fill="currentColor"
                      className="text-pink-300"
                    />
                  </motion.div>

                  {/* Letter header */}

                  <div className="pt-6 px-6 md:px-8">

                    <div className="flex flex-col items-center text-center">

                      <motion.div
                        animate={{
                          rotate: [-3, 3, -3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                        className="w-11 h-11 rounded-2xl flex items-center justify-center mb-3"
                        style={{
                          background: isNight
                            ? "rgba(236,72,153,0.13)"
                            : "rgba(236,72,153,0.09)",
                        }}
                      >
                        <Mail
                          size={21}
                          className={
                            isNight
                              ? "text-pink-300"
                              : "text-pink-400"
                          }
                        />
                      </motion.div>

                      <h2
                        className={`text-[27px] md:text-4xl font-bold ${
                          isNight
                            ? "text-white"
                            : "text-slate-700"
                        }`}
                      >
                        A Letter For You
                      </h2>

                      <div
                        className={`mt-1.5 text-xs tracking-[0.20em] uppercase ${
                          isNight
                            ? "text-purple-300"
                            : "text-purple-400"
                        }`}
                      >
                        from my heart ♡
                      </div>

                    </div>

                    <div className="flex items-center justify-center gap-3 mt-4">
                      <span
                        className={`w-12 h-px ${
                          isNight
                            ? "bg-purple-400/30"
                            : "bg-pink-200"
                        }`}
                      />

                      <Heart
                        size={11}
                        fill="currentColor"
                        className="text-pink-300"
                      />

                      <span
                        className={`w-12 h-px ${
                          isNight
                            ? "bg-purple-400/30"
                            : "bg-pink-200"
                        }`}
                      />
                    </div>

                  </div>

                  {/* =================================================
                      SCROLLABLE LETTER BODY
                      ================================================= */}

                  <div
                    className={`mx-2 mt-4 px-5 md:px-7 pb-4 overflow-y-auto max-h-[34vh] md:max-h-[330px] ${
                      isNight
                        ? "letter-scroll-night"
                        : "letter-scroll"
                    }`}
                  >

                    <div
                      className={`font-hand text-[17px] md:text-xl leading-[1.8] ${
                        isNight
                          ? "text-slate-200"
                          : "text-slate-600"
                      }`}
                    >

                      <p className="mb-4">
                        My favorite person,
                      </p>

                      <p className="mb-4">
                        Sometimes I wish I could pause time,
                        just so I could stay a little longer in
                        the moments when I feel closest to you.
                      </p>

                      <p className="mb-4">
                        Until we meet again, I hope you remember
                        that somewhere in this big world, there is
                        someone thinking about you, smiling because
                        of you, and waiting for the next beautiful
                        moment we get to share.
                      </p>

                      <p className="mb-4">
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
                  </div>

                  {/* Signature */}

                  <div className="px-6 md:px-8 pt-1 pb-5 text-right">

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
                      className={`font-hand text-xl mt-0.5 ${
                        isNight
                          ? "text-purple-300"
                          : "text-purple-400"
                      }`}
                    >
                      rafee ♡
                    </div>

                  </div>

                </div>
              </div>

              {/* Small line below */}

              <motion.div
                className={`text-center mt-3 text-xs ${
                  isNight
                    ? "text-white/40"
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

              {/* Next */}

              <motion.div
                className="flex justify-center mt-4"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
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

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* =====================================================
          CSS
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

        /* ================================================
           PIGEON FLIGHT
           ================================================ */

        .pigeon-one {
          left: -150px;
          top: 24%;
          animation-name: pigeonFlyOne;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pigeon-two {
          left: -160px;
          top: 46%;
          animation-name: pigeonFlyTwo;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pigeon-three {
          left: -140px;
          top: 68%;
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
            transform:
              translate3d(-160px, 0, 0)
              rotate(4deg);
          }

          25% {
            transform:
              translate3d(28vw, -28px, 0)
              rotate(-2deg);
          }

          50% {
            transform:
              translate3d(56vw, 22px, 0)
              rotate(3deg);
          }

          75% {
            transform:
              translate3d(82vw, -25px, 0)
              rotate(-3deg);
          }

          100% {
            transform:
              translate3d(calc(100vw + 180px), 10px, 0)
              rotate(4deg);
          }
        }

        @keyframes pigeonFlyTwo {
          0% {
            transform:
              translate3d(-170px, 0, 0)
              rotate(2deg);
          }

          30% {
            transform:
              translate3d(30vw, 30px, 0)
              rotate(-4deg);
          }

          58% {
            transform:
              translate3d(61vw, -18px, 0)
              rotate(2deg);
          }

          100% {
            transform:
              translate3d(calc(100vw + 190px), 20px, 0)
              rotate(-2deg);
          }
        }

        @keyframes pigeonFlyThree {
          0% {
            transform:
              translate3d(-150px, 0, 0)
              rotate(5deg);
          }

          35% {
            transform:
              translate3d(32vw, -18px, 0)
              rotate(-2deg);
          }

          70% {
            transform:
              translate3d(70vw, 25px, 0)
              rotate(4deg);
          }

          100% {
            transform:
              translate3d(calc(100vw + 170px), -10px, 0)
              rotate(-3deg);
          }
        }

        @keyframes pigeonFloat {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(0deg);
          }

          25% {
            transform:
              translateY(-7px)
              rotate(-2deg);
          }

          50% {
            transform:
              translateY(2px)
              rotate(1deg);
          }

          75% {
            transform:
              translateY(-5px)
              rotate(-1deg);
          }
        }

        /* ================================================
           LETTER SCROLLBAR
           ================================================ */

        .letter-scroll {
          scrollbar-width: thin;
          scrollbar-color:
            rgba(244,114,182,0.35)
            transparent;
        }

        .letter-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .letter-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .letter-scroll::-webkit-scrollbar-thumb {
          background:
            rgba(244,114,182,0.35);
          border-radius: 999px;
        }

        .letter-scroll-night {
          scrollbar-width: thin;
          scrollbar-color:
            rgba(196,181,253,0.30)
            transparent;
        }

        .letter-scroll-night::-webkit-scrollbar {
          width: 4px;
        }

        .letter-scroll-night::-webkit-scrollbar-track {
          background: transparent;
        }

        .letter-scroll-night::-webkit-scrollbar-thumb {
          background:
            rgba(196,181,253,0.30);
          border-radius: 999px;
        }

        /* ================================================
           SHOOTING STAR
           ================================================ */

        .shooting-star {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: white;
          top: 18%;
          left: 72%;
          box-shadow:
            0 0 7px rgba(255,255,255,0.95),
            0 0 16px rgba(184,204,255,0.75);
          animation:
            shootingStarMove
            0.9s
            ease-out
            forwards;
        }

        .shooting-star span {
          position: absolute;
          right: 2px;
          top: 2px;
          width: 95px;
          height: 2px;
          transform:
            rotate(145deg);
          transform-origin:
            right center;
          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,0),
              rgba(255,255,255,0.8),
              rgba(255,255,255,0)
            );
          opacity: 0.85;
        }

        @keyframes shootingStarMove {
          0% {
            opacity: 0;
            transform:
              translate3d(0,0,0)
              scale(0.6);
          }

          15% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform:
              translate3d(-190px,145px,0)
              scale(1);
          }
        }

        /* ================================================
           REDUCED MOTION
           ================================================ */

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
