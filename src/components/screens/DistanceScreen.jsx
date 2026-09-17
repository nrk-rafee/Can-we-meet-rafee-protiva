"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Button from "../Button";

function DistanceScreen({ onNext }) {
    return (
        <div className="relative flex h-full min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden px-5 text-center">

            {/* Soft background glow */}
            <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-[100px]"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
            />

            {/* Small floating particles */}
            <motion.div
                className="pointer-events-none absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-pink-300/50"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="pointer-events-none absolute right-[15%] top-[27%] h-1.5 w-1.5 rounded-full bg-rose-300/60"
                animate={{
                    y: [0, 12, 0],
                    opacity: [0.2, 0.7, 0.2],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            />

            {/* Distance heading */}
            <motion.div
                className="relative z-10 mb-10"
                initial={{ opacity: 0, y: -35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
            >
                <motion.div
                    className="text-5xl font-bold tracking-tight text-pink-500 md:text-6xl"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 0.25,
                        duration: 0.7,
                        type: "spring",
                        damping: 14,
                    }}
                >
                    225km
                </motion.div>

                <motion.div
                    className="mt-1 text-4xl font-bold text-slate-700 md:text-5xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.45,
                        duration: 0.7,
                    }}
                >
                    between us
                </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div
                className="relative z-10 h-[375px] w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/80 bg-[#f5efd9] shadow-[0_20px_60px_rgba(244,114,182,0.13)]"
                initial={{
                    opacity: 0,
                    scale: 0.88,
                    y: 35,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.45,
                    duration: 0.9,
                    type: "spring",
                    damping: 18,
                }}
            >

                {/* Paper/map texture */}
                <div className="absolute inset-0 opacity-30">
                    <div
                        className="h-full w-full"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 20% 20%, rgba(255,255,255,.8) 0 1px, transparent 1px),
                                radial-gradient(circle at 70% 60%, rgba(160,140,100,.15) 0 1px, transparent 1px),
                                radial-gradient(circle at 40% 80%, rgba(255,255,255,.7) 0 1px, transparent 1px)
                            `,
                            backgroundSize: "12px 12px, 17px 17px, 21px 21px",
                        }}
                    />
                </div>

                {/* Soft map blobs */}
                <motion.div
                    className="absolute left-[8%] top-[8%] h-32 w-40 rounded-full bg-white/30 blur-2xl"
                    animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute right-[5%] bottom-[5%] h-40 w-48 rounded-full bg-yellow-100/40 blur-2xl"
                    animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Map roads / lines */}
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 520 375"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M25 295 C95 250, 110 320, 175 260 S270 145, 335 190 S420 220, 490 100"
                        fill="none"
                        stroke="rgba(255,255,255,0.65)"
                        strokeWidth="18"
                        strokeLinecap="round"
                    />

                    <path
                        d="M25 295 C95 250, 110 320, 175 260 S270 145, 335 190 S420 220, 490 100"
                        fill="none"
                        stroke="rgba(216,195,150,0.3)"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* Main pink route */}
                    <motion.path
                        d="M45 290 C105 265, 125 235, 175 205 C220 178, 250 125, 300 145 C350 165, 365 205, 410 175 C445 152, 455 115, 485 90"
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 11"
                        initial={{
                            pathLength: 0,
                            opacity: 0,
                        }}
                        animate={{
                            pathLength: 1,
                            opacity: 1,
                        }}
                        transition={{
                            delay: 1.1,
                            duration: 2,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Moving dot */}
                    <motion.circle
                        r="6"
                        fill="#ec4899"
                        initial={{
                            cx: 45,
                            cy: 290,
                            opacity: 0,
                        }}
                        animate={{
                            cx: [45, 175, 300, 410, 485],
                            cy: [290, 205, 145, 175, 90],
                            opacity: [0, 1, 1, 1, 0],
                        }}
                        transition={{
                            delay: 1.5,
                            duration: 2.7,
                            ease: "easeInOut",
                        }}
                    />
                </svg>

                {/* Me label */}
                <motion.div
                    className="absolute bottom-[105px] left-[28px] z-20"
                    initial={{ opacity: 0, x: -20, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                        delay: 2.05,
                        duration: 0.6,
                        type: "spring",
                        damping: 12,
                    }}
                >
                    <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-pink-500 shadow-md">
                        Me
                    </div>
                </motion.div>

                {/* Me pin */}
                <motion.div
                    className="absolute bottom-[38px] left-[28px] z-20 flex h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-white bg-white shadow-[0_5px_25px_rgba(236,72,153,0.15)]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 1.9,
                        duration: 0.65,
                        type: "spring",
                        damping: 10,
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -4, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <MapPin
                            size={38}
                            strokeWidth={2.5}
                            className="text-blue-400"
                        />
                    </motion.div>
                </motion.div>

                {/* You label */}
                <motion.div
                    className="absolute right-[18px] top-[80px] z-20"
                    initial={{ opacity: 0, x: 20, scale: 0.7 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                        delay: 2.25,
                        duration: 0.6,
                        type: "spring",
                        damping: 12,
                    }}
                >
                    <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-pink-500 shadow-md">
                        You
                    </div>
                </motion.div>

                {/* You pin */}
                <motion.div
                    className="absolute right-[18px] top-[18px] z-20 flex h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-white bg-white shadow-[0_5px_25px_rgba(236,72,153,0.15)]"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 2.15,
                        duration: 0.65,
                        type: "spring",
                        damping: 10,
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -4, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.4,
                        }}
                    >
                        <MapPin
                            size={38}
                            strokeWidth={2.5}
                            className="text-pink-400"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Heart message */}
            <motion.p
                className="relative z-10 mt-9 text-2xl font-semibold text-slate-600 font-hand md:text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 2.8,
                    duration: 0.8,
                }}
            >
                ...but{" "}
                <motion.span
                    className="text-pink-500"
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    never
                </motion.span>{" "}
                between our hearts.
            </motion.p>

            {/* Continue button */}
            <motion.div
                className="relative z-10 mt-8"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 3.15,
                    duration: 0.7,
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

export default DistanceScreen;
