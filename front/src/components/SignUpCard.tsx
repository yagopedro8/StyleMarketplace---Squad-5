import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { Mail, User } from "lucide-react"
import { FormInput } from "./FormInput"
import { PasswordInput } from "./PasswordInput"
import { SocialMediaButtons } from "./SocialMediaButtons"
import { DividerLine } from "./DividerLine"
import { register, login } from "../services/auth"

export function SignUpCard() {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setLoading(true)

    try {
      await register({ firstName, lastName, email, password })
      const loginData = await login(email, password)
      localStorage.setItem("token", loginData.token)
      navigate("/home")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Erro ao criar conta")
      } else {
        setError("Erro desconhecido")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start md:justify-center px-4 py-10 md:py-12 md:mt-10">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-black text-white w-8 h-8 rounded-xl flex items-center justify-center font-bold">S</div>
          <span className="font-bold text-xl">STYLE</span>
        </div>
        <p className="text-[#6B7280] text-base font-normal">Create your account and start shopping</p>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-[#6B7280] text-center text-base mb-6 font-normal">
          Join our community and discover amazing fashion
        </p>

        <SocialMediaButtons />
        <DividerLine text="OR CREATE WITH EMAIL" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput icon={User} label="First name" placeholder="First name" value={firstName} onChange={setFirstName} />
            <FormInput label="Last name" placeholder="Last name" value={lastName} onChange={setLastName} />
          </div>

          <FormInput icon={Mail} label="Email address" type="email" placeholder="Enter your email" value={email} onChange={setEmail} />

          <div>
            <PasswordInput label="Password" placeholder="Create a password" value={password} onChange={setPassword} />
            <p className="text-xs text-[#6B7280] mt-1">Must be at least 6 characters long</p>
          </div>

          <PasswordInput label="Confirm password" placeholder="Confirm your password" value={confirmPassword} onChange={setConfirmPassword} />

          <label className="flex items-start gap-2 text-sm text-[#6B7280]">
            <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required className="mt-0.5 w-4 h-4 rounded-full accent-black cursor-pointer" />
            I agree to the Terms of Service and Privacy Policy
          </label>

          <label className="flex items-start gap-2 text-sm text-[#6B7280]">
            <input type="checkbox" className="mt-0.5 w-4 h-4 rounded-full accent-black cursor-pointer" />
            Subscribe to our newsletter for exclusive offers and updates
          </label>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-lg py-3 text-sm font-semibold cursor-pointer disabled:opacity-60"
          >
            {loading ? "Criando conta..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Already have an account?{" "}
          <Link to="/" className="font-semibold text-black">Sign in</Link>
        </p>
      </div>
    </div>
  )
}