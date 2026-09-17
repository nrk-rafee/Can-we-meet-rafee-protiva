"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Heart } from "lucide-react";

import Button from "../Button";

const thingsToDo = [
    {
        title: "Hug for 30 mins",
        desc: "Just holding you tight",
        color: "#f8b8c5",
        accent: "#f35d7a",
    },
    {
        title: "Food Date",
        desc: "Eating all our favorites",
        color: "#a9cef9",
        accent: "#4d9bf3",
    },
    {
        title: "Movie Date",
        desc: "Watching something together",
        color: "#f9e875",
        accent: "#f4b900",
    },
    {
        title: "Endless Photos",
        desc: "Capturing your beautiful smile",
        color: "#d9b8f7",
        accent: "#a65de8",
    },
    {
        title: "Late Night Walks",
        desc: "Hand in hand under the stars",
        color: "#83e8d8",
        accent: "#11b9a8",
    },
    {
        title: "Make New Memories",
        desc: "Creating moments we'll never forget",
        color: "#f5b9d9",
        accent: "#ef559b",
    },
];

/* --------------------------------
   REALISTIC-STYLE BUTTERFLY MOTION
--------------------------------- */

function Butterfly({ color }) {
    return (
        <motion.div
            className="pointer-events-none absolute left-1/2 top-[45%] z-[100] text-[42px] select-none"
            initial={{
                x: "-50%",
                y: "-50%",
                scale: 0.2,
                opacity: 0,
                rotate: -8,
            }}
            animate={{
                x: [
                    "-50%",
                    "-80%",
                    "-35%",
                    "5%",
                    "-20%",
                    "35%",
                    "75%",
                ],
                y: [
                    "-50%",
                    "-110%",
                    "-175%",
                    "-245%",
                    "-320%",
                    "-405%",
                    "-500%",
                ],
                scale: [
                    0.2,
                    0.7,
                    1,
                    1.08,
                    0.95,
                    0.75,
                    0.35,
                ],
                rotate: [
                    -8,
                    10,
                    -12,
                    8,
                    -10,
                    12,
                    22,
                ],
                opacity: [
                    0,
                    1,
                    1,
                    1,
                    0.95,
                    0.7,
                    0,
                ],
            }}
            transition={{
                duration: 4.5,
                ease: "easeOut",
            }}
            style={{
                filter: `drop-shadow(0 5px 7px rgba(0,0,0,0.18))`,
            }}
        >
            <motion.span
                animate={{
                    rotateY: [
                        0,
                        55,
                        -45,
                        50,
                        -40,
                        45,
                        0,
                    ],
                    scaleX: [
                        1,
                        0.72,
                        1,
                        0.7,
                        1,
                        0.75,
                        1,
                    ],
                }}
                transition={{
                    duration: 0.55,
                    repeat: 7,
                    ease: "easeInOut",
                }}
                style={{
                    display: "inline-block",
                    color: color,
                    transformStyle: "preserve-3d",
                }}
            >
                🦋
            </motion.span>
        </motion.div>
    );
}

/* --------------------------------
   SCRATCH CARD
--------------------------------- */

