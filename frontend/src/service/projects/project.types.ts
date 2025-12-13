import type { ProjectFormData } from './project.schema';

// --- TIPOS AUXILIARES ---

interface TeamMemberType {
    _id: string;
    name: string;
    // Adicione outros campos de pessoa aqui, se forem relevantes (ex: role, photoUrl)
}

// --- TIPOS DE RESPOSTA DA API (RESPONSE) ---
export interface ProjectResponseType {
    _id: string; // ID do MongoDB
    title: string;
    subtitle?: string;
    slug: string;
    category: string;
    year: number;
    about_html?: string;
    team?: TeamMemberType[];
    status: "draft" | "published";
    isCarousel: boolean;
    orderCarousel?: number;
    banner?: string;
    extraURL?: string;
    
    // CAMPOS DE DATAS (retornados pela API)
    createdAt: string; 
    updatedAt: string; 
}

// --- TIPOS DE REQUISIÇÃO (PAYLOAD) ---
export type ProjectRequestType = Omit<ProjectFormData, '_id'>; 

// --- TIPO DE RESPOSTA PAGINADA ---
export interface PaginatedProjectsResponse {
    data: ProjectResponseType[]; // Array com a lista dos projetos na página atual
    totalPages: number;
    page: number; 
    limit: number; 
    totalDocs: number; 
}