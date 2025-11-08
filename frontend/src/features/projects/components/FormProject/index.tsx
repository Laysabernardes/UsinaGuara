import { Controller } from "react-hook-form";
// Renomeie os inputs conforme o nome do seu componente
import { TypeInput, Selection, MultiSelect } from "../../../../components/inputs";
// Importa o hook customizado do Projeto
import { useProjectForm } from "../../useProjectForm";

// Assumindo que você tem os tipos definidos no useProjectForm
interface FormProjectProps {
    action: "Create" | "Update" | "Delete";
    onFormSubmit: () => void;
}

export function FormProject({ action, onFormSubmit }: FormProjectProps) {
    // Puxa toda a lógica do hook useProjectForm
    const { formMethods, state, actions } = useProjectForm(action, onFormSubmit);

    // Desestrutura os métodos do React Hook Form
    const { register, control, handleSubmit } = formMethods;

    // Desestrutura os estados e ações do hook
    const { allProjects, people, selectedProjectId, isLoading, error } = state;
    const { setSelectedProjectId, onSubmit, handleDelete } = actions;

    // Renderização de estados de carregamento e erro
    if (isLoading) return <p className="text-center p-4 text-gray-400">Carregando dados de Projetos e Pessoas...</p>;
    if (error) return <p className="text-center p-4 text-red-500">Erro: {error}</p>;

    // Função de validação (reutilizada do seu código)
    const onInvalid = (errors: any) => {
        console.error("ERROS DE VALIDAÇÃO DO FORMULÁRIO:", errors);
        alert("O formulário contém erros! Verifique o console do navegador (F12) para ver os detalhes.");
    };

    // Mapeamento das opções de Projeto para o seletor
    const projectOptions = allProjects.map(p => ({
        id: p._id,
        text: `${p.title} (${p.year})`
    }));

    // Mapeamento das opções de Pessoas para o MultiSelect (Team)
    const peopleOptions = people.map(p => ({
        id: p._id,
        text: p.name
    }));


    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6 p-4">

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

            {/* Renderiza o formulário principal para Criar ou se um Projeto for selecionado para Update */}
            {(action === "Create" || (action === "Update" && selectedProjectId)) && (
                <>
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">Informações Principais do Projeto</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <TypeInput id="title" title="Título do Projeto" {...register("title")} required />
                            <TypeInput id="subtitle" title="Subtítulo (Opcional)" {...register("subtitle")} />
                            <TypeInput id="slug" title="Slug (URL)" {...register("slug")} required />

                            <TypeInput id="category" title="Categoria" {...register("category")} required />

                            <TypeInput
                                id="year"
                                type="number"
                                title="Ano de Conclusão"
                                {...register("year", { valueAsNumber: true })} // Importante para o Zod coerce
                                required
                            />

                            {/* Associações */}
                            <Controller
                                control={control}
                                name="status"
                                render={({ field }) => (
                                    <Selection
                                        // Mantendo seus estilos
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
                        <legend className="text-lg font-semibold px-2 text-light-3">Sobre (HTML)</legend>
                        <textarea
                            id="about_html"
                            {...register("about_html")}
                            className="w-full bg-dark-3 text-light-3 border border-gray-600 rounded p-2"
                            rows={6}
                        />
                    </fieldset>

                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">Metadados e Equipe</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* MultiSelect para Team */}
                            <Controller
                                control={control}
                                name="team"
                                render={({ field }) => (
                                    <MultiSelect
                                        // Mantendo seus estilos
                                        id="team"
                                        name={field.name}
                                        title="Equipe"
                                        options={peopleOptions}
                                        value={field.value || []}
                                        setValue={(newValue) => field.onChange(newValue)}
                                    />
                                )}
                            />
                            <TypeInput id="banner" title="URL do Banner" {...register("banner")} />
                        </div>
                    </fieldset>

                    {/* Opções de Destaque - AGORA SIMPLES */}
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
                        {/* CAMPOS orderCarousel e extraURL REMOVIDOS */}
                    </fieldset>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-3 bg-blue-600 hover:bg-blue-500 rounded text-white text-xl font-bold transition-colors"
                    >
                        {isLoading ? "Salvando..." : (action === "Create" ? "Criar Novo Projeto" : "Salvar Alterações")}
                    </button>
                </>
            )}
        </form>
    );
}