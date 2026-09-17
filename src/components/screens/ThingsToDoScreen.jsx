"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart } from "lucide-react";

import Button from "../Button";

const thingsToDo = [
    {
        title: "Hug for 30 mins",
        desc: "Just holding you tight",
        color: "pink",
        wing: "#fb7185",
    },
    {
        title: "Food Date",
        desc: "Eating all our favorites",
        color: "blue",
        wing: "#60a5fa",
    },
    {
        title: "Movie Date",
        desc: "Watching something together",
        color: "yellow",
        wing: "#fbbf24",
    },
    {
        title: "Endless Photos",
        desc: "Capturing your beautiful smile",
        color: "purple",
        wing: "#c084fc",
    },
    {
        title: "Late Night Walks",
        desc: "Hand in hand under the stars",
        color: "teal",
        wing: "#2dd4bf",
    },
    {
        title: "Make New Memories",
        desc: "Creating moments we'll never forget",
        color: "rose",
        wing: "#f472b6",
    },
];

const coverColors = {
    pink: "bg-rose-200",
    blue: "bg-blue-200",
    yellow: "bg-yellow-200",
    purple: "bg-purple-200",
    teal: "bg-teal-200",
    rose: "bg-pink-200",
};

const heartColors = {
    pink: "text-rose-400",
    blue: "text-blue-400",
    yellow: "text-amber-400",
    purple: "text-purple-400",
    teal: "text-teal-400",
    rose: "text-pink-400",
};

