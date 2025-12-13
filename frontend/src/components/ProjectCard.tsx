// projects/components/ProjectCard.tsx (Ajustado para Rótulos no Fluxo do Texto)

import React from 'react';
import { Link } from 'react-router-dom';
import type { ProjectResponseType } from '../features/projects/components/project.types'; 

interface ProjectCardProps {
  project: ProjectResponseType;
}

// Mapeamento de Cores Dinâmicas para o BADGE COMPLETO (Inalterado)
const categoryColorMap: { [key: string]: string } = {
  // Ajustando as classes para o badge de texto completo
  'URBANIZAÇÃO': 'bg-red-600 text-white', 
  'SUSTENTABILIDADE': 'bg-teal-600 text-white',
  'HABITAÇÃO SOCIAL': 'bg-green-600 text-white', 
  'ARTE COMUNITÁRIA': 'bg-indigo-600 text-white',
  'ARQUITETURA': 'bg-yellow-600 text-gray-900',
  'GERAL': 'bg-gray-500 text-white',
};

// Função para obter as classes de cor e o cor do link
const getCategoryClasses = (category: string) => {
  const badgeClasses = categoryColorMap[category] || categoryColorMap['Geral'];
  const linkClass = 'text-red-500 hover:text-red-400';
  return { badgeClasses, linkClass };
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { title, category, year, subtitle, banner, slug } = project;
  
  const categoryString = category ? category : 'Geral'; 
  const mainCategory = categoryString.trim().toUpperCase();; 

  const projectUrl = `/projeto/${slug}`; 
  
  const { badgeClasses, linkClass } = getCategoryClasses(mainCategory);
  console.log("Categoria atual:", mainCategory);

  return (
    // Card Container
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transition duration-300 hover:shadow-2xl">
      
      {/* 1. Área da Imagem (NO TOPO, SEM RÓTULOS ABSOLUTOS) */}
      <div className="relative h-48 sm:h-56 w-full"> 
        <img 
          src={banner} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        {/* REMOVIDO: A div de posicionamento absoluto dos rótulos */}
      </div>

      {/* 2. Conteúdo do Card Abaixo da Imagem (INFORMAÇÕES) */}
      <div className="p-4 text-gray-200">
        
        {/* RÓTULOS NO FLUXO: Categoria e Ano (CORREÇÃO: Rótulos e Ano Agora Estão Aqui) */}
        <div className="flex justify-between items-center mb-2 text-sm font-semibold">
          
          {/* Categoria: Texto Completo (Badge) */}
          
          <span 
           className={`${badgeClasses} px-3 py-1 rounded-full uppercase tracking-wider text-xs`}
          >
            {mainCategory}
          </span>
          
          {/* Ano */}
          <span className="text-gray-400 text-sm">
            {year}
          </span>
        </div>
        
        {/* Título e Descrição */}
        <h3 className="text-xl font-bold mb-2 h-14 overflow-hidden">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 h-16 overflow-hidden">{subtitle}</p> 
        
        {/* Link para o projeto */}
        <div className="flex justify-between items-center mt-3">
          <Link 
            to={projectUrl} 
            className={`${linkClass} font-semibold transition flex items-center`}
          >
            Ver projeto <span className="ml-1 text-lg">→</span>
          </Link>
          
          {/* Placeholder para o Ícone */}
          <button className="text-gray-500 hover:text-red-500 transition">
             {/* Ícone SVG/placeholder */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;