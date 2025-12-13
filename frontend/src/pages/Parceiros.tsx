import Header from "../components/Header";
import Footer from "../components/Footer";
import Parceiros from "../components/Parceiros";
import background from "../assets/bg_parceiros.png";

export default function ParceirosPage() {
  return (
    <>
      <Header />
      <div className="bg-gray-900 text-white">
        <header
          className="relative w-full h-[60vh] flex items-end justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${background})` }}
        >
          <div className="pb-20 px-4">
            <h1 className="text-5xl font-bold">Nossos Parceiros</h1>
            <p className="text-lg mt-2">Quem nos apoia a construir a Usina Guará</p>

            <div className="flex justify-center flex-wrap gap-3 mt-4">
                <span className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Urbanização
                </span>
                <span className="bg-gray-700/80 text-gray-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  2024
                </span>
                <span className="bg-gray-700/80 text-gray-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  15 meses de desenvolvimento
                </span>
            </div>
          </div>
        </header>
        <Parceiros />
        <div className="flex flex-col items-center gap-16 max-w-7xl w-full mx-auto py-16">
          <div className='w-[80%] flex flex-col items-start'>
            <h3 className="text-2xl font-bold mb-4">Agradecimentos</h3>
            <div className="flex gap-5 bg-gray-5 p-8 rounded-2xl w-full">
              <img src="#" alt="" />
              <div className="flex flex-col">
                <p className="text-lg font-bold text-gray-1">Governo Federal</p>
                <p className="text-md text-gray-2">Lei Paulo Gustavo de Fomento à Cultura (2023)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}