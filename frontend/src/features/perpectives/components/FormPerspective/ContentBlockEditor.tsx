import { useFieldArray } from "react-hook-form";
import type { UseFormRegister, Control } from "react-hook-form";
import type { PerspectiveFormData, IContentBlock } from "./perspective.schema";
import { TypeInput, Textarea } from "../../../../components/Inputs"; 
import { FaTrash, FaBars } from "react-icons/fa6";

// Importações da biblioteca de Drag and Drop: dnd-kit
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Componente de Item Individual (para o dnd-kit) ---
// Este componente encapsula a lógica de cada bloco arrastável.
function SortableBlockItem({ id, index, field, register, onRemove }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="border border-gray-700 p-4 rounded bg-gray-800 relative shadow-md">
      {/* Ícone para arrastar */}
      <span {...listeners} className="absolute top-4 left-3 cursor-grab text-gray-400" title="Reordenar bloco">
        <FaBars />
      </span>
      
      {/* Botão para remover o bloco */}
      <button type="button" onClick={() => onRemove(index)} className="absolute top-3 right-3 text-red-500 hover:text-red-400" title="Remover bloco">
        <FaTrash />
      </button>

      <h4 className="font-bold text-center mb-4 text-gray-300 tracking-wider">{field.type.toUpperCase()}</h4>
      
      {/* Renderiza os campos de formulário corretos para cada tipo de bloco */}
      {field.type === 'title' && (
        <div className="space-y-2">
          <TypeInput id={`title-content-${id}`} title="Título" {...register(`contentBlocks.${index}.content`)} />
        </div>
      )}

      {(field.type === 'text' || field.type === 'highlight') && 
        <Textarea id={`text-content-${id}`} title="Conteúdo" {...register(`contentBlocks.${index}.content`)} />
      }

      {field.type === 'image' && (
        <div className="space-y-2">
          <TypeInput id={`image-url-${id}`} title="URL da Imagem" {...register(`contentBlocks.${index}.imageUrl`)} />
          <TypeInput id={`image-caption-${id}`} title="Legenda" {...register(`contentBlocks.${index}.caption`)} />
        </div>
      )}
    </div>
  );
}


// --- Componente Principal do Editor de Blocos ---
interface ContentBlockEditorProps {
  register: UseFormRegister<PerspectiveFormData>;
  control: Control<PerspectiveFormData>;
}

export function ContentBlockEditor({ register, control }: ContentBlockEditorProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "contentBlocks",
  });

  // Função chamada ao final de um arrasto
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex); // Função do useFieldArray para reordenar
    }
  };

  // Função para adicionar um novo bloco ao final da lista
  const addBlock = (type: IContentBlock['type']) => {
    const newBlock: any = { type };
    if (type === 'title') { newBlock.content = ''; }
    else if (type === 'image') { newBlock.imageUrl = ''; newBlock.caption = ''; }
    else { newBlock.content = ''; }
    append(newBlock);
  };

  return (
    <fieldset className="border border-gray-700 p-4 rounded-md">
      <legend className="text-lg font-semibold px-2 text-white">Conteúdo da Página <span className="text-red-500">*</span></legend>
      
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-4">
          <SortableContext
            items={fields.map(field => field.id)}
            strategy={verticalListSortingStrategy}
          >
            {/* Mapeia os campos para renderizar cada bloco arrastável */}
            {fields.map((field, index) => (
              <SortableBlockItem
                key={field.id}
                id={field.id}
                index={index}
                field={field}
                register={register}
                onRemove={remove}
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      {/* Botões para adicionar novos blocos */}
      <div className="flex flex-wrap gap-4 mt-6 border-t border-gray-700 pt-4">
        <button type="button" onClick={() => addBlock('title')} className="p-2 bg-red-600 hover:bg-red-400 rounded font-semibold">Adicionar Título</button>
        <button type="button" onClick={() => addBlock('text')} className="p-2 bg-red-600 hover:bg-red-400 rounded font-semibold">Adicionar Texto</button>
        <button type="button" onClick={() => addBlock('image')} className="p-2 bg-red-600 hover:bg-red-400 rounded font-semibold">Adicionar Imagem</button>
        <button type="button" onClick={() => addBlock('highlight')} className="p-2 bg-red-600 hover:bg-red-400 rounded font-semibold">Adicionar Destaque</button>
      </div>
    </fieldset>
  );
}