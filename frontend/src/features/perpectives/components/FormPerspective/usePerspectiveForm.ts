import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormPerspectiveData } from "./perspective.schema";
import type { PerspectiveFormData } from "./perspective.schema";

// Serviços da API
import { PerspectiveService } from "../perspective.service";
import { PeopleService } from "../../../../service/people.service";
import { ProjectService } from "../../../projects/project.service";

// DTOs (Tipos de Resposta)
import type { PerspectiveResponseType } from "./perspective.types";
import type { PeopleResponseType } from "../../../people/people.types";
import type { ProjectResponseType } from "../../../projects/project.types";

export function usePerspectiveForm(action: "Create" | "Update" | "Delete", onFormSubmit: () => void) {
    const [allPerspectives, setAllPerspectives] = useState<PerspectiveResponseType[]>([]);
    const [projects, setProjects] = useState<ProjectResponseType[]>([]);
    const [people, setPeople] = useState<PeopleResponseType[]>([]);
    const [selectedPerspectiveId, setSelectedPerspectiveId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const formMethods = useForm<PerspectiveFormData>({
        resolver: zodResolver(FormPerspectiveData),
        defaultValues: { contentBlocks: [], authors: [] },
    });

    // Efeito para buscar os dados iniciais da API
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem("authToken") || "";
                const [perspectivesData, projectsData, peopleData] = await Promise.all([
                    PerspectiveService.getAllPerspectives(),
                    ProjectService.getAllProjects({ limit: 1000 }),
                    PeopleService.getAllPeople(token),
                ]);
                setAllPerspectives(perspectivesData);
                setProjects(projectsData.data);
                setPeople(peopleData);
            } catch (err) {
                console.error("Erro ao buscar dados iniciais:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []); // Roda apenas uma vez, quando o componente é montado

    // Efeito para popular o formulário quando uma perspectiva é selecionada para edição
    useEffect(() => {
        if (action !== 'Update' || !selectedPerspectiveId) {
            formMethods.reset({ contentBlocks: [], authors: [], title: '', slug: '' });
            return;
        }
        const perspectiveToLoad = allPerspectives.find(p => p._id === selectedPerspectiveId);
        if (perspectiveToLoad) {
            const formData: Partial<PerspectiveFormData> = {
                ...perspectiveToLoad,
                authors: perspectiveToLoad.authors.map(author => author._id),
                projectId: typeof perspectiveToLoad.project === 'object' && perspectiveToLoad.project !== null
                    ? perspectiveToLoad.project._id
                    : perspectiveToLoad.project,
            };
            formMethods.reset(formData);
        }
    }, [selectedPerspectiveId, action, allPerspectives, formMethods]);

    // Limpa a seleção ao trocar de ação
    useEffect(() => {
        setSelectedPerspectiveId(null);
    }, [action]);

    // Função chamada ao submeter o formulário
    const onSubmit = async (data: PerspectiveFormData) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const selectedProject = projects.find(p => p._id === data.projectId);

            if (!selectedProject) {
                throw new Error("Projeto selecionado não encontrado na lista.");
            }

            // Isso evita o erro 422 de "excess property" no Backend
            const { _id, projectId, ...rest } = data;

            // O payload deve ir sem a propriedade 'project' se a URL já contiver o ID
            const payload = {
                ...rest,
                banner: data.banner || undefined
            };

            if (action === "Create") {
               // Passa o ID na URL e o payload no Body
                await PerspectiveService.create(data.projectId, payload as any);
                setSuccessMessage("Perspectiva criada com sucesso!");

            } else if (action === "Update" && data._id) {
                // Passa o ID na URL e o payload (sem _id) no Body
                await PerspectiveService.update(data._id, payload as any);
                setSuccessMessage("Perspectiva atualizada com sucesso!");
            }

            onFormSubmit();
        } catch (err: any) {
            console.error("Erro completo da API:", err.response?.data);

            // Captura detalhada de erros do TSOA/Zod
            const apiDetails = err.response?.data?.details?.body?.message;
            const apiMessage = err.response?.data?.message;
            const zodErrors = err.response?.data?.errors?.fieldErrors;

            if (zodErrors) {
                const messages = Object.values(zodErrors).flat();
                setError(`Erro de validação: ${messages.join(", ")}`);
            } else if (apiDetails) {
                // Aqui captura o erro de "excess property" que vimos na imagem
                setError(`Erro no Servidor: ${apiDetails}`);
            } else if (apiMessage) {
                setError(apiMessage);
            } else {
                setError("Ocorreu um erro inesperado ao salvar.");
            }
        } finally {
            setIsLoading(false);
        }
    };



    const handleDelete = async () => {
        if (!selectedPerspectiveId) return;
        if (window.confirm("Tem certeza que deseja deletar esta perspectiva?")) {
            setIsLoading(true);
            setError(null);
            try {
                await PerspectiveService.delete(selectedPerspectiveId);
                setSuccessMessage("Perspectiva deletada com sucesso!");
                onFormSubmit();
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || "Ocorreu um erro ao deletar.");
                console.error("Erro ao deletar perspectiva:", err);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Retornamos tudo que a UI precisa para funcionar
    return {
        formMethods,
        state: { allPerspectives, projects, people, selectedPerspectiveId, isLoading, error },
        actions: { setSelectedPerspectiveId, onSubmit, handleDelete }
    };
}