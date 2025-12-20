import React, { useState } from 'react';
import { useCarouselForm } from './useCarouselForm';
import type { CarouselResponseType } from './carousel.types';

// --- Componente de Linha (Implementa a lógica Edit/Save/Remove) ---
const CarouselItemRow: React.FC<{
    item: CarouselResponseType,
    updateField: (id: string, field: keyof CarouselResponseType, value: any) => void,
    handleSaveItem: (item: CarouselResponseType) => Promise<{ success: boolean, message: string }>,
    handleDeactivateItem: (item: CarouselResponseType) => Promise<{ success: boolean, message: string }>,
    isSaving: boolean,
    availableOrders: number[]
}> = ({ item, updateField, handleSaveItem, handleDeactivateItem, isSaving, availableOrders }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [rowFeedback, setRowFeedback] = useState('');
    const [isRowSaving, setIsRowSaving] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [localOrder, setLocalOrder] = useState<number | "">(item.orderCarousel && item.orderCarousel >= 1 && item.orderCarousel <= 10 ? item.orderCarousel : "");
    
    const currentOrder =
    item.orderCarousel && item.orderCarousel >= 1 && item.orderCarousel <= 10
        ? item.orderCarousel
        : null;

    const ordersForRow = currentOrder
    ? Array.from(new Set([currentOrder, ...availableOrders])).sort((a, b) => a - b)
    : availableOrders;

    const startEdit = () => {
    setLocalOrder(
        item.orderCarousel && item.orderCarousel >= 1 && item.orderCarousel <= 10
        ? item.orderCarousel
        : ""
    );
    setIsEditing(true);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateField(item._id, 'extraURL', e.target.value);
        setRowFeedback('');
    };

    // Dentro do CarouselItemRow
    const saveCurrentItem = async () => {
        setIsRowSaving(true);
        setRowFeedback('');

        updateField(item._id, 'orderCarousel', localOrder === "" ? undefined : localOrder);

        const result = await handleSaveItem({
            ...item,
            orderCarousel: localOrder === "" ? undefined : localOrder,
        });

        setRowFeedback(result.message);
        setIsRowSaving(false);

        if (result.success) {
            setIsEditing(false);
        }

        setTimeout(() => setRowFeedback(''), result.success ? 4000 : 6000);
    };


    const removeCurrentItem = async () => {
        if (!window.confirm(`Tem certeza que deseja REMOVER "${item.title}" do carrossel?`)) return;

        setIsRowSaving(true);
        setRowFeedback('');

        const result = await handleDeactivateItem(item);

        setIsRowSaving(false);
        setRowFeedback(result.message);

        setTimeout(() => setRowFeedback(''), 4000);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setRowFeedback('');
    };

    // Cores de destaque para o tipo de coleção (Laranja para Projeto, Roxo para Perspectiva)
    const typeColor = item.collection_type === 'project' ? 'text-orange-400' : 'text-purple-400';
    const isOrdered = item.orderCarousel !== undefined && item.orderCarousel !== null && item.orderCarousel >= 1 && item.orderCarousel <= 10;
    const feedbackStyle = rowFeedback.includes('Erro') ? 'text-red-400' : 'text-green-400';


    return (
        <tr className={`border-b border-gray-500 hover:bg-gray-800
            ${isOrdered ? 'bg-gray-900' : 'bg-yellow-900/50'} 
            ${isEditing ? 'border-3 border-indigo-500' : ''}`}>

            <td className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">
                {item.title}
                <span className={`ml-2 text-xs font-semibold ${typeColor}`}>
                    [{item.collection_type.toUpperCase()}]
                </span>
            </td>

            <td className="px-6 py-4">
                <select
                    value={localOrder}
                    disabled={!isEditing || isRowSaving}
                    onChange={(e) => {
                        const value = e.target.value === "" ? "" : Number(e.target.value);
                        setLocalOrder(value);
                        setRowFeedback('');
                    }}
                    className="w-24 p-2 border border-gray-600 rounded bg-dark-1 text-gray-100 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-60"
                >
                    <option value="">Selecione</option>

                    {Array.from(new Set([
                        ...(localOrder !== "" ? [localOrder] : []),
                        ...availableOrders
                    ]))
                        .sort((a, b) => a - b)
                        .map(order => (
                        <option key={order} value={order}>
                            {order}
                        </option>
                        ))}
                </select>

                {!isOrdered && <p className="text-xs text-red-400 mt-1">Item **inativo**</p>}
            </td>

            <td className="px-6 py-4">
                <input
                    type="url"
                    value={item.extraURL || ""}
                    onChange={handleUrlChange}
                    disabled={!isEditing || isRowSaving}
                    className="w-full p-2 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 bg-dark-1 text-gray-100" // Input escuro
                    placeholder="URL Opcional"
                />
            </td>

            {/* Coluna de AÇÃO E FEEDBACK */}
            <td className="px-6 py-4 text-center">
                {!isEditing ? (

                    <div className="space-y-1">
                        <button
                            onClick={startEdit}
                            disabled={isSaving}
                            className={`p-2 rounded text-white text-xs font-bold transition-colors w-24 bg-teal-600 hover:bg-teal-500`}
                        >
                            Editar
                        </button>
                        <button
                            onClick={removeCurrentItem}
                            disabled={isSaving}
                            className={`p-2 rounded text-xs transition-colors w-24 bg-red-700 text-white hover:bg-red-600`}
                        >
                            Remover Destaque
                        </button>
                    </div>
                ) : (

                    <div className="space-y-1">
                        <button
                            onClick={saveCurrentItem}
                            disabled={isRowSaving || isSaving || !isOrdered}
                            className={`p-2 rounded text-white text-xs font-bold transition-colors w-24
                            ${isRowSaving || isSaving || !isOrdered ? 'bg-gray-00 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600'}`}
                        >
                            {isRowSaving ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button
                            onClick={cancelEdit}
                            disabled={isRowSaving || isSaving}
                            className={`p-2 rounded text-xs transition-colors w-24 bg-gray-600 text-gray-100 hover:bg-gray-500`}
                        >
                            Cancelar
                        </button>
                    </div>
                )}

                {rowFeedback && (
                    <p className={`mt-1 text-xs font-medium ${feedbackStyle}`}>
                        {rowFeedback}
                    </p>
                )}
            </td>
        </tr>
    );
};


export const FormCarouselHighlights: React.FC = () => {
    const { state, actions } = useCarouselForm();
    const { highlightItems, isLoading, error, isSaving, page, totalPages, availableOrders } = state;
    const { setPage } = actions;

    const { handleSaveItem, updateItemField, handleDeactivateItem } = actions;

    const sortedItems = highlightItems;

    if (isLoading && highlightItems.length === 0) {
        return <div className="text-center py-8 text-gray-400">Carregando itens do carrossel...</div>;
    }

    if (error && highlightItems.length === 0) {
        return <div className="p-6 bg-gray-800 shadow-lg rounded-lg text-red-400 text-center py-8">
            Falha ao carregar destaques do carrossel. Verifique a API.
        </div>;
    }

    if (highlightItems.length === 0 && !isLoading && !error) {
        return (
            <div className="p-6 bg-gray-800-shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">✨ Gestão de Destaques do Carrossel</h2>
                <p className="text-gray-400 p-4 border border-gray-600 rounded">Não há itens marcados como candidatos ao carrossel. Por favor, use a opção 'Adicionar Novo Item' no menu superior.</p>
            </div>
        );
    }


    return (
        <div className="p-6 bg-gray-800 shadow-lg rounded-lg"> {/* Fundo de card (cinza escuro principal) */}
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Gestão de Destaques do Carrossel</h2> {/* Título branco/claro */}

            {error && (
                <div className="bg-red-700 border border-red-500 text-white px-4 py-3 rounded relative mb-4">
                    Atenção: Houve um erro de API, a lista pode estar incompleta.
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400">
                    Clique em Editar para desbloquear os campos e ajustar a ordem dos itens no carrossel. A ordem deve ser crescente (1, 2, 3...) e será refletida na exibição do carrossel. Quando terminar, clique em Salvar.
                </p>
            </div>

            <div className="overflow-x-auto relative border border-dark-1 rounded-lg">
                <table className="w-full text-sm text-left text-dark-2">
                    <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Item (Projeto/Perspectiva)</th>
                            <th scope="col" className="px-6 py-3">Ordem (1, 2...)</th>
                            <th scope="col" className="px-6 py-3">URL Extra</th>
                            <th scope="col" className="px-6 py-3 text-center">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedItems.map(item => (
                            <CarouselItemRow
                                key={item._id}
                                item={item}
                                updateField={updateItemField}
                                handleSaveItem={handleSaveItem}
                                handleDeactivateItem={handleDeactivateItem}
                                isSaving={isSaving}
                                availableOrders={availableOrders}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINAÇÃO */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                <span className="text-gray-400">
                    Página {page} de {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Próxima
                </button>
            </div>


        </div>
    );
};