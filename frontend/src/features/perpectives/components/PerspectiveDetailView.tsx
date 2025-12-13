import { Link, NavLink } from 'react-router-dom';
import type { PerspectiveResponseType } from '../components/FormPerspective/perspective.types';
import { ContentBlockRenderer } from '../components/ContentBlockRenderer/index'; // Assumindo que o renderizador está aqui
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

interface PerspectiveDetailViewProps {
  perspective: PerspectiveResponseType;
  otherPerspectives: PerspectiveResponseType[];
}

export function PerspectiveDetailView({ perspective, otherPerspectives }: PerspectiveDetailViewProps) {
  return (
    <>
      <Header/>
      <article className="bg-gray-900 text-gray-200">
        {/* Seção do Banner */}
        <header 
          className="relative w-full h-[60vh] flex items-center justify-center text-center bg-cover bg-center text-white"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${perspective.banner})` }}
        >
          <div className="p-4">
            <h1 className="text-5xl font-bold">{perspective.title}</h1>
            <NavLink to={`/projeto/${perspective.project.slug}`}>
              <h2 className="text-2x1 font-semibold mt-5 text-gray-5 border-2 border-gray-5 rounded-2xl transition hover:bg-gray-2 cursor-pointer">
                Ver projeto completo
              </h2>
            </NavLink>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 md:p-8">
          {/* Navegação entre Perspectivas */}
          <nav className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12 border-b-2 border-red-600 pb-6">
            {otherPerspectives.map(p => (
              <Link 
                key={p._id} 
                to={`/perspectivas/${p.slug}`}
                className={`px-4 py-2 text-sm rounded-md transition font-semibold ${p.slug === perspective.slug 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
              >
                Pers. {p.order}
              </Link>
            ))}
          </nav>

          {/* Renderizador do Conteúdo em Blocos */}
          <ContentBlockRenderer blocks={perspective.contentBlocks} />
        </div>
      </article>
      <Footer/>
    </>
  );
}