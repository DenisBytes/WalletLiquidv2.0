"use client";
import { User } from "@/app/lib/definitions";
import { useState } from "react";
import { updateOptionLearning } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import { channel } from "diagnostics_channel";

export default function ChapterQuiz({user, question, answer1, answer2, answer3, correctAnswer, chapterNum}: {user: User | undefined, question: string, answer1: string, answer2: string, answer3: string, correctAnswer: string, chapterNum: number}) {
    const [correctSelected, setCorrectSelected] = useState<boolean | null>(null);
    const [state, dispatch] = useFormState(updateOptionLearning, undefined);

    function handleButtonClick(button: HTMLButtonElement) {
        if (button.id !== correctAnswer) {
            button.classList.add('shake');
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
            setCorrectSelected(false);
        }
        else{
            setCorrectSelected(true);
        }
    };

    return (
        <div className="w-full">
            <div className="border my-8 border-gray-400 p-6 rounded-md">
                <p className="text-[#909090]">Test yourself!</p>
                <h3 className="my-3">What are the two main types of basic options?</h3>
                <button id="first" onClick={(e) => handleButtonClick(e.target as HTMLButtonElement)} className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left", correctSelected ? correctAnswer === "first" ? "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}>{answer1}</button>
                <button id="second" onClick={(e) => handleButtonClick(e.target as HTMLButtonElement)} className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left", correctSelected ? correctAnswer === "second" ? "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}>{answer2}</button>
                <button id="third" onClick={(e) => handleButtonClick(e.target as HTMLButtonElement)} className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left", correctSelected ? correctAnswer === "third" ? "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}>{answer3}</button>            
            </div>
            <div className="flex justify-between">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <form action={dispatch}>
                    <input type="hidden" value ={user?.id} name="user_id"/>
                    <input type="hidden" value={chapterNum} name="chapter"/>
                    <SubmitButton correctSelected={correctSelected}/>
                </form>
            </div>
        </div>
    )
}

function SubmitButton({correctSelected}: {correctSelected: boolean | null}) {
    const {pending} = useFormStatus();

    return (
        <div className="p-2 flex justify-center">
            <button type="submit" className="chapter-submit" disabled={correctSelected === false || correctSelected === null}>
                {pending ? "Loading..." : "Next"}
            </button>
        </div>
    )
}
