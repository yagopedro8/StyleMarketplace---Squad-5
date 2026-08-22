import { Link } from "react-router-dom";
import { SocialMediaButtons } from "./SocialMediaButtons";
import { DividerLine } from "./DividerLine";
import { FormInput } from "./FormInput";
import { PasswordInput } from "./PasswordInput";
import { User, Mail} from "lucide-react";

export function SignUpCard(){
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
                <p className="text-[#6B7280] text-base font-normal">Create your account and start shopping</p>
            
            </div>

            {/* Card */}
            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                
                {/* Título + subtítulo + redes */}
                <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
                <p className="text-[#6B7280] text-center text-base mb-6 font-normal">
                    Join our community and discover amazing fashion
                </p>

                <SocialMediaButtons/>

                <DividerLine text= "OR CREATE WITH EMAIL" />

                {/* Form */}
                <form className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput icon={User} label="First name" placeholder="First name" />
                        <FormInput label="Last name" placeholder="Last name" />
                    </div>

                     <FormInput icon={Mail} label="Email adress" placeholder="Enter your email"/>

                     <div>
                        <PasswordInput label="Password" placeholder="Create a password" />
                        <p className="text-xs text-[#6B7280] mt-2">Must be at least 8 characters long</p>
                    </div>

                    <PasswordInput label="Confirm password" placeholder="Confirm your password" />
                    
                    {/* Checkboxes */}
                    <div className="flex flex-col gap-3">
                        <label className="flex items-start gap-2 text-sm text-black font-semibold">
                            <input type="checkbox" required className="mt-0.5 accent-black cursor-pointer" />
                            I agree to the Terms of Service and Privacy Policy
                        </label>

                        <label className="flex items-start gap-2 text-sm text-black font-semibold">
                            <input type="checkbox" className="mt-0.5 accent-black cursor-pointer" />
                            Subscribe to our newsletter for exclusive offers and updates
                        </label>
                    </div>

                    <button type="submit" className="bg-black text-white rounded-lg py-3 text-sm font-semibold cursor-pointer">
                        Create Account
                    </button>

                </form>

                <p className="text-center text-sm text-[#6B7280] mt-6">
                    Already have an account? {" "}
                    <Link to = {"/signin"} className="font-semibold text-black">Sign in</Link>
                </p>

            </div>

        </div>
    )
}