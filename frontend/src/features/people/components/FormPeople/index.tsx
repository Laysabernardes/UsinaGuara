import { Controller } from "react-hook-form";
import { TypeInput, Selection } from "../../../../components/Inputs";
import { usePeopleForm } from "../../usePeopleForm";
import LoadingOverlay from '../../../../components/LoadingOverlay';

interface FormPeopleProps {
    action: "Create" | "Update" | "Delete";
    onFormSubmit: () => void;
}

export function FormPeople({ action, onFormSubmit }: FormPeopleProps) {
    const { formMethods, state, actions } = usePeopleForm(action, onFormSubmit);

    const { register, control, handleSubmit } = formMethods;

    const { allPeople, selectedPeopleId, isLoading, error } = state;
    const { setSelectedPeopleId, onSubmit, handleDelete } = actions;

    if (isLoading) return <LoadingOverlay />;

    if (error)
        return <p className="text-center p-4 text-red-500">Erro: {error}</p>;

    const onInvalid = (errors: any) => {
        console.error("ERROS NO FORMULÁRIO:", errors);
        alert("Existem erros no formulário. Veja o console para detalhes.");
    };

    const peopleOptions = allPeople.map((p) => ({
        id: p._id,
        text: p.name,
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6 p-4">

            {/* Seleção da pessoa para atualizar ou deletar */}
            {(action === "Update" || action === "Delete") && (
                <Selection
                    id="people_selector"
                    title={`Selecione a Pessoa para ${action}`}
                    value={selectedPeopleId ?? ""}
                    onChange={(e) => setSelectedPeopleId(e.target.value)}
                    options={peopleOptions}
                    required
                />
            )}

            {/* Botão de deletar */}
            {action === "Delete" && selectedPeopleId && (
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

            {/* Formulário principal */}
            {(action === "Create" || (action === "Update" && selectedPeopleId)) && (
                <>

                    {/* Informações principais */}
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">
                            Informações da Pessoa
                        </legend>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <TypeInput
                                id="name"
                                title="Nome"
                                {...register("name")}
                                required
                            />

                            <TypeInput
                                id="kind"
                                title="Tipo (Ex: Professor, Designer…)"
                                {...register("kind")}
                                required
                            />

                            <TypeInput
                                id="contact"
                                title="Contato (email, telefone)"
                                {...register("contact")}
                                required
                            />

                            <TypeInput
                                id="imageUrl"
                                title="URL da Imagem"
                                {...register("imageUrl")}
                                required
                            />

                        </div>
                    </fieldset>

                    {/* Descrição (array simples) */}
                    <fieldset className="border border-gray-700 p-4 rounded-md">
                        <legend className="text-lg font-semibold px-2 text-light-3">
                            Descrição
                        </legend>

                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <textarea
                                    id="description"
                                    className="w-full bg-dark-3 text-light-3 border border-gray-600 rounded p-2"
                                    rows={5}
                                    value={field.value?.join("\n") || ""}
                                    onChange={(e) =>
                                        field.onChange(e.target.value.split("\n"))
                                    }
                                    placeholder="Uma linha por item da descrição"
                                />
                            )}
                        />

                    </fieldset>

                    {/* Botão de enviar */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full p-3 bg-green-600 hover:bg-green-500 rounded text-white text-xl font-bold transition-colors"
                    >
                        {isLoading
                            ? "Salvando..."
                            : action === "Create"
                            ? "Criar Pessoa"
                            : "Salvar Alterações"}
                    </button>
                </>
            )}
        </form>
    );
}
