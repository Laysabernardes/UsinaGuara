// projects/ProjectsPage.tsx

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import LoadingOverlay from '../components/LoadingOverlay'; // 1. Importe o componente
import { ProjectService } from '../service/projects/project.service';
import type { ProjectResponseType, PaginatedProjectsResponse } from '../features/projects/project.types';
import background from "../assets/bg_projetos.png";

// Lista de categorias MOCKADA (Inalterada)
const MOCK_CATEGORIES = [
    'Todos',
    'Urbanização',
    'Habitação Social',
    'Arte Comunitária',
    'Arquitetura',
    'Sustentabilidade'
];

const PROJECTS_PER_PAGE = 6;

const AllProjects: React.FC = () => {
    const [projects, setProjects] = useState<ProjectResponseType[]>([]);
    const [categories] = useState<string[]>(MOCK_CATEGORIES);
    const [activeCategory, setActiveCategory] = useState('Todos');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- Função Central de Busca (CORRIGIDA) ---
    const fetchProjects = async (page: number, category: string, append: boolean = false) => {
        // Se estiver na página 1 e for uma nova categoria, limpa a tela imediatamente
        if (!append) setProjects([]);
        setLoading(true); // Ativa o spinner
        setError(null);

        try {
            // **CHAMADA ÚNICA AO SERVICE**
            // O Service constrói a URL e trata se é 'Todos' ou 'Categoria'
            const result: PaginatedProjectsResponse = await ProjectService.getProjects(
                page,
                PROJECTS_PER_PAGE,
                category
            );

            const publishedProjects = result.data.filter(
                proj => proj.status === 'published'
            );

            // Concatena ou substitui os dados
            setProjects(prevProjects =>
                append ? [...prevProjects, ...publishedProjects] : publishedProjects
            );

            const calculatedTotalPages =
                page === 1 && publishedProjects.length < PROJECTS_PER_PAGE
                    ? 1
                    : result.totalPages;

            setTotalPages(calculatedTotalPages);
            setCurrentPage(page);

        } catch (err) {
            console.error('Fetch error:', err);
            console.log(err);
            setError("Error loading projects. Please check API connection.");
            setProjects([]);
            
        } finally {
            setLoading(false); // Desativa o spinner (sucesso ou erro)
        }
    };

    // --- Efeito: Busca Inicial e Mudança de Categoria ---
    useEffect(() => {
        // Redefine a página e busca a primeira página da nova categoria
        fetchProjects(1, activeCategory, false);
    }, [activeCategory]);

    // --- Funções de UI (Inalteradas) ---
    const handleFilterClick = (category: string) => {
        if (category === activeCategory) return;
        setActiveCategory(category);
    };

    if (error) {
        return (
            <div className="flex items-center justify-center text-red-500 p-8 bg-gray-900 min-h-screen text-center">
                <div>
                    <h1 className="text-2xl font-bold mb-2">API Error</h1>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            {loading && <LoadingOverlay />}
            
            <article className="bg-gray-900 min-h-screen text-gray-200">
                {/* Banner */}
                <section className="relative w-full min-h-[50vh] h-full p-5 flex flex-col items-center justify-center text-center bg-cover bg-center text-white"
                    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${background})` }}>

                    <h2 className="text-5xl md:text-7xl font-bold mb-3">Nossos Projetos</h2>
                    <p className="max-w-3xl mx-auto text-lg">
                        Explore nossa coleção de projetos que transformam comunidades através de urbanismo sustentável, arte e desenvolvimento social.
                    </p>
                </section>
                {/* Filtros */}
                <section className='bg-gray-800'>
                    <div className="flex justify-center flex-wrap gap-2 md:gap-4 p-20 pt-12">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => handleFilterClick(category)}
                                className={`px-4 py-2 text-sm rounded-md transition font-semibold cursor-pointer ${activeCategory === category
                                    ? 'bg-red-600 text-white shadow-lg'
                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                    }`}
                                disabled={loading}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>
                <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-900">
                    {/* Grid de Projetos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <ProjectCard key={project._id} project={project} />
                            ))
                        ) : (
                            !loading && (
                                <p className="col-span-full text-center text-xl text-gray-400">
                                    Não há projetos disponíveis.
                                </p>
                            )
                        )}
                    </div>

                    {/* Loading Indicator para Load More (só aparece se já houver projetos na tela) */}
                    {loading && projects.length > 0 && (
                        <div className="col-span-full text-center mt-8 text-gray-400">Carregando mais...</div>
                    )}

                    {/* --- Barra de Paginação Numérica (Nova Implementação) --- */}
                    <div className="flex justify-center mt-12 gap-2">
                        {/* Array.from cria uma lista de [0, 1, 2, ..., totalPages-1] */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => fetchProjects(index + 1, activeCategory, false)}
                                disabled={loading}
                                className={`px-4 py-2 rounded-md font-bold transition duration-300 ${
                                    // Estilo para a página atual
                                    currentPage === index + 1
                                        ? 'bg-red-600 text-white shadow-lg'
                                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ... (Seção CTA) ... */}
            </article>
            <Footer />
        </>
    );
};

export default AllProjects;