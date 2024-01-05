"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import { HPlayer } from "../lib/player";

const chillSynthwaveHowl = new Howl({
    src: ['/chill-synthwave.mp3'],
    // Other Howl options as required
});

const timecompHowl = new Howl({
    src: ['/timecop.mp3'],
    // Other Howl options as required
});
const audio: any = [{title: "Timecop",song: "/timecop.mp3", howl: timecompHowl}, {title: "Chill synthwave",song: "/chill-synthwave.mp3", howl: chillSynthwaveHowl}]; 

const player = new HPlayer(audio);

export const Player = () => {

    const [isPlaying, setIsPlaying] = useState(player.playing());

    const handleClick = (e:any) => {
        e.preventDefault();
        player.toggle();
        setIsPlaying(!isPlaying);
    }

    useEffect(() => {
        let requestId: number;

        const animateWave = () => {
            const rects = document.querySelectorAll('.audio-rect');

            if (rects.length === 0) return;

            let phases: number[] = [];
            let speeds: number[] = [];

            rects.forEach((rect: any) => {
                phases.push(0);
                speeds.push(Math.random() * 4 + 1); // Generate random speeds between 1 and 5
            });

            const animate = () => {
                phases = phases.map((phase, index) => {
                    phase = (phase - speeds[index]) % 360; // Update phase for each rect based on its speed to move towards the top
                    const height = 4 + Math.sin((phase * Math.PI) / 180) * 3; // Adjust the wave height based on the sine function
                    rects[index].setAttribute('height', String(height)); // Set the new height for each rect
                    return phase;
                });

                requestId = requestAnimationFrame(animate);
            };

            if (isPlaying) {
                animate(); // Start animation if playing
            } else {
                cancelAnimationFrame(requestId); // Stop animation if paused
            }

            return () => {
                if (requestId) {
                    cancelAnimationFrame(requestId); // Cleanup when unmounting
                }
            };
        };

        animateWave();

        return () => {
            if (requestId) {
                cancelAnimationFrame(requestId); // Cleanup when unmounting
            }
        };
    }, [isPlaying]);

    return (
        <nav className="fixed z-10 top-0 left-0 w-[90%] mx-[5%] my-[2%] flex justify-between items-center">
            <Image
                src="/logoname.svg"
                alt="logo"
                width={200}
                height={100}
                className="p-4 rounded-lg border border-[#FFCBF4] bg-[#10043c]"
            />
            <button
                onClick={handleClick}
                aria-label="Play"
                className="p-4 rounded-lg border-[1px] border-[#FFCBF4] bg-[#10043c]"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    className={isPlaying ? 'zg-playing' : ''}
                >
                    <rect x="8" y="12" width="1.5" height="4" rx="0.75" fill="#FFCBF4" className="audio-rect" />
                    <rect x="13.5" y="12" width="1.5" height="4" rx="0.75" fill="#FFCBF4" className="audio-rect" />
                    <rect x="19" y="12" width="1.5" height="4" rx="0.75" fill="#FFCBF4" className="audio-rect" />
                </svg>
            </button>
        </nav>
    )
}
