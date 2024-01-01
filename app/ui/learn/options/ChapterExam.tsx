"use client";
import { User } from "@/app/lib/definitions";
import { useState } from "react";
import { updateOptionLearning } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";

export default function ChapterExam({
    user, chapterNum,
    q1, q1a1, q1a2, q1a3, q1Correct, 
    q2, q2a1, q2a2, q2a3, q2Correct, 
    q3, q3a1, q3a2, q3a3, q3Correct, 
    q4, q4a1, q4a2, q4a3, q4Correct}: 
    {user: User | undefined,chapterNum: number,
    q1: string, q1a1: string, q1a2: string, q1a3: string, q1Correct: string,
    q2: string, q2a1: string, q2a2: string, q2a3: string, q2Correct: string,
    q3: string, q3a1: string, q3a2: string, q3a3: string, q3Correct: string,
    q4: string, q4a1: string, q4a2: string, q4a3: string, q4Correct: string}) {
    const [firstQuestionCorrect, setFirstQuestionCorrect] = useState<boolean>(false);
    const [secondQuestionCorrect, setSecondQuestionCorrect] = useState<boolean>(false);
    const [thirdQuestionCorrect, setThirdQuestionCorrect] = useState<boolean>(false);
    const [fourthQuestionCorrect, setFourthQuestionCorrect] = useState<boolean>(false);
    const [state, dispatch] = useFormState(updateOptionLearning, undefined);
    
    function handleFirstQuestion(button: HTMLButtonElement) {
        if (button.id !== q1Correct) {
            button.classList.add('shake');
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
            setFirstQuestionCorrect(false);
        }
        else{
            setFirstQuestionCorrect(true);
        }
    };

    function handleSecondQuestion(button: HTMLButtonElement) {
        if (button.id !== q2Correct) {
            button.classList.add('shake');
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
            setSecondQuestionCorrect(false);
        }
        else{
            setSecondQuestionCorrect(true);
        }
    };

    function handleThirdQuestion(button: HTMLButtonElement) {
        if (button.id !== q3Correct) {
            button.classList.add('shake');
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
            setThirdQuestionCorrect(false);
        }
        else{
            setThirdQuestionCorrect(true);
        }
    };

    function handleFourthQuestion(button: HTMLButtonElement) {
        if (button.id !== q4Correct) {
            button.classList.add('shake');
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
            setFourthQuestionCorrect(false);
        }
        else{
            setFourthQuestionCorrect(true);
        }
    }

    return (
        <div className="w-full">
            <div className="border my-8 border-gray-400 p-6 rounded-md">
                <p className="text-[#909090]">Test yourself!</p>
                <h3 className="my-3">{q1}</h3>


                <button id="q1first" 
                    onClick={(e) => handleFirstQuestion(e.target as HTMLButtonElement)} 
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    firstQuestionCorrect ? q1Correct === "q1first" ? 
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q1a1}</button>
                <button id="q1second" 
                    onClick={(e) => handleFirstQuestion(e.target as HTMLButtonElement)} 
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    firstQuestionCorrect ? q1Correct === "q1second" ? 
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q1a2}</button>
                <button id="q1third" 
                    onClick={(e) => handleFirstQuestion(e.target as HTMLButtonElement)} 
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    firstQuestionCorrect ? q1Correct === "q1third" ? 
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q1a3}</button>
                <br/> <br />


                <h3 className="my-3">{q2}</h3>
                <button id="q2first"
                    onClick={(e) => handleSecondQuestion(e.target as HTMLButtonElement)} 
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    secondQuestionCorrect ? q2Correct === "q2first" ? 
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q2a1}</button>
                <button id="q2second"
                    onClick={(e) => handleSecondQuestion(e.target as HTMLButtonElement)} 
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    secondQuestionCorrect ? q2Correct === "q2second" ? 
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q2a2}</button>
                <button id="q2third"
                    onClick={(e) => handleSecondQuestion(e.target as HTMLButtonElement)} 
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    secondQuestionCorrect ? q2Correct === "q2third" ? 
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q2a3}</button>
                <br/> <br />


                <h3 className="my-3">{q3}</h3>
                <button id="q3first"
                    onClick={(e) => handleThirdQuestion(e.target as HTMLButtonElement)}
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    thirdQuestionCorrect ? q3Correct === "q3first" ?
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q3a1}</button>
                <button id="q3second"
                    onClick={(e) => handleThirdQuestion(e.target as HTMLButtonElement)}
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    thirdQuestionCorrect ? q3Correct === "q3second" ?
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q3a2}</button>
                <button id="q3third"
                    onClick={(e) => handleThirdQuestion(e.target as HTMLButtonElement)}
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    thirdQuestionCorrect ? q3Correct === "q3third" ?
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q3a3}</button>
                <br/> <br />


                <h3 className="my-3">{q4}</h3>
                <button id="q4first"
                    onClick={(e) => handleFourthQuestion(e.target as HTMLButtonElement)}
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    fourthQuestionCorrect ? q4Correct === "q4first" ?
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q4a1}</button>
                <button id="q4second"
                    onClick={(e) => handleFourthQuestion(e.target as HTMLButtonElement)}
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    fourthQuestionCorrect ? q4Correct === "q4second" ?
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q4a2}</button>
                <button id="q4third"
                    onClick={(e) => handleFourthQuestion(e.target as HTMLButtonElement)}
                    className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left",
                    fourthQuestionCorrect ? q4Correct === "q4third" ?
                    "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" 
                    : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}
                    >{q4a3}</button>
            </div>
            <div className="flex justify-between">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <form action={dispatch}>
                    <input type="hidden" value ={user?.id} name="user_id"/>
                    <input type="hidden" value={chapterNum} name="chapter"/>
                    <SubmitButton firstQuestionCorrect={firstQuestionCorrect} secondQuestionCorrect={secondQuestionCorrect} thirdQuestionCorrect={thirdQuestionCorrect} fourthQuestionCorrect={fourthQuestionCorrect}/>
                </form>
            </div>
        </div>
    )
}

function SubmitButton({firstQuestionCorrect, secondQuestionCorrect, thirdQuestionCorrect, fourthQuestionCorrect}: {firstQuestionCorrect: boolean, secondQuestionCorrect: boolean, thirdQuestionCorrect: boolean, fourthQuestionCorrect: boolean}) {
    const {pending} = useFormStatus();

    return (
        <div className="p-2 flex justify-center">
            <button type="submit" className="chapter-submit" disabled={!firstQuestionCorrect || !secondQuestionCorrect || !thirdQuestionCorrect || !fourthQuestionCorrect}>
                {pending ? "Loading..." : "Submit"}
            </button>
        </div>
    )
}