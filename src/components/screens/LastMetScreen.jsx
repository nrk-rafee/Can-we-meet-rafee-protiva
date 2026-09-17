"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Button from "../Button";

const lastMetDate = "2025-01-01";

function LastMetScreen({ onNext }) {
    const [days, setDays] = useState(0);
    const [dateStr, setDateStr] = useState("");
    const [displayDays, setDisplayDays] = useState(0);
    const [countingDone, setCountingDone] = useState(false);

    useEffect(() => {
        const lastMet = new Date(lastMetDate);
        const today = new Date();

        lastMet.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = Math.abs(today - lastMet);
        const diffDays = Math.round(
            diffTime / (1000 * 60 * 60 * 24)
        );

        setDays(diffDays);

        setDateStr(
            lastMet.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
    }, []);

    /*
     * Animated counting
     *
     * 0 → 1 → 2 → 3 → ... → 624
     *
     * Starts after the card appears.
     */
    useEffect(() => {
        if (!days) return;

        setDisplayDays(0);
        setCountingDone(false);

        const duration = 2400;
        const startTime = performance.now();

        let animationFrame;

        const animateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            /*
             * Ease-out:
             * শুরুতে দ্রুত count হবে,
             * শেষে ধীরে ধীরে 624-এ এসে থামবে।
             */
            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentNumber = Math.floor(
                easedProgress * days
            );

            setDisplayDays(currentNumber);

            if (progress < 1) {
                animationFrame =
                    requestAnimationFrame(animateCount);
            } else {
                setDisplayDays(days);
                setCountingDone(true);
            }
        };

        /*
         * একটু delay যাতে card আসার পরে
         * counting শুরু হয়।
         */
        const timeout = setTimeout(() => {
            animationFrame =
                requestAnimationFrame(animateCount);
        }, 700);

        return () => {
            clearTimeout(timeout);

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [days]);

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center text-center">

            {/* Heading */}
            <motion.p
                className="z-10 mb-2 text-lg font-medium uppercase tracking-wider text-slate-700 md:text-xl"
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
                We last met on
            </motion.p>

            {/* Date */}
            <motion.h3
                className="z-10 mb-8 text-2xl font-hand font-semibold text-pink-500 md:text-3xl"
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                }}
            >
                {dateStr}
            </motion.h3>

            {/* Main card */}
            <motion.div
                className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-[3rem] border-2 border-white/80 bg-white/70 p-10 shadow-[0_20px_60px_rgba(251,113,133,0.15)] backdrop-blur-md"
                initial={{
                    opacity: 0,
                    scale: 0.85,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.5,
                    duration: 0.8,
                    type: "spring",
                    damping: 18,
                }}
            >
                {/* Number */}
                <div className="relative mb-4 flex flex-col items-center">

                    <div className="relative h-[105px] min-w-[220px] overflow-hidden md:h-[120px]">

                        <AnimatePresence mode="popLayout">
                            <motion.span
                                key={displayDays}
                                className="absolute inset-0 flex items-center justify-center text-7xl font-semibold md:text-8xl"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #334155 0%, #fb7185 100%)",
                                    WebkitBackgroundClip:
                                        "text",
                                    WebkitTextFillColor:
                                        "transparent",
                                }}
                                initial={{
                                    opacity: 0.35,
                                    y: 8,
                                    scale: 0.97,
                                    filter: "blur(2px)",
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    filter: "blur(0px)",
                                }}
                                exit={{
                                    opacity: 0,
                                    y: -8,
                                    scale: 1.02,
                                    filter: "blur(2px)",
                                }}
                                transition={{
                                    duration: 0.09,
                                    ease: "easeOut",
                                }}
                            >
                                {displayDays}
                            </motion.span>
                        </AnimatePresence>

                    </div>

                    {/* Days Ago */}
                    <motion.span
                        className="text-xl font-medium text-pink-400"
                        initial={{
                            opacity: 0,
                            y: 10,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: 1,
                            duration: 0.6,
                        }}
                    >
                        Days Ago
                    </motion.span>
                </div>

                {/* Divider */}
                <motion.div
                    className="my-4 h-1 w-16 rounded-full bg-pink-100"
                    initial={{
                        opacity: 0,
                        scaleX: 0,
                    }}
                    animate={{
                        opacity: 1,
                        scaleX: 1,
                    }}
                    transition={{
                        delay: 1.1,
                        duration: 0.6,
                    }}
                />

                {/* Message */}
                <motion.p
                    className="relative text-balance font-hand text-2xl font-semibold leading-snug text-slate-600 md:text-[26px]"
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 1.3,
                        duration: 0.8,
                    }}
                >
                    And I've missed you
                    <br />
                    every single one of them.
                </motion.p>
            </motion.div>

            {/* Small completion glow */}
            <AnimatePresence>
                {countingDone && (
                    <motion.div
                        className="pointer-events-none absolute z-0 h-40 w-40 rounded-full bg-pink-300/20 blur-3xl"
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                        }}
                        animate={{
                            opacity: [0, 1, 0.4],
                            scale: [0.5, 1.15, 1],
                        }}
                        transition={{
                            duration: 1.2,
                            ease: "easeOut",
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Keep Going */}
            <motion.div
                className="z-10 mt-12"
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 3.1,
                    duration: 0.8,
                }}
            >
                <Button
                    onClick={onNext}
                    text="Keep Going"
                />
            </motion.div>
        </div>
    );
}

export default LastMetScreen;
