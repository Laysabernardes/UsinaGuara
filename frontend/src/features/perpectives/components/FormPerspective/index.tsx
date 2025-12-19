import { Controller } from "react-hook-form";
import { TypeInput, Selection, MultiSelect } from "../../../../components/Inputs";
import { usePerspectiveForm } from "./usePerspectiveForm";
import { ContentBlockEditor } from "./ContentBlockEditor";
import LoadingOverlay from '../../../../components/LoadingOverlay';
import { useState } from "react";

export function FormPerspective({ action, onFormSubmit }: { action: "Create" | "Update" | "Delete", onFormSubmit: () => void }) {
    const { formMethods, state, actions } = usePerspectiveForm(action, onFormSubmit);
    const { register, control, handleSubmit } = formMethods;
    const { allPerspectives, projects, people, selectedPerspectiveId, isLoading, error } = state;
    const { setSelectedPerspectiveId, onSubmit, handleDelete } = actions;
    const [validationError, setValidationError] = useState<string | null>(null);

    if (isLoading) return <LoadingOverlay />;

    const onInvalid = (errors: any) => {
        console.error("ERROS DE VALIDAÇÃO:", errors);
        setValidationError("O formulário contém campos obrigatórios vazios ou inválidos.");
    };

    // Mapeamento das opções (permanece inalterado)
    const projectOptions = projects.map(p => ({ id: p._id, text: p.title }));
    const peopleOptions = people.map(p => ({ id: p._id, text: p.name }));

    const handleActualSubmit = async (data: any) => {
        setValidationError(null); 
        await onSubmit(data);
    };


    return (
        <form onSubmit={handleSubmit(handleActualSubmit, onInvalid)} className="space-y-6 p-4">
            {(action === "Update" || action === "Delete") && (
                <Selection
                    id="perspective_selector"
                    title="Selecione uma Perspectiva para Editar ou Deletar"
                    value={selectedPerspectiveId ?? ""}
                    onChange={(e) => setSelectedPerspectiveId(e.target.value)}
                    options={allPerspectives.map(p => ({ id: p._id, text: p.title }))}
                    required
                />
            )}

            {action === "Delete" && selectedPerspectiveId && (
                <div className="text-center">
                    <button type="button" onClick={handleDelete} disabled={isLoading} className="w-full p-3 bg-red-700 hover:bg-red-600 rounded text-white font-bold transition-colors">
                        {isLoading ? "Deletando..." : "Confirmar Deleção"}
                    </button>
                </div>
            )}

            {(action === "Create" || (action === "Update" && selectedPerspectiveId)) && (
                <>
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-white">Informações Principais</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Controller
                                control={control}
                                name="projectId"
                                render={({ field }) => (
                                    <Selection 
                                        id="projectId" 
                                        title="Projeto Associado" 
                                        options={projectOptions} 
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        required 
                                    />
                                )}
                            />
                            <TypeInput id="title" title="Título da Perspectiva" {...register("title")} required />
                            <TypeInput id="slug" title="Slug (URL)" {...register("slug")} required />
                            <TypeInput id="order" type="number" title="Ordem" {...register("order", { valueAsNumber: true })} required />
                            <TypeInput id="banner" title="URL do Banner" {...register("banner")} />
                        </div>
                    </fieldset>

                    <ContentBlockEditor control={control} register={register}  />

                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-white">Metadados e Associações</legend>
                        <Controller
                            control={control}
                            name="authors"
                            render={({ field }) => (
                                <MultiSelect
                                    id="authors"
                                    name={field.name}
                                    title="Autores"
                                    options={peopleOptions}
                                    value={field.value || []}
                                    setValue={(newValue) => field.onChange(newValue)}
                                    required 
                                />
                            )}
                        />
                    </fieldset>

                    {/* Opções de Destaque - AGORA SIMPLES */}
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-white">Opções de Carrossel</legend>
                        <div className="flex items-center gap-4 text-white">
                            <input id="isCarousel" type="checkbox" {...register("isCarousel")} className="h-5 w-5" />
                            <label htmlFor="isCarousel">Quero incluir no Carrossel Principal?</label>
                        </div>
                        {/* CAMPOS orderCarousel e extraURL REMOVIDOS */}
                    </fieldset>

                    {error && (
                        <div className="bg-red-600/20 border border-red-600 text-red-1 p-3 rounded-lg text-center animate-pulse mb-4">
                            Erro: {error}
                        </div>
                    )}

                    {/* MENSAGEM DE ERRO ESTILIZADA */}
                    {validationError && (
                        <div className="bg-red-600/20 border border-red-600 text-red-1 p-3 rounded-lg text-center animate-pulse">
                            {validationError}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading} className="w-full p-3 bg-green-600 hover:bg-green-500 rounded text-white text-xl font-bold transition-colors">
                        {isLoading ? "Salvando..." : (action === "Create" ? "Criar Nova Perspectiva" : "Salvar Alterações")}
                    </button>
                </>
            )}
        </form>
    );
}