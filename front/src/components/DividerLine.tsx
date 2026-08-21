type DividerLineProps = {
    text: string
}

export function DividerLine({text}:DividerLineProps){
    return(
        <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-[#6B7280]">{text}</span>
            <div className="flex-1 h-px bg-gray-200" />
        </div>
    )
}