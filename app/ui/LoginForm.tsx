"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { fontSyncopate } from "./Fonts";
import { authenticate } from "../lib/actions";

gsap.config({
    force3D: true,
});

gsap.registerPlugin(ScrollTrigger);

export default function LoginForm() {
    const signUpRef = useRef(null);
    const loginRef = useRef(null);
    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        const signUp = signUpRef.current;
        const login = loginRef.current;

        if (signUp && login) {
            gsap.to(signUp, {
                x: "850",
                scrollTrigger: {
                    trigger: signUp,
                    start: "top 50%",
                    end: "bottom 50%",
                    toggleActions: "play none none reverse",
                },
            });

            gsap.to(login, {
                x: "-850px",
                scrollTrigger: {
                    trigger: login,
                    start: "top 50%",
                    end: "bottom 50%",
                    toggleActions: "play none none reverse",
                },
            });
        }
    }, []);

    return (
        <div className="flex w-full justify-around">
            <form ref={signUpRef} action={dispatch} className="flex flex-col w-1/4 justify-center items-center relative left-[-800px] bg-transparent border border-[#FFCBF4] rounded-md ">
                <input type="hidden" name="email" value="user3@nextmail.com" />
                <input type="hidden" name="password" value="123456" />
                <NoLoginButton />
            </form>
            <div className="login-logo mt-[5%] flex justify-center items-center"></div>
            <form action={dispatch} ref={loginRef}className="flex flex-col w-1/4 justify-between items-center relative right-[-800px] bg-transparent border border-[#FFCBF4] rounded-md p-4">
                <h1 className="text-white text-4xl">Log in</h1>
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCBF4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 border border-[#FFCBF4] p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
                    </svg>
                    <input name="email" className="m-4 p-2 border border-[#FFCBF4] bg-slate-600 placeholder:text-[#FFCBF4] focus:bg-white focus:text-[black]" type="email" placeholder="Email" />
                </div>
                <div className="flex justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCBF4" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 border border-[#FFCBF4] p-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                    </svg>
                    <input name="password" className="m-4 p-2 border border-[#FFCBF4] bg-slate-600 placeholder:text-[#FFCBF4] focus:bg-white focus:text-[black]" type="password" placeholder="Password" />
                </div>
                <div className="flex justify-center items-center">
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}

function SubmitButton(){
    const {pending} = useFormStatus();

    return (
        <button type="submit" className={`${fontSyncopate.className} antialiased w-50 p-2 border border-[#FFCBF4] text-white rounded-md hover:bg-[#FFCBF4] hover:text-[#10043c] hover:shadow-slate-500 hover:shadow-sm `}>
            {pending ? "LOADING..." : "SUBMIT"}
        </button>
    )
}


function NoLoginButton(){
    const {pending} = useFormStatus();

    return (
        <button type="submit" className={`${fontSyncopate.className} antialiased w-full h-full p-2 text-white rounded-md hover:bg-[#FFCBF4] text-3xl hover:text-[#10043c] hover:shadow-slate-500 hover:shadow-sm `}>
            {pending ? "LOADING..." : "NO LOGIN"}
        </button>
    )
}