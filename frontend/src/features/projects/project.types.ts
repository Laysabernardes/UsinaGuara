// src/features/projects/project.types.ts

// O tipo ProjectFormData deve ser importado do seu arquivo de schema (para uso no ProjectRequestType).
import type { ProjectFormData } from './project.schema';

// --- TIPOS AUXILIARES ---

/**
 * @interface TeamMemberType
 * @description Define o formato básico de um membro da equipe retornado pela API (populado).
 */
interface TeamMemberType {
    _id: string;
    name: string;
    kind: string;
    description: string[];
    contact?: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
}

// --- TIPOS DE RESPOSTA DA API (RESPONSE) ---

/**
 * @interface ProjectResponseType
 * @description Define o formato completo de um objeto de Projeto retornado pela API (GET).
 */
export interface ProjectResponseType {
    _id: string; // ID do MongoDB
    title: string;
    subtitle?: string;
    slug: string;
    category: string;
    year: number;
    about_html?: string;
    team?: TeamMemberType[]; // Array de objetos de Pessoa (populado)
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

/**
 * @type ProjectRequestType
 * @description Define o formato dos dados que serão enviados para a API 
 * para criação (POST) ou atualização (PUT). É baseado no ProjectFormData, mas sem o _id.
 */
export type ProjectRequestType = Omit<ProjectFormData, '_id'>; 

// --- TIPO DE RESPOSTA PAGINADA ---

/**
 * @interface PaginatedProjectsResponse
 * @description Define o formato da resposta da API quando listando projetos com paginação.
 */
export interface PaginatedProjectsResponse {
    data: ProjectResponseType[]; // Array com a lista dos projetos na página atual
    totalPages: number;
    page: number; 
    limit: number; 
    totalDocs: number; 
}