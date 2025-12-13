import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMdShare } from "react-icons/io";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);        
    }, []);

    return (
        <header>    
            <div className='flex justify-start items-center flex-col xs:flex-row py-2.5 px-5 xs:px-13 gap-2 text-sm bg-gray-700 text-gray-400'>
                <a href="#" className='cursor-pointer transition hover:text-gray-300'>Instagram @usinaguara</a>
                <span className='text-gray-500 hidden xs:block'>|</span>
                <a href="#" className='cursor-pointer transition hover:text-gray-300'>usinaguara@gmail.com</a>
            </div>
            <nav className="flex items-center justify-between py-5 px-5 xs:px-13 bg-gray-900">
                <NavLink to="/" className="w-12 h-12 cursor-pointer drop-shadow-md drop-shadow-transparent transition hover:drop-shadow-red-900">
                    <img src={logo} alt="logo Usina Guará"/>
                </NavLink>
                <ul className="hidden lg:flex items-center justify-center gap-8">
                    <NavLink to="/sobre" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Usina Guará</NavLink>
                    <NavLink to="/projetos" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Projetos</NavLink>
                    <NavLink to="/parceiros" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Nossos Parceiros</NavLink>
                    <a href="/projetos#" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Instagram</a>
                </ul>
                <div className='relative flex items-center gap-4'>
                    <IoMdShare className='hidden lg:block text-2xl text-red-500 cursor-pointer transition hover:text-red-400'/>
                    <button className="hidden lg:block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition cursor-pointer">
                        Entre em contato                        
                    </button>
                    <div id="sandwich" className="lg:hidden w-9 flex items-center justify-center relative cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div id="menu" className="flex flex-col justify-center items-center absolute w-9 h-9 z-10">
                            <input type="checkbox" id="menu-faketrigger" className="peer absolute inset-0 w-9 h-9 opacity-0 cursor-pointer z-20"/>
                            <span className="block w-9 h-1 mb-1.5 bg-white rounded transition-all duration-200 ease-in-out origin-center peer-checked:rotate-45 peer-checked:translate-y-[10px] peer-hover:bg-red-300"></span>
                            <span className="block w-9 h-1 mb-1.5 bg-white rounded transition-all duration-200 ease-in-out peer-checked:opacity-0 peer-hover:bg-red-300"></span>
                            <span className="block w-9 h-1 bg-white rounded transition-all duration-200 ease-in-out origin-center peer-checked:-rotate-45 peer-checked:-translate-y-[10px] peer-hover:bg-red-300"></span>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={`absolute bg-gray-900 z-100 w-full h-screen lg:hidden ${isMenuOpen && window.innerWidth <= 1024 ? "fade_in" : "fade_out"}`}>
                <ul className="lg:hidden flex flex-col items-center justify-center gap-8">
                    <NavLink to="/sobre" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Usina Guará</NavLink>
                    <NavLink to="/projetos" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Projetos</NavLink>
                    <NavLink to="/parceiros" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Nossos Parceiros</NavLink>
                    <a href="/projetos#" className="text-gray-400 border-b-2 border-transparent hover:text-gray-300 hover:border-gray-300 transition">Instagram</a>
                    <button className="lg:hidden block px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-semibold transition cursor-pointer">
                        Entre em contato                        
                    </button> 
                    <IoMdShare className='lg:hidden block text-2xl text-red-500 cursor-pointer transition hover:text-red-400'/>
                </ul>
            </div>
        </header>
    );
}

export default Header;