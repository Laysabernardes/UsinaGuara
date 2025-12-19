import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormPeopleData } from "./people.schema";
import type { PeopleResponseType, PeopleRequestType } from "./people.types";
import { PeopleService } from "./people.service";

type Inputs = z.infer<typeof FormPeopleData>;

export function usePeopleForm(action: "Create" | "Update" | "Delete", onFormSubmit: () => void) {

    const [allPeople, setAllPeople] = useState<PeopleResponseType[]>([]);
    const [selectedPeopleId, setSelectedPeopleId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);


    const formMethods = useForm<Inputs>({
        resolver: zodResolver(FormPeopleData),
        defaultValues: {
            _id: undefined,
            name: "",
            kind: "",
            contact: "",
            imageUrl: "",
            description: [""]
        }
    });

    // -------------------------------------------------------------------------
    // Carregar todas as pessoas
    // -------------------------------------------------------------------------
    useEffect(() => {
        async function fetchPeople() {
            setIsLoading(true);
            setError(null);


            try {
                const token = localStorage.getItem("authToken") || "";
                const peopleResponse = await PeopleService.getAllPeople(token);

                setAllPeople(peopleResponse);
            } catch (err: any) {
                setError("Erro ao carregar pessoas.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchPeople();
    }, []);

    // -------------------------------------------------------------------------
    // Preencher formulário quando selecionar alguém (UPDATE)
    // -------------------------------------------------------------------------
    useEffect(() => {

        console.log("🔎 selectedPeopleId mudou:", selectedPeopleId);

        // Se não é update ou nada selecionado → zera formulário
        if (action !== "Update" || !selectedPeopleId) {

            formMethods.reset({
                _id: undefined,
                name: "",
                kind: "",
                contact: "",
                imageUrl: "",
                description: [""]
            });

            return;
        }

        // Buscar pessoa selecionada
        const selected = allPeople.find(p => p._id === selectedPeopleId);

        if (selected) {
            const formData: Inputs = {
                _id: selected._id,
                name: selected.name,
                kind: selected.kind,
                contact: selected.contact,
                imageUrl: selected.imageUrl || "",
                description: selected.description?.length ? selected.description : [""]
            };


            formMethods.reset(formData);
        }
    }, [selectedPeopleId, action, allPeople, formMethods]);

    // -------------------------------------------------------------------------
    // Resetar seleção ao trocar ação
    // -------------------------------------------------------------------------
    useEffect(() => {
        console.log("🔁 Ação mudou → limpando selectedPeopleId");
        setSelectedPeopleId(null);
    }, [action]);

    // -------------------------------------------------------------------------
    // SUBMIT
    // -------------------------------------------------------------------------
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true);
        setError(null);

        try {
            const requestPayload: PeopleRequestType = {
                name: data.name,
                kind: data.kind,
                contact: data.contact,
                imageUrl: data.imageUrl || "",
                description: data.description.filter(d => d.trim() !== "")
            };

            if (action === "Create") {
                console.log("🆕 API → CREATE");
                await PeopleService.create(requestPayload);
                setSuccessMessage("Pessoa criada com sucesso!");
            }

            if (action === "Update" && data._id) {
                console.log("⚙️ API → UPDATE", {
                    id: data._id,
                    requestPayload
                });

                await PeopleService.update(data._id, requestPayload);
                setSuccessMessage("Pessoa atualizada com sucesso!");
            }

            onFormSubmit();

        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao salvar pessoa.");
        } finally {
            setIsLoading(false);
        }
    };

    // -------------------------------------------------------------------------
    // DELETE
    // -------------------------------------------------------------------------
    const handleDelete = async () => {
        if (!selectedPeopleId) return;

        if (!window.confirm("Tem certeza que deseja deletar esta pessoa?")) return;

        setIsLoading(true);
        setError(null);

        try {
            await PeopleService.delete(selectedPeopleId);
            setSuccessMessage("Pessoa deletada com sucesso!");
            onFormSubmit();
        } catch (err: any) {
            setError(err.response?.data?.message || "Erro ao deletar pessoa.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formMethods,
        state: {
            allPeople,
            selectedPeopleId,
            isLoading,
            error
        },
        actions: {
            setSelectedPeopleId,
            onSubmit,
            handleDelete
        }
    };
}