function ScratchCard({
    item,
    index,
    revealed,
    onReveal,
}) {
    const canvasRef = useRef(null);
    const cardRef = useRef(null);

    const drawing = useRef(false);
    const lastPoint = useRef(null);

    const scratchProgress = useRef(0);
    const revealTriggered = useRef(false);

    useEffect(() => {
        revealTriggered.current = revealed;
    }, [revealed]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const card = cardRef.current;

        if (!canvas || !card) return;

        const setupCanvas = () => {
            const rect = card.getBoundingClientRect();

            const dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            canvas.width = Math.floor(
                rect.width * dpr
            );

            canvas.height = Math.floor(
                rect.height * dpr
            );

            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext("2d");

            if (!ctx) return;

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

            /* -------------------------
               FULL PASTEL COVER
            ------------------------- */

            ctx.globalCompositeOperation =
                "source-over";

            ctx.fillStyle = item.color;

            ctx.fillRect(
                0,
                0,
                rect.width,
                rect.height
            );

            /* -------------------------
               DOT PATTERN
            ------------------------- */

            for (
                let x = 20;
                x < rect.width - 10;
                x += 27
            ) {
                for (
                    let y = 18;
                    y < rect.height - 10;
                    y += 25
                ) {
                    ctx.beginPath();

                    ctx.arc(
                        x,
                        y,
                        2,
                        0,
                        Math.PI * 2
                    );

                    ctx.fillStyle =
                        "rgba(255,255,255,0.25)";

                    ctx.fill();
                }
            }

            /* -------------------------
               INNER WHITE BORDER
            ------------------------- */

            ctx.strokeStyle =
                "rgba(255,255,255,0.9)";

            ctx.lineWidth = 2;

            ctx.setLineDash([5, 5]);

            ctx.strokeRect(
                11,
                11,
                rect.width - 22,
                rect.height - 22
            );

            ctx.setLineDash([]);

            scratchProgress.current = 0;
        };

        setupCanvas();

        const observer =
            new ResizeObserver(setupCanvas);

        observer.observe(card);

        return () => observer.disconnect();
    }, [item.color]);

    const getPoint = (event) => {
        const canvas = canvasRef.current;

        if (!canvas) return null;

        const rect =
            canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const startScratch = (event) => {
        if (revealed) return;

        event.preventDefault();

        drawing.current = true;

        lastPoint.current =
            getPoint(event);

        try {
            canvasRef.current?.setPointerCapture(
                event.pointerId
            );
        } catch {}
    };

    const scratch = (event) => {
        if (revealed) return;
        if (!drawing.current) return;

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

        const previous =
            lastPoint.current;

        const distance = Math.sqrt(
            Math.pow(
                point.x - previous.x,
                2
            ) +
                Math.pow(
                    point.y - previous.y,
                    2
                )
        );

        /*
         * Track scratching.
         */
        scratchProgress.current +=
            distance * 30;

        /* -------------------------
           ERASE
        ------------------------- */

        ctx.save();

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.lineWidth = 38;

        ctx.beginPath();

        ctx.moveTo(
            previous.x,
            previous.y
        );

        ctx.lineTo(
            point.x,
            point.y
        );

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            19,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        lastPoint.current = point;

        /*
         * Enough scratching = reveal.
         */
        const rect =
            canvas.getBoundingClientRect();

        const area =
            rect.width * rect.height;

        const required =
            area * 0.32;

        if (
            scratchProgress.current >=
                required &&
            !revealTriggered.current
        ) {
            revealTriggered.current = true;

            onReveal();
        }
    };

    const stopScratch = (event) => {
        drawing.current = false;

        lastPoint.current = null;

        try {
            canvasRef.current?.releasePointerCapture(
                event.pointerId
            );
        } catch {}
    };

    return (
        <div className="relative w-full">
            {/* --------------------------------
                REVEALED CONTENT
            -------------------------------- */}

            <motion.div
                ref={cardRef}
                className="relative h-[185px] w-full overflow-hidden rounded-[1.8rem] bg-white shadow-[0_12px_35px_rgba(0,0,0,0.07)]"
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
                    delay: index * 0.09,
                    duration: 0.55,
                }}
            >
                {/* Text underneath */}
                <div className="absolute inset-0 flex items-stretch bg-white">
                    <div
                        className="flex w-[30%] shrink-0 flex-col items-center justify-center"
                        style={{
                            backgroundColor:
                                item.color,
                        }}
                    >
                        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white shadow-[0_7px_20px_rgba(0,0,0,0.08)]">
                            <Heart
                                size={39}
                                strokeWidth={2.4}
                                style={{
                                    color: item.accent,
                                }}
                            />
                        </div>

                        <span className="mt-3 text-xs font-bold tracking-[0.18em] text-slate-500">
                            #{index + 1}
                        </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-center px-6">
                        <h3 className="max-w-[310px] text-[21px] font-bold leading-tight text-slate-700 md:text-2xl">
                            {item.title}
                        </h3>

                        <p className="mt-2 max-w-[310px] font-hand text-[17px] leading-snug text-slate-500 md:text-lg">
                            {item.desc}
                        </p>
                    </div>
                </div>

                {/* --------------------------------
                    SCRATCH COVER
                -------------------------------- */}

                <motion.div
                    className="absolute inset-0 z-30"
                    animate={{
                        opacity: revealed
                            ? 0
                            : 1,
                        scale: revealed
                            ? 1.02
                            : 1,
                    }}
                    transition={{
                        duration: 0.75,
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
                        className="absolute inset-0 h-full w-full touch-none"
                        onPointerDown={
                            startScratch
                        }
                        onPointerMove={
                            scratch
                        }
                        onPointerUp={
                            stopScratch
                        }
                        onPointerCancel={
                            stopScratch
                        }
                        onPointerLeave={
                            stopScratch
                        }
                    />

                    {/* Center content */}
                    {!revealed && (
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white shadow-[0_7px_22px_rgba(0,0,0,0.08)]"
                                animate={{
                                    scale: [
                                        1,
                                        1.06,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <Heart
                                    size={31}
                                    fill={item.accent}
                                    style={{
                                        color: item.accent,
                                    }}
                                />
                            </motion.div>

                            <motion.span
                                className="mt-4 text-[14px] font-bold tracking-wide"
                                style={{
                                    color: item.accent,
                                }}
                                animate={{
                                    opacity: [
                                        0.6,
                                        1,
                                        0.6,
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                            >
                                TAP TO REVEAL
                            </motion.span>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* --------------------------------
                BUTTERFLY
            -------------------------------- */}

            <AnimatePresence>
                {revealed && (
                    <Butterfly
                        color={item.accent}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

/* --------------------------------
   MAIN SCREEN
--------------------------------- */

function ThingsToDoScreen({ onNext }) {
    const [revealed, setRevealed] =
        useState(
            () =>
                Array(
                    thingsToDo.length
                ).fill(false)
        );

    const revealCard = (index) => {
        setRevealed((previous) => {
            if (previous[index]) {
                return previous;
            }

            const next = [...previous];

            next[index] = true;

            return next;
        });
    };

    return (
        <div className="relative left-1/2 flex min-h-screen w-screen -translate-x-1/2 flex-col items-center overflow-hidden bg-[#fff8f8] px-5 pb-12">
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-200/20 blur-[110px]" />

                <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-yellow-100/20 blur-[100px]" />
            </div>

            {/* Heading */}
            <motion.div
                className="relative z-10 mb-8 mt-9 text-center"
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
            <div className="relative z-10 flex w-full max-w-[620px] flex-col gap-7">
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
                                revealCard(
                                    index
                                )
                            }
                        />
                    )
                )}
            </div>

            {/* Button */}
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
                    icon={
                        <Camera size={18} />
                    }
                />
            </motion.div>
        </div>
    );
}

export default ThingsToDoScreen;
