// src/features/carousel/useCarouselForm.ts

import { useEffect, useState } from "react";
import type { CarouselResponseType } from "./carousel.types";
import type { ProjectRequestType } from "../projects/project.types";
import type { PerspectiveRequest } from "../perpectives/components/FormPerspective/perspective.types";
import { CarouselService } from "./carousel.service";
import { ProjectService } from "../projects/project.service";
import { PerspectiveService } from "../perpectives/components/perspective.service";


export function useCarouselForm() {
    const [highlightItems, setHighlightItems] = useState<CarouselResponseType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [inactiveItems, setInactiveItems] = useState<CarouselResponseType[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const usedOrders = highlightItems
    .map(item => item.orderCarousel)
    .filter((order): order is number => order !== undefined && order !== null);

    const availableOrders = Array.from({ length: 10 }, (_, i) => i + 1)
    .filter(order => !usedOrders.includes(order));

    // Função de busca (usada no useEffect e após o salvamento)
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {

            const paginated = await CarouselService.getAllCarouselPaginated(page, 5);

            setHighlightItems(
                paginated.items.sort(
                    (a, b) => (a.orderCarousel ?? Infinity) - (b.orderCarousel ?? Infinity)
                )
            );

            setTotalPages(paginated.meta.totalPages);

            const inactiveData = await CarouselService.getAllInactiveCarouselItems(); 
            setInactiveItems(inactiveData.sort((a, b) => a.title.localeCompare(b.title))); 
        } catch (err: any) {
            setError("Falha ao carregar destaques do carrossel. Verifique a API.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const updateItemField = (id: string, field: keyof CarouselResponseType, value: any) => {
    setInactiveItems(prev =>
        prev.map(item =>
        item._id === id ? { ...item, [field]: value } : item
        )
    );
    };

   // ... dentro de useCarouselForm.ts

    const handleSaveItem = async (item: CarouselResponseType): Promise<{ success: boolean, message: string }> => {
        setIsSaving(true); 

        const payload = {
            orderCarousel: item.orderCarousel || undefined,
            extraURL: item.extraURL || undefined,
        };
        try {
            if (item.collection_type === 'project') {
                await ProjectService.update(item._id, payload as Partial<ProjectRequestType>);
            } else if (item.collection_type === 'perspective') {
                await PerspectiveService.update(item._id, payload as Partial<PerspectiveRequest>);
            }

            await fetchData();
            setIsSaving(false);
            return { success: true, message: `"${item.title}" salvo com sucesso!` };

        } catch (err: any) { 
            console.error(`Falha ao salvar ${item.title}:`, err);
            setIsSaving(false);
            // Captura a mensagem do backend ("A ordem X já está em uso")
            const apiMessage = err.response?.data?.message || `Erro ao salvar "${item.title}".`;
            return { success: false, message: `Erro: ${apiMessage}` };
        }
    };

    const generateInactiveOrderFromId = (id: string): number => {
        // Pega os últimos 6 caracteres do ObjectId
        const hexPart = id.slice(-6);

        // Converte de hexadecimal para decimal
        const numeric = parseInt(hexPart, 16);

        // Joga para fora do range do carrossel ativo (1–10)
        return 1000 + (numeric % 100000);
    }

    const handleActivateItem = async (type: 'project' | 'perspective', id: string, orderCarousel: number) => {
        const payload = { orderCarousel: orderCarousel, isCarousel: true };

        try {
            if (type === 'project') {
                await ProjectService.update(id, payload as Partial<ProjectRequestType>);
            } else {
                await PerspectiveService.update(id, payload as Partial<PerspectiveRequest>);
            }

            await fetchData();
            return { success: true, message: "Item adicionado com sucesso!" };

        } catch (err: any) {
            // Também captura erro de duplicidade ao ativar um novo item
            const apiMessage = err.response?.data?.message || "Erro ao adicionar item.";
            return { success: false, message: `Erro: ${apiMessage}` };
        }
    };

    const handleDeactivateItem = async (item: CarouselResponseType): Promise<{ success: boolean, message: string }> => {
        setIsSaving(true);
        const payload = { isCarousel: false, orderCarousel: generateInactiveOrderFromId(item._id), extraURL: undefined };

        try {
            if (item.collection_type === 'project') {
                await ProjectService.update(item._id, payload as Partial<ProjectRequestType>);
            } else {
                await PerspectiveService.update(item._id, payload as Partial<PerspectiveRequest>);
            }

            await fetchData();
            setIsSaving(false);
            return { success: true, message: `"${item.title}" removido dos destaques!` };

        } catch (err: any) {
            setIsSaving(false);
            const apiMessage = err.response?.data?.message || `Erro ao remover "${item.title}".`;
            return { success: false, message: `Erro: ${apiMessage}` };
        }
    };
    return {

        state: {
            highlightItems,
            inactiveItems,
            isLoading,
            error,
            isSaving,
            page,
            totalPages,
            availableOrders,
        },
        actions: {
            handleSaveItem,
            updateItemField,
            handleActivateItem,
            handleDeactivateItem,
            setPage,
        },

    };
}