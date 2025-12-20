import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectService } from '../features/projects/project.service';
import type { ProjectResponseType } from '../features/projects/project.types';
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Person from "../components/Person";
import LoadingOverlay from '../components/LoadingOverlay';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    async function loadData() {
      setIsLoading(true);
      try {
        const projectData = await ProjectService.getBySlug(slug!);
        setProject(projectData);

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
        <section
          className="relative w-full min-h-[60vh] h-full p-5 flex flex-col items-center justify-center text-center bg-cover bg-center text-white"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${project.banner})` }}
        >
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
          </div>
        </section>

        <nav className="flex justify-center flex-wrap gap-4 py-6 bg-gray-800 sticky top-0 z-10">
          <Link to={`complete`} className="px-4 py-2 rounded-md transition font-semibold bg-red-1 hover:bg-red-2">
            Acessar Conteúdo
          </Link>
        </nav>
        <div className="flex flex-col items-center gap-16 w-[90%] mx-auto py-16">
          <div className='w-full flex flex-col items-start'>
            <h3 className="text-2xl font-bold mb-4">Sobre o Projeto</h3>
            <p className="text-justify">{project.about_html}</p>
          </div>
          <div className='w-full flex flex-col items-start'>
            <h3 className="text-2xl font-bold mb-4">Equipe</h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.team?.length ? (
                project.team.map((person) => (
                  <Person
                    key={person._id}
                    id={person._id}
                    name={person.name}
                    kind={person.kind}
                    contact={person.contact ?? "Não informado"}
                    imageUrl={person.imageUrl ?? "/img/default.png"}
                    description={person.description}
                  />
                ))
              ) : (
                <p className="text-gray-400">Nenhuma pessoa cadastrada para este projeto.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}