function Butterfly({ color }) {
    return (
        <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 z-[60]"
            initial={{
                x: "-50%",
                y: "-50%",
                scale: 0.2,
                opacity: 0,
            }}
            animate={{
                x: [
                    "-50%",
                    "-20%",
                    "30%",
                    "-10%",
                    "45%",
                ],
                y: [
                    "-50%",
                    "-100%",
                    "-180%",
                    "-270%",
                    "-390%",
                ],
                scale: [0.2, 0.8, 1, 0.95, 0.65],
                opacity: [0, 1, 1, 0.9, 0],
                rotate: [-10, 8, -12, 10, 25],
            }}
            transition={{
                duration: 3.2,
                ease: "easeOut",
            }}
        >
            <motion.div
                className="relative h-10 w-14"
                animate={{
                    rotate: [0, -5, 5, -5, 0],
                }}
                transition={{
                    duration: 0.22,
                    repeat: 12,
                    ease: "easeInOut",
                }}
            >
                {/* Left wing */}
                <span
                    className="absolute left-0 top-1 h-7 w-6 rounded-[80%_25%_70%_30%]"
                    style={{
                        background: color,
                        transform: "rotate(-28deg)",
                        boxShadow: "0 2px 6px rgba(0,0,0,.08)",
                    }}
                />

                {/* Right wing */}
                <span
                    className="absolute right-0 top-1 h-7 w-6 rounded-[25%_80%_30%_70%]"
                    style={{
                        background: color,
                        transform: "rotate(28deg)",
                        boxShadow: "0 2px 6px rgba(0,0,0,.08)",
                    }}
                />

                {/* Body */}
                <span className="absolute left-1/2 top-2 h-7 w-1.5 -translate-x-1/2 rounded-full bg-slate-700/70" />

                {/* Antenna */}
                <span className="absolute left-1/2 top-0 h-3 w-4 -translate-x-1/2 border-t border-slate-700/50" />
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

    useEffect(() => {
        const canvas = canvasRef.current;
        const card = cardRef.current;

        if (!canvas || !card) return;

        const setupCanvas = () => {
            const rect = card.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            /*
             * Scratch cover
             */
            ctx.fillStyle = "#f6dfe5";
            ctx.fillRect(0, 0, rect.width, rect.height);

            /*
             * Tiny dots — reference style
             */
            ctx.fillStyle = "rgba(255,255,255,0.38)";

            for (let x = 18; x < rect.width; x += 25) {
                for (let y = 18; y < rect.height; y += 25) {
                    ctx.beginPath();
                    ctx.arc(x, y, 2.1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            /*
             * Dashed inner border
             */
            ctx.strokeStyle = "rgba(255,255,255,0.8)";
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);

            ctx.strokeRect(
                10,
                10,
                rect.width - 20,
                rect.height - 20
            );

            ctx.setLineDash([]);

            /*
             * Reset compositing
             */
            ctx.globalCompositeOperation = "source-over";
        };

        setupCanvas();

        const resizeObserver = new ResizeObserver(setupCanvas);
        resizeObserver.observe(card);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

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
        if (revealed) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const point = getPoint(event);
        if (!point) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!isDrawing.current) {
            lastPoint.current = point;
            return;
        }

        onScratch();

        ctx.save();

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 30;

        ctx.beginPath();

        ctx.moveTo(
            lastPoint.current.x,
            lastPoint.current.y
        );

        ctx.lineTo(point.x, point.y);

        ctx.stroke();

        /*
         * Circular scratch area
         */
        ctx.beginPath();
        ctx.arc(
            point.x,
            point.y,
            15,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();

        lastPoint.current = point;
    };

    const startScratch = (event) => {
        if (revealed) return;

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
        <motion.div
            ref={cardRef}
            className="relative h-[150px] w-full overflow-hidden rounded-[1.5rem] bg-white shadow-[0_8px_25px_rgba(0,0,0,0.05)]"
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
                delay: index * 0.12,
                duration: 0.55,
                ease: "easeOut",
            }}
        >
            {/* Revealed card */}
            <div className="absolute inset-0 flex">
                {/* Number section */}
                <div
                    className={`flex w-[31%] shrink-0 flex-col items-center justify-center ${coverColors[item.color]}`}
                >
                    <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.06)]">
                        <Heart
                            size={32}
                            strokeWidth={2.5}
                            className={heartColors[item.color]}
                        />
                    </div>

                    <span className="mt-2 text-xs font-bold tracking-widest text-slate-500">
                        #{index + 1}
                    </span>
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col justify-center px-5">
                    <h3 className="text-[18px] font-bold leading-tight text-slate-700 md:text-xl">
                        {item.title}
                    </h3>

                    <p className="mt-1 font-hand text-[15px] leading-snug text-slate-500 md:text-base">
                        {item.desc}
                    </p>
                </div>

                {/* Small heart */}
                <Heart
                    size={30}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-200"
                    fill="none"
                />
            </div>

            {/* Scratch cover */}
            <motion.div
                className="absolute inset-0 z-20"
                animate={{
                    opacity: revealed ? 0 : 1,
                }}
                transition={{
                    duration: 0.65,
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

                {/* Scratch instruction */}
                {!revealed && (
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08)]">
                            <Heart
                                size={30}
                                fill="currentColor"
                                className={heartColors[item.color]}
                            />
                        </div>

                        <motion.p
                            className="mt-3 text-sm font-bold tracking-wide text-pink-500"
                            animate={{
                                opacity: [0.55, 1, 0.55],
                            }}
                            transition={{
                                duration: 1.6,
                                repeat: Infinity,
                            }}
                        >
                            SCRATCH TO REVEAL
                        </motion.p>
                    </div>
                )}
            </motion.div>

            {/* Butterfly */}
            <AnimatePresence>
                {revealed && (
                    <Butterfly color={item.wing} />
                )}
            </AnimatePresence>
        </motion.div>
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
     * Create scratch noise using Web Audio.
     * কোনো external audio file লাগবে না।
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

            const bufferSize = ctx.sampleRate * 0.25;

            const buffer = ctx.createBuffer(
                1,
                bufferSize,
                ctx.sampleRate
            );

            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] =
                    (Math.random() * 2 - 1) *
                    (1 - i / bufferSize);
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
        if (!audioContextRef.current) return;
        if (!noiseBufferRef.current) return;

        /*
         * Prevent sound from becoming too noisy.
         */
        if (soundCooldown.current) return;

        soundCooldown.current = true;

        const ctx = audioContextRef.current;

        const source = ctx.createBufferSource();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        source.buffer = noiseBufferRef.current;

        filter.type = "bandpass";
        filter.frequency.value = 2200;
        filter.Q.value = 0.7;

        gain.gain.setValueAtTime(
            0.055,
            ctx.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.08
        );

        source.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        source.start();

        setTimeout(() => {
            soundCooldown.current = false;
        }, 55);
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
            if (previous[index]) return previous;

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
        <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-5 pb-10">

            {/* Soft background */}
            <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-200/20 blur-[110px]"
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.45, 0.65, 0.45],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Heading */}
            <motion.div
                className="relative z-10 mb-7 mt-8 text-center"
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

            {/* Scratch cards */}
            <div className="relative z-10 flex w-full max-w-[490px] flex-col gap-5">
                {thingsToDo.map((item, index) => (
                    <ScratchCard
                        key={item.title}
                        item={item}
                        index={index}
                        revealed={revealed[index]}
                        onReveal={() =>
                            handleReveal(index)
                        }
                        onScratchStart={
                            handleScratchStart
                        }
                        onScratch={handleScratch}
                    />
                ))}
            </div>

            {/* Button */}
            <motion.div
                className="relative z-10 mt-8"
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
