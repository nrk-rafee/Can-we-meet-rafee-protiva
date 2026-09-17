"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart } from "lucide-react";

import Button from "../Button";

const thingsToDo = [
    {
        title: "Hug for 30 mins",
        desc: "Just holding you tight",
        color: "#fecdd3",
        accent: "#fb7185",
    },
    {
        title: "Food Date",
        desc: "Eating all our favorites",
        color: "#bfdbfe",
        accent: "#60a5fa",
    },
    {
        title: "Movie Date",
        desc: "Watching something together",
        color: "#fef08a",
        accent: "#fbbf24",
    },
    {
        title: "Endless Photos",
        desc: "Capturing your beautiful smile",
        color: "#e9d5ff",
        accent: "#c084fc",
    },
    {
        title: "Late Night Walks",
        desc: "Hand in hand under the stars",
        color: "#99f6e4",
        accent: "#14b8a6",
    },
    {
        title: "Make New Memories",
        desc: "Creating moments we'll never forget",
        color: "#fbcfe8",
        accent: "#ec4899",
    },
];

function Butterfly({ color }) {
    return (
        <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-[100]"
            initial={{
                x: "-50%",
                y: "-50%",
                scale: 0.15,
                opacity: 0,
                rotate: -8,
            }}
            animate={{
                x: [
                    "-50%",
                    "-25%",
                    "20%",
                    "-5%",
                    "35%",
                    "75%",
                ],
                y: [
                    "-50%",
                    "-100%",
                    "-175%",
                    "-250%",
                    "-340%",
                    "-450%",
                ],
                scale: [0.15, 0.65, 0.95, 1.05, 0.85, 0.45],
                opacity: [0, 1, 1, 1, 0.85, 0],
                rotate: [-8, 8, -12, 10, -8, 18],
            }}
            transition={{
                duration: 4,
                ease: "easeOut",
            }}
        >
            <motion.div
                className="relative h-12 w-16"
                animate={{
                    rotate: [0, -7, 7, -7, 7, 0],
                }}
                transition={{
                    duration: 0.22,
                    repeat: 17,
                    ease: "easeInOut",
                }}
            >
                {/* Left wing */}
                <motion.span
                    className="absolute left-0 top-1 h-8 w-7 rounded-[80%_25%_70%_30%]"
                    style={{
                        background: color,
                        transform: "rotate(-28deg)",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                    }}
                />

                {/* Right wing */}
                <motion.span
                    className="absolute right-0 top-1 h-8 w-7 rounded-[25%_80%_30%_70%]"
                    style={{
                        background: color,
                        transform: "rotate(28deg)",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
                    }}
                />

                {/* Body */}
                <span className="absolute left-1/2 top-2 h-8 w-1.5 -translate-x-1/2 rounded-full bg-slate-700/70" />

                {/* Antenna */}
                <span className="absolute left-1/2 top-0 h-3 w-5 -translate-x-1/2 border-t border-slate-700/50" />
            </motion.div>
        </motion.div>
    );
}

