import type { LucideIcon } from "lucide-react"


type FormInputProps = {
  icon?: LucideIcon
  label: string
  type?: string
  placeholder: string
  value:string
  onChange: (value: string) => void
}

export function FormInput({ icon: Icon, label, type = "text", placeholder, value, onChange }: FormInputProps) {
  return (
    <div>
      <label className="text-sm font-semibold block mb-2">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 w-4 h-4 text-[#6B7280]" />
        )} 
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className= {`w-full border border-[#E5E7EB] rounded-lg  py-2 text-sm ${Icon ? "pl-10 pr-3" : "px-3"}`}
        />
      </div>
    </div>
  )
}