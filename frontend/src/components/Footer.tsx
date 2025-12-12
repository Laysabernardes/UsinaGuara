function Header() {
    return (
      <footer className="flex flex-col items-center bg-gray-1 py-16">
        <div className="w-full max-w-7xl flex flex-col items-start justify-between sm:flex-row pb-12 border-b border-blue-2">
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Institucional</h2>
              <div className="flex flex-col gap-2">
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">A Usina Guará</p>
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Nossa Equipe</p>
              </div>
            </div>
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Projetos</h2>
              <div className="flex flex-col gap-2">
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Vila Operária Fabril</p>
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Marina Caraguatá</p>
                <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Vila dos Pescadores</p>
              </div>
            </div>
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Parceiros</h2>
              <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Nossos Parceiros</p>
            </div>
            <div className="w-72 flex flex-col gap-4">
              <h2 className="w-max font-semibold text-white">Fale Conosco</h2>
              <div className="flex flex-col gap-2">
                <a href="/" target="_blank" className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">usinaguara@gmail.com</a>
                <a href="/" target="_blank" className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Instagram</a>
              </div>
            </div>
        </div>
        <div className="mt-8 mb-6 w-full max-w-7xl">
          <p className="w-full p-4 rounded-lg bg-blue-1 text-white text-lg font-bold text-center">Projeto viabilizado pela Lei Paulo Gustavo (Edital 123456)</p>
        </div>
        <div className="flex justify-between w-full max-w-7xl">
          <div className="flex gap-6">
            <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Política de Privacidade</p>
            <p className="w-max transition text-blue-2 font-light text-sm cursor-pointer hover:text-gray-4">Termos e Condições</p>
          </div>
          <p className="w-max transition text-sm text-gray-4">Copyright 2025 Usina Guará. Powered by WordPress.</p>
        </div>
      </footer>
    );
}

export default Header;