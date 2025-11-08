// src/features/carousel/useCarouselForm.ts

import { useEffect, useState } from "react";
// Importa os tipos de dados
import type { CarouselResponseType } from "./carousel.types";
import type { ProjectRequestType } from "../projects/project.types";
import type { PerspectiveRequest } from "../perpectives/components/FormPerspective/perspective.types";

// Importa os Services do Frontend (AJUSTE OS CAMINHOS CONFORME SUA ESTRUTURA)
import { CarouselService } from "./carousel.service";
import { ProjectService } from "../projects/project.service";
import { PerspectiveService } from "../perpectives/components/perspective.service";


export function useCarouselForm() {
    const [highlightItems, setHighlightItems] = useState<CarouselResponseType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [inactiveItems, setInactiveItems] = useState<CarouselResponseType[]>([]);

    // Função de busca (usada no useEffect e após o salvamento)
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {

            const activeData = await CarouselService.getAllCarouselOrder();
            setHighlightItems(activeData.sort((a, b) => (a.orderCarousel ?? Infinity) - (b.orderCarousel ?? Infinity)));
            
            // 2. Busca Inativos
            const inactiveData = await CarouselService.getAllInactiveCarouselItems(); // Chama o método para inativos
            setInactiveItems(inactiveData.sort((a, b) => a.title.localeCompare(b.title))); // Ordena por título
        } catch (err: any) {
            setError("Falha ao carregar destaques do carrossel. Verifique a API.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Atualiza um campo de um item no estado local (para edição em tempo real na UI)
    const updateItemField = (id: string, field: keyof CarouselResponseType, value: any) => {
        setHighlightItems(prev => prev.map(item =>
            item._id === id ? { ...item, [field]: value } : item
        ));
    };

    // [NOVA FUNÇÃO] Lógica de Salvamento Item-a-Item (Assinatura correta para a UI)
    // Retorna um objeto de feedback para ser exibido na linha
    const handleSaveItem = async (item: CarouselResponseType): Promise<{ success: boolean, message: string }> => {
        setIsSaving(true); // Indica que uma operação de salvamento (global) começou

        const payload = {
            orderCarousel: item.orderCarousel || undefined,
            extraURL: item.extraURL || undefined,
        };
        console.log("-----------------------------------------");
        console.log(`[FRONTEND] Tentando salvar ${item.collection_type}:`);
        console.log(`ID do Objeto: ${item._id}`);
        console.log("Payload Enviado:", payload);
        console.log("-----------------------------------------");

        try {
            if (item.collection_type === 'project') {
                await ProjectService.update(item._id, payload as Partial<ProjectRequestType>);
            } else if (item.collection_type === 'perspective') {
                await PerspectiveService.update(item._id, payload as Partial<PerspectiveRequest>);
            }

            // Recarrega os dados após o sucesso para atualizar a ordem na tabela
            await fetchData();

            setIsSaving(false);
            // RETORNA O SUCESSO
            return { success: true, message: `"${item.title}" salvo com sucesso!` };

        } catch (err) {
            console.error(`Falha ao salvar ${item.title} (${item.collection_type}):`, err);
            setIsSaving(false);
            // RETORNA O ERRO
            return { success: false, message: `Erro ao salvar "${item.title}".` };
        }
    };

    // NOTA: A antiga função 'handleSaveOrder' de loop em massa foi removida,
    // pois a nova interface foi desenhada para salvar item-a-item.

    const handleActivateItem = async (type: 'project' | 'perspective', id: string) => {
        // 1. Encontre a próxima ordem disponível (ex: a maior ordem + 1)
        const maxOrder = highlightItems.reduce((max, item) =>
            (item.orderCarousel !== undefined && item.orderCarousel !== null && item.orderCarousel > max ? item.orderCarousel : max), -1);
        const newOrder = maxOrder + 1;

        const payload = {
            orderCarousel: newOrder,
            isCarousel: true,
        };

        try {
            // 2. Chama o mesmo serviço PATCH, mas com isCarousel: true
            if (type === 'project') {
                await ProjectService.update(id, payload as Partial<ProjectRequestType>);
            } else {
                await PerspectiveService.update(id, payload as Partial<PerspectiveRequest>);
            }

            // 3. Recarrega a lista para mostrar o novo item
            await fetchData();
            return { success: true, message: "Item adicionado com sucesso!" };

        } catch (err) {
            // ... (tratamento de erro)
            return { success: false, message: "Erro ao adicionar item." };
        }
    };

    const handleDeactivateItem = async (item: CarouselResponseType): Promise<{ success: boolean, message: string }> => {
        setIsSaving(true);

        // Payload para desativar o destaque e limpar a ordem/URL
        const payload = {
            isCarousel: false,
            orderCarousel: undefined,
            extraURL: undefined,
        };

        try {
            if (item.collection_type === 'project') {
                await ProjectService.update(item._id, payload as Partial<ProjectRequestType>);
            } else {
                await PerspectiveService.update(item._id, payload as Partial<PerspectiveRequest>);
            }

            // Recarrega os dados (o item será removido da lista)
            await fetchData();

            setIsSaving(false);
            return { success: true, message: `"${item.title}" removido dos destaques!` };

        } catch (err) {
            console.error(`Falha ao desativar ${item.title}:`, err);
            setIsSaving(false);
            return { success: false, message: `Erro ao remover "${item.title}".` };
        }
    };
    return {
        state: { highlightItems, isLoading, error, isSaving, inactiveItems },
        // AGORA EXPORTAMOS handleSaveItem (a nova função individual)
        actions: { handleSaveItem, updateItemField, handleActivateItem, handleDeactivateItem }
    };


}