function ScratchCard({
    item,
    index,
    revealed,
    onReveal,
    onScratchStart,
    onScratch,
}) {
    const canvasRef = useRef(null);
    const cardRef = useRef(null);

    const isDrawing = useRef(false);
    const lastPoint = useRef(null);
    const scratchedAmount = useRef(0);
    const revealedRef = useRef(false);

    useEffect(() => {
        revealedRef.current = revealed;
    }, [revealed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const card = cardRef.current;

        if (!canvas || !card) return;

        const setupCanvas = () => {
            const rect = card.getBoundingClientRect();

            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.floor(rect.width * dpr);
            canvas.height = Math.floor(rect.height * dpr);

            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            /*
             * Scratch cover
             */
            ctx.globalCompositeOperation = "source-over";

            ctx.fillStyle = item.color;
            ctx.fillRect(0, 0, rect.width, rect.height);

            /*
             * Soft texture
             */
            for (let i = 0; i < 260; i++) {
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;
                const size = Math.random() * 2 + 0.5;

                ctx.fillStyle = `rgba(255,255,255,${
                    Math.random() * 0.22 + 0.08
                })`;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            /*
             * Dashed inner border
             */
            ctx.strokeStyle = "rgba(255,255,255,0.75)";
            ctx.lineWidth = 2;
            ctx.setLineDash([6, 6]);

            ctx.strokeRect(
                12,
                12,
                rect.width - 24,
                rect.height - 24
            );

            ctx.setLineDash([]);

            /*
             * Reset scratch progress after resize
             */
            scratchedAmount.current = 0;
        };

        setupCanvas();

        const resizeObserver = new ResizeObserver(setupCanvas);
        resizeObserver.observe(card);

        return () => {
            resizeObserver.disconnect();
        };
    }, [item.color]);

    const getPoint = (event) => {
        const canvas = canvasRef.current;

        if (!canvas) return null;

        const rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const scratch = (event) => {
        if (revealedRef.current) return;
        if (!isDrawing.current) return;

        const canvas = canvasRef.current;

        if (!canvas) return;

        const point = getPoint(event);

        if (!point) return;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        if (!lastPoint.current) {
            lastPoint.current = point;
            return;
        }

        const previous = lastPoint.current;

        const distance = Math.sqrt(
            Math.pow(point.x - previous.x, 2) +
                Math.pow(point.y - previous.y, 2)
        );

        /*
         * Track how much the user has scratched.
         */
        scratchedAmount.current += distance * 34;

        onScratch();

        /*
         * Erase scratch area
         */
        ctx.save();

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 34;

        ctx.beginPath();

        ctx.moveTo(previous.x, previous.y);
        ctx.lineTo(point.x, point.y);

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            17,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        lastPoint.current = point;

        /*
         * Reveal after enough scratching.
         */
        const rect = canvas.getBoundingClientRect();

        const totalArea = rect.width * rect.height;

        const revealThreshold = totalArea * 0.48;

        if (
            scratchedAmount.current >= revealThreshold &&
            !revealedRef.current
        ) {
            revealedRef.current = true;

            onReveal();
        }
    };

    const startScratch = (event) => {
        if (revealedRef.current) return;

        event.preventDefault();

        isDrawing.current = true;

        lastPoint.current = getPoint(event);

        onScratchStart();

        try {
            canvasRef.current?.setPointerCapture(
                event.pointerId
            );
        } catch {}
    };

    const stopScratch = (event) => {
        isDrawing.current = false;

        lastPoint.current = null;

        try {
            canvasRef.current?.releasePointerCapture(
                event.pointerId
            );
        } catch {}
    };

    return (
        /*
         * Outer wrapper DOES NOT hide overflow.
         * That's important because butterfly needs to fly outside.
         */
        <div className="relative w-full">
            <motion.div
                ref={cardRef}
                className="relative h-[170px] w-full overflow-hidden rounded-[1.7rem] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.07)]"
                initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.96,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    delay: index * 0.1,
                    duration: 0.55,
                    ease: "easeOut",
                }}
            >
                {/* =========================
                    REAL CARD CONTENT
                ========================= */}

                <div className="absolute inset-0 flex">
                    {/* Colored side */}
                    <div
                        className="flex w-[30%] min-w-[105px] shrink-0 flex-col items-center justify-center"
                        style={{
                            background: item.color,
                        }}
                    >
                        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                            <Heart
                                size={36}
                                strokeWidth={2.3}
                                className="text-slate-400"
                                style={{
                                    color: item.accent,
                                }}
                            />
                        </div>

                        <span className="mt-2 text-[11px] font-bold tracking-widest text-slate-500">
                            #{index + 1}
                        </span>
                    </div>

                    {/* Text side */}
                    <div className="relative flex min-w-0 flex-1 flex-col justify-center bg-white px-5 pr-14 md:px-7">
                        <motion.h3
                            className="text-[20px] font-bold leading-tight text-slate-700 md:text-2xl"
                            animate={{
                                opacity: revealed ? 1 : 0.92,
                            }}
                        >
                            {item.title}
                        </motion.h3>

                        <p className="mt-2 max-w-[330px] font-hand text-[16px] leading-snug text-slate-500 md:text-lg">
                            {item.desc}
                        </p>

                        <Heart
                            size={30}
                            strokeWidth={2}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200"
                        />
                    </div>
                </div>

                {/* =========================
                    SCRATCH LAYER
                ========================= */}

                <motion.div
                    className="absolute inset-0 z-20"
                    animate={{
                        opacity: revealed ? 0 : 1,
                    }}
                    transition={{
                        duration: 0.7,
                        ease: "easeOut",
                    }}
                    style={{
                        pointerEvents: revealed
                            ? "none"
                            : "auto",
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 touch-none"
                        onPointerDown={startScratch}
                        onPointerMove={scratch}
                        onPointerUp={stopScratch}
                        onPointerCancel={stopScratch}
                        onPointerLeave={stopScratch}
                    />

                    {!revealed && (
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            {/* Small heart instead of huge heart */}
                            <motion.div
                                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-[0_5px_18px_rgba(0,0,0,0.08)]"
                                animate={{
                                    scale: [
                                        1,
                                        1.06,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration: 1.4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Heart
                                    size={28}
                                    fill={item.accent}
                                    style={{
                                        color: item.accent,
                                    }}
                                />
                            </motion.div>

                            <motion.p
                                className="mt-3 rounded-full bg-white/90 px-4 py-1.5 text-[12px] font-extrabold tracking-wider text-pink-500 shadow-sm"
                                animate={{
                                    opacity: [
                                        0.7,
                                        1,
                                        0.7,
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            >
                                SCRATCH TO REVEAL
                            </motion.p>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Butterfly is OUTSIDE the overflow-hidden card */}
            <AnimatePresence>
                {revealed && (
                    <Butterfly color={item.accent} />
                )}
            </AnimatePresence>
        </div>
    );
}

function ThingsToDoScreen({ onNext }) {
    const [revealed, setRevealed] = useState(
        () => Array(thingsToDo.length).fill(false)
    );

    const audioContextRef = useRef(null);
    const noiseBufferRef = useRef(null);
    const soundCooldown = useRef(false);

    /*
     * Create soft paper scratching audio.
     */
    const initAudio = () => {
        if (typeof window === "undefined") return;

        if (!audioContextRef.current) {
            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) return;

            const ctx = new AudioContext();

            audioContextRef.current = ctx;

            /*
             * Very short soft noise buffer.
             */
            const duration = 0.12;

            const bufferSize = Math.floor(
                ctx.sampleRate * duration
            );

            const buffer = ctx.createBuffer(
                1,
                bufferSize,
                ctx.sampleRate
            );

            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                const fade =
                    1 -
                    i / bufferSize;

                /*
                 * Softer noise.
                 */
                data[i] =
                    (Math.random() * 2 - 1) *
                    fade *
                    0.22;
            }

            noiseBufferRef.current = buffer;
        }

        if (
            audioContextRef.current?.state ===
            "suspended"
        ) {
            audioContextRef.current.resume();
        }
    };

    const playScratchSound = () => {
        const ctx = audioContextRef.current;
        const buffer = noiseBufferRef.current;

        if (!ctx || !buffer) return;

        /*
         * Prevent harsh continuous noise.
         */
        if (soundCooldown.current) return;

        soundCooldown.current = true;

        const source =
            ctx.createBufferSource();

        const filter =
            ctx.createBiquadFilter();

        const gain =
            ctx.createGain();

        source.buffer = buffer;

        /*
         * High frequency paper-like sound.
         */
        filter.type = "highpass";
        filter.frequency.value = 900;
        filter.Q.value = 0.4;

        /*
         * VERY low volume.
         */
        gain.gain.setValueAtTime(
            0.018,
            ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.075
        );

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start();

        setTimeout(() => {
            soundCooldown.current = false;
        }, 45);
    };

    const handleScratchStart = () => {
        initAudio();
        playScratchSound();
    };

    const handleScratch = () => {
        playScratchSound();
    };

    const handleReveal = (index) => {
        setRevealed((previous) => {
            if (previous[index]) {
                return previous;
            }

            const next = [...previous];

            next[index] = true;

            return next;
        });
    };

    useEffect(() => {
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-4 pb-12 sm:px-6">
            {/* Background glow */}
            <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/25 blur-[120px]"
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [
                        0.4,
                        0.65,
                        0.4,
                    ],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Heading */}
            <motion.div
                className="relative z-10 mb-8 mt-7 text-center sm:mb-9"
                initial={{
                    opacity: 0,
                    y: -25,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.8,
                }}
            >
                <h2 className="text-3xl font-bold text-slate-700 md:text-5xl">
                    Things we'll do
                </h2>

                <p className="mt-2 font-hand text-xl text-rose-500 md:text-2xl">
                    when we finally meet again
                </p>
            </motion.div>

            {/* Cards */}
            <div className="relative z-10 flex w-full max-w-[620px] flex-col gap-6">
                {thingsToDo.map(
                    (item, index) => (
                        <ScratchCard
                            key={item.title}
                            item={item}
                            index={index}
                            revealed={
                                revealed[index]
                            }
                            onReveal={() =>
                                handleReveal(index)
                            }
                            onScratchStart={
                                handleScratchStart
                            }
                            onScratch={
                                handleScratch
                            }
                        />
                    )
                )}
            </div>

            {/* Next button */}
            <motion.div
                className="relative z-10 mt-10"
                initial={{
                    opacity: 0,
                    y: 25,
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
                <Button
                    onClick={onNext}
                    animateIcon={false}
                    text="See Our Memories"
                    icon={<Camera size={18} />}
                />
            </motion.div>
        </div>
    );
}

export default ThingsToDoScreen;
