import { Link } from "react-router-dom";
import {Mail} from "lucide-react";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { SocialMediaButtons } from "./SocialMediaButtons"
import { DividerLine } from "./DividerLine"

export function SignInCard(){


    return(
        <div className="min-h-screen flex flex-col items-center justify-start md:justify-center px-4 py-10 md:py-12 md:mt-10">
            
            {/* Logo + subtítulo */}
            <div className="flex flex-col items-center mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="bg-black text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold">
                    S
                    </div>
                    <span className="font-bold text-xl">STYLE</span>
                </div>
                <p className="text-[#6B7280] text-base font-normal">Welcome back to your account</p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                
                {/* Título + subtítulo + redes */}
                <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
                <p className="text-[#6B7280] text-center text-base mb-6 font-normal">
                    Enter your credentials to access your account
                </p>

                <SocialMediaButtons/>

                <DividerLine text= "OR CONTINUE WITH EMAIL" />
            
                {/* Form */}
                <form className="flex flex-col gap-4">
                    
                    <FormInput icon={Mail} label="Email address" type="email" placeholder="Enter your email" />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        showForgotPassword
                    />

                    <button type="submit" className="bg-black text-white rounded-lg py-3 text-sm font-semibold cursor-pointer">
                        Sign In
                    </button>

                </form>

                <p className="text-center text-sm text-[#6B7280] mt-6">
                    Don't have an account?{" "}
                    <Link to = {"/signup"} className="font-semibold text-black">Sign up</Link>
                </p>                       
            </div>

            <p className="text-center text-sm text-[#6B7280] mt-8">
                By signing in, you agree to our {" "}
                <a href="#" className="text-black font-medium">Terms of Service</a>
                {" "} and {" "}
                <a href="#" className="text-black font-medium">Privacy Policy</a>
            </p>

        </div>
    )
} 