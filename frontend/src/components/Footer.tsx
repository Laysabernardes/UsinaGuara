import { NavLink } from "react-router-dom";
import regua from "../assets/regua.png";

function Footer() {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
      <footer className="flex flex-col items-center bg-gray-1 py-16">
        <div className="w-[90%] flex flex-col items-start justify-between sm:flex-row gap-2 sm:gap-0 pb-5 border-b border-blue-2">
          <NavLink onClick={scrollToTop} to="/sobre" className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Usina Guará</NavLink>
          <NavLink onClick={scrollToTop} to="/projetos" className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Projetos</NavLink>
          <NavLink onClick={scrollToTop} to="/parceiros" className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Parceiros</NavLink>
          <a href="https://www.instagram.com/usinaguara/" target='blank' className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Instagram</a>
        </div>
        <div className="mt-8 mb-6 w-[90%]">
           <img src={regua} alt="footer" />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 items-center justify-between w-[90%]">
          <a href="mailto:usinaguara@gmail.com" target="blank" className="w-max transition text-sm text-gray-4 hover:text-blue-1">usinaguara@gmail.com</a>
          <p className="w-max transition text-sm text-gray-4">Copyright 2025 Usina Guará.</p>
        </div>
      </footer>
    );
}

export default Footer;