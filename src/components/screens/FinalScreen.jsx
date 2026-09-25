"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const heartStrings = [
  {
    left: "8%",
    top: "4px",
    length: 92,
    heartSize: 28,
    rotate: -7,
    delay: 0,
    duration: 4.2,
  },
  {
    left: "43%",
    top: "-2px",
    length: 115,
    heartSize: 32,
    rotate: 5,
    delay: 0.7,
    duration: 4.8,
  },
  {
    left: "76%",
    top: "8px",
    length: 82,
    heartSize: 25,
    rotate: -5,
    delay: 1.2,
    duration: 4.5,
  },
];

export default function FinalScreen() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5">

      {/* ================= BACKGROUND GLOW ================= */}

      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/25 blur-[80px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute left-[8%] top-[18%] text-pink-200"
        animate={{
          y: [0, -10, 0],
          rotate: [-8, 8, -8],
          opacity: [0.35, 0.75, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart size={22} fill="currentColor" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[8%] top-[28%] text-pink-200"
        animate={{
          y: [0, 12, 0],
          rotate: [8, -8, 8],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Heart size={18} fill="currentColor" />
      </motion.div>

      {/* ================= TITLE ================= */}

      <motion.div
        className="relative z-20 text-center"
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
          ease: "easeOut",
        }}
      >
        <motion.h1
          className="font-hand text-[38px] leading-tight font-bold text-[#593247] md:text-5xl"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          To my one and only
          <span className="ml-1 text-pink-300">♥</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-[340px] text-[17px] leading-relaxed text-[#765666] font-hand md:text-xl"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.35,
            duration: 0.8,
          }}
        >
          Thank you for being the most beautiful part
          <br />
          of my life.
        </motion.p>
      </motion.div>

      {/* ================= COUPLE IMAGE ================= */}

      <motion.div
        className="relative z-10 mt-7 flex items-center justify-center"
        initial={{
          opacity: 0,
          scale: 0.88,
          y: 25,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          delay: 0.45,
          duration: 0.9,
          ease: "easeOut",
        }}
      >

        {/* soft glow */}
        <motion.div
          className="absolute h-[310px] w-[310px] rounded-full bg-pink-300/25 blur-[35px]"
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* elegant circular frame */}
        <motion.div
          className="relative flex h-[315px] w-[315px] items-center justify-center overflow-hidden rounded-full border-[4px] border-white/90 bg-pink-100/40 shadow-[0_18px_55px_rgba(236,72,153,0.18)] md:h-[350px] md:w-[350px]"
          animate={{
            boxShadow: [
              "0 18px 55px rgba(236,72,153,0.14)",
              "0 22px 70px rgba(236,72,153,0.25)",
              "0 18px 55px rgba(236,72,153,0.14)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src="/images/final-couple.jpg"
            alt="Us together"
            className="h-full w-full object-cover"
            draggable="false"
          />

          {/* soft glass highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/25 via-transparent to-pink-300/10" />
        </motion.div>
      </motion.div>

      {/* ================= HANGING LOVE STRINGS ================= */}

      <div className="relative z-20 mt-[-2px] h-[125px] w-[310px]">

        {heartStrings.map((item, index) => (
          <motion.div
            key={index}
            className="absolute top-0 origin-top"
            style={{
              left: item.left,
            }}
            initial={{
              rotate: item.rotate,
            }}
            animate={{
              rotate: [
                item.rotate,
                item.rotate + 5,
                item.rotate - 4,
                item.rotate,
              ],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >

            {/* string */}
            <div
              className="mx-auto w-[1.5px] rounded-full bg-gradient-to-b from-pink-300/80 via-pink-200 to-pink-300/30"
              style={{
                height: `${item.length}px`,
              }}
            />

            {/* tiny bead */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-white shadow-[0_2px_8px_rgba(236,72,153,0.25)]"
              style={{
                top: `${item.length - 2}px`,
                width: "7px",
                height: "7px",
              }}
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: item.delay,
              }}
            />

            {/* hanging heart */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: `${item.length - 1}px`,
              }}
              animate={{
                y: [0, 3, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                size={item.heartSize}
                className="fill-pink-400 text-pink-400 drop-shadow-[0_5px_10px_rgba(236,72,153,0.25)]"
              />
            </motion.div>
          </motion.div>
        ))}

        {/* little center heart garland */}
        <motion.div
          className="absolute left-1/2 top-[92px] -translate-x-1/2"
          animate={{
            y: [0, -3, 0],
            rotate: [-3, 3, -3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={17}
            className="fill-pink-300 text-pink-300"
          />
        </motion.div>
      </div>

      {/* ================= MESSAGE CARD ================= */}

      <motion.div
        className="relative z-20 -mt-1 w-full max-w-[430px]"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1,
          duration: 0.7,
        }}
      >
        <div className="relative overflow-hidden rounded-[28px] border border-pink-100/80 bg-white/75 px-6 py-7 text-center shadow-[0_18px_50px_rgba(236,72,153,0.10)] backdrop-blur-md">

          {/* card glow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-pink-50/70 via-white/30 to-purple-50/50" />

          <div className="relative z-10">

            <p className="font-hand text-[18px] leading-relaxed text-[#765666] md:text-xl">
              Here's to many more beautiful memories
              <br />
              together
            </p>

            <div className="mt-5 flex items-center justify-center gap-5">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -5, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: index * 0.18,
                    ease: "easeInOut",
                  }}
                >
                  <Heart
                    size={25}
                    className="fill-pink-400 text-pink-400"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ================= BOTTOM FLOATING HEARTS ================= */}

      <motion.div
        className="pointer-events-none absolute bottom-[5%] left-[16%] text-pink-200"
        animate={{
          y: [0, -12, 0],
          rotate: [-8, 8, -8],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      >
        <Heart size={17} fill="currentColor" />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[8%] right-[15%] text-pink-200"
        animate={{
          y: [0, -10, 0],
          rotate: [8, -8, 8],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay: 0.8,
        }}
      >
        <Heart size={14} fill="currentColor" />
      </motion.div>

    </div>
  );
}
