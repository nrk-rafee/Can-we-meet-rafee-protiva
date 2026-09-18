"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Heart,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import Button from "../Button";

function LetterScreen({ onNext }) {
  const [isNight, setIsNight] = useState(false);

  return (
    <div
      className={`relative w-full min-h-screen flex flex-col items-center overflow-hidden transition-all duration-1000 ${
        isNight
          ? "bg-gradient-to-b from-[#11152b] via-[#252044] to-[#171528]"
          : "bg-gradient-to-b from-[#fff8fb] via-[#fff3f8] to-[#fdeef5]"
      }`}
    >
      {/* ================= BACKGROUND ================= */}

      {/* Day glow */}
      <motion.div
        className={`absolute -top-20 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isNight ? "opacity-0" : "bg-yellow-200/40 opacity-100"
        }`}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Night moon glow */}
      <motion.div
        className={`absolute -top-10 -right-10 w-52 h-52 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isNight ? "bg-purple-500/20 opacity-100" : "opacity-0"
        }`}
        animate={{
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Day sun */}
      <motion.div
        className={`absolute top-20 right-8 md:right-16 z-0 transition-all duration-700 ${
          isNight
            ? "opacity-0 scale-50"
            : "opacity-100 scale-100"
        }`}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-yellow-300/80 shadow-[0_0_45px_rgba(250,204,21,0.45)] flex items-center justify-center">
          <Sun
            size={32}
            className="text-yellow-600"
          />
        </div>
      </motion.div>

      {/* Night moon */}
      <motion.div
        className={`absolute top-20 right-8 md:right-16 z-0 transition-all duration-700 ${
          isNight
            ? "opacity-100 scale-100"
            : "opacity-0 scale-50"
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-[#f8f3d6] shadow-[0_0_45px_rgba(248,243,214,0.3)] flex items-center justify-center">
          <Moon
            size={30}
            className="text-[#77739d]"
          />
        </div>
      </motion.div>

      {/* ================= NIGHT STARS ================= */}

      {[
        { left: "8%", top: "18%", delay: 0 },
        { left: "24%", top: "11%", delay: 1 },
        { left: "43%", top: "20%", delay: 1.5 },
        { left: "67%", top: "13%", delay: 0.7 },
        { left: "86%", top: "28%", delay: 1.8 },
        { left: "14%", top: "72%", delay: 1.2 },
        { left: "88%", top: "67%", delay: 0.5 },
      ].map((star, index) => (
        <motion.div
          key={index}
          className={`absolute pointer-events-none transition-opacity duration-1000 ${
            isNight
              ? "opacity-80"
              : "opacity-0"
          }`}
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            scale: [0.7, 1.2, 0.7],
            opacity: [0.35, 1, 0.35],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        >
          <Sparkles
            size={13}
            className="text-purple-200"
          />
        </motion.div>
      ))}

      {/* ================= FLOATING HEARTS ================= */}

      {[1, 2, 3, 4].map((item, index) => (
        <motion.div
          key={item}
          className={`absolute pointer-events-none transition-opacity duration-1000 ${
            isNight
              ? "text-pink-300/20"
              : "text-pink-300/45"
          }`}
          style={{
            left:
              index % 2 === 0
                ? `${8 + index * 4}%`
                : "auto",
            right:
              index % 2 !== 0
                ? `${7 + index * 3}%`
                : "auto",
            top: `${28 + index * 13}%`,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: 4 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        >
          <Heart
            size={index % 2 === 0 ? 17 : 13}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* ================= DAY / NIGHT BUTTON ================= */}

      <motion.button
        type="button"
        onClick={() => setIsNight((prev) => !prev)}
        className={`fixed top-4 right-4 z-[100] w-12 h-12 rounded-full flex items-center justify-center shadow-lg border backdrop-blur-md transition-all duration-500 ${
          isNight
            ? "bg-[#302b50]/90 border-purple-300/30 text-yellow-200"
            : "bg-white/85 border-pink-200 text-pink-500"
        }`}
        whileHover={{
          scale: 1.08,
          rotate: 8,
        }}
        whileTap={{
          scale: 0.9,
        }}
        aria-label="Toggle day and night mode"
      >
        <motion.div
          key={isNight ? "moon" : "sun"}
          initial={{
            rotate: -90,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            rotate: 0,
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          {isNight ? (
            <Moon size={22} />
          ) : (
            <Sun size={22} />
          )}
        </motion.div>
      </motion.button>

      {/* ================= LETTER AREA ================= */}

      <motion.div
        className="relative z-10 w-full max-w-[600px] px-4 pt-[82px] pb-2"
        initial={{
          opacity: 0,
          y: 25,
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
        {/* Letter card */}

        <motion.div
          className={`relative w-full rounded-[30px] border backdrop-blur-xl shadow-2xl transition-all duration-1000 ${
            isNight
              ? "bg-[#29263f]/90 border-purple-300/15 shadow-black/30"
              : "bg-white/90 border-pink-100 shadow-pink-200/30"
          }`}
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Decorative top sparkle */}

          <div className="absolute top-5 left-5">
            <Sparkles
              size={22}
              className={
                isNight
                  ? "text-purple-300"
                  : "text-pink-300"
              }
            />
          </div>

          {/* Decorative heart */}

          <motion.div
            className="absolute top-5 right-5"
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Heart
              size={22}
              fill="currentColor"
              className={
                isNight
                  ? "text-pink-300"
                  : "text-pink-400"
              }
            />
          </motion.div>

          {/* Header */}

          <div className="text-center pt-7 px-5">
            <motion.div
              className={`mx-auto w-16 h-16 rounded-[20px] flex items-center justify-center mb-4 transition-all duration-1000 ${
                isNight
                  ? "bg-purple-400/15"
                  : "bg-pink-100"
              }`}
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Mail
                size={30}
                className={
                  isNight
                    ? "text-purple-300"
                    : "text-pink-400"
                }
              />
            </motion.div>

            <h2
              className={`text-3xl md:text-4xl font-bold transition-colors duration-1000 ${
                isNight
                  ? "text-white"
                  : "text-slate-700"
              }`}
            >
              A Letter For You
            </h2>

            <p
              className={`mt-2 text-sm tracking-[0.35em] font-medium transition-colors duration-1000 ${
                isNight
                  ? "text-purple-300"
                  : "text-purple-400"
              }`}
            >
              FROM MY HEART ♡
            </p>

            {/* Divider */}

            <div className="flex items-center justify-center gap-3 mt-4">
              <span
                className={`w-16 h-[2px] transition-colors duration-1000 ${
                  isNight
                    ? "bg-purple-300/30"
                    : "bg-pink-200"
                }`}
              />

              <Heart
                size={18}
                fill="currentColor"
                className={
                  isNight
                    ? "text-pink-300"
                    : "text-pink-400"
                }
              />

              <span
                className={`w-16 h-[2px] transition-colors duration-1000 ${
                  isNight
                    ? "bg-purple-300/30"
                    : "bg-pink-200"
                }`}
              />
            </div>
          </div>

          {/* ================= LETTER TEXT ================= */}

          <div
            className={`px-7 md:px-10 pt-5 pb-6 font-hand text-[16px] md:text-[17px] leading-[1.75] transition-colors duration-1000 ${
              isNight
                ? "text-purple-100/85"
                : "text-slate-600"
            }`}
          >
            <p className="mb-4">
              My Dearest,
            </p>

            <p className="mb-4">
              Every single day we spend apart only makes me
              realize how much you truly mean to me. The
              distance is hard sometimes, but it’s just a test
              of how far our love can travel.
            </p>

            <p className="mb-4">
              I count the days until I can finally hold you in
              my arms again. You are my home, my favorite
              person, and my safe place.
            </p>

            <p className="mb-4">
              Even when we are miles apart, I carry you in my
              heart everywhere I go. I miss your smile, your
              laugh, and just simply being next to you.
            </p>

            <p className="mb-4">
              Thank you for being the best part of my life.
              I promise the wait will be worth it when I
              finally get to see you again.
            </p>

            <div
              className={`text-right mt-4 transition-colors duration-1000 ${
                isNight
                  ? "text-pink-300"
                  : "text-pink-400"
              }`}
            >
              <p>Forever Yours,</p>
              <p className="text-xl mt-1">
                Me :)
              </p>
            </div>
          </div>

          {/* Bottom decoration */}

          <div className="absolute bottom-5 left-5">
            <Sparkles
              size={18}
              className={
                isNight
                  ? "text-purple-300"
                  : "text-pink-300"
              }
            />
          </div>
        </motion.div>

        {/* ================= ONE LAST THING ================= */}
        {/* IMPORTANT: This is OUTSIDE the letter box */}

        <motion.div
          className="relative z-30 flex justify-center mt-6 mb-5"
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
            text="One Last Thing"
            animateIcon={false}
            icon={<Heart size={18} />}
          />
        </motion.div>
      </motion.div>

      {/* ================= WATERMARK ================= */}

      <motion.div
        className={`fixed bottom-3 right-4 z-50 text-sm pointer-events-none transition-colors duration-1000 ${
          isNight
            ? "text-white/35"
            : "text-slate-400/60"
        }`}
        initial={{
          opacity: 0,
          x: 20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 1,
        }}
      >
        rafee🫶protiva
      </motion.div>
    </div>
  );
}

export default LetterScreen;
