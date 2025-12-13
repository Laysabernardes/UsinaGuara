import { NavLink } from "react-router-dom";
function Header() {
    return (
      <footer className="flex flex-col items-center bg-gray-1 py-16">
        <div className="w-full max-w-7xl flex flex-col items-start justify-between sm:flex-row pb-5 border-b border-blue-2">
          <NavLink to="/sobre" className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Usina Guará</NavLink>
          <NavLink to="/projetos" className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Projetos</NavLink>
          <NavLink to="/parceiros" className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Parceiros</NavLink>
          <NavLink to="/" className="w-max font-semibold text-white cursor-pointer transition hover:text-gray-400">Fale Conosco</NavLink>
        </div>
        <div className="mt-8 mb-6 w-full max-w-7xl">
          <p className="w-full p-4 rounded-lg bg-blue-1 text-white text-lg font-bold text-center">Projeto viabilizado pela Lei Paulo Gustavo (Edital 123456)</p>
        </div>
        <div className="flex justify-between w-full max-w-7xl">
          <a href="mailto:usinaguara@gmail.com" target="blank" className="w-max transition text-sm text-gray-4 hover:text-blue-1">usinaguara@gmail.com</a>
          <p className="w-max transition text-sm text-gray-4">Copyright 2025 Usina Guará.</p>
        </div>
      </footer>
    );
}

export default Header;