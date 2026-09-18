"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Mail,
  LockKeyhole,
  Feather,
} from "lucide-react";
import Button from "../Button";

const letterParagraphs = [
  "My favorite person,",

  "Sometimes I wish I could pause time, just so I could stay a little longer in the moments when I feel closest to you.",

  "Until we meet again, I hope you remember that somewhere in this big world, there’s someone thinking about you, smiling because of you, and waiting for the next beautiful moment we get to share.",

  "Distance may keep us apart for a while, but it can never change the little place you have in my heart.",
];

export default function LetterScreen({ onNext }) {
  const [opening, setOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (opening || isOpen) return;

    setOpening(true);

    // Let the envelope flap animation finish first.
    setTimeout(() => {
      setIsOpen(true);
      setOpening(false);
    }, 1150);
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen h-full overflow-visible px-4 py-8">

      {/* =========================================================
          SOFT BACKGROUND GLOW
      ========================================================== */}

      <motion.div
        className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[380px] h-[380px] rounded-full bg-pink-200/20 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[260px] h-[260px] rounded-full bg-purple-200/15 blur-3xl pointer-events-none"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          HEADER
      ========================================================== */}

      <motion.div
        className="relative z-20 text-center shrink-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-2"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        >
          <span className="text-rose-400 font-bold tracking-[0.2em] uppercase text-xs">
            {isOpen ? "FROM MY HEART ♡" : "A MESSAGE FOR YOU"}
          </span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold text-slate-700">
          {isOpen ? "A Letter For You" : "From My Heart"}
        </h2>

        {!isOpen && (
          <motion.p
            className="mt-3 text-sm text-slate-400"
            animate={{
              opacity: [0.55, 1, 0.55],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            There&apos;s something waiting inside ♡
          </motion.p>
        )}
      </motion.div>

      {/* =========================================================
          MAIN AREA
      ========================================================== */}

      <div className="relative z-20 w-full max-w-[440px] flex items-center justify-center my-7 min-h-[430px]">

        <AnimatePresence mode="wait">

          {/* =====================================================
              CLOSED ENVELOPE
          ====================================================== */}

          {!isOpen && (
            <motion.div
              key="closed-envelope"
              className="relative w-full max-w-[420px] h-[275px] cursor-pointer select-none"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.88,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 120,
              }}
              onClick={handleOpen}
              whileHover={{
                y: -5,
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.975,
              }}
            >

              {/* Envelope shadow/glow */}
              <motion.div
                className="absolute inset-4 rounded-[28px] bg-pink-300/35 blur-2xl"
                animate={{
                  opacity: [0.35, 0.65, 0.35],
                  scale: [0.96, 1.04, 0.96],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* =================================================
                  ENVELOPE
              ================================================== */}

              <div className="absolute inset-0 rounded-[25px] overflow-visible">

                {/* Envelope body */}
                <div className="absolute inset-0 rounded-[25px] bg-gradient-to-br from-[#fff8fa] via-[#ffeaf0] to-[#ffdce7] border border-pink-200 shadow-[0_22px_55px_rgba(236,72,153,0.18)] overflow-hidden">

                  {/* Left fold */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(0 0, 50% 54%, 0 100%)",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,210,223,0.8))",
                    }}
                  />

                  {/* Right fold */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(100% 0, 50% 54%, 100% 100%)",
                      background:
                        "linear-gradient(215deg, rgba(255,255,255,0.8), rgba(255,205,218,0.78))",
                    }}
                  />

                  {/* Bottom pocket */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(0 100%, 50% 52%, 100% 100%)",
                      background:
                        "linear-gradient(180deg, rgba(255,224,233,0.75), rgba(255,194,210,0.98))",
                    }}
                  />

                  {/* Inner envelope line */}
                  <div className="absolute left-8 right-8 bottom-[62px] h-px bg-white/70" />

                  {/* Little decorative corner */}
                  <motion.div
                    className="absolute top-4 right-4 w-11 h-11 rounded-lg border border-dashed border-pink-300/80 flex items-center justify-center bg-white/30 z-10"
                    animate={{
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles
                      size={20}
                      className="text-pink-400"
                    />
                  </motion.div>
                </div>

                {/* =================================================
                    LETTER PAPER INSIDE
                ================================================== */}

                <motion.div
                  className="absolute left-[7%] right-[7%] bottom-[15px] h-[205px] rounded-xl bg-[#fffdf9] border border-pink-100 shadow-[0_8px_25px_rgba(0,0,0,0.08)] z-[2]"
                  animate={
                    opening
                      ? {
                          y: -95,
                          scale: 1.04,
                        }
                      : {
                          y: 0,
                          scale: 1,
                        }
                  }
                  transition={{
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200" />

                  <div className="p-5 text-center">
                    <Feather
                      size={18}
                      className="mx-auto text-pink-300 mb-3"
                    />

                    <p className="font-hand text-slate-400 text-sm leading-relaxed">
                      A little piece of my heart,
                      <br />
                      waiting just for you ♡
                    </p>
                  </div>
                </motion.div>

                {/* =================================================
                    ENVELOPE FLAP
                ================================================== */}

                <motion.div
                  className="absolute top-0 left-0 right-0 h-[150px] z-30 origin-top"
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateX: opening ? -175 : 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Flap */}
                  <div
                    className="absolute inset-0 rounded-t-[25px]"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(180deg, #ffdce7 0%, #ffcbd9 100%)",
                      boxShadow:
                        "0 8px 18px rgba(236,72,153,0.12)",
                      backfaceVisibility: "hidden",
                    }}
                  />

                  {/* Flap highlight */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.65), rgba(255,255,255,0))",
                    }}
                  />
                </motion.div>

                {/* =================================================
                    HEART SEAL
                ================================================== */}

                <motion.div
                  className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 z-40"
                  animate={
                    opening
                      ? {
                          scale: 0.7,
                          opacity: 0,
                          y: 15,
                        }
                      : {
                          scale: [1, 1.04, 1],
                          opacity: 1,
                          y: [0, -3, 0],
                        }
                  }
                  transition={
                    opening
                      ? {
                          duration: 0.35,
                        }
                      : {
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-pink-400/30 blur-xl" />

                    <div className="relative w-[82px] h-[82px] rounded-full bg-gradient-to-br from-[#ff6b91] to-[#f43f6f] border-[5px] border-white shadow-[0_10px_25px_rgba(244,63,111,0.28)] flex items-center justify-center">
                      <Heart
                        size={38}
                        className="text-white fill-white"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* =================================================
                    TAP TO OPEN
                ================================================== */}

                <motion.div
                  className="absolute left-0 right-0 bottom-[43px] text-center z-40"
                  animate={{
                    opacity: opening
                      ? 0
                      : [0.65, 1, 0.65],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <LockKeyhole
                      size={15}
                      className="text-rose-500"
                    />

                    <span className="text-rose-500 font-bold tracking-wide text-sm">
                      {opening
                        ? "OPENING..."
                        : "TAP TO OPEN"}
                    </span>
                  </div>
                </motion.div>

                {/* Envelope label */}
                <div className="absolute left-0 right-0 bottom-4 text-center z-40">
                  <span className="text-xs text-slate-400">
                    A little something from my heart ♡
                  </span>
                </div>

              </div>
            </motion.div>
          )}

          {/* =====================================================
              OPEN LETTER
          ====================================================== */}

          {isOpen && (
            <motion.div
              key="open-letter"
              className="relative w-full max-w-[430px]"
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 80,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >

              {/* Envelope underneath */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 bottom-3 w-[92%] h-[210px] rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.15,
                  duration: 0.5,
                }}
              />

              {/* Letter paper */}
              <motion.div
                className="relative z-10 w-full rounded-[28px] bg-[#fffdfc] border border-pink-100 shadow-[0_25px_70px_rgba(236,72,153,0.16)] overflow-hidden"
                initial={{
                  y: 110,
                  scale: 0.78,
                  rotate: 1.5,
                }}
                animate={{
                  y: 0,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.18,
                  type: "spring",
                  damping: 18,
                  stiffness: 100,
                }}
              >

                {/* Top gradient */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-200 via-rose-300 to-purple-200" />

                {/* Decorative top icons */}
                <motion.div
                  className="absolute top-5 left-5"
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.9,
                    type: "spring",
                  }}
                >
                  <Sparkles
                    size={20}
                    className="text-pink-300"
                  />
                </motion.div>

                <motion.div
                  className="absolute top-5 right-5"
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 1,
                    type: "spring",
                  }}
                >
                  <Heart
                    size={21}
                    className="text-pink-400 fill-pink-300"
                  />
                </motion.div>

                {/* Letter heading */}
                <div className="pt-10 pb-5 px-6 text-center border-b border-pink-100 bg-gradient-to-b from-pink-50/70 to-white">

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.9,
                    }}
                  >
                    <Mail
                      size={28}
                      className="mx-auto text-pink-400 mb-3"
                    />

                    <h3 className="text-2xl md:text-3xl font-bold text-slate-700">
                      A Letter For You
                    </h3>

                    <p className="mt-2 text-xs md:text-sm tracking-[0.3em] text-purple-400 font-medium">
                      FROM MY HEART ♡
                    </p>

                    <div className="flex items-center justify-center gap-3 mt-4">
                      <span className="w-20 h-px bg-pink-200" />

                      <Heart
                        size={15}
                        className="text-pink-400 fill-pink-400"
                      />

                      <span className="w-20 h-px bg-pink-200" />
                    </div>
                  </motion.div>
                </div>

                {/* Letter body */}
                <div className="px-6 md:px-8 py-6 md:py-8">

                  <div className="font-hand text-slate-700 text-[17px] md:text-xl leading-[1.9]">

                    {letterParagraphs.map((paragraph, index) => (
                      <motion.p
                        key={index}
                        className={
                          index === 0
                            ? "mb-7"
                            : "mb-7"
                        }
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 1.15 + index * 0.45,
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}

                    {/* Signature */}
                    <motion.div
                      className="text-right pt-1 pb-2"
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 3,
                        duration: 0.7,
                      }}
                    >
                      <p className="font-hand text-pink-400 text-2xl md:text-3xl italic">
                        Always yours,
                      </p>

                      <p className="font-hand text-purple-400 text-xl md:text-2xl mt-1">
                        rafee ♡
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Footer */}
                <motion.div
                  className="px-5 pb-5 text-center"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 3.4,
                  }}
                >
                  <span className="text-xs text-slate-400">
                    no matter how far, still close to my heart ♡
                  </span>
                </motion.div>

                {/* Bottom decoration */}
                <motion.div
                  className="absolute bottom-5 left-5"
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 3.2,
                    type: "spring",
                  }}
                >
                  <Sparkles
                    size={18}
                    className="text-purple-300"
                  />
                </motion.div>

              </motion.div>

              {/* Floating hearts */}
              {[0, 1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  className="absolute pointer-events-none z-30"
                  style={{
                    left:
                      item % 2 === 0
                        ? "8%"
                        : "88%",
                    bottom: "42%",
                  }}
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: -90 - item * 12,
                    x:
                      item % 2 === 0
                        ? -15
                        : 15,
                    scale: [0.5, 1, 0.7],
                  }}
                  transition={{
                    delay: 0.7 + item * 0.2,
                    duration: 2.2,
                    ease: "easeOut",
                  }}
                >
                  <Heart
                    size={item % 2 === 0 ? 17 : 13}
                    className="text-pink-400 fill-pink-300"
                  />
                </motion.div>
              ))}

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* =========================================================
          NEXT BUTTON
      ========================================================== */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="relative z-30 mb-3"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 3.8,
              duration: 0.7,
            }}
          >
            <Button
              onClick={onNext}
              text="One Last Thing"
              icon={<Heart size={18} />}
              animateIcon={false}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
