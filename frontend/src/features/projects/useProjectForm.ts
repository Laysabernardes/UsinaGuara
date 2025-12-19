import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProjectData } from "./project.schema";
import type { ProjectRequestType, ProjectResponseType, PaginatedProjectsResponse } from "./project.types";

// Serviços da API
import { ProjectService } from "./project.service";
import { PeopleService } from "../../service/people.service"; 

// DTOs (Tipos de Resposta de Lookups)
import type { PeopleResponseType } from "../people/people.types"; 


type Inputs = z.infer<typeof FormProjectData>;

export function useProjectForm(action: "Create" | "Update" | "Delete", onFormSubmit: () => void) {

    const [allProjects, setAllProjects] = useState<ProjectResponseType[]>([]);

    const [people, setPeople] = useState<PeopleResponseType[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const formMethods = useForm({ 
        resolver: zodResolver(FormProjectData),
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

                const [projectsResponse, peopleData] = await Promise.all([
                    ProjectService.getProjects(1, 9999, 'Todos') as Promise<PaginatedProjectsResponse>,
                    PeopleService.getAllPeople(token),
                ]);

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
    }, []); 

    // -------------------------------------------------------------------------
    // Efeito para popular o formulário (Update)
    // -------------------------------------------------------------------------
    useEffect(() => {
        if (action !== 'Update' || !selectedProjectId) {
            formMethods.reset({ team: [], title: '', slug: '', category: '', year: new Date().getFullYear(), isCarousel: false, status: 'draft' });
            return;
        }
        const projectToLoad = allProjects.find(p => p._id === selectedProjectId);
        if (projectToLoad) {
            const formData: Partial<Inputs> = {
                ...projectToLoad,
                team: projectToLoad.team?.map(member => member._id) || [],
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
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const { _id, ...payload } = data;

            const requestPayload: ProjectRequestType = {
                ...payload,
                banner: payload.banner === null || payload.banner === '' ? undefined : payload.banner,
            };

            if (action === "Create") {
                await ProjectService.create(requestPayload);
                setSuccessMessage("Projeto criado com sucesso!");
            } else if (action === "Update" && data._id) {
                await ProjectService.update(data._id, requestPayload);
                setSuccessMessage("Projeto atualizado com sucesso!");
            }
            onFormSubmit(); 
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
        if (!selectedProjectId) return;
        if (window.confirm("Tem certeza que deseja deletar este projeto?")) {
            setIsLoading(true);
            setError(null);
            try {
                await ProjectService.delete(selectedProjectId);
                setSuccessMessage("Projeto deletado com sucesso!");
                onFormSubmit();
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