import Header from "../components/Header";
import Footer from "../components/Footer";
import { DestaqueSection } from "../components/DestaqueSection";
import Parceiros from "../components/Parceiros";
import background from "../assets/bg_parceiros.png";
import LEI from "../assets/LEI.png";
import IF from "../assets/IF.png";
import CBT from "../assets/CBT.png";
import EVORA from "../assets/EVORA.png";

const parceiros = [
  {
    title: "Governo Federal",
    description: "Lei Paulo Gustavo de Fomento à Cultura (2023)",
    image: LEI,
  },
  {
    title: "Prefeitura Municipal de Cubatão",
    description: "Secretaria de Cultura",
    image: CBT,
  },
  {
    title: "Instituto Federal",
    description: "Campus Cubatão",
    image: IF,
  },
  {
    title: "Evora Coletivo",
    description: "Espaço Cultural @Cubatão",
    image: EVORA,
  },
];

export default function ParceirosPage() {
  return (
    <>
      <Header />
      <div className="bg-gray-900 text-white">
          <section className="relative w-full min-h-[50vh] h-full p-5 flex flex-col items-center justify-center text-center bg-cover bg-center text-white"
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${background})` }}>
              <h2 className="text-5xl md:text-7xl font-bold mb-3">Nossos Parceiros</h2>
              <p className="max-w-3xl mx-auto text-lg">Quem nos apoia a construir a Usina Guará</p>
          </section>
        <Parceiros />
        <div className="flex flex-col items-center gap-16 max-w-7xl w-full mx-auto py-16">
          <div className='w-[80%] flex flex-col items-start'>
            <h3 className="text-2xl font-bold mb-4">Agradecimentos</h3>
            <div className="flex flex-col gap-5 w-full mt-6">
              {parceiros.map((parceiro, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-5 bg-gray-100 p-8 rounded-2xl w-full text-center sm:text-left">
                  <img src={parceiro.image} alt={parceiro.title} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"/>
                  <div className="flex flex-col items-center sm:items-start">
                    <p className="text-lg font-bold text-gray-1 mb-0.5 sm:mb-0">{parceiro.title}</p>
                    <p className="text-md text-gray-2">{parceiro.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DestaqueSection />
      <Footer />
    </>
  );
}