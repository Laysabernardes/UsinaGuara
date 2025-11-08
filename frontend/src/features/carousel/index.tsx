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
}> = ({ item, updateField, handleSaveItem, handleDeactivateItem, isSaving }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [rowFeedback, setRowFeedback] = useState('');
    const [isRowSaving, setIsRowSaving] = useState(false);

    const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numValue = value === "" ? undefined : parseInt(value, 10);
        updateField(item._id, 'orderCarousel', numValue);
        setRowFeedback('');
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateField(item._id, 'extraURL', e.target.value);
        setRowFeedback('');
    };

    const saveCurrentItem = async () => {
        setIsRowSaving(true);
        setRowFeedback('');

        const result = await handleSaveItem(item);

        setRowFeedback(result.message);
        setIsRowSaving(false);

        if (result.success) {
            setIsEditing(false);
        }

        setTimeout(() => setRowFeedback(''), 4000);
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
    const isOrdered = item.orderCarousel !== undefined && item.orderCarousel !== null && item.orderCarousel >= 0;
    const feedbackStyle = rowFeedback.includes('Erro') ? 'text-red-400' : 'text-green-400'; 


    return (
        <tr className={`border-b border-dark-1 hover:bg-dark-1 
            ${isOrdered ? 'bg-dark-2' : 'bg-yellow-900/40'} 
            ${isEditing ? 'border-2 border-indigo-500' : ''}`}> {/* Aplicando fundo escuro/alerta */}

            {/* Coluna de Título/Tipo */}
            <td className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap"> {/* Texto CLARO */}
                {item.title}
                <span className={`ml-2 text-xs font-semibold ${typeColor}`}>
                    [{item.collection_type.toUpperCase()}]
                </span>
            </td>

            {/* Coluna da Ordem (Input Numérico) */}
            <td className="px-6 py-4">
                <input
                    type="number"
                    min="0"
                    value={item.orderCarousel === undefined || item.orderCarousel === null ? "" : item.orderCarousel}
                    onChange={handleOrderChange}
                    disabled={!isEditing || isRowSaving}
                    className="w-20 p-2 border border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 bg-dark-1 text-gray-100" // Input escuro
                    placeholder="Sem ordem"
                />
                {!isOrdered && <p className="text-xs text-red-400 mt-1">Item **inativo**</p>}
            </td>

            {/* Coluna da URL Extra */}
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
                    // MODO VISUALIZAÇÃO: Botões EDITAR e REMOVER
                    <div className="space-y-1">
                        <button
                            onClick={() => setIsEditing(true)}
                            disabled={isSaving}
                            className={`p-2 rounded text-white text-xs font-bold transition-colors w-24 bg-teal-600 hover:bg-teal-500`} // EDITAR: VERDE ÁGUA/AZUL CLARO
                        >
                            Editar
                        </button>
                        <button
                            onClick={removeCurrentItem}
                            disabled={isSaving}
                            className={`p-2 rounded text-xs transition-colors w-24 bg-red-700 text-white hover:bg-red-600`} // REMOVER: Vermelho escuro
                        >
                            Remover Destaque
                        </button>
                    </div>
                ) : (
                    // MODO EDIÇÃO: Botões SALVAR / CANCELAR
                    <div className="space-y-1">
                        <button
                            onClick={saveCurrentItem}
                            disabled={isRowSaving || isSaving}
                            className={`p-2 rounded text-white text-xs font-bold transition-colors w-24
                                ${isRowSaving || isSaving ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-700 hover:bg-green-600'}`} // SALVAR: Verde escuro
                        >
                            {isRowSaving ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button
                            onClick={cancelEdit}
                            disabled={isRowSaving || isSaving}
                            className={`p-2 rounded text-xs transition-colors w-24 bg-gray-600 text-gray-100 hover:bg-gray-500`} // CANCELAR: Cinza escuro
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
    const { highlightItems, isLoading, error, isSaving } = state;

    const { handleSaveItem, updateItemField, handleDeactivateItem } = actions; 

    const sortedItems = highlightItems;

    if (isLoading && highlightItems.length === 0) {
        return <div className="text-center py-8 text-gray-400">Carregando itens do carrossel...</div>;
    }

    if (error && highlightItems.length === 0) {
        return <div className="p-6 bg-dark-1 shadow-lg rounded-lg text-red-400 text-center py-8">
            Falha ao carregar destaques do carrossel. Verifique a API.
        </div>;
    }
    
    if (highlightItems.length === 0 && !isLoading && !error) {
         return (
            <div className="p-6 bg-dark-1 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-100">✨ Gestão de Destaques do Carrossel</h2>
                <p className="text-gray-400 p-4 border border-gray-600 rounded">Não há itens marcados como candidatos ao carrossel. Por favor, use a opção 'Adicionar Novo Item' no menu superior.</p>
            </div>
        );
    }


    return (
        <div className="p-6 bg-dark-2 shadow-lg rounded-lg"> {/* Fundo de card (cinza escuro principal) */}
            <h2 className="text-2xl font-bold mb-6 text-gray-100">Gestão de Destaques do Carrossel</h2> {/* Título branco/claro */}
            
            {error && (
                <div className="bg-red-700 border border-red-500 text-white px-4 py-3 rounded relative mb-4">
                    Atenção: Houve um erro de API, a lista pode estar incompleta.
                </div>
            )}

            <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400">
                    Clique em **Editar** para desbloquear os campos e salvar item por item.
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
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};