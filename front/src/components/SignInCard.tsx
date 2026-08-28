import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Mail } from "lucide-react";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { SocialMediaButtons } from "./SocialMediaButtons";
import { DividerLine } from "./DividerLine";
import { login } from "../services/auth";

export function SignInCard() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await login(email, password);

            localStorage.setItem("token", data.token);
            window.dispatchEvent(new Event("auth-changed"));
            navigate("/home");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(
                    err.response?.data?.message || "Erro ao fazer login"
                );
            } else {
                setError("Erro desconhecido");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start md:justify-center px-4 py-10 md:py-12 md:mt-10">

            <div className="flex flex-col items-center mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-black text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold">
                        S
                    </div>
                    <span className="font-bold text-xl">STYLE</span>
                </div>

                <p className="text-[#6B7280] text-base font-normal">
                    Welcome back to your account
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-2">
                    Sign In
                </h2>

                <p className="text-[#6B7280] text-center text-base mb-6 font-normal">
                    Enter your credentials to access your account
                </p>

                <SocialMediaButtons />

                <DividerLine text="OR CONTINUE WITH EMAIL" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <FormInput
                        icon={Mail}
                        label="Email address"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={setEmail}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        showForgotPassword
                        value={password}
                        onChange={setPassword}
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white rounded-lg py-3 text-sm font-semibold cursor-pointer disabled:opacity-60"
                    >
                        {loading ? "Entrando..." : "Sign In"}
                    </button>

                </form>

                <p className="text-center text-sm text-[#6B7280] mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="font-semibold text-black"
                    >
                        Sign up
                    </Link>
                </p>

            </div>

            <p className="text-center text-sm text-[#6B7280] mt-8">
                By signing in, you agree to our{" "}
                <a href="#" className="text-black font-medium">
                    Terms of Service
                </a>
                {" "}and{" "}
                <a href="#" className="text-black font-medium">
                    Privacy Policy
                </a>
            </p>

        </div>
    );
}
