// src/features/projects/useProjectForm.ts

import { z } from "zod"; // ADICIONADO: Necessário para usar z.infer
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProjectData } from "./project.schema";
//import type { ProjectFormData } from "./project.schema"; // MANTER: O tipo é usado como valor de reset/carga
import type { ProjectRequestType, ProjectResponseType, PaginatedProjectsResponse } from "./project.types";

// Serviços da API
import { ProjectService } from "./project.service";
import { PeopleService } from "../../service/people.service"; // Ajuste o caminho conforme necessário

// DTOs (Tipos de Resposta de Lookups)
import type { PeopleResponseType } from "../people/components/people.types"; // Ajuste o caminho conforme necessário

// 1. Defina o tipo de dados de entrada do formulário com inferência do Zod
type Inputs = z.infer<typeof FormProjectData>;

export function useProjectForm(action: "Create" | "Update" | "Delete", onFormSubmit: () => void) {
    // Estado para a lista de todos os projetos (usado para seleção em Update/Delete)
    const [allProjects, setAllProjects] = useState<ProjectResponseType[]>([]);
    // Estado para a lista de pessoas (usado para seleção do campo 'team')
    const [people, setPeople] = useState<PeopleResponseType[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // CORREÇÃO 1: Removido o tipo genérico explícito para que o TypeScript use o Resolver
    const formMethods = useForm({ // Usamos o tipo 'Inputs' que é inferido do Zod
        resolver: zodResolver(FormProjectData),
        // Valores padrão para os campos do Projeto
        defaultValues: {
            title: '',
            subtitle: '',
            slug: '',
            category: '',
            year: new Date().getFullYear(),
            about_html: '',
            team: [],
            status: 'draft',
            isCarousel: false,
            banner: '',
            extraURL: '',
        },
    });

    // -------------------------------------------------------------------------
    // Efeito para buscar os dados iniciais (Projetos e Pessoas)
    // -------------------------------------------------------------------------
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("authToken") || "";

                // Buscando a lista de projetos (objeto paginado) e a lista de pessoas
                const [projectsResponse, peopleData] = await Promise.all([
                    ProjectService.getProjects(1, 9999, 'Todos') as Promise<PaginatedProjectsResponse>,
                    PeopleService.getAllPeople(token),
                ]);

                // Armazenamos o array de projetos e as pessoas
                setAllProjects(projectsResponse.data);
                setPeople(peopleData);
            } catch (err: any) {
                setError("Falha ao carregar dados. Verifique a conexão com a API.");
                console.error("Erro ao buscar dados iniciais de projetos:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []); // Roda apenas uma vez

    // -------------------------------------------------------------------------
    // Efeito para popular o formulário (Update)
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (action !== 'Update' || !selectedProjectId) {
            // Reseta para os valores padrão se não estiver em modo Update ou se não houver ID
            formMethods.reset({ team: [], title: '', slug: '', category: '', year: new Date().getFullYear(), isCarousel: false, status: 'draft' });
            return;
        }
        const projectToLoad = allProjects.find(p => p._id === selectedProjectId);
        if (projectToLoad) {
            // CORREÇÃO 2: Usa 'Inputs' para garantir que os tipos do formulário são usados
            const formData: Partial<Inputs> = {
                ...projectToLoad,
                // Mapeia o array de objetos 'team' (do response) para array de IDs (para o form)
                team: projectToLoad.team?.map(member => member._id) || [],
                // O banner pode ser undefined no response, mas o reset lida bem
                banner: projectToLoad.banner || '',
            };
            formMethods.reset(formData);
        }
    }, [selectedProjectId, action, allProjects, formMethods]);

    // -------------------------------------------------------------------------
    // Efeito para limpar a seleção ao trocar de ação
    // -------------------------------------------------------------------------
    useEffect(() => {
        setSelectedProjectId(null);
    }, [action]);

    // -------------------------------------------------------------------------
    // Função chamada ao submeter o formulário
    // -------------------------------------------------------------------------
    // CORREÇÃO 3: Uso do SubmitHandler para tipar a função corretamente
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            // Remove o _id do payload antes de enviar (se for Update, o ID vai na URL)
            const { _id, ...payload } = data;

            // Garante que o tipo é ProjectRequestType (sem o null no banner)
            // Não é necessário o casting, pois o Zod/TypeScript já resolve a inferência
            const requestPayload: ProjectRequestType = {
                ...payload,
                // Garante que 'banner' nunca seja null, apenas string ou undefined para a API
                banner: payload.banner === null || payload.banner === '' ? undefined : payload.banner,
            };

            if (action === "Create") {
                await ProjectService.create(requestPayload);
                alert("Projeto criado com sucesso!");
            } else if (action === "Update" && data._id) {
                await ProjectService.update(data._id, requestPayload);
                alert("Projeto atualizado com sucesso!");
            }
            onFormSubmit(); // Chama a função para resetar o estado no componente pai
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Ocorreu um erro ao salvar o projeto.");
            console.error("Erro ao salvar projeto:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // -------------------------------------------------------------------------
    // Função para deletar
    // -------------------------------------------------------------------------
    const handleDelete = async () => {
        // ... (lógica de exclusão)
        if (!selectedProjectId) return;
        if (window.confirm("Tem certeza que deseja deletar este projeto?")) {
            setIsLoading(true);
            setError(null);
            try {
                await ProjectService.delete(selectedProjectId);
                alert("Projeto deletado com sucesso!");
                onFormSubmit(); // Chama a função para resetar o estado no componente pai
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Ocorreu um erro ao deletar.");
                console.error("Erro ao deletar projeto:", err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // -------------------------------------------------------------------------
    // Retorno para a UI
    // -------------------------------------------------------------------------
    return {
        formMethods,
        state: { allProjects, people, selectedProjectId, isLoading, error },
        actions: { setSelectedProjectId, onSubmit, handleDelete }
    };
}