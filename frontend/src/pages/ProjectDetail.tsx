import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectService } from '../features/projects/project.service';
import { PerspectiveService } from '../features/perpectives/components/perspective.service';
import type { ProjectResponseType } from '../features/projects/project.types';
import type { PerspectiveResponseType } from '../features/perpectives/components/FormPerspective/perspective.types';
import { ContentBlockRenderer } from '../features/perpectives/components/ContentBlockRenderer/index';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingOverlay from '../components/LoadingOverlay';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectResponseType | null>(null);
  const [perspectives, setPerspectives] = useState<PerspectiveResponseType[]>([]);
  const [activePerspective, setActivePerspective] = useState<PerspectiveResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    async function loadData() {
      setIsLoading(true);
      try {
        const projectData = await ProjectService.getBySlug(slug!);
        setProject(projectData);

        if (projectData) {
          const perspectivesData = await PerspectiveService.getByProjectId(projectData._id);
          const sortedPerspectives = perspectivesData.sort((a, b) => a.order - b.order);
          setPerspectives(sortedPerspectives);

          if (sortedPerspectives.length > 0) {
            setActivePerspective(sortedPerspectives[0]);
          }

        } else {
          throw new Error("Projeto não encontrado.");
        }
      } catch (err) {
        setError("Não foi possível carregar o projeto.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (error) {
    return (
      <div className="flex items-center justify-center p-20 text-red-500 bg-gray-900 h-screen text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  if (!project) return <div>Projeto não encontrado.</div>;

  return (
    <>
      <Header />
      <div className="bg-gray-900 text-white">
        <header
          className="relative w-full h-[60vh] flex items-end justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${project.banner})` }}
        >
          <div className="pb-20 px-4">
            <h1 className="text-5xl font-bold">{project.title}</h1>
            <p className="text-lg mt-2">{project.subtitle}</p>

            <div className="flex justify-center flex-wrap gap-3 mt-4">
              {project.category && (
                <span className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {project.category}
                </span>
              )}
              {project.year && (
                <span className="bg-gray-700/80 text-gray-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {project.year}
                </span>
              )}
              {project.about_html && <span className="bg-gray-700/80 text-gray-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">{project.about_html}</span>}
            </div>
          </div>
        </header>

        <nav className="flex justify-center flex-wrap gap-4 py-6 bg-gray-800 sticky top-0 z-10">
          {perspectives?.map(p => (
            <button
              key={p._id}
              onClick={() => setActivePerspective(p)} // Troca a perspectiva ativ
              className={`px-4 py-2 rounded-md transition font-semibold ${activePerspective?._id === p._id
                ? 'bg-red-600'
                : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              Pers. {p.order}
            </button>
          ))}
        </nav>

        <div className="max-w-4xl mx-auto p-8">
          {activePerspective ? (
            <ContentBlockRenderer blocks={activePerspective.contentBlocks} />
          ) : (
            // Fallback para o "Sobre o Projeto" se nenhuma perspectiva estiver selecionada
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: project.about_html ?? "" }} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}