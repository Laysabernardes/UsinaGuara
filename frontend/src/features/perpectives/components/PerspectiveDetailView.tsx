import { Link, NavLink } from 'react-router-dom';
import type { PerspectiveResponseType } from '../components/FormPerspective/perspective.types';
import { ContentBlockRenderer } from '../components/ContentBlockRenderer/index'; // Assumindo que o renderizador está aqui
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

interface PerspectiveDetailViewProps {
  perspective: PerspectiveResponseType;
}

export function PerspectiveDetailView({ perspective }: PerspectiveDetailViewProps) {
  return (
    <>
      <Header/>
      <article className="bg-gray-900 text-gray-200">
        {/* Seção do Banner */}
        <section 
          className="relative w-full min-h-[60vh] h-full p-5 flex flex-col items-center justify-center text-center bg-cover bg-center text-white"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${perspective.banner})` }}
        >
          <h1 className="text-5xl font-bold">{perspective.title}</h1>
          <NavLink to={`/projeto/${perspective.project.slug}`} className="w-full max-w-64">
            <h2 className="w-full text-2x1 font-semibold mt-5 text-gray-5 border-2 border-gray-5 rounded-2xl transition hover:bg-red-600 cursor-pointer">
              Ver projeto completo
            </h2>
          </NavLink>
        </section>

        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {/* Renderizador do Conteúdo em Blocos */}
          <ContentBlockRenderer blocks={perspective.contentBlocks} />
        </div>
      </article>
      <Footer/>
    </>
  );
}