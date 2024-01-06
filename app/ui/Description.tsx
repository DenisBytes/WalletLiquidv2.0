"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { fontSyncopate } from "./Fonts";

gsap.registerPlugin(ScrollTrigger);
gsap.config({
    force3D: true,
});

export default function Description() {
    const text1Ref = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLHeadingElement>(null);


    useEffect(() => {
        const text = text1Ref.current;
        const text2 = text2Ref.current;
        const container = containerRef.current;

        if (text && text2 && container) {
            const text1Bounds = text.getBoundingClientRect();
            const text2Bounds = text2.getBoundingClientRect();
            const containerBounds = container.getBoundingClientRect();

            ScrollTrigger.create({
                trigger: text,
                start: "top 25%", // 25% from the top of text1Ref
                end: () => `+=${containerBounds.height}`, // Dynamic end based on container height
                pin: true,
                pinSpacing: false,
                markers: true, // For debugging - remove this in production
            });

            ScrollTrigger.create({
                trigger: text2,
                start: `top ${text1Bounds.y}`, // 25% from the top of text1Ref
                end: () => `+=${text1Bounds.height+20}`, // Dynamic end based on container height
                pin: true,
                pinSpacing: false,
                markers: true, // For debugging - remove this in production
            })

            

        }
    }, []);

    return (
        <div ref={containerRef} className="h-screen min-h-[70vh]">
            <div className={`bg-[#10043c] flex flex-col text-white ${fontSyncopate.className} antialiased`}>
                <h1 ref={text1Ref} className="font-[700] w-full" style={{ fontSize: '105px', lineHeight: '0.8' }}>
                    FIRST <br />
                    DERIVATIVES PAPER <br />
                    TRADING PLATFORM
                </h1>
                <section className="min-h-[50vh]"></section>
                <h1 ref={text2Ref} className="font-[700] w-full ml-[44.3%]" style={{ fontSize: '40px', lineHeight: '1' }}>
                    LEARN, TRADE, <br />
                    TRAIN TO <br />
                    BECOME AN  <br />
                    EXPERT
                </h1>
            </div>
        </div>
    );
}
