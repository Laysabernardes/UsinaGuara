/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import type { ReactElement } from "react";
import { FaRegEye, FaRegEyeSlash, FaLock } from "react-icons/fa6";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  title?: string;
  type?: string;
  placeholder?: string;
  icon?: ReactElement<any, any>;
  required?: boolean;
  errors?: any;
}

function TypeInput({
  id,
  title,
  type = "text",
  placeholder,
  icon,
  required,
  ...rest
}: InputProps) {
  return (
    <div className="my-5 flex flex-col gap-2">
      <label htmlFor={id} className="text-lg font-bold text-light-3">
        {title} {required && <span className="text-red-3">*</span>}
      </label>
      <div className="relative">
        <div
          id="icon"
          className="absolute left-2 h-full flex items-center justify-center text-red-3"
        >
          {icon}
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...rest}
          required={required}
          className="w-full bg-gray-800 p-2 pl-7 rounded-lg text-red-3 border border-gray-3 focus:border-red-2 outline-none"
        />
      </div>
    </div>
  );
}

function PasswordInput({
  id,
  title,
  type = "text",
  placeholder,
  icon,
  required,
  errors,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="my-5 flex flex-col gap-2">
      <label htmlFor={id} className="text-lg font-bold text-light-3">
        {title} {required && <span className="text-red-3">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-2 h-full flex items-center justify-center text-red-3">
          <FaLock />
        </div>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          // Altere a linha do input para:
          className={`w-full bg-gray-500 p-2 pl-10 pr-10 rounded-lg text-red-3 border 
          ${errors?.[id] ? "border-red-1" : "border-gray-3"} 
          focus:outline-none focus:ring-2 focus:ring-red-2`}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 inset-y-0 flex items-center text-red-3"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>
    </div>
  );
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  title?: string;
  placeholder?: string;
  required?: boolean;
}
function Textarea({
  id,
  title,
  placeholder,
  required,
  ...rest
}: TextAreaProps) {
  const addImg = () => {
    const textarea = document.getElementById(id) as HTMLTextAreaElement;
    const linkInput = document.getElementById(
      `${id}-img-link`
    ) as HTMLInputElement;
    if (!textarea || !linkInput) return;

    const link = linkInput.value.trim();
    if (!link) return; // Se o input estiver vazio, não faz nada

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const imgToken = `[IMG]('${link}')`;

    textarea.value = text.slice(0, start) + imgToken + text.slice(end);

    const newCursorPos = start + imgToken.length;
    textarea.selectionStart = textarea.selectionEnd = newCursorPos;

    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    linkInput.value = ""; // Limpa o input depois de inserir
  };

  return (
    <div className="my-5 flex flex-col gap-2">
      <label htmlFor={id} className="text-lg font-bold text-light-3">
        {title} {required && <span className="text-red-3">*</span>}
      </label>
      <div>
        <textarea
          id={id}
          placeholder={placeholder}
          {...rest}
          required={required}
          className="w-full h-50 max-h-50 bg-gray-800 p-2 pl-4 rounded-lg text-red-3 border border-gray-3 resize-none outline-none focus:border-red-2" />
      </div>
    </div>
  );
}

interface OptionItem {
  id: string | number;
  text: string;
}

interface SelectionProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  title?: string;
  placeholder?: string;
  icon?: ReactElement<any, any>;
  nullOption?: boolean;
  options: OptionItem[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}


function Selection({
  id,
  title,
  placeholder,
  icon,
  options,
  required,
  value,
  onChange,
}: SelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionId: string | number) => {
    const event = {
      target: { value: optionId.toString(), id }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    onChange(event);
    setIsOpen(false); 
  };

  const selectedText = options.find(opt => opt.id.toString() === value?.toString())?.text;

  return (
    <div className="my-5 flex flex-col gap-2 relative" ref={dropdownRef}>
      <label className="text-lg font-bold text-gray-400">
        {title} {required && <span className="text-red-3">*</span>}
      </label>

      {/* Botão que abre/fecha o dropdown */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-800 p-2 pl-10 rounded-lg text-red-3 border border-gray-900 cursor-pointer flex items-center justify-between min-h-[42px]"
      >
        <div className="absolute left-3 text-red-3">
          {icon}
        </div>
        
        <span className={selectedText ? "text-red-3" : "text-gray-400 opacity-60"}>
          {selectedText || placeholder || "Selecione..."}
        </span>

        <FaArrowDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Lista de Opções (Abre apenas se isOpen for true) */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full mt-1 bg-gray-800 border border-gray-900 rounded-lg shadow-2xl z-50 overflow-hidden">
          <div className="max-h-[200px] overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className="px-4 py-2 text-red-3 cursor-pointer hover:bg-gray-900 transition-colors"
              >
                {opt.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { FaArrowDown } from "react-icons/fa6";

interface MultiSelectionProps {
  name: string;
  id: string;
  title?: string;
  placeholder?: string;
  icon?: ReactElement;
  options: OptionItem[];
  required?: boolean;
  value?: string[];
  setValue?: (value: string[]) => void;
}

function MultiSelect({
  id,
  title,
  placeholder,
  icon,
  options,
  required,
  value,
  setValue,
}: MultiSelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionItem[]>([]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: OptionItem) => {
    const exists = selected.some((s) => s.id === item.id);
    const newSelected = exists
      ? selected.filter((s) => s.id !== item.id)
      : [...selected, item];

    setSelected(newSelected);
    setValue?.(newSelected.map((i) => i.id.toString()));
  };

  const removeItem = (id: string | number) => {
    const newSelected = selected.filter((s) => s.id !== id);
    setSelected(newSelected);
    setValue?.(newSelected.map((i) => i.id.toString()));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as any).contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (value) {
      const initialSelected = options.filter((o) =>
        value.includes(o.id.toString())
      );
      setSelected(initialSelected);
    }
  }, [value, options]);

  return (
    <div className="relative" ref={dropdownRef}>
      {title && (
        <label htmlFor={id} className="text-lg font-bold text-light-3">
          {title} {required && <span className="text-red-3">*</span>}
        </label>
      )}

      <div
        onClick={toggleDropdown}
        className="w-full min-h-[44px] bg-gray-800 p-2 rounded-lg text-red-3 flex flex-wrap items-center cursor-pointer gap-2 border border-gray-3"      >
        {icon && <span className="text-red-3 mr-2">{icon}</span>}

        {selected.length === 0 && (
          <span className="text-red-3 opacity-10 absolute ml-5">
            {placeholder}
          </span>
        )}

        {selected.map((item) => (
          <span
            key={item.id}
            className="bg-gray-400 text-black px-3 py-1 rounded-full flex items-center ml-2"
          >
            {item.text}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item.id);
              }}
              className="ml-2 text-gray-600 hover:text-black cursor-pointer"
            >
              x
            </button>
          </span>
        ))}

        <FaArrowDown className="ml-auto text-light-3" />
      </div>

      {isOpen && (
        <div className="mt-1 rounded-lg bg-gray-800 border border-gray-300 max-h-[200px] overflow-y-auto z-10 w-full shadow-lg">
          {options.map((item) => (
            <label
              key={item.id}
              className="flex items-center px-4 py-2 text-red-3 hover:bg-gray-400 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.some((s) => s.id === item.id)}
                onChange={() => handleSelect(item)}
                className="form-checkbox"
              />
              <span className="ml-2">{item.text}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export { TypeInput, PasswordInput, Textarea, Selection, MultiSelect };
