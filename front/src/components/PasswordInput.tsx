import { useState } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"


type PasswordInputProps = {
  label: string
  placeholder: string
  showForgotPassword?: boolean
  value: string
  onChange: (value: string) => void
}

export function PasswordInput({ label, placeholder, showForgotPassword = false, value, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-semibold">{label}</label>
        {showForgotPassword && (
          <a href="#" className="text-sm text-black">Forgot password?</a>
        )}
      </div>

      <div className="relative">
        <Lock className="absolute text-[#6B7280] left-3 top-3 w-4 h-4" />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-[#E5E7EB] rounded-lg pl-10 pr-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute cursor-pointer right-3 top-3"
        >
          {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}