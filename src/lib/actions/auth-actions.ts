"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export async function signUp(name: string, email: string, password: string) {
    const result = await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
            callbackURL: "/dashboard",
            rememberMe: true,
        }
    })

    return result;
}

export async function signIn(email: string, password: string) {
    const result = await auth.api.signInEmail({
        body: {
            email,
            password,
            rememberMe: true,
        }
    });
    return result;
}

export async function signInWithSocial(provider: string) {

    const result = await auth.api.signInSocial({
        body: {
            provider,
            callbackURL: "/dashboard",
        }
    });

    if (result?.url) {
        redirect(result.url)
    }
}

export async function signOut() {
    const result = await auth.api.signOut({
        headers: await headers()
    })
    return result;
}