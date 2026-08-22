import GoogleIcon from "../assets/GoogleIcon.svg"
import FacebookIcon from "../assets/FacebookIcon.svg"

export function SocialMediaButtons() {
  return (
    <div className="flex flex-col gap-3 mb-8">
      <button className="flex gap-3 items-center justify-center border border-[#E5E7EB] rounded-lg py-2 text-sm font-semibold">
        <img className="w-4 h-4" src={GoogleIcon} alt="Google Icon" />
        Continue with Google
      </button>

      <button className="flex gap-3 items-center justify-center border border-[#E5E7EB] rounded-lg py-2 text-sm font-semibold">
        <img className="w-4 h-4" src={FacebookIcon} alt="Facebook Icon" />
        Continue with Facebook
      </button>
    </div>
  )
}