import { Controller } from "react-hook-form";
import { TypeInput, Selection, MultiSelect } from "../../../../components/Inputs";
import { useProjectForm } from "../../useProjectForm";
import LoadingOverlay from '../../../../components/LoadingOverlay';
import { useState } from "react";

interface FormProjectProps {
    action: "Create" | "Update" | "Delete";
    onFormSubmit: () => void;
}

export function FormProject({ action, onFormSubmit }: FormProjectProps) {
    const { formMethods, state, actions } = useProjectForm(action, onFormSubmit);
    const { register, control, handleSubmit } = formMethods;
    const { allProjects, people, selectedProjectId, isLoading, error } = state;
    const { setSelectedProjectId, onSubmit, handleDelete } = actions;
    const [validationError, setValidationError] = useState<string | null>(null);

    if (isLoading) {
        return <LoadingOverlay />;
    }

    const onInvalid = (errors: any) => {
        console.error("ERROS DE VALIDAÇÃO:", errors);
        setValidationError("O formulário contém campos obrigatórios vazios ou inválidos.");
    };

    const projectOptions = allProjects.map(p => ({
        id: p._id,
        text: `${p.title} (${p.year})`
    }));

    const peopleOptions = people.map(p => ({
        id: p._id,
        text: p.name
    }));

    // Crie esta função dentro do seu componente FormProject
    const handleActualSubmit = async (data: any) => {
        setValidationError(null); // Limpa o erro de validação local
        // Aqui você também deve garantir que o erro da API seja limpo se o seu hook permitir
        await onSubmit(data);
    };

    const categoryOptions = [
        { id: "URBANIZAÇÃO", text: "Urbanização" },
        { id: "SUSTENTABILIDADE", text: "Sustentabilidade" },
        { id: "HABITAÇÃO SOCIAL", text: "Habitação Social" },
        { id: "ARTE COMUNITÁRIA", text: "Arte Comunitária" },
        { id: "ARQUITETURA", text: "Arquitetura" },
        { id: "GERAL", text: "Geral" },
    ];

    return (
        <form onSubmit={handleSubmit(handleActualSubmit, onInvalid)} className="space-y-6 p-4">

            {(action === "Update" || action === "Delete") && (
                <Selection
                    id="project_selector"
                    title={`Selecione o Projeto para ${action}`}
                    value={selectedProjectId ?? ""}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    options={projectOptions}
                    required
                />
            )}

            {action === "Delete" && selectedProjectId && (
                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="w-full p-3 bg-red-700 hover:bg-red-600 rounded text-white font-bold transition-colors"
                    >
                        {isLoading ? "Deletando..." : "Confirmar Deleção"}
                    </button>
                </div>
            )}

            {(action === "Create" || (action === "Update" && selectedProjectId)) && (
                <>
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">Informações Principais do Projeto</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <TypeInput id="title" title="Título do Projeto" {...register("title")} required />
                            <TypeInput id="subtitle" title="Subtítulo (Opcional)" {...register("subtitle")} />
                            <TypeInput id="slug" title="Slug (URL)" {...register("slug")} required />

                            <Controller
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <Selection
                                        id="category"
                                        title="Categoria"
                                        options={categoryOptions}
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        required
                                    />
                                )}
                            />

                            <TypeInput
                                id="year"
                                type="number"
                                title="Ano de Conclusão"
                                {...register("year", { valueAsNumber: true })}
                                required
                            />

                            {/* Associações */}
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Selection
                                        id="status"
                                        title="Status"
                                        options={[
                                            { id: 'draft', text: 'Rascunho' },
                                            { id: 'published', text: 'Publicado' }
                                        ]}
                                        value={field.value}
                                        onChange={field.onChange}
                                        required
                                    />
                                )}
                            />
                        </div>
                    </fieldset>

                    {/* Campo about_html (usando textarea simples) */}
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">Sobre: </legend>
                        <textarea
                            id="about_html"
                            {...register("about_html")}
                            className="w-full bg-dark-3 text-light-3 border border-gray-700 rounded p-2"
                            rows={6}
                        />
                    </fieldset>

                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">
                            Metadados e Equipe
                        </legend>

                        <div className="grid grid-cols-1 gap-4">

                            {/* Equipe ocupa 100% */}
                            <Controller
                                control={control}
                                name="team"
                                render={({ field }) => (
                                    <MultiSelect
                                        id="team"
                                        name={field.name}
                                        title="Equipe"
                                        options={peopleOptions}
                                        value={field.value || []}
                                        setValue={(newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                            {/* Banner abaixo */}
                            <TypeInput
                                id="banner"
                                title="URL do Banner"
                                {...register("banner")}
                            />
                        </div>
                    </fieldset>

                    {/* Opções de Destaque*/}
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">Opções de Carrossel</legend>
                        <div className="flex items-center gap-4">
                            <input
                                id="isCarousel"
                                type="checkbox"
                                {...register("isCarousel")}
                                className="h-5 w-5 bg-dark-3 text-light-3 border-gray-600 rounded" // Mantendo seus estilos
                            />
                            <label htmlFor="isCarousel" className="text-light-3">Quero incluir no Carrossel Principal?</label>
                        </div>
                        {/* CAMPOS orderCarousel */}
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-3 bg-green-600 hover:bg-green-500 rounded text-white text-xl font-bold transition-colors"
                    >
                        {isLoading ? "Salvando..." : (action === "Create" ? "Criar Novo Projeto" : "Salvar Alterações")}
                    </button>
                </>
            )}
        </form>
    );
}