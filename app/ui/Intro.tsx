"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from '@studio-freight/lenis'
import Image from "next/image";

const lenis = new Lenis()

lenis.on('scroll', (e:any) => {
    console.log(e)
})

function raf(time:any) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

gsap.config({
    force3D: true,
});

gsap.registerPlugin(ScrollTrigger);

const TunnelWithScrollingImage = () => {
    const containerRef = useRef(null);
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const section = sectionRef.current;
        const img = imgRef.current;
        const wrapper = wrapperRef.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=150%", // Adjust this value to control scroll range
                scrub: true,
                pin: true,
                anticipatePin: 1,
                //markers: true,
            },
        });

        tl.to(container, {
            width: "100%",
            height: "100%",
            ease: "none",
        })
        .to(section, {
            scale: 5.1,
            ease: "none",
        }, 0)
        .to(img, {
            scale: 1,
            ease: "none",
        }, 0);

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex items-center justify-center min-h-screen"
        >
            <div className="wrapper" ref={wrapperRef}>
                <div className="rect rect-1"></div>
                <div className="rect rect-2"></div>
                <div className="rect rect-3"></div>
                <div className="rect rect-4"></div>
                <div className="rect rect-5"></div>
                <div className="rect rect-6"></div>
                <div className="rect rect-7"></div>
                <div className="rect rect-8"></div>
                <div className="rect rect-9"></div>
                <div className="rect rect-10"></div>
                <div className="rect rect-11"></div>
                <div className="rect rect-12"></div>
                <div className="rect rect-13"></div>
                <div className="rect rect-14"></div>
                <div className="rect rect-15"></div>
                <div className="rect rect-16"></div>
                <div className="rect rect-17"></div>
                <div className="rect rect-18"></div>
                <div className="rect rect-19"></div>
                <div className="rect rect-20"></div>
                <div className="rect rect-21"></div>
                <div className="rect rect-22"></div>
                <div className="rect rect-23"></div>
                <div className="rect rect-24"></div>
                <div className="rect rect-25"></div>
                <div className="rect rect-26"></div>
                <div className="rect rect-27"></div>
                <div className="rect rect-28"></div>
                <div className="rect rect-29"></div>
                <div className="rect rect-30"></div>
            </div>
            <section
                ref={sectionRef}
                style={{
                    width: "20%",
                    height: "20%",
                    backgroundColor: "#10043c",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    ref={imgRef}
                    src="./logodark.svg"
                    alt="Tapioca"
                    width={100}
                    height={100}
                />
            </section>
        </div>
    );
};

export default TunnelWithScrollingImage;
