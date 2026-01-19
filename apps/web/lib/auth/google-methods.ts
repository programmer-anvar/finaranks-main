"use server"

import { handler } from "../../auth";

export const signInByGoogle = async () => {
    const { signIn } = handler;
    return await signIn('google', {
        redirectTo: '/profile/dashboard',
    });
}


export const logOutByGoogle = async () => {
    const { signOut } = handler;
    return await signOut()
}
