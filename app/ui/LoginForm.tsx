"use client";

import { Button } from './Button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { authenticate } from '../lib/actions';
import {useFormState, useFormStatus} from "react-dom"

export default function LoginForm() {
    const [state, dispatch] = useFormState(authenticate, undefined);

    return (
        <form action={dispatch} className="space-y-3">
            <label> Email </label>
                <input type="email" name="email" />
            <label> Password </label>
                <input type="password" name="password" />
            <LoginButton />
        </form>
    );
}
function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
    );
}