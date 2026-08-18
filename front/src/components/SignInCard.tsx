import GoogleIcon from "../assets/GoogleIcon.svg"
import FacebookIcon from "../assets/FacebookIcon.svg"
import { Link } from "react-router-dom"
import {Mail, Lock, Eye, EyeOff} from "lucide-react"
import { useState } from "react"

export function SignInCard(){

    const [showPassword, setShowPassword] = useState(false);

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

                <div className="flex flex-col gap-3 mb-8">
                    
                        <button className=" flex gap-3 items-center justify-center border border-[#E5E7EB] rounded-lg py-2 text-sm font-semibold">
                            <img className=" w-4 h-4" src={GoogleIcon} alt="Google Icon"/>
                            Continue with Google
                        </button>
                
                    
                        <button className="flex gap-3 items-center justify-center border border-[#E5E7EB] rounded-lg py-2 text-sm font-semibold">
                            <img className=" left-3 w-4 h-4" src={FacebookIcon} alt="Facebook Icon" />
                            Continue with Facebook
                        </button>
                </div>  

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-[#6B7280]">OR CONTINUE WITH EMAIL</span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>
            
                {/* Form */}
                <form className="flex flex-col gap-4">
                    <div >
                        <label className="text-sm font-semibold block mb-2">Email address</label>
                        <div className="relative">
                            <Mail className="absolute text-[#6B7280] left-3 top-3 w-4 h-4"></Mail>
                            <input type="email" placeholder="Enter your email" className="w-full border border-[#E5E7EB] rounded-lg pl-10 pr-3 py-2 text-sm"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="text-sm font-semibold">Password</label>
                            <a href="#" className="text-sm text-black">Forgot password?</a>
                        </div>

                        <div className="relative">
                            <Lock className="absolute text-[#6B7280] left-3 top-3 w-4 h-4"></Lock>    
                            <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password" 
                            className="w-full border border-[#E5E7EB] rounded-lg pl-10 pr-3 py-2 text-sm"
                            />
                            <button type="button" onClick={()=> setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-3">
                                {showPassword ? (
                                    <Eye className="w-4 h-4"/>
                                ) : (
                                    <EyeOff className="w-4 h-4"/>
                                )}
                            
                            </button>
                        </div>
                    </div>

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