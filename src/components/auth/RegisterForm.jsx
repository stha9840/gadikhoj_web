import React from 'react'
import { userRegisterUserTan } from '../../hooks/useRegisterUserTan';
import { useState } from 'react';
import { toast } from "react-toastify"

export default function RegisterForm() {
    const { mutate, data, error, isPending, isSuccess, isError } = userRegisterUserTan()

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !username || !pass || !confirmPass || !firstName || !lastname) {
            if (!email) toast.error("Email is empty");
            if (!username) toast.error("Username is empty");
            if (!pass) toast.error("Password is empty");
            if (!confirmPass) toast.error("Confirm password is empty");
            return;
        }

        if (!email.includes("@")) {
            toast.error("Email must include @ (e.g., example@email.com)");
            return;
        }

        if (pass !== confirmPass) {
            toast.error("Passwords do not match");
            return;
        }

        const formData = {
            email,
            username,
            password: pass,
        };

        mutate(formData);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-4">
            <h2 className="text-xl font-semibold text-center">Register</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded"
            />
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full px-4 py-2 border rounded"
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-4 py-2 border rounded"
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
            >
                {isPending ? "Registering..." : "Register"}
            </button>

            {isSuccess && <p className="text-green-600 text-sm text-center">{data.message}</p>}
            {isError && <p className="text-red-500 text-sm text-center">{error.message}</p>}
        </div>
    );
}
