"use client";
import { User } from "@/app/lib/definitions";
import { useState } from "react";
import { updateOptionLearning } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import clsx from "clsx";
import { channel } from "diagnostics_channel";

export default function Chapter1Quiz({user}: {user: User | undefined}) {
    const [correctSelected, setCorrectSelected] = useState<boolean | null>(null);
    const [state, dispatch] = useFormState(updateOptionLearning, undefined);

    function handleButtonClick(button: HTMLButtonElement, isCorrect: boolean) {
        if (!isCorrect) {
            button.classList.add('shake');
            setTimeout(() => {
                button.classList.remove('shake');
            }, 500);
        }
        setCorrectSelected(isCorrect);
    };

    return (
        <div className="w-full">
            <div className="border my-8 border-gray-400 p-6 rounded-md">
                <p className="text-[#909090]">Test yourself!</p>
                <h3 className="my-3">What are the two main types of basic options?</h3>
                <button onClick={(e) => handleButtonClick(e.target as HTMLButtonElement, false)} className="text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]">Long calls and short calls</button>
                <button onClick={(e) => handleButtonClick(e.target as HTMLButtonElement, true)} className={clsx("text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left", correctSelected ? "bg-[var(--home-links-gradient)] text-[var(--text-color-buttons)] hover:bg-[var(--home-links-gradient)] hover:text-[var(--text-color-buttons)]" : "hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]")}>Calls and puts</button>
                <button onClick={(e) => handleButtonClick(e.target as HTMLButtonElement, false)} className="text-[#909090] border border-gray-400 w-full rounded-xl px-4 py-2 my-4 text-left hover:bg-[#b4a6ae] hover:text-[var(--text-color-buttons)]">Straddles and spreads</button>            </div>
            <div className="flex justify-between">
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <form action={dispatch}>
                    <input type="hidden" value ={user?.id} name="user_id"/>
                    <input type="hidden" value={1} name="chapter"/>
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
