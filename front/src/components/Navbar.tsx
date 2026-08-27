import { useState } from "react"
import { Heart, User, ShoppingBag, Search, Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext.tsx"


export function Navbar(){

    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const { cartCount } = useCart()

    return(
        <nav className="border-b border-[#E5E7EB]">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* Ícone menu - só aparece no mobile */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white w-7 h-7 rounded-xl flex items-center justify-center font-bold text-sm">
                        S
                    </div>
                    <span className="font-bold text-lg ">STYLE</span>
                </div>

                {/* Menu - some no celular */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    <a href="#">New In</a>
                    <a href="#">Women</a>
                    <a href="#">Men</a>
                    <button onClick={() => navigate("/sale")}>Sale</button>
                </div>    

                {/*Busca com barra - some no celular */}
                <div className="relative hidden md:block flex-1 max-w-md mx-6">
                    <Search className="absolute left-3 top-3 w-4 h-4 border-[#E5E7EB]" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full border border-[#E5E7EB] rounded-lg pl-11 px-4 py-2 text-sm"/>
                </div>

                {/* Ícones */}
                <div className="flex items-center gap-4">

                    {/* Apenas ícone busca - só aparece no mobile */}
                    <button className="md:hidden"><Search className="w-5 h-5" /></button>

                    <button><Heart className="w-5 h-5" /></button>
                    <button><User className="w-5 h-5" /></button>
                    <button className="relative" onClick={() => navigate("/cart")}>
                        <ShoppingBag className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-4 -right-4 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    
                </div>

            </div>

            {/* Menu de mobile */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-4 px-4 py-4 border-t border-[#E5E7EB] text-sm">
                    <a href="#">New In</a>
                    <a href="#">Women</a>
                    <a href="#">Men</a>
                    <button className="text-left" onClick={() => navigate("/sale")}>Sale</button>
                </div>
            )}
            
        </nav>
    )
}