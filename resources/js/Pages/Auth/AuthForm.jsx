import { useState } from "react";
import Login from "./Form/Login";
import Register from "./Form/Register";
import { usePage } from "@inertiajs/react";
import ForgotPassword from "./Form/ForgotPassword";

export default function AuthForm({ googleRedirectUrl, mode }) {

    return (
        <div>
            {mode === "login" ? (
                <Login googleRedirectUrl={googleRedirectUrl} />
            ) : mode === "register" ? (
                <Register />
            ) : (
                <ForgotPassword />
            )}
        </div>
    );
}
